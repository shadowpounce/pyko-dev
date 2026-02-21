import { HeroSection } from '@/sections/Investors/HeroSection/HeroSection'


import { FooterSection } from '@/sections/FooterSection/FooterSection'
import { PrinciplesSection } from '@/sections/Investors/PrinciplesSection/PrinciplesSection'
import { TractionSection } from '@/sections/Investors/TractionSection/TractionSection'
import { MoatSection } from '@/sections/Investors/MoatSection/MoatSection'
import { BModelSection } from '@/sections/Investors/BModelSection/BModelSection'
import { RequestSection } from '@/sections/Investors/RequestSection/RequestSection'

export const investorsSections = [
    {
        path: '#hero',
        component: HeroSection,
    },
    {
        path: '#principles',
        component: PrinciplesSection,
    },
    {
        path: '#traction',
        component: TractionSection,
    },
    {
        path: '#moat',
        component: MoatSection,
    },
    {
        path: '#business-model',
        component: BModelSection,
    },
    {
        path: '#request',
        component: RequestSection,
    },
    {
        path: '#footer',
        component: FooterSection,
    },

]