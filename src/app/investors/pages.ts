import { HeroSection } from '@/sections/Investors/HeroSection/HeroSection'


import { FooterSection } from '@/sections/FooterSection/FooterSection'
import { PrinciplesSection } from '@/sections/Investors/PrinciplesSection/PrinciplesSection'
import { TractionSection } from '@/sections/Investors/TractionSection/TractionSection'


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
        path: '#footer',
        component: FooterSection,
    },

]