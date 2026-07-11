import Hero from '../components/sections/Hero'
import StatBar from '../components/StatBar'
import HowItWorks from '../components/sections/HowItWorks'
import BattleTypes from '../components/sections/BattleTypes'
import BrandIdentity from '../components/sections/BrandIdentity'
import Champions from '../components/sections/Champions'
import CommunityRecognition from '../components/sections/CommunityRecognition'
import Testimonials from '../components/sections/Testimonials'
import MasterclassTeaser from '../components/sections/MasterclassTeaser'
import TimezoneStrip from '../components/sections/TimezoneStrip'
import CTA from '../components/sections/CTA'
import SectionDivider from '../components/SectionDivider'

export default function Home() {
  return (
    <main>
      <Hero />
      <StatBar />
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <BattleTypes />
      <TimezoneStrip />
      <BrandIdentity />
      <SectionDivider />
      <Champions />
      <SectionDivider />
      <CommunityRecognition />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <MasterclassTeaser />
      <SectionDivider />
      <CTA />
    </main>
  )
}
