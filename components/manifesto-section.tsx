"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const lines = [
  "Where empires settle their data.",
  "Not a product. Not a platform.",
  "Cryptographic certainty at the speed of institutions.",
  "Built for a century. Not a cycle.",
]

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: labelRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      const lineEls = linesRef.current?.querySelectorAll("[data-line]")
      if (lineEls && lineEls.length > 0) {
        gsap.fromTo(
          lineEls,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: linesRef.current,
              start: "top 82%",
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
      id="manifesto"
      className="page-section flex flex-col justify-center pl-6 md:pl-32 pr-6 md:pr-20 py-24 md:py-32"
    >
      {/* Full-bleed background — moody brand photo */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/brand/1.2.webp"
          alt=""
          fill
          unoptimized
          className="bg-cover-fill"
          style={{ filter: "brightness(0.6) saturate(1.15)", opacity: 0.35, objectPosition: "50% 46%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.06 0.01 185) 0%, transparent 18%, transparent 82%, oklch(0.06 0.01 185) 100%)",
          }}
        />
      </div>


      {/* Section label */}
      <div ref={labelRef} className="mb-16 flex items-center gap-4">
        <div className="h-[1px] w-8 bg-accent/60" />
        <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-accent/70">
          00 / Position
        </span>
      </div>

      {/* Manifesto lines */}
      <div ref={linesRef} className="space-y-0">
        {lines.map((line, i) => (
          <div
            key={i}
            data-line
            className="group flex items-baseline gap-6 border-b border-border/15 py-6 md:py-8"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/40 w-8 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p
              className="font-[family-name:var(--font-bebas)] leading-none tracking-tight text-foreground/90 group-hover:text-accent transition-colors duration-500"
              style={{ fontSize: "clamp(2.4rem, 6.5vw, 6.5rem)" }}
            >
              {line}
            </p>
          </div>
        ))}
      </div>

    </section>
  )
}
