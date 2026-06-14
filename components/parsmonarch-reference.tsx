import React, { useState, useEffect, useRef } from 'react';

// --- KINETIC BACKGROUND CANVAS COMPONENT ---
const NetworkCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.radius = Math.random() * 1.5 + 0.5;
        this.baseAlpha = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (150 - distance) / 150;
          this.vx -= forceDirectionX * force * 0.02;
          this.vy -= forceDirectionY * force * 0.02;
        }

        // Apply friction
        this.vx *= 0.99;
        this.vy *= 0.99;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.baseAlpha})`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(Math.floor((width * height) / 15000), 100);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
    />
  );
};

// --- SCROLL REVEAL COMPONENT ---
const FadeIn = ({ children, delay = 0, direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translate-y-0 translate-x-0';
    if (direction === 'up') return 'translate-y-12';
    if (direction === 'left') return 'translate-x-12';
    return 'translate-y-0';
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${getTransform()} ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // --- LOGO ANIMATION MATH ---
  // Calculates interpolation between Center Hero and Top-Left Nav based on scroll
  const isMobile = windowWidth < 768;
  const maxScroll = isMobile ? 250 : 400; // Complete animation after this many pixels
  const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
  // Ease out cubic
  const easeProgress = 1 - Math.pow(1 - progress, 3);
  
  // Start values (Center screen)
  const startScale = isMobile ? 3 : 5;
  const startTop = 50; // vh
  const startLeft = 50; // vw
  const startXPercent = -50; // % translation
  const startYPercent = -50; // % translation

  // End values (Top left navigation)
  const endScale = 1;
  const endTop = isMobile ? 3 : 4; // vh or fixed rem depending on how we set it. Let's use vw/vh equivalents or just fixed pixels mapped to %
  const endLeft = isMobile ? 5 : 4; // vw
  const endXPercent = 0;
  const endYPercent = 0;

  const currentScale = startScale - (startScale - endScale) * easeProgress;
  const currentTop = startTop - (startTop - endTop) * easeProgress;
  const currentLeft = startLeft - (startLeft - endLeft) * easeProgress;
  const currentXPercent = startXPercent - (startXPercent - endXPercent) * easeProgress;
  const currentYPercent = startYPercent - (startYPercent - endYPercent) * easeProgress;

  const logoStyle = {
    top: `${currentTop}vh`,
    left: `${currentLeft}vw`,
    transform: `translate(${currentXPercent}%, ${currentYPercent}%) scale(${currentScale})`,
    letterSpacing: '0.2em',
  };

  const navOpacity = progress; // Nav elements fade in as you scroll

  return (
    <div className="bg-black text-neutral-200 min-h-screen font-sans overflow-x-hidden selection:bg-neutral-800 selection:text-white">
      <NetworkCanvas />

      {/* --- FIXED NAVIGATION & FLUID LOGO --- */}
      <header className="fixed top-0 left-0 w-full h-24 z-50 pointer-events-none flex items-center justify-between px-6 md:px-12">
        {/* The Animated Logo */}
        <div 
          className="fixed z-50 font-light text-white uppercase origin-center whitespace-nowrap pointer-events-auto cursor-pointer"
          style={logoStyle}
        >
          Parsmonarch
        </div>

        {/* Nav Items (Fade in on scroll) */}
        <div 
          className="absolute right-6 md:right-12 flex items-center gap-8 pointer-events-auto transition-opacity duration-300"
          style={{ opacity: navOpacity }}
        >
          <button className="hidden md:block text-xs uppercase tracking-widest hover:text-white transition-colors duration-300">
            Institutional Enquiries
          </button>
          <button className="px-5 py-2.5 text-xs uppercase tracking-widest border border-neutral-700 rounded-full hover:bg-white hover:text-black transition-all duration-300 relative group overflow-hidden">
            <span className="relative z-10">Request Access</span>
            <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
          </button>
        </div>
      </header>

      <main className="relative z-10">
        
        {/* --- SECTION 1: HERO --- */}
        <section className="h-[100vh] flex flex-col items-center justify-center relative">
          <div 
            className="text-center mt-32 transition-opacity duration-500"
            style={{ opacity: 1 - progress * 1.5 }}
          >
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-neutral-500 mb-6">
              Private Institutional Infrastructure
            </p>
            <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight mb-6">
              Where empires settle.
            </h1>
            <p className="text-sm md:text-base text-neutral-400 max-w-lg mx-auto font-light leading-relaxed px-4">
              Sovereign settlement infrastructure for a select circle of institutions.
              Final, private, and built to outlast the century. <br className="hidden md:block"/>By appointment only.
            </p>
          </div>

          <div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 transition-opacity duration-300"
            style={{ opacity: 1 - progress * 2 }}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-600">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-600 to-transparent"></div>
          </div>
        </section>

        {/* --- SECTION 2: SPEED & CERTAINTY --- */}
        <section className="py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-8 border-l border-neutral-700 pl-4">
              Not a product. Not a platform.
            </p>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-24 max-w-2xl leading-tight">
              Infrastructure for those who cannot settle for less.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn delay={200}>
              <div className="relative">
                {/* Visual purely driven by CSS to simulate the "< 3s" impact */}
                <div className="text-8xl md:text-[10rem] font-light text-white tracking-tighter leading-none relative z-10">
                  <span className="text-neutral-700 mr-2">&lt;</span>3s
                </div>
                <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
              </div>
            </FadeIn>
            <FadeIn delay={400}>
              <h3 className="text-2xl font-light text-white mb-6">
                Settlement, before the world has finished asking.
              </h3>
              <p className="text-neutral-400 font-light leading-relaxed">
                Cross-border finality in seconds not days. No reconciliation. No waiting. 
                The transaction is done before it is doubted.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* --- SECTION 3: THE BRIDGE --- */}
        <section className="py-32 md:py-48 bg-neutral-900/20 border-y border-neutral-900 relative overflow-hidden">
          {/* Subtle background glow for the bridge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-neutral-800/20 blur-[100px] rounded-[100%] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="text-center mb-32">
              <FadeIn>
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">The Settlement Layer</p>
                <h2 className="text-3xl md:text-5xl font-light text-white">Two worlds. One source of truth.</h2>
                <p className="text-neutral-400 font-light max-w-2xl mx-auto mt-6">
                  The discretion of a private institution, joined to the certainty of public finality bound together as a single, sovereign settlement layer.
                </p>
              </FadeIn>
            </div>

            {/* Bridge Visualization */}
            <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 md:gap-4">
              
              {/* Private */}
              <FadeIn delay={100} className="flex-1 bg-black/50 border border-neutral-800 p-8 md:p-12 rounded-2xl backdrop-blur-sm relative group hover:border-neutral-600 transition-colors duration-500">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-8">Permissioned</h3>
                <h4 className="text-2xl text-white font-light mb-4">HyperLedger Fabric</h4>
                <p className="text-neutral-400 font-light text-sm leading-relaxed">
                  Cryptographically isolated private channels and strictly governed identity. Your ledger state remains entirely opaque to the outside world. Every party known, every rule yours.
                </p>
              </FadeIn>

              {/* The Bridge Connection */}
              <FadeIn delay={300} className="flex-none flex items-center justify-center py-8 md:py-0 md:px-8">
                <div className="flex flex-col items-center">
                  <div className="w-[1px] h-12 md:w-16 md:h-[1px] bg-neutral-700 hidden md:block"></div>
                  <div className="px-6 py-3 border border-neutral-700 rounded-full bg-black text-xs uppercase tracking-widest text-white z-10 relative shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                    Atomic Bridge
                  </div>
                  <div className="w-[1px] h-12 md:w-16 md:h-[1px] bg-neutral-700 hidden md:block"></div>
                </div>
              </FadeIn>

              {/* Public */}
              <FadeIn delay={500} className="flex-1 bg-black/50 border border-neutral-800 p-8 md:p-12 rounded-2xl backdrop-blur-sm relative group hover:border-neutral-600 transition-colors duration-500">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-8">Public Settlement</h3>
                <h4 className="text-2xl text-white font-light mb-4">XRP Ledger</h4>
                <p className="text-neutral-400 font-light text-sm leading-relaxed">
                  Atomic finality across borders, settled openly in under three seconds. Secured by cryptographically verifiable, multi-node consensus. Zero single points of failure.
                </p>
              </FadeIn>

            </div>
          </div>
        </section>

        {/* --- SECTION 4: THE STANDARD --- */}
        <section className="py-32 md:py-48 max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-4">The Standard</h2>
                <p className="text-neutral-500 text-lg font-light">Held to a different measure.</p>
              </div>
              <button className="px-6 py-3 text-xs uppercase tracking-widest border border-white text-white rounded-full hover:bg-white hover:text-black transition-colors duration-300">
                Request Access
              </button>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-neutral-800 border border-neutral-800 rounded-2xl overflow-hidden">
            
            {[
              { num: '01', title: 'Exclusivity', desc: 'Access is earned, never bought. No public tiers, no self-service, no free plans. Each relationship is considered, one at a time.' },
              { num: '02', title: 'Sovereignty', desc: 'The infrastructure is ours. The policy is ours. Operating on dedicated, isolated compute—nothing is rented on public clouds, nothing is outsourced.' },
              { num: '03', title: 'Permanence', desc: 'Built for decades, not cycles. An institution should outlive the technology of its era so we built for the era after it.' }
            ].map((item, i) => (
              <div key={item.num} className="bg-black p-10 md:p-14 relative group overflow-hidden">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                
                <FadeIn delay={i * 150}>
                  <div className="text-neutral-600 font-light mb-12 group-hover:text-white transition-colors duration-500">{item.num}</div>
                  <h3 className="text-2xl text-white font-light mb-6 relative z-10">{item.title}</h3>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed relative z-10">
                    {item.desc}
                  </p>
                </FadeIn>
              </div>
            ))}
            
          </div>
        </section>

        {/* --- SECTION 5: QUOTE --- */}
        <section className="py-32 md:py-48 px-6 text-center border-t border-neutral-900/50">
          <FadeIn>
            <div className="max-w-4xl mx-auto">
              <svg className="w-8 h-8 mx-auto text-neutral-700 mb-12" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              <h2 className="text-2xl md:text-4xl font-light text-white leading-relaxed mb-12">
                "We did not build for this cycle, nor the next. We laid the floor that sovereign institutions will still be standing on a century from now... long after the noise has settled. <br/><br/>
                <span className="text-neutral-500">The future does not arrive. It is settled into place.</span>"
              </h2>
              <p className="text-xs uppercase tracking-widest text-neutral-500">
                Founder & Chief Executive<br/><span className="text-white mt-2 inline-block">Parsmonarch</span>
              </p>
            </div>
          </FadeIn>
        </section>

        {/* --- FOOTER --- */}
        <footer className="py-24 bg-neutral-950 border-t border-neutral-900 text-center px-6">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-6">Institutional Enquiries</p>
            <h2 className="text-3xl font-light text-white mb-6">Begin a conversation.</h2>
            <p className="text-neutral-400 font-light text-sm max-w-md mx-auto mb-12">
              Our team considers each relationship individually. We respond to qualified enquiries within 48 hours.
            </p>
            <button className="px-8 py-4 bg-white text-black text-xs uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-colors duration-300 font-medium">
              Contact Our Team
            </button>
            <p className="text-[10px] uppercase tracking-widest text-neutral-600 mt-6">Qualified Institutions Only</p>
            
            <div className="mt-32 flex flex-col items-center">
              <div className="text-sm font-light tracking-widest uppercase text-neutral-700 mb-2">Parsmonarch</div>
              <div className="text-[10px] text-neutral-600 uppercase tracking-widest">Settlement Infrastructure</div>
            </div>
          </FadeIn>
        </footer>

      </main>
    </div>
  );
}