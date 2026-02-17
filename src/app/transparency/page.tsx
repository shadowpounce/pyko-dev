import { FullPageProvider } from "@/components/layout/FullPageProvider";
import { transparencySections } from "./pages";

/**
 * Страница "Transparency".
 * Использует FullPage.js для прокрутки секций.
 */
export default function TransparencyPage() {
	return <FullPageProvider>{
		transparencySections.map((section, index) => (
			<section.component key={section.path} sectionIndex={index} />
		))
	}</FullPageProvider>
}