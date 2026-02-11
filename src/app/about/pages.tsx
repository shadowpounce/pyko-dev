import { GetStarted } from "./sections/GetStarted/GetStarted";
import { Hero } from "./sections/Hero/Hero";
import { Manifesto } from "./sections/Manifesto/Manifesto";
import { OurStory } from "./sections/OurStory/OurStory";
import { Team } from "./sections/Team/Team";
import { Values } from "./sections/Values/Values";


/**
 * Конфигурация секций для страницы "О нас".
 */
export const aboutSections = [
	// {
	// 	path: '#hero',
	// 	component: Hero,
	// },
	// {
	// 	path: '#filler',
	// 	component: Filler
	// },
	// {
	// 	path: '#manifesto',
	// 	component: Manifesto
	// },
	// {
	// 	path: '#ourStory',
	// 	component: OurStory
	// },
	// {
	// 	path: '#filler',
	// 	component: Filler
	// },
	// {
	// 	path: '#team',
	// 	component: Team
	// },
	// {
	// 	path: '#values',
	// 	component: Values
	// },
	{
		path: '#getStarted',
		component: GetStarted
	}
]

export default function Filler() {
	return <div style={{ height: '100vh' }} />
}