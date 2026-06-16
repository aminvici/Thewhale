"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    })

    lenisRef.current = lenis

    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // GSAP-driven page snap — fires when a page-section crosses 40% of viewport
    // Uses lenis.scrollTo() so snap is smooth, not jarring
    const snapTargets = document.querySelectorAll<HTMLElement>(".page-section")

    snapTargets.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 40%",
        onEnter: () => {
          lenis.scrollTo(section, { duration: 1.0, easing: (t) => 1 - Math.pow(1 - t, 4) })
        },
        onEnterBack: () => {
          lenis.scrollTo(section, { duration: 1.0, easing: (t) => 1 - Math.pow(1 - t, 4) })
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return <>{children}</>
}
