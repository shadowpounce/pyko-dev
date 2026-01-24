import type { Metadata } from 'next'
import '@/styles/globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
export const metadata: Metadata = {
  title: 'Pyko',
  description: 'For the students who refuse to be average.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
