import { FooterSection } from "@/sections/FooterSection";
import { Hero } from "./sections/Hero/Hero";
import path from "path";
import { Principles } from "./sections/Principles/Principles";


/**
 * Конфигурация секций для страницы "Transparency".
 */
export const transparencySections = [
	{
		path: '#hero',
		component: Hero
	},
	{
		path: '#principles',
		component: Principles
	},
	{
		path: '#footer',
		component: FooterSection
	}
]