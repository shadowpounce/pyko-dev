import { Hero } from "./sections/Hero/Hero";


/**
 * Конфигурация секций для страницы "О нас".
 */
export const aboutSections = [
	{
		path: '#hero',
		component: Hero,
	},
	{
		path: '#filler',
		component: Filler
	}
]

export default function Filler() {
	return <div style={{ height: '100vh' }} />
}