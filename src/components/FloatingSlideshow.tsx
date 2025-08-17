/**
 * FloatingSlideshow component
 * Shows a floating, auto-playing carousel of provided images with controls
 * - Fixed position bottom-left to avoid the WhatsApp FAB on the right
 * - Collapsible with state persisted in localStorage
 * - Autoplay with pause-on-hover
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Pause, Play, Minus, Plus } from 'lucide-react';

/** Props for FloatingSlideshow */
interface FloatingSlideshowProps {
  /** List of image URLs to show in the slideshow */
  images: string[];
  /** Optional aria label for accessibility */
  ariaLabel?: string;
}

/** Utility to get/set localStorage safely */
const storage = {
  getBoolean: (key: string, fallback: boolean) => {
    try {
      const v = localStorage.getItem(key);
      if (v === null) return fallback;
      return v === 'true';
    } catch {
      return fallback;
    }
  },
  setBoolean: (key: string, value: boolean) => {
    try {
      localStorage.setItem(key, String(value));
    } catch {
      /* ignore */
    }
  }
};

const AUTOPLAY_INTERVAL = 3200;

const FloatingSlideshow: React.FC<FloatingSlideshowProps> = ({ images, ariaLabel = 'Portfolio slideshow preview' }) => {
  // Persist collapsed state so it remembers user's preference.
  const [collapsed, setCollapsed] = useState<boolean>(() => storage.getBoolean('portfolio_slideshow_collapsed', false));
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  /** Embla carousel setup */
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', speed: 6 });

  /** Timer handling for autoplay */
  const timerRef = useRef<number | null>(null);

  /** Start autoplay */
  const start = useCallback(() => {
    if (!emblaApi) return;
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      emblaApi.scrollNext();
    }, AUTOPLAY_INTERVAL);
  }, [emblaApi]);

  /** Stop autoplay */
  const stop = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /** Initialize autoplay when embla is ready */
  useEffect(() => {
    if (!emblaApi || !isPlaying) return;
    start();
    return () => stop();
  }, [emblaApi, isPlaying, start, stop]);

  /** Handlers */
  const onPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const onNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onMouseEnter = useCallback(() => {
    stop();
  }, [stop]);

  const onMouseLeave = useCallback(() => {
    if (isPlaying) start();
  }, [isPlaying, start]);

  /** Persist collapsed state when it changes */
  useEffect(() => {
    storage.setBoolean('portfolio_slideshow_collapsed', collapsed);
  }, [collapsed]);

  /** Deduplicate and sanitize image list */
  const slides = useMemo(() => {
    const unique = Array.from(new Set(images.filter(Boolean)));
    return unique.length ? unique : images;
  }, [images]);

  if (!slides?.length) return null;

  return (
    <div className="fixed left-4 bottom-4 z-40 pointer-events-auto select-none">
      {/* Collapsed pill */}
      {collapsed ? (
        <button
          aria-label="Expand portfolio slideshow"
          onClick={() => setCollapsed(false)}
          className="flex items-center gap-2 px-4 py-2 rounded-full shadow-xl border bg-white text-[#2d2d2d] dark:bg-[#2d2d2d] dark:text-[#d9cab1]"
        >
          <Plus className="h-4 w-4" />
          <span className="text-sm">Show preview</span>
        </button>
      ) : (
        <div
          className="w-[92vw] max-w-sm rounded-xl overflow-hidden shadow-2xl border bg-white text-[#2d2d2d] dark:bg-[#2d2d2d] dark:text-[#d9cab1]"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          aria-label={ariaLabel}
          role="region"
        >
          {/* Header controls */}
          <div className="flex items-center justify-between px-3 py-2 text-xs border-b border-black/10 dark:border-white/10">
            <span className="font-medium">Portfolio Preview</span>
            <div className="flex items-center gap-1">
              <button
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                onClick={() => {
                  if (isPlaying) {
                    setIsPlaying(false);
                    stop();
                  } else {
                    setIsPlaying(true);
                    start();
                  }
                }}
                className="p-1.5 rounded-md hover:bg-[#d9cab1] dark:hover:bg-[#1a1a1a] transition-colors"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button
                aria-label="Collapse slideshow"
                onClick={() => setCollapsed(true)}
                className="p-1.5 rounded-md hover:bg-[#d9cab1] dark:hover:bg-[#1a1a1a] transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {slides.map((src, idx) => (
                  <div key={idx} className="min-w-0 flex-[0_0_100%]">
                    <div className="aspect-[4/3] bg-[#d9cab1] dark:bg-[#1a1a1a] image-zoom">
                      <img src={src} alt={`Project ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prev / Next */}
            <div className="absolute inset-0 flex items-center justify-between px-1">
              <button
                aria-label="Previous slide"
                onClick={onPrev}
                className="m-1 p-2 rounded-full bg-white/80 dark:bg-black/40 hover:bg-white dark:hover:bg-black text-[#8f1819] backdrop-blur-sm shadow"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                aria-label="Next slide"
                onClick={onNext}
                className="m-1 p-2 rounded-full bg-white/80 dark:bg.black/40 hover:bg-white dark:hover:bg-black text-[#8f1819] backdrop-blur-sm shadow"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Footer hint */}
          <div className="px-3 py-2 text-[11px] text-[#9c7860] dark:text-[#d9cab1]/80">
            Tip: Hover to pause • Drag to navigate
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingSlideshow;
