"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export function LogoHeader() {
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!logoRef.current) return

    const tween = gsap.to(logoRef.current, {
      y: -8,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    return () => { tween.kill() }
  }, [])

  return (
    <div
      ref={logoRef}
      className="fixed top-5 left-5 z-50 opacity-75 hover:opacity-100 transition-opacity duration-500"
    >
      <Image
        src="/parsmonarch-logo.png"
        alt="Parsmonarch"
        width={120}
        height={120}
        className="w-20 h-20 md:w-28 md:h-28 drop-shadow-2xl"
        priority
      />
    </div>
  )
}
