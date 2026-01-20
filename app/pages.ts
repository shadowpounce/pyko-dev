import { HeroSection } from '@/sections/HeroSection'
import { AboutSection } from '@/sections/AboutSection'
import { PredictSection } from '@/sections/PredictSection'
import { OracleSection } from '@/sections/OracleSection'
import { TrackSection } from '@/sections/TrackSection'
import { EngineSection } from '@/sections/EngineSection'
import { PlatformSection } from '@/sections/PlatformSection'

export const homeSections = [
  //   {
  //     path: '#hero',
  //     component: HeroSection,
  //   },
  //   {
  //     path: '#about',
  //     component: AboutSection,
  //   },
  //   {
  //     path: '#predict',
  //     component: PredictSection,
  //   },
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
  // {
  //   path: '#platform',
  //   component: PlatformSection,
  // },
]