// A:/instagram-clone-fullstack/src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pacifico = Geist({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Instagram",
  description: "Instagram - Share what you're into",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--ig-bg)] text-[var(--ig-text)] antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}