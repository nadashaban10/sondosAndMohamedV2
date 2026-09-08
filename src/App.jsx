import InviteGate from './components/InviteGate'
import LanguageSwitcher from './components/LanguageSwitcher'
import MusicControl from './components/MusicControl'
import SectionNav from './components/SectionNav'
import Hero from './components/Hero'
import VenueSection from './components/VenueSection'
import RSVP from './components/RSVP'
import Footer from './components/Footer'
import { useRef } from 'react'

export default function App() {
  const scrollRoot = useRef(null)

  const scrollToHero = () => {
    requestAnimationFrame(() => {
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <div className="relative min-h-dvh text-ink">
      <div className="paper-bg pointer-events-none fixed inset-0 z-0" aria-hidden />
      <div className="relative z-10 min-h-dvh">
        <LanguageSwitcher />
        <MusicControl />
        <InviteGate onOpen={scrollToHero} />
        <div ref={scrollRoot} className="snap-root">
          <SectionNav rootRef={scrollRoot} />
          <Hero />
          <VenueSection />
          <RSVP />
          <div className="[scroll-snap-align:none]">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
