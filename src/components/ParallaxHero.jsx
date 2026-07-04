import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ParallaxHero.css';

gsap.registerPlugin(ScrollTrigger);

const ParallaxHero = () => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const midgroundRef = useRef(null);
  const foregroundRef = useRef(null);

  useEffect(() => {
    // Ensure all refs are present
    if (!containerRef.current) return;

    // Create a GSAP timeline with ScrollTrigger to pin the container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%', // Pin for 150% of the viewport height
        pin: true,
        scrub: 1, // Smooth scrubbing
        anticipatePin: 1,
      },
    });

    // 1. Background Layer: Scales up slightly
    tl.to(bgRef.current, {
      scale: 1.1,
      ease: 'none',
    }, 0);

    // 2. Text Layer: Scales down and fades out
    tl.to(textRef.current, {
      scale: 0.8,
      opacity: 0,
      ease: 'power1.inOut',
    }, 0);

    // 3. Foreground (Book): Scrolls up and fades out
    tl.to(foregroundRef.current, {
      yPercent: -20,
      opacity: 0,
      ease: 'power1.inOut',
    }, 0);

    // 4. Midground (Floating Symbols): Fly upward rapidly at varying speeds
    // We select all individual symbols inside the midground container
    const symbols = midgroundRef.current.querySelectorAll('.floating-symbol');
    symbols.forEach((symbol, index) => {
      // Randomize the yPercent between -50 and -150
      const yMove = -50 - Math.random() * 100;
      tl.to(symbol, {
        yPercent: yMove,
        ease: 'none',
      }, 0);
    });

    // Cleanup on unmount
    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="parallax-hero-container">
      {/* Background Layer: Midnight-blue gradient & grid */}
      <div ref={bgRef} className="parallax-layer parallax-bg">
        <div className="bg-grid"></div>
      </div>

      {/* Midground Layer: Floating Educational Elements */}
      <div ref={midgroundRef} className="parallax-layer parallax-midground">
        {/* We use inline styles for initial random positions to spread them out */}
        <div className="floating-symbol" style={{ left: '15%', top: '60%' }}>
          {/* Atom SVG */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300 opacity-70">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </div>
        <div className="floating-symbol" style={{ left: '80%', top: '50%' }}>
          {/* Code Bracket SVG */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-300 opacity-70">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </div>
        <div className="floating-symbol" style={{ left: '30%', top: '70%' }}>
          <span className="text-4xl text-emerald-300 font-bold opacity-70">∑</span>
        </div>
        <div className="floating-symbol" style={{ left: '70%', top: '65%' }}>
          <span className="text-4xl text-amber-300 font-bold opacity-70">π</span>
        </div>
        <div className="floating-symbol" style={{ left: '50%', top: '80%' }}>
          {/* Star SVG */}
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400 opacity-60">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
        <div className="floating-symbol" style={{ left: '20%', top: '85%' }}>
          <span className="text-3xl text-pink-300 font-bold opacity-70">∫</span>
        </div>
      </div>

      {/* Text Layer: Centered Elegant Typography */}
      <div ref={textRef} className="parallax-layer parallax-text flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg">
          Iqra Virtual School
        </h1>
        <p className="text-xl md:text-3xl text-blue-200 font-medium max-w-2xl drop-shadow-md">
          Shaping the Thinkers of Tomorrow
        </p>
      </div>

      {/* Foreground Layer: Book Graphic resting at bottom */}
      <div ref={foregroundRef} className="parallax-layer parallax-foreground">
        <div className="book-graphic-container">
          {/* A stylized massive open book SVG */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="book-svg text-white opacity-90 drop-shadow-2xl">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          <div className="book-glow"></div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxHero;
