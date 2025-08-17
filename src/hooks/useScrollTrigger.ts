/**
 * useScrollTrigger hook
 * Returns a boolean when the page scrollY passes a threshold.
 * Uses rAF to avoid jank during scroll.
 */
import { useEffect, useRef, useState } from 'react';

export function useScrollTrigger(threshold = 10) {
  const [triggered, setTriggered] = useState<boolean>(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset;
        setTriggered(y > threshold);
        ticking.current = false;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return triggered;
}
