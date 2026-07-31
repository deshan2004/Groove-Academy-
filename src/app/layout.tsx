import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "StepUp Dance Academy | Premium Dance Classes in Sri Lanka",
  description: "Join StepUp Dance Academy, the most prestigious dance school. Master Kandyan, Hip-Hop, Classical, and Contemporary dance styles with expert instructors.",
  keywords: ["Dance Academy", "Sri Lanka", "Kandyan Dance", "Hip Hop", "Contemporary Dance", "Dance Classes", "StepUp"],
  authors: [{ name: "StepUp Dance Academy" }],
  openGraph: {
    title: "StepUp Dance Academy",
    description: "Join the most prestigious dance academy in Sri Lanka.",
    url: "https://stepupdanceacademy.com",
    siteName: "StepUp Dance Academy",
    images: [
      {
        url: "/icon.svg",
        width: 800,
        height: 600,
        alt: "StepUp Dance Academy Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StepUp Dance Academy",
    description: "Join the most prestigious dance academy in Sri Lanka.",
    images: ["/icon.svg"],
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-academy-black text-academy-white selection:bg-academy-gold selection:text-black min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
