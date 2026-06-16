import { HeroSection } from "@/components/hero-section"
import { ManifestoSection } from "@/components/manifesto-section"
import { CapabilitiesSection } from "@/components/capabilities-section"
import { FounderSection } from "@/components/founder-section"
import { SignalsSection } from "@/components/signals-section"
import { WorkSection } from "@/components/work-section"
import { ColophonSection } from "@/components/colophon-section"
import { SideNav } from "@/components/side-nav"
import { KineticBackground } from "@/components/kinetic-bg"
import { ScrollLogo } from "@/components/scroll-logo"
import { LogoHeader } from "@/components/logo-header"

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <KineticBackground />
      <ScrollLogo />
      <SideNav />
      <LogoHeader />
      <div className="grid-bg fixed inset-0 opacity-[0.07]" aria-hidden="true" />

      <div className="relative z-10">
        {/* 1. Hero — fullscreen brand photo + split-flap PARSMONARCH */}
        <HeroSection />

        {/* 2. Manifesto — pure typographic statement of purpose */}
        <ManifestoSection />

        {/* 3. Doctrine — 4-statement editorial scroll */}
        <CapabilitiesSection />

        {/* 4. Founder / CEO — portrait right, bio left */}
        <FounderSection />

        {/* 5. Trust signals — editorial list */}
        <SignalsSection />

        {/* 6. Settlement Path — timeline with accent border */}
        <WorkSection />

        {/* 7. Contact / Colophon — begin a conversation */}
        <ColophonSection />
      </div>
    </main>
  )
}
