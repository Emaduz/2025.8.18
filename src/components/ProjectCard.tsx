/**
 * ProjectCard component
 * Renders a single project with an embedded, swipeable carousel and action button
 * - On-scroll reveal
 * - Hover lift + overlay reveal
 * - Images are repeated 5x to create a longer carousel per request
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Project } from '../data/projects';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router';
import { useInView } from '../hooks/useInView';
import { localize } from '../utils/localize';

/** Props for ProjectCard */
interface ProjectCardProps {
  /** The project to render */
  project: Project;
}

/** Dot indicator component */
const Dot: React.FC<{ active: boolean; onClick: () => void }> = ({ active, onClick }) => (
  <button
    aria-label="Slide indicator"
    onClick={onClick}
    className={`h-1.5 w-4 rounded-full transition-colors ${active ? 'bg-[#8f1819]' : 'bg-[#d9cab1] dark:bg-[#1a1a1a]'}`}
  />
);

/**
 * Build repeated slides array
 * Repeats the project's images 5 times to satisfy the requirement.
 */
function buildRepeatedSlides(images: string[], times: number): string[] {
  // Defensive: ensure at least one placeholder if array is empty
  const base = images && images.length > 0 ? images : [];
  // Repeat N times and flatten
  return Array.from({ length: times }).flatMap(() => base);
}

/** Project card with carousel */
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { language } = useTheme();
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start', skipSnaps: false, dragFree: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.15, once: true });

  // Localized strings (defensive)
  const title = localize(project.title, language);
  const description = localize(project.description, language);

  /** Memoize slides: repeat images 5x */
  const slides = useMemo(() => buildRepeatedSlides(project.images, 5), [project.images]);

  /** Keep selected index in sync with Embla */
  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on('select', onSelect);
    onSelect();
  }, [embla, onSelect]);

  /** Carousel controls */
  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);
  const scrollTo = useCallback((i: number) => embla?.scrollTo(i), [embla]);

  return (
    <div
      ref={ref as unknown as React.RefObject<HTMLDivElement>}
      className={`group relative bg-white dark:bg-[#2d2d2d] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 
      ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} hover:shadow-2xl hover:scale-[1.02]`}
    >
      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((src, idx) => (
              <div key={idx} className="min-w-0 flex-[0_0_100%]">
                <div className="aspect-[4/3] bg-[#d9cab1] dark:bg-[#1a1a1a]">
                  <img src={src} alt={`${title} - ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* On-hover overlay reveal */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-1">
          <button
            aria-label="Previous"
            onClick={scrollPrev}
            className="m-1 p-2 rounded-full bg-white/90 dark:bg-black/40 hover:bg-white dark:hover:bg-black text-[#8f1819] shadow transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next"
            onClick={scrollNext}
            className="m-1 p-2 rounded-full bg-white/90 dark:bg-black/40 hover:bg-white dark:hover:bg-black text-[#8f1819] shadow transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-1.5">
          {slides.map((_, i) => (
            <Dot key={i} active={i === selectedIndex} onClick={() => scrollTo(i)} />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-[#8f1819] dark:text-[#bd7b6a]">
            {title}
          </h3>
          <p className="text-[#9c7860] dark:text-[#d9cab1]/80 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium bg-[#d9cab1] dark:bg-[#1a1a1a] text-[#8f1819] dark:text-[#bd7b6a] rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Button asChild className="w-full bg-[#8f1819] hover:bg-[#bd7b6a] text-white active:brightness-95 transition-all duration-300 ease-in-out">
          <Link to={`/portfolio/${project.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            {language === 'en' ? 'View Project' : 'عرض المشروع'}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
