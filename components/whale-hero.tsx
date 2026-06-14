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
      {/* Radial fade mask using CSS */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background pointer-events-none z-10" />

      {/* Whale image with scale and opacity */}
      <img
        ref={imageRef}
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Whale-mi3HGuZjKf0hDkR1vmgdSJYiuBXVD7.jpeg"
        alt="Whale in neon ocean"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{
          maskImage: "radial-gradient(ellipse 80% 60% at center, transparent 0%, black 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at center, transparent 0%, black 100%)",
        }}
      />

      {/* Glow overlay from whale's green neon */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-teal-500/2 to-transparent pointer-events-none" />
    </div>
  )
}
