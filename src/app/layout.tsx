import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'XYRAS - Ditch the résumé',
  description:
    'Build professional credibility that breathes with YOU. Next-gen professional network that replaces a résumé with a real-time professional score.',
  keywords:
    'professional network, career, resume alternative, professional score, credibility',
  authors: [{ name: 'XYRAS Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#392780',
  openGraph: {
    title: 'XYRAS - Ditch the résumé',
    description: 'Build professional credibility that breathes with YOU.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XYRAS - Ditch the résumé',
    description: 'Build professional credibility that breathes with YOU.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

