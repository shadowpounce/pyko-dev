import { FooterSection } from "@/sections/FooterSection";
import { Hero } from "./sections/Hero/Hero";


/**
 * Конфигурация секций для страницы "Transparency".
 */
export const transparencySections = [
	{
		path: '#hero',
		component: Hero
	},
	{
		path: '#footer',
		component: FooterSection
	}
]