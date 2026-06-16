"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const signals = [
  {
    id: "01",
    title: "By Appointment Only",
    note: "Access is extended by invitation. No public onboarding, no self-service funnel. Engagement begins with a private mandate review.",
  },
  {
    id: "02",
    title: "Not A Consumer Product",
    note: "No free plan, no tokenized hype, no public wallet behavior. This is governed settlement infrastructure for qualified institutions.",
  },
  {
    id: "03",
    title: "Private Blockchain Infrastructure",
    note: "Parsmonarch operates sovereign settlement rails. No public chain exposure. No shared validators. Your institution, your policy domain.",
  },
  {
    id: "04",
    title: "Permanence Over Velocity",
    note: "Designed for decade-scale continuity. Governed policy. Operational restraint. We do not pivot. We deepen.",
  },
  {
    id: "05",
    title: "Qualified Institutional Enquiries",
    note: "Engagement begins through private review and mandate alignment. We evaluate jurisdiction, governance profile, and continuity requirements before any technical discussion.",
  },
]

export function SignalsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const rowsRef = useRef<HTMLDivElement>(null)

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
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      const rows = rowsRef.current?.querySelectorAll("article")
      if (rows && rows.length > 0) {
        gsap.fromTo(
          rows,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rowsRef.current,
              start: "top 88%",
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
      id="signals"
      ref={sectionRef}
      className="relative py-32 md:py-48 pl-6 md:pl-32 pr-6 md:pr-16 overflow-hidden border-t border-border/20"
    >
      {/* Atmospheric background from brand image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/brand/1.2.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          opacity: 0.22,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, oklch(0.06 0.01 185) 0%, transparent 30%, oklch(0.06 0.01 185) 100%)",
        }}
      />

      {/* Section header */}
      <div ref={headerRef} className="relative z-10 mb-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] w-8 bg-accent/60" />
          <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-accent/70">
            03 / The Position
          </span>
        </div>
        <h2
          className="font-[family-name:var(--font-bebas)] tracking-tight leading-none text-foreground"
          style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
        >
          BY APPOINTMENT
          <br />
          <span className="text-accent/80">ONLY</span>
        </h2>
        <p className="mt-6 max-w-xl font-mono text-xs text-muted-foreground leading-relaxed">
          Not a product. Not a platform. Infrastructure for institutions where
          settlement certainty is non-negotiable. What we are — and what we are not.
        </p>
      </div>

      {/* Signal list */}
      <div ref={rowsRef} className="relative z-10 border-t border-border/25">
        {signals.map((signal) => (
          <article
            key={signal.id}
            className="group grid grid-cols-12 items-start gap-4 md:gap-8 py-7 md:py-9 border-b border-border/20 hover:border-accent/30 transition-colors duration-400"
          >
            {/* Number */}
            <div className="col-span-2 md:col-span-1 font-mono text-[10px] uppercase tracking-[0.3em] text-accent/60 pt-1">
              {signal.id}
            </div>

            {/* Title */}
            <div className="col-span-10 md:col-span-4">
              <h3
                className="font-[family-name:var(--font-bebas)] tracking-tight leading-none text-foreground group-hover:text-accent transition-colors duration-400"
                style={{ fontSize: "clamp(1.6rem, 3.2vw, 3.2rem)" }}
              >
                {signal.title}
              </h3>
            </div>

            {/* Description */}
            <p className="col-span-12 md:col-span-7 font-mono text-sm text-muted-foreground leading-relaxed md:pt-1">
              {signal.note}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
