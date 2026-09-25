import type { Metadata } from "next";
import { Gaegu } from "next/font/google";
import "./globals.css";

const gaegu = Gaegu({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-gaegu",
});

export const metadata: Metadata = {
  title: "My Melody Study Hub",
  description: "A cute study web app",
};

import { SpotifyPlayer } from "@/components/SpotifyPlayer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gaegu.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[var(--color-melody-light)] text-[var(--color-melody-black)]">
        {children}
        <SpotifyPlayer />
      </body>
    </html>
  );
}
