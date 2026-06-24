import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(options = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
  } = options;

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
}

/**
 * Wrapper component that applies scroll-triggered animations to its children.
 * Uses IntersectionObserver to detect viewport entry and applies staggered
 * fade-in-up animations.
 */
export function AnimateOnScroll({
  children,
  className = '',
  staggerIndex = 0,
  threshold = 0.15,
  as: Tag = 'div',
  style = {},
}) {
  const [ref, isVisible] = useScrollAnimation({ threshold });

  return (
    <Tag
      ref={ref}
      className={`animate-on-scroll ${isVisible ? 'is-visible' : ''} ${staggerIndex > 0 ? `stagger-${staggerIndex}` : ''} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}

export default AnimateOnScroll;
