import { FooterSection } from "@/sections/FooterSection";
import { Hero } from "./sections/Hero/Hero";
import path from "path";
import { Principles } from "./sections/Principles/Principles";
import { LiveStatus } from "./sections/LiveStatus/LiveStatus";
import { TrustCompliance } from "./sections/TrustCompliance/TrustCompliance";
import { DataGovernance } from "./sections/DataGovernance/DataGovernance";
import { ThirdPartyServices } from "./sections/ThirdPartyServices/ThirdPartyServices";


/**
 * Конфигурация секций для страницы "Transparency".
 */
export const transparencySections = [
	// {
	// 	path: '#hero',
	// 	component: Hero
	// },
	// {
	// 	path: '#principles',
	// 	component: Principles
	// },
	// {
	// 	path: '#live-status',
	// 	component: LiveStatus
	// },
	// {
	// 	path: '#trust-compliance',
	// 	component: TrustCompliance
	// },
	// {
	// 	path: '#data-governance',
	// 	component: DataGovernance
	// },
	{
		path: '#third-party-services',
		component: ThirdPartyServices
	},
	{
		path: '#footer',
		component: FooterSection
	}
]