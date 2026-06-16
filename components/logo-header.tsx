"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export function LogoHeader() {
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!logoRef.current) return

    // Subtle floating animation on the logo
    gsap.to(logoRef.current, {
      y: -8,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  }, [])

  return (
    <div
      ref={logoRef}
      className="fixed top-6 left-6 z-50 opacity-0 hover:opacity-100 transition-opacity duration-300"
    >
      <Image
        src="/parsmonarch-logo.png"
        alt="Parsmonarch"
        width={72}
        height={72}
        className="w-16 h-16 md:w-18 md:h-18 drop-shadow-lg"
        priority
      />
    </div>
  )
}
