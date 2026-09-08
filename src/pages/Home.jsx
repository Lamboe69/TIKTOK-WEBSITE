import Hero from '../components/sections/Hero'
import HowItWorks from '../components/sections/HowItWorks'
import BattleTypes from '../components/sections/BattleTypes'
import KmLovers from '../components/sections/KmLovers'
import WinnersVisit from '../components/sections/WinnersVisit'
import CommunityRecognition from '../components/sections/CommunityRecognition'
import Testimonials from '../components/sections/Testimonials'
import MasterclassTeaser from '../components/sections/MasterclassTeaser'
import TimezoneStrip from '../components/sections/TimezoneStrip'
import UpcomingBattles from '../components/sections/UpcomingBattles'

export default function Home() {
  return (
    <main>
      <Hero />
      <UpcomingBattles />
      <HowItWorks />
      <BattleTypes />
      <KmLovers />
      <WinnersVisit />
      <CommunityRecognition />
      <MasterclassTeaser />
      <TimezoneStrip />
      <Testimonials />
    </main>
  )
}
