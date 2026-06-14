'use client';

import React, { useEffect, useState } from 'react';

export function ScrollLogo() {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(typeof window !== 'undefined' ? window.innerWidth : 1200);

    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate animation progress
  const isMobile = windowWidth < 768;
  const maxScroll = isMobile ? 200 : 350;
  const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

  // Ease out cubic
  const easeProgress = 1 - Math.pow(1 - progress, 3);

  // Start values (center hero)
  const startScale = isMobile ? 3 : 4;
  const startTop = 50;
  const startLeft = 50;
  const startXPercent = -50;
  const startYPercent = -50;

  // End values (top-left nav)
  const endScale = 0.8;
  const endTop = isMobile ? 3.5 : 4;
  const endLeft = isMobile ? 4 : 5;
  const endXPercent = 0;
  const endYPercent = 0;

  const currentScale = startScale - (startScale - endScale) * easeProgress;
  const currentTop = startTop - (startTop - endTop) * easeProgress;
  const currentLeft = startLeft - (startLeft - endLeft) * easeProgress;
  const currentXPercent = startXPercent - (startXPercent - endXPercent) * easeProgress;
  const currentYPercent = startYPercent - (startYPercent - endYPercent) * easeProgress;

  return (
    <div
      className="fixed z-50 font-light text-white uppercase whitespace-nowrap pointer-events-auto cursor-pointer transition-none"
      style={{
        top: `${currentTop}vh`,
        left: `${currentLeft}vw`,
        transform: `translate(${currentXPercent}%, ${currentYPercent}%) scale(${currentScale})`,
        letterSpacing: '0.15em',
        fontSize: 'clamp(0.9rem, 2vw, 1.5rem)',
        transformOrigin: 'center',
      }}
    >
      NEXUS
    </div>
  );
}
