import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BeforeISign.be - Contract Analyse voor Muzikanten',
  description: 'Professionele muziekcontract analyse powered by AI. Belgische muziekindustrie standaarden, PlayRight, SABAM.',
  keywords: 'contract analyse, muzikanten, PlayRight, SABAM, België, muziekcontract, naburige rechten',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
