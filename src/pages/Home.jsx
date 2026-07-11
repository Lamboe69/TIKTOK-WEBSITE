import Hero from '../components/sections/Hero'
import StatBar from '../components/StatBar'
import KMLovers from '../components/sections/KMLovers'
import DailyQuoteValues from '../components/sections/DailyQuoteValues'
import BattleTypes from '../components/sections/BattleTypes'
import BrandIdentity from '../components/sections/BrandIdentity'
import TimezoneStrip from '../components/sections/TimezoneStrip'
import Champions from '../components/sections/Champions'
import AdvertiseSection from '../components/sections/AdvertiseSection'
import WinnersVisit from '../components/sections/WinnersVisit'
import CommunityRecognition from '../components/sections/CommunityRecognition'
import Testimonials from '../components/sections/Testimonials'
import GiveBack from '../components/sections/GiveBack'
import BattleFamily from '../components/sections/BattleFamily'
import CTA from '../components/sections/CTA'
import SectionDivider from '../components/SectionDivider'

export default function Home() {
  return (
    <main>
      <Hero />
      <StatBar />
      <SectionDivider />
      <KMLovers />
      <SectionDivider />
      <DailyQuoteValues />
      <SectionDivider />
      <BattleTypes />
      <TimezoneStrip />
      <BrandIdentity />
      <SectionDivider />
      <Champions />
      <SectionDivider />
      <CommunityRecognition />
      <SectionDivider />
      <AdvertiseSection />
      <SectionDivider />
      <WinnersVisit />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <GiveBack />
      <SectionDivider />
      <BattleFamily />
      <CTA />
    </main>
  )
}
