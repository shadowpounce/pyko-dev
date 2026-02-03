import type { Metadata } from "next";
import { Inter, Instrument_Serif, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const interDisplay = Inter({
  subsets: ["latin"],
  weight: "300",
  display: "swap",
  variable: "--font-inter-display",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const uxum = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-uxum",
});

export const metadata: Metadata = {
  title: "Next.js App",
  description: "Next.js application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interDisplay.variable} ${instrumentSerif.variable} ${uxum.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
