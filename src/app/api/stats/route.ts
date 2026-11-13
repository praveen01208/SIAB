import { NextRequest, NextResponse } from "next/server";

// In-memory fallback storage for local development & non-Redis deployments
const globalStore = global as unknown as {
  _siabActiveVisitors?: Map<string, number>;
  _siabTotalVisits?: number;
};

if (!globalStore._siabActiveVisitors) {
  globalStore._siabActiveVisitors = new Map<string, number>();
}
if (typeof globalStore._siabTotalVisits !== "number") {
  globalStore._siabTotalVisits = 1;
}

function getRedisConfig() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    process.env.klecetsih_KV_REST_API_URL ||
    process.env.KLECETSIH_KV_REST_API_URL ||
    process.env.STORAGE_REST_API_URL;

  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.klecetsih_KV_REST_API_TOKEN ||
    process.env.KLECETSIH_KV_REST_API_TOKEN ||
    process.env.STORAGE_REST_API_TOKEN;

  if (url && token) {
    return { url: url.replace(/\/$/, ""), token };
  }
  return null;
}

export async function GET(request: NextRequest) {
  return handleStats(request);
}

export async function POST(request: NextRequest) {
  return handleStats(request);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

async function handleStats(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let action = searchParams.get("action") || "heartbeat";
  let visitorId = searchParams.get("visitorId") || "";

  if (request.method === "POST" && (!visitorId || action === "heartbeat")) {
    try {
      const body = await request.json().catch(() => ({}));
      if (body.action) action = body.action;
      if (body.visitorId) visitorId = body.visitorId;
    } catch {
      // ignore
    }
  }

  const now = Date.now();
  const cutoff = now - 45000; // Inactive threshold: 45 seconds
  const redisConfig = getRedisConfig();

  // ── Redis Upstash REST API Path ─────────────────────────────────────
  if (redisConfig) {
    const ACTIVE_KEY = "siab:active_visitors";
    const TOTAL_KEY = "siab:total_visits";

    try {
      const commands: any[] = [
        ["ZREMRANGEBYSCORE", ACTIVE_KEY, "0", cutoff.toString()],
      ];

      if (action === "leave" && visitorId) {
        commands.push(["ZREM", ACTIVE_KEY, visitorId]);
        commands.push(["ZCARD", ACTIVE_KEY]);
        commands.push(["GET", TOTAL_KEY]);

        const res = await fetch(`${redisConfig.url}/pipeline`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${redisConfig.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commands),
          cache: "no-store",
        });

        if (res.ok) {
          const results = await res.json();
          const live = Number(results[1]?.result) || 0;
          const total = Number(results[2]?.result) || 1;
          return jsonResponse({ success: true, live, total });
        }
      }

      if (visitorId) {
        commands.push(["ZADD", ACTIVE_KEY, now.toString(), visitorId]);
      }

      if (action === "visit") {
        commands.push(["INCR", TOTAL_KEY]);
      } else {
        commands.push(["GET", TOTAL_KEY]);
      }

      commands.push(["ZCARD", ACTIVE_KEY]);

      const res = await fetch(`${redisConfig.url}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${redisConfig.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commands),
        cache: "no-store",
      });

      if (res.ok) {
        const results = await res.json();
        // Index offsets depending on whether ZADD was pushed
        const totalIndex = visitorId ? 2 : 1;
        const cardIndex = visitorId ? 3 : 2;
        const total = Number(results[totalIndex]?.result) || 1;
        const live = Number(results[cardIndex]?.result) || 1;

        return jsonResponse({
          success: true,
          live: Math.max(1, live),
          total: Math.max(1, total),
        });
      }
    } catch (err) {
      console.warn("Upstash Redis stats call failed, falling back to memory:", err);
    }
  }

  // ── In-Memory Fallback Path ──────────────────────────────────────────
  const activeMap = globalStore._siabActiveVisitors!;

  // 1. Prune visitors inactive >45 seconds
  activeMap.forEach((lastSeen, id) => {
    if (lastSeen < cutoff) {
      activeMap.delete(id);
    }
  });

  if (action === "leave" && visitorId) {
    activeMap.delete(visitorId);
    return jsonResponse({
      success: true,
      live: Math.max(0, activeMap.size),
      total: globalStore._siabTotalVisits!,
    });
  }

  if (visitorId) {
    activeMap.set(visitorId, now);
  }

  if (action === "visit") {
    globalStore._siabTotalVisits = (globalStore._siabTotalVisits || 1) + 1;
  }

  const live = Math.max(1, activeMap.size);
  const total = Math.max(1, globalStore._siabTotalVisits!);

  return jsonResponse({
    success: true,
    live,
    total,
  });
}

function jsonResponse(data: any) {
  return NextResponse.json(data, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
