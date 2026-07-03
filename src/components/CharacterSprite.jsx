import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function CharacterSprite() {
  const [svgContent, setSvgContent] = useState('');
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef(null);
  const tlRef = useRef(null);

  // 1. Fetch the raw SVG
  useEffect(() => {
    fetch('/animated-character.svg')
      .then(res => res.text())
      .then(text => setSvgContent(text))
      .catch(err => console.error('Error loading SVG:', err));
  }, []);

  // 2. Run the scatter/assemble animation
  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    const timer = setTimeout(() => {
      const svg = containerRef.current.querySelector('svg');
      if (!svg) return;

      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.display = 'block';
      // Allow pieces to overflow svg bounds during scatter
      svg.style.overflow = 'visible';

      // Get all direct path/shape children — this SVG has NO group wrappers
      const allPaths = Array.from(
        svg.querySelectorAll('path, circle, rect, polygon, polyline, ellipse, line')
      ).filter(p => !p.closest('defs'));

      console.log("CharacterSprite found paths:", allPaths.length);

      if (allPaths.length === 0) return;

      // Sort by bottom edge so lower body assembles first
      try {
        allPaths.sort((a, b) => {
          const aBox = a.getBBox();
          const bBox = b.getBBox();
          return (bBox.y + bBox.height) - (aBox.y + aBox.height);
        });
      } catch (e) {
        console.warn("CharacterSprite sort error:", e);
      }

      console.log("Setting opacity to 0 and scattering paths...");

      // STEP 1: Immediately force everything to be scattered and invisible
      gsap.set(allPaths, { 
        opacity: 0,
        x: () => gsap.utils.random(-600, 600),
        y: () => gsap.utils.random(-600, 600),
        scale: () => gsap.utils.random(0.1, 0.5),
        rotation: () => gsap.utils.random(-180, 180),
        transformOrigin: 'center center'
      });

      // STEP 2: Now the container is safe to reveal
      setIsReady(true);

      const stagger = Math.min(0.03, 2 / allPaths.length);

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.2 });

      // PHASE 1 — fly in from random positions and assemble
      tl.to(allPaths, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        ease: 'expo.out',
        duration: 1.5,
        stagger: {
          each: stagger,
          from: 'end', // start from bottom of character going up
        },
      })
      // Hold assembled for 2 seconds, then scatter
      .to(allPaths, {
        x: () => gsap.utils.random(-600, 600),
        y: () => gsap.utils.random(-600, 600),
        scale: () => gsap.utils.random(0.1, 0.5),
        rotation: () => gsap.utils.random(-180, 180),
        opacity: 0,
        ease: 'expo.in',
        duration: 1,
        stagger: {
          each: stagger,
          from: 'start',
        },
      }, '+=2');

      tlRef.current = tl;
      console.log("GSAP Timeline created successfully.");
    }, 100);

    return () => {
      clearTimeout(timer);
      if (tlRef.current) tlRef.current.kill();
    };
  }, [svgContent]);

  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.2s',
        overflow: 'hidden',
      }}
    >
      <div 
        ref={containerRef} 
        style={{ width: '100%', height: '100%' }}
        dangerouslySetInnerHTML={{ __html: svgContent }} 
      />
    </div>
  );
}
