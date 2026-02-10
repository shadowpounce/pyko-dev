import { HeroSection } from '@/sections/Careers/HeroSection/HeroSection'
import { WhyPykoSection } from '@/sections/Careers/WhyPykoSection/WhyPykoSection'
import { BenefitsSection } from '@/sections/Careers/BenefitsSection/BenefitsSection'
import Filler from '../about/pages'


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
        path: '#empty',
        component: Filler,
    }

]