import type { Metadata, Viewport } from "next";
import { Audiowide, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const audiowide = Audiowide({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "STARTUP IN A BOX | Innovation & Entrepreneurship Challenge 2026",
  description:
    "C-TEC & Coding Club present STARTUP IN A BOX — an innovation and entrepreneurship challenge. One Problem. One Team. One Startup.",
  icons: {
    icon: "/images/klecetlogo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Audiowide&family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (sessionStorage.getItem('startup_intro_shown') !== 'true') {
                  document.documentElement.classList.add('loading-intro');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${audiowide.variable} ${bricolage.variable} ${jetbrainsMono.variable} font-body bg-white text-black min-h-screen selection:bg-black selection:text-white antialiased`}
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
