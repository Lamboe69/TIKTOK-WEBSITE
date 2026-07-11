import Hero from '../components/sections/Hero'
import StatBar from '../components/StatBar'
import KMLovers from '../components/sections/KMLovers'
import DailyQuoteValues from '../components/sections/DailyQuoteValues'
import BattleTypes from '../components/sections/BattleTypes'
import TimezoneStrip from '../components/sections/TimezoneStrip'
import Champions from '../components/sections/Champions'
import AdvertiseSection from '../components/sections/AdvertiseSection'
import WinnersVisit from '../components/sections/WinnersVisit'
import GiveBack from '../components/sections/GiveBack'
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
      <Champions />
      <SectionDivider />
      <AdvertiseSection />
      <SectionDivider />
      <WinnersVisit />
      <SectionDivider />
      <GiveBack />
      <CTA />
    </main>
  )
}
