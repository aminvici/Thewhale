"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const settlementFlow = [
  {
    phase: "01",
    title: "Institutional Qualification",
    description:
      "Mandate, jurisdiction, and governance profile are evaluated before technical onboarding begins. We assess permanence intent, compliance posture, and operational maturity.",
  },
  {
    phase: "02",
    title: "Fabric Domain Entry",
    description:
      "Permissioned records are established in HyperLedger Fabric under institution-specific policy controls. Chaincode is deployed under private channel governance.",
  },
  {
    phase: "03",
    title: "Bridge Authorization",
    description:
      "Cross-ledger movement is approved through deterministic bridge rules and cryptographic verification. No probabilistic finality. No rollback risk.",
  },
  {
    phase: "04",
    title: "XRPL Final Settlement",
    description:
      "State transitions settle to XRP Ledger with timestamped finality and immutable audit trace. Settlement latency: sub-4 seconds. Irrevocability: absolute.",
  },
  {
    phase: "05",
    title: "Policy Continuity",
    description:
      "Operational governance, retention, and compliance controls remain continuously enforced post-settlement. Infrastructure does not expire between transactions.",
  },
]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Animated left border line grows down
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.8,
            ease: "power2.inOut",
            transformOrigin: "top",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      const steps = timelineRef.current?.querySelectorAll("[data-step]")
      if (steps && steps.length > 0) {
        gsap.fromTo(
          steps,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-32 md:py-48 pl-6 md:pl-32 pr-6 md:pr-16 overflow-hidden border-t border-border/20"
    >
      {/* Atmospheric bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/brand/IMG_6111.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          opacity: 0.18,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.06 0.01 185) 0%, transparent 25%, transparent 75%, oklch(0.06 0.01 185) 100%)",
        }}
      />

      {/* Section header */}
      <div ref={headerRef} className="relative z-10 mb-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] w-8 bg-accent/60" />
          <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-accent/70">
            04 / Protocol
          </span>
        </div>
        <div className="flex items-end justify-between gap-8">
          <h2
            className="font-[family-name:var(--font-bebas)] tracking-tight leading-none text-foreground"
            style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
          >
            SETTLEMENT
            <br />
            <span className="text-accent/80">PATH</span>
          </h2>
          <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground leading-relaxed text-right">
            HyperLedger Fabric to XRPL. Five phases. Zero approximations. Settlement
            certainty from entry to finality.
          </p>
        </div>
      </div>

      {/* Timeline with left accent border */}
      <div className="relative z-10 flex gap-8 md:gap-12">
        {/* Left accent line — grows on scroll */}
        <div className="relative flex flex-col items-center shrink-0 w-[1px] ml-2 md:ml-4">
          <div
            ref={lineRef}
            className="w-[1px] h-full bg-gradient-to-b from-accent via-accent/50 to-transparent absolute top-0"
          />
        </div>

        {/* Steps */}
        <div ref={timelineRef} className="flex-1 space-y-0">
          {settlementFlow.map((step, index) => (
            <div
              key={step.phase}
              data-step
              className={`group relative grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-8 py-8 md:py-10 ${
                index < settlementFlow.length - 1 ? "border-b border-border/20" : ""
              }`}
            >
              {/* Phase marker */}
              <div className="flex items-start gap-3 md:flex-col md:gap-1">
                {/* Dot on the timeline line */}
                <div
                  className="absolute left-[-22px] md:left-[-26px] top-10 w-2 h-2 border border-accent/60 bg-background group-hover:bg-accent/30 transition-colors duration-300"
                  style={{ marginTop: "2px" }}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/70">
                  Phase {step.phase}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3
                  className="font-[family-name:var(--font-bebas)] tracking-tight leading-none text-foreground group-hover:text-accent transition-colors duration-400 mb-3"
                  style={{ fontSize: "clamp(1.8rem, 3.2vw, 3rem)" }}
                >
                  {step.title}
                </h3>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
