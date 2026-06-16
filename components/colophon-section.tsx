"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ColophonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const founderRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

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

      if (ctaRef.current) {
        const els = ctaRef.current.querySelectorAll("[data-cta-el]")
        gsap.fromTo(
          els,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      if (founderRef.current) {
        gsap.fromTo(
          founderRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: founderRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 95%",
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
      id="colophon"
      className="page-section flex flex-col justify-center pl-6 md:pl-32 pr-6 md:pr-16 py-24 md:py-28 border-t border-border/20"
    >
      {/* Background — brand image at very low opacity */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/brand/IMG_6111.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          opacity: 0.28,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.06 0.01 185) 0%, transparent 20%, transparent 80%, oklch(0.06 0.01 185) 100%)",
        }}
      />

      {/* Section header */}
      <div ref={headerRef} className="relative z-10 mb-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] w-8 bg-accent/60" />
          <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-accent/70">
            05 / Contact
          </span>
        </div>
        <h2
          className="font-[family-name:var(--font-bebas)] tracking-tight leading-none text-foreground"
          style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
        >
          BEGIN A
          <br />
          <span className="text-accent/80">CONVERSATION</span>
        </h2>
      </div>

      {/* CTA block */}
      <div ref={ctaRef} className="relative z-10 mb-24">
        <p data-cta-el className="max-w-xl font-mono text-base text-muted-foreground leading-relaxed mb-8">
          Parsmonarch is built for qualified institutional entities that require permanence,
          discretion, and governed settlement. Engagement begins with a private mandate review.
          All correspondence is treated with institutional confidentiality.
        </p>

        <div data-cta-el className="flex flex-wrap items-center gap-4">
          <a
            href="mailto:contact@parsmonarch.com"
            className="group inline-flex items-center gap-3 border border-accent/40 bg-accent/5 px-7 py-4 font-mono text-xs uppercase tracking-widest text-accent hover:bg-accent/10 hover:border-accent transition-all duration-300"
          >
            <ScrambleTextOnHover text="contact@parsmonarch.com" as="span" duration={0.55} />
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>

        {/* Large accent statement */}
        <div data-cta-el className="mt-16 border-l-2 border-accent/40 pl-6">
          <p
            className="font-[family-name:var(--font-bebas)] text-muted-foreground/40 leading-tight"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 3.5rem)" }}
          >
            Infrastructure-grade conversations only.
            <br />
            No demos. No trials. No timelines.
          </p>
        </div>
      </div>

      {/* Founder + Sponsor block */}
      <div
        ref={founderRef}
        className="relative z-10 mb-20 border border-border/30 bg-background/30"
      >
        <div className="grid md:grid-cols-[1fr_auto] gap-0">
          {/* Left — founder statement */}
          <div className="p-8 md:p-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/60 block mb-5">
              Founder Note
            </span>
            <p
              className="font-[family-name:var(--font-bebas)] text-foreground leading-snug"
              style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)" }}
            >
              We did not build for this cycle, nor the next. We laid the floor that
              sovereign institutions will still be standing on a century from now.
            </p>
            <div className="mt-8 pt-6 border-t border-border/20">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground">
                Sami Masudnia
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.24em] text-accent">
                Co-Founder &amp; CEO
              </p>
            </div>
          </div>

          {/* Right — sponsor portrait */}
          <div
            className="relative shrink-0 border-l border-border/30"
            style={{ width: "220px", minHeight: "280px" }}
          >
            <Image
              src="/brand/Sponser.webp"
              alt="Mo. Dehghan — Sponsor"
              fill
              unoptimized
              className="object-cover object-center"
              style={{ filter: "brightness(0.6) saturate(1.0)" }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to right, oklch(0.06 0.01 185) 0%, transparent 30%)",
              }}
            />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/70 border border-border/40 bg-background/60 px-3 py-2">
                Sponsored by Mo. Dehghan
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer grid */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-border/20 pt-12">
        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Infrastructure
          </h4>
          <ul className="space-y-2">
            {["Sovereignty", "Governance", "Finality"].map((item) => (
              <li key={item} className="font-mono text-sm text-foreground/75">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Institutional
          </h4>
          <ul className="space-y-2">
            {["Enterprise", "Compliance", "Trust"].map((item) => (
              <li key={item} className="font-mono text-sm text-foreground/75">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Contact
          </h4>
          <ul className="space-y-3">
            <li>
              <a
                href="mailto:contact@parsmonarch.com"
                className="font-mono text-sm text-foreground/75 hover:text-accent transition-colors duration-200"
              >
                contact@parsmonarch.com
              </a>
            </li>
            <li className="font-mono text-sm text-muted-foreground leading-snug">
              Market St<br />
              San Francisco, CA 94105<br />
              United States
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Founded
          </h4>
          <p
            className="font-[family-name:var(--font-bebas)] text-foreground tracking-tight"
            style={{ fontSize: "1.6rem" }}
          >
            Sami Masudnia
          </p>
          <p className="mt-1 font-mono text-sm text-accent uppercase tracking-widest">
            Co-Founder &amp; CEO
          </p>
        </div>
      </div>

      {/* Bottom copyright */}
      <div
        ref={footerRef}
        className="relative z-10 mt-16 pt-6 border-t border-border/15 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
      >
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
          © 2026 PARSMONARCH. All rights reserved. Private infrastructure.
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          Institutional finality. Cryptographic certainty. Sovereign governance.
        </p>
      </div>
    </section>
  )
}
