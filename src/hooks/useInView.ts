/**
 * useInView hook
 * Returns a ref and a boolean indicating whether the element is in view.
 * If once is true, it will not revert to false after first intersection.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

interface Options extends IntersectionObserverInit {
  /** Observe once and freeze at true after first enter */
  once?: boolean;
}

export function useInView(options: Options = { threshold: 0.15, once: true }) {
  const { once = true, ...observerOptions } = options;
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  const setRef = useCallback((node: HTMLElement | null) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.unobserve(entry.target);
        } else if (!once) {
          setInView(false);
        }
      });
    }, observerOptions);

    io.observe(el);
    return () => io.disconnect();
  }, [observerOptions.root, observerOptions.rootMargin, observerOptions.threshold, once]);

  return { ref: setRef, inView };
}
