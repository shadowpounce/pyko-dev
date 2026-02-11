import { HeroSection } from '@/sections/Careers/HeroSection/HeroSection'
import { WhyPykoSection } from '@/sections/Careers/WhyPykoSection/WhyPykoSection'
import { BenefitsSection } from '@/sections/Careers/BenefitsSection/BenefitsSection'
import { RolesSection } from '@/sections/Careers/RolesSeciton/RolesSection'
import { HiringProcessSection } from '@/sections/Careers/HiringProcessSection/HiringProcessSection'
import Filler from '../about/pages'
import { HiringEmailSection } from '@/sections/Careers/HiringEmailSection/HiringEmailSection'
import { FooterSection } from '@/sections/FooterSection/FooterSection'


export const careersSections = [
    {
        path: '#hero',
        component: HeroSection,
    },
    {
        path: '#why-pyko',
        component: WhyPykoSection,
    },
    {
        path: '#benefits',
        component: BenefitsSection,
    },
    {
        path: '#roles',
        component: RolesSection,
    },
    {
        path: '#hiring-process',
        component: HiringProcessSection,
    },
    {
        path: '#hiring-email',
        component: HiringEmailSection,
    },

    {
        path: '#footer',
        component: FooterSection,
    },

]