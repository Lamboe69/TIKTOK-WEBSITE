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

export default function Home() {
  return (
    <main>
      <Hero />
      <StatBar />
      <HowItWorks />
      <BattleTypes />
      <TimezoneStrip />
      <BrandIdentity />
      <Champions />
      <CommunityRecognition />
      <Testimonials />
      <MasterclassTeaser />
      <CTA />
    </main>
  )
}
