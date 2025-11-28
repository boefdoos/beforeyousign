import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "beforeyousign.be - Contract Analyse voor Muzikanten",
  description: "Professionele muziekcontract analyse powered by AI. Belgische muziekindustrie standaarden, PlayRight, SABAM.",
  keywords: "contract analyse, muzikanten, PlayRight, SABAM, België, muziekcontract, naburige rechten, beforeyousign",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
