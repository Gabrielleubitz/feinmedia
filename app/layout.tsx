import React from "react"
import type { Metadata, Viewport } from 'next'
import { Outfit, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit', weight: ['400', '500', '600', '700', '800'] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: '--font-dm-sans' });

export const metadata: Metadata = {
  title: 'Fein Media Productions | Powerful Videos That Tell Your Story',
  description: 'FeinMediaProductions delivers high-energy social media videos, event coverage, and scroll-stopping short-form reels designed to help brands stand out in the digital noise.',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
  appleWebApp: {
    title: 'Fein Media',
  },
}

export const viewport: Viewport = {
  themeColor: '#050507',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${outfit.variable} ${dmSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
