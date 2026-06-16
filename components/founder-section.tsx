"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (textRef.current) {
        const els = textRef.current.querySelectorAll("[data-founder-el]")
        gsap.fromTo(
          els,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Quote reveal — line by line
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: quoteRef.current,
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
      ref={sectionRef}
      id="founder"
      className="page-section flex flex-col justify-center border-t border-border/20"
    >
      {/* Full-bleed background — brand photo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src="/brand/1.4.webp"
          alt=""
          fill
          unoptimized
          className="object-cover object-right"
          style={{ filter: "brightness(0.6) saturate(1.2)", opacity: 0.75 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.06 0.01 185) 0%, oklch(0.06 0.01 185 / 0.55) 45%, transparent 75%), linear-gradient(to bottom, oklch(0.06 0.01 185) 0%, transparent 15%, transparent 85%, oklch(0.06 0.01 185) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-stretch gap-0">
        {/* LEFT — text content */}
        <div
          ref={textRef}
          className="flex flex-col justify-center pl-6 md:pl-32 pr-6 md:pr-16 py-8 md:py-0 flex-1"
        >
          <div data-founder-el className="mb-10 flex items-center gap-4">
            <div className="h-[1px] w-8 bg-accent/60" />
            <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-accent/70">
              02 / Founder
            </span>
          </div>

          <h2
            data-founder-el
            className="font-[family-name:var(--font-bebas)] tracking-tight leading-none text-foreground"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)" }}
          >
            Founded by
            <br />
            <span className="text-accent">Sami Masudnia</span>
          </h2>

          <p
            ref={quoteRef}
            className="mt-8 max-w-lg font-[family-name:var(--font-bebas)] text-muted-foreground/60 leading-snug"
            style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
          >
            "We did not build for this cycle, nor the next. We laid the floor that sovereign
            institutions will still be standing on a century from now."
          </p>

          <div data-founder-el className="mt-10 space-y-1">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground">
              Sami Masudnia
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
              Co-Founder &amp; CEO, PARSMONARCH
            </p>
          </div>

          {/* Sponsor line */}
          <div data-founder-el className="mt-8 border-t border-border/20 pt-6">
            <p className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-[0.28em]">
              Sponsored by{" "}
              <span className="text-foreground/80 font-medium">Mo. Dehghan</span>
            </p>
          </div>
        </div>

        {/* RIGHT — CEO portrait */}
        <div
          ref={imageRef}
          className="relative md:w-[42%] shrink-0"
          style={{ minHeight: "520px" }}
        >
          <Image
            src="/brand/CEO.webp"
            alt="Sami Masudnia — Co-Founder & CEO, Parsmonarch"
            fill
            unoptimized
            className="object-cover object-center"
            style={{ filter: "brightness(0.88) saturate(1.1)" }}
          />

          {/* Gradient blend left edge */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, oklch(0.06 0.01 185) 0%, transparent 30%, transparent 80%, oklch(0.06 0.01 185) 100%)",
            }}
          />

          {/* Bottom label overlay */}
          <div className="absolute bottom-8 left-8 border border-border/40 bg-background/60 backdrop-blur-sm px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/80">
              Co-Founder &amp; CEO
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
