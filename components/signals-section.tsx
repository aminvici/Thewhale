"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const signals = [
  {
    date: "01",
    title: "Private Blockchain Infrastructure",
    note: "Parsmonarch operates sovereign settlement rails for qualified institutions only.",
  },
  {
    date: "02",
    title: "By Appointment Only",
    note: "Access is extended by invitation. No public onboarding, no self-service funnel.",
  },
  {
    date: "03",
    title: "Not A Consumer Product",
    note: "No free plan, no tokenized hype, no public wallet behavior. Institutional infrastructure only.",
  },
  {
    date: "04",
    title: "Permanence Over Velocity",
    note: "Built for decade-scale continuity, governed policy, and operational restraint.",
  },
  {
    date: "05",
    title: "Qualified Institutional Enquiries",
    note: "Engagement begins through private review and mandate alignment.",
  },
]

export function SignalsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const rowsRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !cursorRef.current) return

    const section = sectionRef.current
    const cursor = cursorRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.5,
        ease: "power3.out",
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    section.addEventListener("mousemove", handleMouseMove)
    section.addEventListener("mouseenter", handleMouseEnter)
    section.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      section.removeEventListener("mousemove", handleMouseMove)
      section.removeEventListener("mouseenter", handleMouseEnter)
      section.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !rowsRef.current) return

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
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const rows = rowsRef.current?.querySelectorAll("article")
      if (rows) {
        gsap.fromTo(
          rows,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rowsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="signals" ref={sectionRef} className="relative min-h-screen py-24 md:py-32 pl-6 md:pl-28 overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/exp/theme-02.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          opacity: 0.22,
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-background/40 to-background" />

      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50",
          "w-12 h-12 rounded-full border-2 border-accent bg-accent",
          "transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Section header */}
      <div ref={headerRef} className="relative z-10 mb-16 pr-6 md:pr-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">01 / Manifesto</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">BY APPOINTMENT ONLY</h2>
        <p className="mt-4 max-w-2xl font-mono text-xs md:text-sm text-muted-foreground leading-relaxed">
          Not a product. Not a platform. Infrastructure for institutions where settlement certainty is non-negotiable.
        </p>
      </div>

      <div ref={rowsRef} className="relative z-10 pr-6 md:pr-12 border-t border-border/30">
        {signals.map((signal) => (
          <SignalCard key={signal.date} signal={signal} />
        ))}
      </div>
    </section>
  )
}

function SignalCard({
  signal,
}: {
  signal: { date: string; title: string; note: string }
}) {
  return (
    <article className="grid grid-cols-12 items-start gap-4 md:gap-8 py-6 md:py-8 border-b border-border/30">
      <div className="col-span-2 md:col-span-1 font-mono text-[10px] uppercase tracking-[0.3em] text-accent/90 pt-1">
        {signal.date}
      </div>

      <div className="col-span-10 md:col-span-4">
        <h3 className="font-[var(--font-bebas)] text-3xl md:text-4xl tracking-tight leading-none">{signal.title}</h3>
      </div>

      <p className="col-span-12 md:col-span-7 font-mono text-xs md:text-sm text-muted-foreground leading-relaxed md:pt-1">
        {signal.note}
      </p>
    </article>
  )
}
