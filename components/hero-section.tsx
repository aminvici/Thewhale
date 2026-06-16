"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { SplitFlapText, SplitFlapMuteToggle, SplitFlapAudioProvider } from "@/components/split-flap-text"
import { AnimatedNoise } from "@/components/animated-noise"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      // Parallax scroll — content rises as hero exits
      gsap.to(contentRef.current, {
        y: -120,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      })

      // Image darkens further on scroll
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0.85,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "60% top",
            scrub: 1,
          },
        })
      }

      // Entrance animations — stagger content elements
      const els = contentRef.current?.querySelectorAll("[data-hero-el]")
      if (els && els.length > 0) {
        gsap.fromTo(
          els,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.18,
            ease: "power3.out",
            delay: 0.3,
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen flex items-center overflow-hidden"
    >
      <AnimatedNoise opacity={0.025} />

      {/* Full-bleed hero background — highest-quality brand photo */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/brand/IMG_6109.webp"
          alt="Parsmonarch infrastructure"
          fill
          priority
          unoptimized
          className="object-cover object-center"
          style={{ filter: "brightness(0.62) saturate(1.15)" }}
        />

        {/* Subtle emerald tint */}
        <div
          ref={overlayRef}
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 55% 38%, rgba(10,200,140,0.10) 0%, transparent 65%)",
            opacity: 0.65,
          }}
        />

        {/* TOP seal — hard edge eliminated */}
        <div
          className="absolute inset-x-0 top-0 h-44 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, oklch(0.06 0.01 185) 0%, transparent 100%)" }}
        />

        {/* BOTTOM seal — hard edge eliminated */}
        <div
          className="absolute inset-x-0 bottom-0 h-52 pointer-events-none"
          style={{ background: "linear-gradient(to top, oklch(0.06 0.01 185) 0%, transparent 100%)" }}
        />

        {/* Side darkening */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, oklch(0.06 0.01 185 / 0.65) 0%, transparent 20%, transparent 80%, oklch(0.06 0.01 185 / 0.65) 100%)",
          }}
        />
      </div>

      {/* Left vertical rule + label */}
      <div className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-10">
        <div className="h-24 w-[1px] bg-border/40" />
        <span
          className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground"
          style={{ writingMode: "vertical-rl", letterSpacing: "0.35em" }}
        >
          PARSMONARCH / 2026
        </span>
        <div className="h-24 w-[1px] bg-border/40" />
      </div>

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col pl-16 md:pl-32 pr-6 md:pr-16 w-full"
      >
        {/* Kicker label */}
        <div data-hero-el className="mb-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.38em] text-accent/80">
            Private Sovereign Infrastructure
          </span>
          <div className="mt-2 h-[1px] w-12 bg-accent/40" />
        </div>

        {/* Split-flap headline */}
        <div data-hero-el>
          <SplitFlapAudioProvider>
            <div className="relative">
              <SplitFlapText text="PARSMONARCH" speed={75} />
              <div className="mt-3">
                <SplitFlapMuteToggle />
              </div>
            </div>
          </SplitFlapAudioProvider>
        </div>

        {/* Subtitle */}
        <h2
          data-hero-el
          className="mt-4 font-[family-name:var(--font-bebas)] text-muted-foreground/50 tracking-wide"
          style={{ fontSize: "clamp(1.1rem, 3.2vw, 2.4rem)" }}
        >
          Sovereign Data Infrastructure
        </h2>

        {/* Manifesto line */}
        <p
          data-hero-el
          className="mt-10 max-w-sm font-mono text-sm text-muted-foreground leading-relaxed"
        >
          Where empires settle their data. Infrastructure for those who cannot settle for
          less. By invitation only.
        </p>

        {/* CTAs */}
        <div data-hero-el className="mt-12 flex items-center gap-8">
          <a
            href="#colophon"
            className="group inline-flex items-center gap-3 border border-foreground/25 px-7 py-3.5 font-mono text-[11px] uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-300"
          >
            <ScrambleTextOnHover text="Request Audience" as="span" duration={0.55} />
            <span className="font-mono text-accent group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </a>
          <a
            href="#work"
            className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Settlement Path
          </a>
        </div>
      </div>

      {/* Bottom-right tag */}
      <div className="absolute bottom-8 right-8 md:bottom-10 md:right-10 z-10">
        <div className="border border-border/40 px-5 py-3 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Co-Founded by Sami Masudnia
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="h-8 w-[1px] bg-border/30 animate-pulse" />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
        </span>
      </div>
    </section>
  )
}
