"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const settlementFlow = [
  {
    phase: "01",
    title: "Institutional Qualification",
    description: "Mandate, jurisdiction, and governance profile are evaluated before technical onboarding.",
  },
  {
    phase: "02",
    title: "Fabric Domain Entry",
    description: "Permissioned records are established in HyperLedger Fabric under institution-specific policy controls.",
  },
  {
    phase: "03",
    title: "Bridge Authorization",
    description: "Cross-ledger movement is approved through deterministic bridge rules and cryptographic verification.",
  },
  {
    phase: "04",
    title: "XRPL Final Settlement",
    description: "State transitions settle to XRPL with timestamped finality and immutable audit trace.",
  },
  {
    phase: "05",
    title: "Policy Continuity",
    description: "Operational governance, retention, and compliance controls remain continuously enforced post-settlement.",
  },
]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const flowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !flowRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in from left
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const rows = flowRef.current?.querySelectorAll("article")
      if (rows && rows.length > 0) {
        gsap.set(rows, { y: 40, opacity: 0 })
        gsap.to(rows, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: flowRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative min-h-screen py-24 md:py-32 pl-6 md:pl-28 pr-6 md:pr-12 overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/exp/theme-01.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
          opacity: 0.25,
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background/20 via-background/60 to-background" />

      {/* Section header */}
      <div ref={headerRef} className="relative z-10 mb-16 flex items-end justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">02 / Protocol Bridge</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">SETTLEMENT PATH</h2>
        </div>
        <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
          HyperLedger Fabric to XRPL, sequenced under institutional policy from entry to finality.
        </p>
      </div>

      <div ref={flowRef} className="relative z-10 border-t border-border/30">
        {settlementFlow.map((step, index) => (
          <article key={step.phase} className="grid grid-cols-12 gap-4 md:gap-8 py-6 md:py-8 border-b border-border/30">
            <div className="col-span-2 md:col-span-1 font-mono text-[10px] uppercase tracking-[0.3em] text-accent/90 pt-1">
              {step.phase}
            </div>

            <div className="col-span-10 md:col-span-4">
              <h3 className="font-[var(--font-bebas)] text-3xl md:text-4xl tracking-tight leading-none">{step.title}</h3>
            </div>

            <p className="col-span-12 md:col-span-7 font-mono text-xs md:text-sm text-muted-foreground leading-relaxed md:pt-1">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
