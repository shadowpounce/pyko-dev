import { HeroSection } from '@/sections/Careers/HeroSection/HeroSection'
import { WhyPykoSection } from '@/sections/Careers/WhyPykoSection/WhyPykoSection'
import { BenefitsSection } from '@/sections/Careers/BenefitsSection/BenefitsSection'
import { RolesSection } from '@/sections/Careers/RolesSeciton/RolesSection'
import Filler from '../about/pages'


export const careersSections = [
    // {
    //     path: '#hero',
    //     component: HeroSection,
    // },
    // {
    //     path: '#why-pyko',
    //     component: WhyPykoSection,
    // },
    // {
    //     path: '#benefits',
    //     component: BenefitsSection,
    // },
    {
        path: '#roles',
        component: RolesSection,
    },
    {
        path: '#empty',
        component: Filler,
    }

]