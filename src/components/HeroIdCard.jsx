import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import './HeroIdCard.css';
import heroImg from '../assets/hero-student.png';

gsap.registerPlugin(Draggable);

export default function HeroIdCard() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const ropeLeftRef = useRef(null);
  const ropeRightRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const ropeLeft = ropeLeftRef.current;
    const ropeRight = ropeRightRef.current;
    const container = containerRef.current;
    
    if (!card || !ropeLeft || !ropeRight || !container) return;

    const cardWidth = 200;
    
    // Position rope pivot near the top-center of the container
    let fixedTop = {
      x: container.clientWidth / 2,
      y: -800 // High up to look like it comes from off-screen
    };

    let cardStart = {
      x: fixedTop.x - cardWidth / 2,
      y: -400
    };

    let cardFinal = {
      x: fixedTop.x - cardWidth / 2,
      y: 50 // Final resting Y position in container
    };

    // Set card above screen initially
    gsap.set(card, {
      x: cardStart.x,
      y: cardStart.y
    });

    const updateRope = () => {
      const cardX = gsap.getProperty(card, "x");
      const cardY = gsap.getProperty(card, "y");
      
      const centerX = cardX + cardWidth / 2;
      const topY = cardY - 15; // Connects to the lanyard clip above the card
      
      const spread = 150; // How far apart the ribbons are at the top

      // Vector from anchor to card
      const vecX = centerX - fixedTop.x;
      const vecY = topY - fixedTop.y;
      
      // Mathematical Pendulum Angle
      // atan2(y,x) gives angle in radians. Straight down is PI/2.
      const pendulumAngle = Math.atan2(vecY, vecX) - Math.PI/2;
      const targetRotationZ = pendulumAngle * (180 / Math.PI);

      // Realistic Ribbon Stretch & Contract
      // Calculate tension distance compared to resting distance
      const currentDistance = Math.sqrt(vecX*vecX + vecY*vecY);
      const restVecX = (cardFinal.x + cardWidth / 2) - fixedTop.x;
      const restVecY = (cardFinal.y - 15) - fixedTop.y;
      const restDistance = Math.sqrt(restVecX*restVecX + restVecY*restVecY);
      
      // Ribbon gets thinner as it stretches, thicker as it compresses
      const thickness = Math.max(2, Math.min(24, 18 * Math.pow(restDistance / currentDistance, 1.5)));
      
      // 3D Tilt based on Y stretch
      const targetRotationX = (cardY - cardFinal.y) * -0.08; 
      
      // Rotate mathematically around the lanyard clip
      gsap.set(card, { 
        rotationZ: targetRotationZ, 
        rotateX: targetRotationX,
        transformOrigin: "50% -15px",
        transformPerspective: 800 
      });
      ropeLeft.setAttribute("x1", fixedTop.x - spread);
      ropeLeft.setAttribute("y1", fixedTop.y);
      ropeLeft.setAttribute("x2", centerX);
      ropeLeft.setAttribute("y2", topY);
      ropeLeft.setAttribute("stroke-width", thickness);

      ropeRight.setAttribute("x1", fixedTop.x + spread);
      ropeRight.setAttribute("y1", fixedTop.y);
      ropeRight.setAttribute("x2", centerX);
      ropeRight.setAttribute("y2", topY);
      ropeRight.setAttribute("stroke-width", thickness);
    };

    // Initial drop animation
    gsap.to(card, {
      x: cardFinal.x,
      y: cardFinal.y,
      duration: 1.2,
      ease: "bounce.out",
      onUpdate: updateRope
    });

    Draggable.create(card, {
      type: "x,y",
      edgeResistance: 0.6,
      bounds: container,
      inertia: true,
      onPress: () => {
        gsap.killTweensOf(card);
        updateRope();
      },
      onDrag: () => {
        // Manual twist while dragging
        const dx = gsap.getProperty(card, "x") - cardFinal.x;
        gsap.set(card, { rotateY: dx * 0.15 });
        updateRope();
      },
      onRelease: function () {
        // Completely asynchronous, chaotic physics!
        
        // Y-axis: Massive irregular jumps up and down
        gsap.to(card, {
          y: cardFinal.y,
          duration: 4.5,
          ease: "elastic.out(3.5, 0.1)", // Extreme overshoot and rapid bouncing
          onUpdate: updateRope
        });

        // X-axis: Wide, erratic swinging left and right
        gsap.to(card, {
          x: cardFinal.x,
          duration: 3.2,
          ease: "elastic.out(1.2, 0.25)" 
        });
        
        // Independent erratic twisting on Y axis
        gsap.to(card, {
          rotateY: 0,
          duration: 3.8,
          ease: "elastic.out(2.5, 0.15)"
        });
      }
    });

    // Update on resize
    const handleResize = () => {
      fixedTop.x = container.clientWidth / 2;
      cardFinal.x = fixedTop.x - cardWidth / 2;
      updateRope();
    };

    window.addEventListener("resize", handleResize);
    
    // Initial rope update to ensure it's drawn correctly if bounds aren't ready instantly
    setTimeout(updateRope, 50);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="hero-id-card-wrapper" ref={containerRef}>
      <svg className="id-rope-svg" width="100%" height="100%">
        <defs>
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b38a36" />
            <stop offset="50%" stopColor="#e8c368" />
            <stop offset="100%" stopColor="#8c6a26" />
          </linearGradient>
          <filter id="ribbonShadow">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.4" />
          </filter>
        </defs>
        <line ref={ropeLeftRef} stroke="url(#ribbonGrad)" strokeWidth="18" filter="url(#ribbonShadow)" />
        <line ref={ropeRightRef} stroke="url(#ribbonGrad)" strokeWidth="18" filter="url(#ribbonShadow)" />
      </svg>

      <div className="id-card" ref={cardRef}>
        <div className="id-card-face id-card-front">
          <img src={heroImg} alt="Student" className="id-photo" />
          <div className="id-name">Math Expert</div>
          <div className="id-role">1-to-1 Tuition</div>
          <div className="id-barcode">||| || ||| | ||</div>
        </div>
        <div className="id-card-face id-card-back">
          <div className="mag-strip"></div>
          <div className="back-text">If found, please return to Iqra</div>
        </div>
      </div>
    </div>
  );
}
