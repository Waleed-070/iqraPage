import { useEffect, useRef } from 'react';
import './ScrollLine.css';

export default function ScrollLine() {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    // Get the total length of the path
    const length = path.getTotalLength();

    // Set up the initial styles to hide the line
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    let currentScroll = 0;
    let targetScroll = 0;
    let animationFrameId;

    const updateScroll = () => {
      const container = pathRef.current.closest('.scroll-line-container');
      if (!container) return;

      const rect = container.getBoundingClientRect();
      
      // Start drawing when the top of the container enters the bottom 25% of the viewport
      const triggerPoint = window.innerHeight * 0.75; 
      
      // How far we've scrolled past the trigger point
      const scrolledPastTrigger = triggerPoint - rect.top;
      
      // The total distance to draw the entire line is the height of the container
      const totalDrawDistance = rect.height;
      
      // Calculate percentage
      let scrollPercent = totalDrawDistance > 0 ? scrolledPastTrigger / totalDrawDistance : 0;
      
      // Clamp between 0 and 1
      targetScroll = Math.max(0, Math.min(1, scrollPercent));
    };

    const drawLine = () => {
      // Linear Interpolation (Lerp) for smooth easing
      // current = current + (target - current) * ease
      currentScroll += (targetScroll - currentScroll) * 0.08;

      // Calculate the offset (length down to 0)
      const drawLength = length * currentScroll;
      path.style.strokeDashoffset = length - drawLength;

      animationFrameId = requestAnimationFrame(drawLine);
    };

    // Attach listener and start animation loop
    window.addEventListener('scroll', updateScroll, { passive: true });
    
    // Initial call to set the correct starting position
    updateScroll();
    drawLine();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="scroll-line-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 1600"
        preserveAspectRatio="none"
        className="scroll-line-svg"
      >
        <path
          ref={pathRef}
          d="M 200 0 
             C 200 40, 360 40, 360 100 
             C 360 160, 120 120, 80 220 
             C 40 320, 280 280, 280 360 
             C 280 440, 60 400, 60 500 
             C 60 600, 320 540, 320 660 
             C 320 780, 100 720, 100 840 
             C 100 960, 300 920, 300 1020 
             C 300 1120, 80 1080, 80 1200 
             C 80 1320, 340 1280, 340 1380
             C 340 1480, 120 1440, 120 1540
             C 120 1590, 220 1600, 220 1600"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="scroll-path"
        />
      </svg>
    </div>
  );
}
