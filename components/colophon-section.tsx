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
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / Get in Touch</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">ESTABLISH YOUR SEAT</h2>
      </div>

      {/* CTA */}
      <div className="mb-20 flex flex-col items-start gap-6">
        <p className="max-w-xl font-mono text-sm text-muted-foreground leading-relaxed">
          Join enterprises building on institutional data infrastructure. Parsmonarch is built for organizations where data finality is non-negotiable.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="mailto:hello@parsmonarch.com"
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

      {/* Multi-column layout */}
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12">
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
                href="mailto:hello@parsmonarch.com"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                hello@parsmonarch.com
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

        {/* Founders */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Founded</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">Sami Johnson</li>
            <li className="font-mono text-xs text-foreground/80">Co-Founder & CEO</li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div
        ref={footerRef}
        className="mt-24 pt-8 border-t border-border/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          © 2026 Parsmonarch. All rights reserved.
        </p>
        <p className="font-mono text-[10px] text-muted-foreground">Institutional finality. Cryptographic certainty.</p>
      </div>
    </section>
  )
}
