"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "hero", label: "Home" },
  { id: "manifesto", label: "Position" },
  { id: "capabilities", label: "Capabilities" },
  { id: "founder", label: "Founder" },
  { id: "signals", label: "By Appointment" },
  { id: "work", label: "Settlement Path" },
  { id: "colophon", label: "Contact" },
]

export function SideNav() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const getSectionElements = () =>
      navItems
        .map(({ id }) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el))

    const updateActiveSection = () => {
      const sections = getSectionElements()
      if (sections.length === 0) return

      const viewportAnchor = window.innerHeight * 0.35

      // Keep section progression stable by selecting the last section that has crossed the anchor.
      let nextActive = sections[0].id

      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= viewportAnchor) {
          nextActive = section.id
        }
      }

      setActiveSection(nextActive)
    }

    updateActiveSection()
    window.addEventListener("scroll", updateActiveSection, { passive: true })
    window.addEventListener("resize", updateActiveSection)

    return () => {
      window.removeEventListener("scroll", updateActiveSection)
      window.removeEventListener("resize", updateActiveSection)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed left-0 top-0 z-50 h-screen w-16 md:w-20 hidden md:flex flex-col border-r border-border/30 bg-background/80 backdrop-blur-sm">
      {/* Top accent — crown lives in LogoHeader, nav just shows a thin line */}
      <div className="flex items-center justify-center pt-6 pb-8 border-b border-border/30">
        <div className="h-6 w-[1px] bg-accent/50" />
      </div>

      {/* Navigation items */}
      <div className="flex flex-col gap-6 px-4 flex-1 justify-center">
        {navItems.map(({ id, label }) => (
          <button key={id} onClick={() => scrollToSection(id)} className="group relative flex items-center gap-3">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-all duration-300",
                activeSection === id ? "bg-accent scale-125" : "bg-muted-foreground/40 group-hover:bg-foreground/60",
              )}
            />
            <span
              className={cn(
                "absolute left-6 font-mono text-xs uppercase tracking-widest opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:left-8 whitespace-nowrap",
                activeSection === id ? "text-accent" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
