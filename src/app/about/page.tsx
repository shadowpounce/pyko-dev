import { FullPageProvider } from "@/components/layout/FullPageProvider";
import { aboutSections } from "./pages";

/**
 * Страница "О нас".
 * Использует FullPage.js для прокрутки секций.
 */
export default function AboutPage() {
	return <FullPageProvider>{
		aboutSections.map((section, index) => (
			<section.component key={section.path} sectionIndex={index} />
		))
	}</FullPageProvider>
}