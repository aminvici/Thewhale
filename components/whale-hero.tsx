"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function WhaleHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return

    const ctx = gsap.context(() => {
      // Subtle zoom-out and fade as you scroll down
      gsap.to(imageRef.current, {
        scale: 0.95,
        opacity: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
    >
      {/* User-provided whale art */}
      <img
        ref={imageRef}
        src="/exp/Whale.jpeg"
        alt="Parsmonarch whale"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{
          filter: "brightness(0.52) saturate(1.25)",
        }}
      />

      {/* Color grading overlay for the emerald deep-sea look */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 70% 50% at 58% 34%, rgba(90,255,180,0.18) 0%, transparent 70%)",
            "linear-gradient(to bottom, rgba(0, 10, 24, 0.45) 0%, rgba(0, 12, 30, 0.78) 100%)",
          ].join(", "),
        }}
      />

      {/* Edge vignette to blend into page background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 85% 62% at 50% 50%, transparent 22%, hsl(var(--background)) 100%)",
        }}
      />
    </div>
  )
}
