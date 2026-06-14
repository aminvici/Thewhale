import { HeroSection } from "@/components/hero-section"
import { SignalsSection } from "@/components/signals-section"
import { WorkSection } from "@/components/work-section"
import { PrinciplesSection } from "@/components/principles-section"
import { ColophonSection } from "@/components/colophon-section"
import { SideNav } from "@/components/side-nav"
import { KineticBackground } from "@/components/kinetic-bg"
import { ScrollLogo } from "@/components/scroll-logo"
import { WhaleHero } from "@/components/whale-hero"
import { LogoHeader } from "@/components/logo-header"

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <KineticBackground />
      <ScrollLogo />
      <SideNav />
      <LogoHeader />
      <div className="grid-bg fixed inset-0 opacity-20" aria-hidden="true" />

      <div className="relative z-10">
        <div className="relative min-h-screen">
          <WhaleHero />
          <HeroSection />
        </div>
        <SignalsSection />
        <WorkSection />
        <PrinciplesSection />
        <ColophonSection />
      </div>
    </main>
  )
}
