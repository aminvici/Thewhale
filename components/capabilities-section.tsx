"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const doctrines = [
  {
    num: "01",
    heading: "ACCESS IS\nEARNED.",
    body: "No public onboarding. No self-service funnel. Engagement begins with institutional qualification — mandate, jurisdiction, and governance profile evaluated before any technical discussion.",
    cta: "Request Qualification",
  },
  {
    num: "02",
    heading: "SETTLEMENT\nIS FINAL.",
    body: "We do not approximate finality. Every state transition carries cryptographic certainty at the protocol layer. No probabilistic confirmation. No rollback risk. No appeals process.",
    cta: "Explore Settlement Architecture",
  },
  {
    num: "03",
    heading: "POLICY IS\nSOVEREIGN.",
    body: "Your governance framework, enforced at the infrastructure layer. Not outsourced to a DAO, not shared with other institutions, not subject to external committee override.",
    cta: "Understand Governance Layer",
  },
  {
    num: "04",
    heading: "BUILT FOR\nCENTURIES.",
    body: "Decade-scale continuity. Operational restraint. We do not pivot with market cycles. Infrastructure that outlasts the institutions it serves is not a feature — it is the entire premise.",
    cta: "Begin A Conversation",
  },
]

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const statementsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const items = statementsRef.current?.querySelectorAll("[data-doctrine]")
      items?.forEach((item) => {
        const num = item.querySelector("[data-doc-num]")
        const heading = item.querySelector("[data-doc-heading]")
        const body = item.querySelector("[data-doc-body]")
        const line = item.querySelector("[data-doc-line]")
        const cta = item.querySelector("[data-doc-cta]")

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        })

        tl.fromTo(num, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
          .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, "-=0.3")
          .fromTo(heading, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.4")
          .fromTo(body, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5")
          .fromTo(cta, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4")
      })

      // Background image subtle parallax
      const bgImg = sectionRef.current?.querySelector("[data-bg-img]")
      if (bgImg) {
        gsap.fromTo(
          bgImg,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
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
      id="capabilities"
      className="page-section border-t border-border/20"
    >
      {/* Full-bleed background */}
      <div className="absolute inset-0 pointer-events-none">
        <div data-bg-img className="absolute inset-0">
          <Image
            src="/brand/1.1.webp"
            alt=""
            fill
            unoptimized
            className="object-cover object-center"
            style={{ filter: "brightness(0.58) saturate(1.2)" }}
          />
        </div>
        <div className="absolute inset-x-0 top-0 h-44 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, oklch(0.06 0.01 185) 0%, transparent 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-44 pointer-events-none"
          style={{ background: "linear-gradient(to top, oklch(0.06 0.01 185) 0%, transparent 100%)" }} />
        <div className="absolute inset-0" style={{ background: "oklch(0.06 0.01 185 / 0.50)" }} />
      </div>

      {/* Section label */}
      <div className="relative z-10 pt-20 md:pt-28 pl-6 md:pl-32 pr-6 md:pr-16">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-8 bg-accent/60" />
          <span className="font-mono text-xs uppercase tracking-[0.36em] text-accent/80">
            01 / Doctrine
          </span>
        </div>
      </div>

      {/* Doctrine statements */}
      <div ref={statementsRef} className="relative z-10 pb-20 md:pb-28">
        {doctrines.map((doc, i) => (
          <div
            key={doc.num}
            data-doctrine
            className={`group pl-6 md:pl-32 pr-6 md:pr-16 py-16 md:py-20 ${
              i < doctrines.length - 1 ? "border-b border-border/20" : ""
            }`}
          >
            {/* Number + rule */}
            <div className="flex items-center gap-5 mb-8">
              <span
                data-doc-num
                className="font-mono text-xs uppercase tracking-[0.4em] text-accent"
              >
                {doc.num}
              </span>
              <div
                data-doc-line
                className="flex-1 max-w-[80px] h-[1px] bg-accent/40 origin-left"
              />
            </div>

            {/* Heading */}
            <h2
              data-doc-heading
              className="font-[family-name:var(--font-bebas)] tracking-tight leading-[0.92] text-foreground group-hover:text-accent transition-colors duration-500"
              style={{ fontSize: "clamp(3.5rem, 9vw, 9.5rem)", whiteSpace: "pre-line" }}
            >
              {doc.heading}
            </h2>

            {/* Body + CTA row */}
            <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-5xl">
              <p
                data-doc-body
                className="font-mono text-sm text-muted-foreground leading-relaxed max-w-lg"
              >
                {doc.body}
              </p>

              <a
                data-doc-cta
                href="#colophon"
                className="group/cta shrink-0 inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground/70 hover:border-accent hover:text-accent transition-all duration-300"
              >
                {doc.cta}
                <span className="group-hover/cta:translate-x-1 transition-transform duration-300 text-accent">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
