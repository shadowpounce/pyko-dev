import { HeroSection } from '@/sections/HeroSection'
import { AboutSection } from '@/sections/AboutSection'
import { PredictSection } from '@/sections/PredictSection'
import { OracleSection } from '@/sections/OracleSection'
import { TrackSection } from '@/sections/TrackSection'
import { EngineSection } from '@/sections/EngineSection'
import { PlatformSection } from '@/sections/PlatformSection'
import { WithYouSection } from '@/sections/WithYouSection/WithYouSection'
import { PlansSection } from '@/sections/PlansSections/PlansSection'
import { FooterSection } from '@/sections/FooterSection/FooterSection'

export const homeSections = [
    {
      path: '#hero',
      component: HeroSection,
    },
    {
      path: '#about',
      component: AboutSection,
    },
    {
      path: '#predict',
      component: PredictSection,
    },
  {
    path: '#oracle',
    component: OracleSection,
  },
  {
    path: '#track',
    component: TrackSection,
  },
  {
    path: '#engine',
    component: EngineSection,
  },
  {
    path: '#platform',
    component: PlatformSection,
  },
  {
    path: '#with-you',
    component: WithYouSection,
  },
  {
    path: '#plans',
    component: PlansSection,
  },
  {
    path: '#footer',
    component: FooterSection
  }
]