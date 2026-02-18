import { HeroSection } from '@/sections/Investors/HeroSection/HeroSection'


import { FooterSection } from '@/sections/FooterSection/FooterSection'
import { PrinciplesSection } from '@/sections/Investors/PrinciplesSection/PrinciplesSection'


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
        path: '#footer',
        component: FooterSection,
    },

]