/**
 * Parallax component
 * Applies a subtle translateY based on scroll to create depth.
 * speed: -1..1 (positive moves slower than scroll, negative opposite)
 */
import React, { useEffect, useRef, useState } from 'react';

interface ParallaxProps {
  /** Parallax speed factor (recommended small values like 0.1 - 0.3) */
  speed?: number;
  /** Optional class names forwarded to wrapper */
  className?: string;
  /** Children to render */
  children: React.ReactNode;
}

const Parallax: React.FC<ParallaxProps> = ({ speed = 0.2, className = '', children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame: number | null = null;

    const onScroll = () => {
      if (frame != null) return;
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight || 0;
        // Calculate progress: element within viewport
        const progress = 1 - Math.min(Math.max((rect.top + rect.height) / (viewportH + rect.height), 0), 1);
        // Translate in px (small range)
        const translate = progress * (speed * 40); // max ~16px at speed 0.4
        setY(translate);
        frame = null;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ transform: `translateY(${y.toFixed(2)}px)`, willChange: 'transform' }}>
      {children}
    </div>
  );
};

export default Parallax;
