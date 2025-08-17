/**
 * Testimonials section
 * Displays customer opinions mapped from project comments as animated pop-up infographic cards.
 * - Pulls data from projects.ts to stay in sync with Portfolio/Details
 * - Horizontal scroll with optional arrow controls
 * - Fade/scale-in animations and subtle hover lift
 */

import React, { useMemo, useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../data/projects';
import { useTheme } from '../contexts/ThemeContext';
import { localize } from '../utils/localize';
import { Button } from './ui/button';
import { useInView } from '../hooks/useInView';

/** Derived opinion item combining project title and its localized comment */
interface OpinionItem {
  projectId: number;
  projectTitle: string;
  comment: string;
}

/**
 * Scroll the container horizontally by an offset
 */
function scrollByAmount(container: HTMLDivElement | null, amount: number) {
  if (!container) return;
  container.scrollBy({ left: amount, behavior: 'smooth' });
}

/**
 * Single pop-up card representing a testimonial opinion
 */
const OpinionCard: React.FC<{ item: OpinionItem; index: number }> = ({ item, index }) => {
  const reveal = useInView({ threshold: 0.15, once: true });

  return (
    <div
      ref={reveal.ref as unknown as React.RefObject<HTMLDivElement>}
      className={[
        'relative flex-shrink-0 snap-center w-[280px] sm:w-[320px] md:w-[360px]',
        'rounded-2xl shadow-xl bg-white dark:bg-[#2d2d2d] border border-black/5 dark:border-white/10',
        'px-5 py-6 mr-5',
        'transition-all duration-500',
        reveal.inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-[0.98]',
        'hover:-translate-y-1 hover:shadow-2xl',
      ].join(' ')}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Decorative tail to mimic a pop-up balloon */}
      <div className="absolute -bottom-2 left-8 h-4 w-4 rotate-45 bg-white dark:bg-[#2d2d2d] border-l border-b border-black/5 dark:border-white/10" />

      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-[#8f1819]/10 dark:bg-[#bd7b6a]/10 flex items-center justify-center text-[#8f1819] dark:text-[#bd7b6a]">
          <Quote className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-[#8f1819] dark:text-[#bd7b6a] truncate">
            {item.projectTitle}
          </h3>
          <p className="mt-2 text-sm text-[#9c7860] dark:text-[#d9cab1]/80 leading-relaxed">
            {item.comment}
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Testimonials list with horizontal scroll and controls
 */
const Testimonials: React.FC = () => {
  const { language } = useTheme();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionReveal = useInView({ threshold: 0.1, once: true });

  // Build opinions from projects' comments, localized
  const opinions: OpinionItem[] = useMemo(() => {
    const result: OpinionItem[] = [];
    for (const p of projects) {
      const title = localize(p.title, language);
      const comments = p.comments || [];
      for (const c of comments) {
        result.push({
          projectId: p.id,
          projectTitle: title,
          comment: c[language],
        });
      }
    }
    return result;
  }, [language]);

  // Scroll amounts responsive to viewport width
  const handlePrev = () => scrollByAmount(containerRef.current, -Math.min(window.innerWidth * 0.8, 600));
  const handleNext = () => scrollByAmount(containerRef.current, Math.min(window.innerWidth * 0.8, 600));

  // Localized title
  const sectionTitle = language === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Customers Say';

  return (
    <section
      ref={sectionReveal.ref as unknown as React.RefObject<HTMLElement>}
      className={[
        'relative py-20 bg-[#fff9f3] dark:bg-[#1f1f1f]',
        'transition-all duration-500',
        sectionReveal.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold text-[#8f1819] dark:text-[#bd7b6a]">
            {sectionTitle}
          </h2>
          <p className="text-[#9c7860] dark:text-[#d9cab1]/80 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'آراء حقيقية مرتبطة بكل مشروع — تُعرض كبطاقات منبثقة جذابة.'
              : 'Real opinions tied to each project — presented as engaging pop-up cards.'}
          </p>
        </div>

        {/* Scrollable Strip */}
        <div className="relative">
          {/* Left Control */}
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
            <Button
              onClick={handlePrev}
              variant="outline"
              size="icon"
              className="pointer-events-auto bg-transparent h-10 w-10 rounded-full border-[#9c7860] text-[#9c7860] hover:bg-[#9c7860] hover:text-white dark:border-[#d9cab1] dark:text-[#d9cab1] dark:hover:bg-[#d9cab1] dark:hover:text-[#1a1a1a] shadow-sm"
              aria-label={language === 'ar' ? 'السابق' : 'Previous'}
              title={language === 'ar' ? 'السابق' : 'Previous'}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          {/* Cards Container */}
          <div
            ref={containerRef}
            className="overflow-x-auto no-scrollbar snap-x snap-mandatory flex items-stretch py-2 pr-5 -mr-5"
          >
            {opinions.map((item, idx) => (
              <OpinionCard key={`${item.projectId}-${idx}`} item={item} index={idx} />
            ))}
          </div>

          {/* Right Control */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
            <Button
              onClick={handleNext}
              variant="outline"
              size="icon"
              className="pointer-events-auto bg-transparent h-10 w-10 rounded-full border-[#9c7860] text-[#9c7860] hover:bg-[#9c7860] hover:text-white dark:border-[#d9cab1] dark:text-[#d9cab1] dark:hover:bg-[#d9cab1] dark:hover:text-[#1a1a1a] shadow-sm"
              aria-label={language === 'ar' ? 'التالي' : 'Next'}
              title={language === 'ar' ? 'التالي' : 'Next'}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;