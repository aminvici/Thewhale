"use client"

import { useRef, useEffect } from "react"
import { HighlightText } from "@/components/highlight-text"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const principlesRef = useRef<HTMLDivElement>(null)

  const principles = [
    {
      number: "01",
      titleParts: [
        { text: "FINALITY", highlight: true },
        { text: " IN SIMPLICITY", highlight: false },
      ],
      description: "One unified platform. No integration spreadsheets, no reconciliation delays. Your data settles once, across all systems.",
      align: "left",
    },
    {
      number: "02",
      titleParts: [
        { text: "INTELLIGENCE ", highlight: false },
        { text: "AT SPEED", highlight: true },
      ],
      description: "AI-driven insights that execute. From raw signals to governed decisions in real time. No human bottleneck.",
      align: "right",
    },
    {
      number: "03",
      titleParts: [
        { text: "SOVEREIGN ", highlight: false },
        { text: "CONTROL", highlight: true },
      ],
      description: "Your data, your rules, your compliance. Cryptographic certainty meets institutional governance. SOC 2, FedRAMP-ready, built for permanence.",
      align: "left",
    },
    {
      number: "04",
      titleParts: [
        { text: "BUILT TO ", highlight: false },
        { text: "OUTLAST", highlight: true },
      ],
      description: "Infrastructure designed for decades, not quarters. From initial pipeline to petabyte scale. No technical debt.",
      align: "right",
    },
  ]

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !principlesRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in
      gsap.from(headerRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })

      // Each principle slides in from its aligned side
      const articles = principlesRef.current?.querySelectorAll("article")
      articles?.forEach((article, index) => {
        const isRight = principles[index].align === "right"
        gsap.from(article, {
          x: isRight ? 80 : -80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: article,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="principles" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 overflow-hidden">
      {/* Immersive standard background */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/exp/standard.png"
          alt="The Standard background"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)) 100%)",
          }}
        />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background/10 via-transparent to-background" />

      {/* Section header */}
      <div ref={headerRef} className="relative z-10 mb-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">03 / The Standard</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">HELD TO A DIFFERENT MEASURE</h2>
      </div>

      {/* Staggered principles */}
      <div ref={principlesRef} className="relative z-10 space-y-24 md:space-y-32">
        {principles.map((principle, index) => (
          <article
            key={index}
            className={`flex flex-col ${
              principle.align === "right" ? "items-end text-right" : "items-start text-left"
            }`}
          >
            {/* Annotation label */}
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              {principle.number} / {principle.titleParts[0].text.split(" ")[0]}
            </span>

            <h3 className="font-[var(--font-bebas)] text-4xl md:text-6xl lg:text-8xl tracking-tight leading-none">
              {principle.titleParts.map((part, i) =>
                part.highlight ? (
                  <HighlightText key={i} parallaxSpeed={0.6}>
                    {part.text}
                  </HighlightText>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
            </h3>

            {/* Description */}
            <p className="mt-6 max-w-md font-mono text-sm text-muted-foreground leading-relaxed">
              {principle.description}
            </p>

            {/* Decorative line */}
            <div className={`mt-8 h-[1px] bg-border w-24 md:w-48 ${principle.align === "right" ? "mr-0" : "ml-0"}`} />
          </article>
        ))}
      </div>
    </section>
  )
}
