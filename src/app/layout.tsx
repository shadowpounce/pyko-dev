import type { Metadata } from 'next'
import '@/styles/globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from '@/components/layout/Navigation/Navigation'
import { GsapInitializer } from '@/lib/GsapInitializer'
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
				{/* Предзагрузка фонового изображения для LCP (Hero секция) */}
				<link
					rel="preload"
					href="/images/sections/hero/bg.png"
					as="image"
					type="image/png"
				/>
			</head>
			<body>
				<GsapInitializer />
				<Navigation />
				{children}
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	)
}
