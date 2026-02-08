import type { Metadata } from 'next'
import '@/styles/globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from '@/components/layout/Navigation/Navigation'
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
			<head>
				{/* Preload LCP hero background image */}
				<link
					rel="preload"
					href="/images/sections/hero/bg.png"
					as="image"
					type="image/png"
				/>
			</head>
			<body>
				<Navigation />
				{children}
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	)
}
