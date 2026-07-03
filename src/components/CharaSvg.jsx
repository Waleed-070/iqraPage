import React, { useRef, useEffect, useState, memo } from 'react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap-trial/DrawSVGPlugin';

gsap.registerPlugin(DrawSVGPlugin);

const CharaSvg = memo(function CharaSvg() {
  const [svgContent, setSvgContent] = useState('');
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    fetch('/animated-character.svg')
      .then((res) => res.text())
      .then((text) => setSvgContent(text))
      .catch((err) => console.error('Error loading SVG:', err));
  }, []);

  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    // Manually assign innerHTML so React doesn't wipe our GSAP mutations on re-render
    containerRef.current.innerHTML = svgContent;

    const timer = setTimeout(() => {
      const svg = containerRef.current.querySelector('svg');
      if (!svg) return;

      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.display = 'block';
      svg.style.overflow = 'visible';

      let paths = Array.from(
        svg.querySelectorAll('path, circle, rect, polygon, polyline, ellipse, line')
      ).filter(p => !p.closest('defs'));

      if (paths.length === 0) return;

      paths.sort((a, b) => {
        try {
          const aBox = a.getBBox();
          const bBox = b.getBBox();
          return (bBox.y + bBox.height) - (aBox.y + aBox.height);
        } catch (e) {
          return 0;
        }
      });

      // Prepare paths identically to the original DrawSVG method
      paths.forEach((p) => {
        const fill = p.getAttribute('fill') || '#000';
        p.dataset.fill = fill;
        p.style.fill = fill;
        p.style.fillOpacity = 0;
        p.style.stroke = fill;
        p.style.strokeWidth = '2';
        p.style.strokeLinecap = 'round';
        p.style.strokeLinejoin = 'round';
      });

      gsap.set(paths, { 
        drawSVG: 0,
        x: 'random(-200, 200)',
        y: 'random(-200, 200)',
        opacity: 0
      });

      setIsReady(true);

      const staggerAmount = Math.min(0.08, 3 / paths.length);

      const tl = gsap.timeline({ repeat: -1 });
      const slideTl = gsap.timeline({ defaults: { duration: 1, ease: 'none' } });
      
      slideTl
        .to(paths, { 
          drawSVG: '100%', 
          x: 0,
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          stagger: staggerAmount 
        }, 0)
        .to(paths, { duration: 0.5, fillOpacity: 1, strokeOpacity: 0, stagger: staggerAmount }, '<20%')
        .to(paths, {
          duration: 1,
          drawSVG: 0,
          x: 'random(-200, 200)',
          y: 'random(-200, 200)',
          opacity: 0,
          fillOpacity: 0,
          ease: 'power2.in',
          stagger: staggerAmount
        }, '+=3.5');

      tl.add(slideTl);
      tlRef.current = tl;

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
      />
    </div>
  );
});

export default CharaSvg;
