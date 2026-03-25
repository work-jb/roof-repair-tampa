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
  title: "Tampa Roof Quotes | Free Roofing Quotes from Local Contractors",
  description:
    "Get free roofing quotes from licensed Tampa contractors. Compare prices, no obligation. We match Tampa Bay homeowners with vetted local roofers for free.",
  keywords: "free roof quotes Tampa, Tampa roofing quotes, compare roofing contractors Tampa, roof estimate Tampa FL",
  openGraph: {
    title: "Tampa Roof Quotes — Free Quote Matching for Tampa Homeowners",
    description: "Compare free quotes from licensed Tampa roofing contractors. No obligation, no cost to homeowners.",
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
