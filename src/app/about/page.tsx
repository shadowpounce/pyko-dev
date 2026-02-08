import { FullPageProvider } from "@/components/layout/FullPageProvider";
import { aboutSections } from "./pages";

export default function AboutPage({ sectionIndex }: { sectionIndex: number }) {
	return <FullPageProvider>{
		aboutSections.map((section, index) => (
			<section.component key={section.path} sectionIndex={index} />
		))
	}</FullPageProvider>
}