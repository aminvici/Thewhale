"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const capabilities = [
  {
    id: "01",
    title: "Private Settlement Rails",
    description:
      "Permissioned ledger infrastructure built to carry institutional-grade transaction finality. HyperLedger Fabric substrate with cryptographically enforced policy controls. No public mempool exposure.",
    image: "/brand/1.4.webp",
    tag: "Infrastructure Layer",
  },
  {
    id: "02",
    title: "Cross-Ledger Finality",
    description:
      "Deterministic bridge architecture enabling asset movement across XRP Ledger, Justitia DSiSc, and HyperLedger Fabric. Finality is guaranteed at the protocol layer — not approximated at application layer.",
    image: "/brand/IMG_6109.webp",
    tag: "Bridge Protocol",
  },
  {
    id: "03",
    title: "Institutional Governance",
    description:
      "Policy-driven access controls, multi-jurisdiction compliance frameworks, and cryptographic audit trails. Governance is sovereign to the institution — not outsourced to a DAO or committee.",
    image: "/brand/IMG_6110.webp",
    tag: "Governance Layer",
  },
]

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      const cards = cardsRef.current?.querySelectorAll("[data-cap-card]")
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Image parallax within each card
      const images = cardsRef.current?.querySelectorAll("[data-cap-img]")
      images?.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest("[data-cap-card]"),
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative py-32 md:py-48 pl-6 md:pl-32 pr-6 md:pr-16 overflow-hidden"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-20 flex items-end justify-between gap-8">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-accent/70">
            01 / Capabilities
          </span>
          <h2
            className="mt-4 font-[family-name:var(--font-bebas)] tracking-tight leading-none text-foreground"
            style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
          >
            WHAT WE PROVIDE
          </h2>
        </div>
        <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground leading-relaxed text-right">
          Three layers. No overlap. No gap. A complete settlement substrate for qualified
          institutions.
        </p>
      </div>

      {/* Capability cards — 3-column grid */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border/30">
        {capabilities.map((cap, i) => (
          <article
            key={cap.id}
            data-cap-card
            className={`group relative flex flex-col overflow-hidden ${
              i < capabilities.length - 1 ? "md:border-r border-b md:border-b-0 border-border/30" : ""
            }`}
          >
            {/* Image — top 55% of card */}
            <div className="relative overflow-hidden" style={{ paddingBottom: "62%" }}>
              <div data-cap-img className="absolute inset-[-10%]">
                <Image
                  src={cap.image}
                  alt={cap.title}
                  fill
                  unoptimized
                  className="object-cover object-center"
                  style={{ filter: "brightness(0.45) saturate(1.15)" }}
                />
              </div>
              {/* Overlay gradient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 40%, oklch(0.06 0.01 185) 100%)",
                }}
              />
              {/* ID label */}
              <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-accent/70 border border-accent/20 px-2 py-1">
                {cap.id}
              </div>
              {/* Tag */}
              <div className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/70 border border-border/40 px-2 py-1">
                {cap.tag}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6 md:p-8 bg-card/20">
              <h3
                className="font-[family-name:var(--font-bebas)] tracking-tight leading-none text-foreground group-hover:text-accent transition-colors duration-400"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
              >
                {cap.title}
              </h3>
              <p className="mt-4 font-mono text-[11px] text-muted-foreground leading-relaxed flex-1">
                {cap.description}
              </p>
              <div className="mt-6 h-[1px] w-8 bg-accent/40 group-hover:w-16 transition-all duration-500" />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
