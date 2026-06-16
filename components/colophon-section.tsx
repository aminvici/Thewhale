"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ColophonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in
      if (headerRef.current) {
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
      }

      // Grid columns fade up with stagger
      if (gridRef.current) {
        const columns = gridRef.current.querySelectorAll(":scope > div")
        gsap.from(columns, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Footer fade in
      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="colophon"
      className="relative min-h-screen py-24 md:py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30 overflow-hidden"
    >
      {/* Page 05 background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/exp/theme-04.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
          opacity: 0.24,
        }}
      />
      
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background/40 via-background/60 to-background/85" />

      {/* Section header */}
      <div ref={headerRef} className="relative z-10 mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / Get in Touch</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">ESTABLISH YOUR SEAT</h2>
      </div>

      {/* CTA */}
      <div className="relative z-10 mb-20 flex flex-col items-start gap-6">
        <p className="max-w-xl font-mono text-sm text-muted-foreground leading-relaxed">
          Join enterprises building on institutional data infrastructure. Parsmonarch is built for organizations where data finality is non-negotiable.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="mailto:contact@parsmonarch.com"
            className="inline-flex items-center border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
          >
            Contact Us
          </a>
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Founder statement */}
      <div className="relative z-10 mb-20 grid gap-8 rounded-2xl border border-border/40 bg-background/70 p-6 md:grid-cols-[1.4fr_0.9fr] md:p-10 backdrop-blur-sm">
        <div className="space-y-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Founder Note</span>
          <p className="max-w-4xl font-[var(--font-bebas)] text-3xl md:text-5xl tracking-tight leading-[1.08] text-foreground">
            We did not build for this cycle, nor the next. We laid the floor that sovereign institutions will still be standing on a century from now.
          </p>
        </div>
        <div className="flex flex-col justify-end border-t border-border/30 pt-5 md:border-t-0 md:border-l md:pt-0 md:pl-8">
          <div className="mb-6 flex items-center gap-4">
            <img
              src="/exp/ceo.webp"
              alt="Sami Masudnia"
              className="h-24 w-24 rounded-2xl border border-accent/40 object-cover shadow-[0_0_32px_rgba(34,211,238,0.26)]"
            />
            <img
              src="/exp/sponsor.webp"
              alt="Mo. Dehghan"
              className="h-24 w-24 rounded-2xl border border-amber-400/50 object-cover shadow-[0_0_32px_rgba(251,191,36,0.28)]"
            />
          </div>
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-foreground">Sami Masudnia</p>
          <p className="mt-2 font-mono text-sm md:text-base uppercase tracking-[0.24em] text-accent">Co-Founder & CEO</p>
          <p className="mt-3 font-mono text-xs md:text-sm text-cyan-200">
            Sponsored by <span className="font-semibold text-amber-300">Mo. Dehghan</span>
          </p>
          <p className="mt-6 font-mono text-xs leading-relaxed text-muted-foreground">
            Parsmonarch is built for qualified institutional entities that require permanence, discretion, and governed settlement.
          </p>
        </div>
      </div>

      {/* Multi-column layout */}
      <div ref={gridRef} className="relative z-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12">
        {/* Infrastructure */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Infrastructure</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">Sovereignty</li>
            <li className="font-mono text-xs text-foreground/80">Governance</li>
            <li className="font-mono text-xs text-foreground/80">Finality</li>
          </ul>
        </div>

        {/* Institutional */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Institutional</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">Enterprise</li>
            <li className="font-mono text-xs text-foreground/80">Compliance</li>
            <li className="font-mono text-xs text-foreground/80">Trust</li>
          </ul>
        </div>

        {/* Technical */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Technical</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">Documentation</li>
            <li className="font-mono text-xs text-foreground/80">API</li>
            <li className="font-mono text-xs text-foreground/80">Architecture</li>
          </ul>
        </div>

        {/* Company */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Company</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">About</li>
            <li className="font-mono text-xs text-foreground/80">Team</li>
            <li className="font-mono text-xs text-foreground/80">Mission</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Contact</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:contact@parsmonarch.com"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                contact@parsmonarch.com
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                Twitter/X
              </a>
            </li>
          </ul>
        </div>

        {/* Business */}
        <div className="col-span-1 md:col-span-2">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Business Address</h4>
          <address className="not-italic font-mono text-xs leading-relaxed text-foreground/80">
            Market St
            <br />
            San Francisco, CA 94105
            <br />
            US
          </address>
        </div>

        {/* Founders */}
        <div className="col-span-1 md:col-span-2">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Founded</h4>
          <ul className="space-y-3">
            <li className="font-[var(--font-bebas)] text-lg md:text-2xl text-foreground font-bold tracking-tight">
              Sami Masudnia
            </li>
            <li className="font-mono text-base md:text-lg text-accent font-semibold uppercase tracking-widest">
              Co-Founder & CEO
            </li>
            <li className="font-mono text-sm md:text-base text-cyan-200 mt-2">
              Sponsored by <span className="font-semibold text-amber-300">Mo. Dehghan</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div
        ref={footerRef}
        className="relative z-10 mt-24 pt-8 border-t border-border/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          © 2026 Parsmonarch. All rights reserved.
        </p>
        <p className="font-mono text-[10px] text-muted-foreground">Institutional finality. Cryptographic certainty.</p>
      </div>
    </section>
  )
}
