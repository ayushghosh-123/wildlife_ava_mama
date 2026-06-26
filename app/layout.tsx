
import type { Metadata } from "next";
import { Syne, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Footer from "@/component/Footer";
import Header from "@/component/Header";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WILDLIFE | Beyond Human Eyes",
  description: "High-end cinematic storytelling capturing the raw power of nature as fine art.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${hankenGrotesk.variable} h-full antialiased`}
    >
     
      <body className="min-h-full bg-[#050505] text-[#e5e2e1] font-sans flex flex-col" suppressHydrationWarning>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
