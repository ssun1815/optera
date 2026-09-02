import type { Metadata } from "next";
import { Manrope, Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Optrace — Commercial Opportunity Intelligence for DFW HVAC Contractors",
  description:
    "Find commercial and industrial project opportunities in Dallas–Fort Worth before your competitors do.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${inter.variable} ${jetbrainsMono.variable} ${newsreader.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}