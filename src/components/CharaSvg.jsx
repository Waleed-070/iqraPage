import React, { useRef, useEffect, useState, memo } from 'react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import HeroIdCard from './HeroIdCard';

gsap.registerPlugin(DrawSVGPlugin);

const CharaSvg = memo(function CharaSvg() {
  const [svgs, setSvgs] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const container1Ref = useRef(null);
  const container2Ref = useRef(null);
  const container3Ref = useRef(null);
  const tlRef = useRef(null);
  const timerRef = useRef(null);
  const isCardDraggingRef = useRef(false);

  useEffect(() => {
    Promise.all([
      fetch('/animated-character.svg').then(res => res.text()),
      fetch('/bgRobo.svg').then(res => res.text()),
      fetch('/pointer-character.svg').then(res => res.text())
    ])
      .then(texts => setSvgs(texts))
      .catch((err) => console.error('Error loading SVGs:', err));
  }, []);

  useEffect(() => {
    if (svgs.length < 3 || !container1Ref.current || !container2Ref.current || !container3Ref.current) return;

    container1Ref.current.innerHTML = svgs[0];
    container2Ref.current.innerHTML = svgs[1];
    container3Ref.current.innerHTML = svgs[2];

    const timer = setTimeout(() => {
      const setupSvg = (container) => {
        const svg = container.querySelector('svg');
        if (!svg) return [];
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.display = 'block';
        svg.style.overflow = 'visible';

        let paths = Array.from(
          svg.querySelectorAll('path, circle, rect, polygon, polyline, ellipse, line')
        ).filter(p => !p.closest('defs'));

        // Filter out massive dark background blobs (leftover from PNG to SVG conversion)
        paths = paths.filter(p => {
          const fill = (p.getAttribute('fill') || '').toUpperCase();
          if (fill.startsWith('#') && fill.length === 7) {
            const r = parseInt(fill.substring(1, 3), 16) || 0;
            const g = parseInt(fill.substring(3, 5), 16) || 0;
            const b = parseInt(fill.substring(5, 7), 16) || 0;
            
            // If it's a very dark color
            if (r < 60 && g < 60 && b < 80) {
              try {
                const box = p.getBBox();
                // Background artifacts (like shadows and the gap between the legs)
                // usually touch or are very close to the bottom edge (y = 500).
                // They also have a decent size.
                if ((box.y + box.height > 470) && (box.width * box.height > 10000)) {
                  p.remove(); // Remove background artifact
                  return false;
                }
              } catch (e) {}
            }
          }
          return true;
        });

        paths.sort((a, b) => {
          try {
            const aBox = a.getBBox();
            const bBox = b.getBBox();
            return (bBox.y + bBox.height) - (aBox.y + aBox.height);
          } catch (e) {
            return 0;
          }
        });

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

        return paths;
      };

      const paths1 = setupSvg(container1Ref.current);
      const paths2 = setupSvg(container2Ref.current);
      const paths3 = setupSvg(container3Ref.current);

      if (paths1.length === 0 || paths2.length === 0 || paths3.length === 0) return;

      setIsReady(true);

      const pathsArray = [paths1, paths2, paths3];
      let currentIdx = 0;

      const playNext = () => {
        const currentPaths = pathsArray[currentIdx];
        const nextIdx = (currentIdx + 1) % 3;
        const nextPaths = pathsArray[nextIdx];

        const staggerC = Math.min(0.08, 3 / currentPaths.length);
        const staggerN = Math.min(0.08, 3 / nextPaths.length);

        const tl = gsap.timeline({ defaults: { duration: 1, ease: 'none' } });

        // If we are leaving the 3rd SVG, wait for the card to pull up first!
        if (currentIdx === 2) {
          tl.call(() => setShowCard(false));
          tl.to({}, { duration: 1.0 }); // 1 second delay for the card to get pulled up
        }

        // Animate out current
        tl.to(currentPaths, {
          duration: 1,
          drawSVG: 0,
          x: 'random(-200, 200)',
          y: 'random(-200, 200)',
          opacity: 0,
          fillOpacity: 0,
          ease: 'power2.in',
          stagger: staggerC
        });

        // Animate in next (Starts after current finishes)
        tl.to(nextPaths, { 
          duration: 1,
          drawSVG: '100%', 
          x: 0,
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          stagger: staggerN 
        }, ">")
        .to(nextPaths, { duration: 0.5, fillOpacity: 1, strokeOpacity: 0, stagger: staggerN }, '<20%');

        // If we just arrived at the 3rd SVG, drop the card NOW!
        if (nextIdx === 2) {
          tl.call(() => setShowCard(true));
        }

        // Custom wait and repeat logic (interruptible by user interaction)
        tl.call(() => {
          currentIdx = nextIdx;
          const waitTime = (nextIdx === 2) ? 8000 : 5000; // 3rd SVG stays longer

          const waitAndPlay = () => {
            if (nextIdx === 2 && isCardDraggingRef.current) {
              // User is holding the card! Wait 1 second and check again.
              timerRef.current = setTimeout(waitAndPlay, 1000);
            } else {
              playNext();
            }
          };

          timerRef.current = setTimeout(waitAndPlay, waitTime);
        });

        tlRef.current = tl;
      };

      const stagger1 = Math.min(0.08, 3 / paths1.length);
      const initialTl = gsap.timeline({ defaults: { duration: 1, ease: 'none' } });

      initialTl.to(paths1, {
        drawSVG: '100%',
        x: 0,
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        stagger: stagger1
      }, 0)
        .to(paths1, { duration: 0.5, fillOpacity: 1, strokeOpacity: 0, stagger: stagger1 }, '<20%');

      initialTl.add(() => playNext(), '+=5');
      tlRef.current = initialTl;

    }, 100);

    return () => {
      clearTimeout(timer);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (tlRef.current) tlRef.current.kill();
    };
  }, [svgs]);

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
        overflow: 'visible',
        position: 'relative',
      }}
    >
      <div
        ref={container1Ref}
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      />
      <div
        ref={container2Ref}
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      />
      <div
        ref={container3Ref}
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: '120px' }}
      />
      <div style={{ position: 'absolute', top: '10px', left: '-180px', width: '400px', zIndex: 10, pointerEvents: showCard ? 'auto' : 'none' }}>
        <HeroIdCard visible={showCard} onDragStateChange={(isDragging) => {
          isCardDraggingRef.current = isDragging;
        }} />
      </div>
    </div>
  );
});

export default CharaSvg;

