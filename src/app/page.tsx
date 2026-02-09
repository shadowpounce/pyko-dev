import { FullPageProvider } from '@/components/layout/FullPageProvider'
import { homeSections } from './pages'

export default function Home() {

	return (
		<>
			<FullPageProvider>
				{homeSections.map((section, index) => (
					<section.component key={section.path} sectionIndex={index} />
				))}
			</FullPageProvider>
		</>
	)
}
