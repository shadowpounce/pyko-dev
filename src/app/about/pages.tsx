import { Hero } from "./sections/Hero/Hero";
import { Manifesto } from "./sections/Manifesto/Manifesto";


export const aboutSections = [
	{
		path: '#hero',
		component: Hero,
	},
	{
		path: '#filler',
		component: Filler
	},
	{
		path: '#manifesto',
		component: Manifesto
	}
]

export default function Filler() {
	return <div style={{ height: '100vh' }} />
}