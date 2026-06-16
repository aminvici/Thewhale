"use client"

import type React from "react"
import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Gather all page sections once DOM is ready
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".page-section, .page-section-last")
    )
    if (!sections.length) return

    let current = 0
    let locked = false
    let wheelAccumulator = 0
    let lastSwitchAt = 0

    const indexById = new Map<string, number>()
    sections.forEach((section, idx) => {
      if (section.id) indexById.set(section.id, idx)
    })

    const goTo = (index: number) => {
      const next = Math.max(0, Math.min(index, sections.length - 1))
      if (next === current && locked) return

      current = next
      locked = true
      lastSwitchAt = Date.now()
      wheelAccumulator = 0

      gsap.killTweensOf(window)
      gsap.to(window, {
        scrollTo: { y: sections[next].offsetTop, autoKill: false },
        duration: 0.72,
        ease: "power3.out",
        onComplete: () => {
          locked = false
          ScrollTrigger.refresh()
        },
        onInterrupt: () => {
          locked = false
        },
      })
    }

    const goToById = (id: string) => {
      const idx = indexById.get(id)
      if (typeof idx === "number") goTo(idx)
    }

    const onWheel = (e: WheelEvent) => {
      // Allow native scroll only on last section scrolling down
      if (current === sections.length - 1 && e.deltaY > 0) return
      e.preventDefault()
      if (locked) return

      // Trackpads emit many small wheel deltas; require cumulative intent before switching section.
      const now = Date.now()
      if (now - lastSwitchAt < 420) return

      wheelAccumulator += e.deltaY
      if (Math.abs(wheelAccumulator) < 80) return

      goTo(current + (wheelAccumulator > 0 ? 1 : -1))
    }

    let touchY = 0
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY }
    const onTouchEnd = (e: TouchEvent) => {
      if (locked) return
      const delta = touchY - e.changedTouches[0].clientY
      if (Math.abs(delta) < 60) return
      goTo(current + (delta > 0 ? 1 : -1))
    }

    // Track current section via IntersectionObserver
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const idx = sections.indexOf(entry.target as HTMLElement)
            if (idx !== -1) current = idx
          }
        })
      },
      { threshold: 0.5 }
    )
    sections.forEach((s) => io.observe(s))

    // Keyboard arrow navigation
    const onKey = (e: KeyboardEvent) => {
      if (locked) return
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); goTo(current + 1) }
      if (e.key === "ArrowUp"   || e.key === "PageUp"  ) { e.preventDefault(); goTo(current - 1) }
    }

    const onSectionRequest = (e: Event) => {
      const customEvent = e as CustomEvent<{ id?: string }>
      const id = customEvent.detail?.id
      if (!id) return
      goToById(id)
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    window.addEventListener("keydown", onKey)
    window.addEventListener("parsm:goToSection", onSectionRequest as EventListener)

    // Snap to top on load
    window.scrollTo(0, 0)

    return () => {
      gsap.killTweensOf(window)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("parsm:goToSection", onSectionRequest as EventListener)
      io.disconnect()
    }
  }, [])

  return <>{children}</>
}
