import type { Metadata } from "next";
import { Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Free Roof Repair Quote in Tampa | Fast & Reliable",
  description:
    "Get a free roof repair estimate from licensed Tampa roofing professionals. Fast response, trusted local contractors. Call or submit a quote request now.",
  keywords: "roof repair Tampa, Tampa roofing, roof replacement Tampa, free roof estimate Tampa",
  openGraph: {
    title: "Free Roof Repair Quote in Tampa",
    description: "Fast, reliable local roofing professionals. Get your free quote today.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${barlow.variable}`}>
      <body className="font-sans antialiased bg-white text-brand-navy">
        {children}
      </body>
    </html>
  );
}
