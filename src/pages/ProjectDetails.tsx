/**
 * Project Details page
 * Shows a larger carousel and full information for a single project
 * - Fade-in sections
 * - Click image to open lightbox with fade-in
 * - Images now repeated 5x (same behavior as cards)
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ChevronLeft, ChevronRight, Tag, X } from 'lucide-react';
import { getProjectById } from '../data/projects';
import { Button } from '../components/ui/button';
import { useTheme } from '../contexts/ThemeContext';
import { useInView } from '../hooks/useInView';
import { localize } from '../utils/localize';

/**
 * buildRepeatedSlides
 * Repeats the provided images array `times` to extend the carousel length.
 * Matches the behavior used on project cards.
 */
function buildRepeatedSlides(images: string[], times: number): string[] {
  const base = images && images.length > 0 ? images : [];
  return Array.from({ length: times }).flatMap(() => base);
}

const ProjectDetailsPage: React.FC = () => {
  const params = useParams();
  const id = Number(params.id);
  const project = getProjectById(id);
  const { language } = useTheme();

  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selected, setSelected] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const headerReveal = useInView({ threshold: 0.1, once: true });
  const galleryReveal = useInView({ threshold: 0.1, once: true });
  const metaReveal = useInView({ threshold: 0.1, once: true });

  /**
   * Sync selected index with Embla carousel
   */
  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on('select', onSelect);
    onSelect();
  }, [embla, onSelect]);

  if (!project) {
    return (
      <div className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-[#9c7860] dark:text-[#d9cab1]/80">
            {language === 'en' ? 'Project not found.' : 'المشروع غير موجود.'}
          </p>
          <Button asChild className="mt-6 bg-[#8f1819] hover:bg-[#bd7b6a] text-white">
            <Link to="/portfolio">{language === 'en' ? 'Back to Portfolio' : 'العودة للأعمال'}</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Localized strings (defensive)
  const title = localize(project.title, language);
  const description = localize(project.description, language);

  // Repeat images 5x for the details carousel as requested
  const slides = useMemo(() => buildRepeatedSlides(project.images, 5), [project.images]);

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back */}
        <div className="mb-6">
          <Button asChild variant="outline" className="bg-transparent">
            <Link to="/portfolio" className="inline-flex items-center">
              <ArrowLeft className={`h-4 w-4 ${language === 'ar' ? 'ml-2 rotate-180' : 'mr-2'}`} />
              {language === 'en' ? 'Back to Portfolio' : 'العودة للأعمال'}
            </Link>
          </Button>
        </div>

        {/* Title */}
        <div
          ref={headerReveal.ref as unknown as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-500 ease-in-out ${headerReveal.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <h1 className="text-4xl font-bold text-[#8f1819] dark:text-[#bd7b6a] mb-4">
            {title}
          </h1>
          <p className="text-lg text-[#9c7860] dark:text-[#d9cab1]/80 mb-8">
            {description}
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={galleryReveal.ref as unknown as React.RefObject<HTMLDivElement>}
          className={`relative mb-8 transition-all duration-500 ease-in-out delay-100 ${galleryReveal.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex">
              {slides.map((src, idx) => (
                <div key={idx} className="min-w-0 flex-[0_0_100%]">
                  <button
                    type="button"
                    onClick={() => setLightboxSrc(src)}
                    className="block w-full text-left"
                    aria-label="Open image"
                  >
                    <div className="aspect-[16/9] bg-[#d9cab1] dark:bg-[#1a1a1a]">
                      <img src={src} alt={`${title} - ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-between px-2">
            <button
              aria-label="Previous"
              onClick={() => embla?.scrollPrev()}
              className="m-1 p-3 rounded-full bg-white/90 dark:bg-black/40 hover:bg-white dark:hover:bg-black text-[#8f1819] shadow"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next"
              onClick={() => embla?.scrollNext()}
              className="m-1 p-3 rounded-full bg-white/90 dark:bg-black/40 hover:bg-white dark:hover:bg-black text-[#8f1819] shadow"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-4 rounded-full ${i === selected ? 'bg-[#8f1819]' : 'bg-[#d9cab1] dark:bg-[#1a1a1a]'}`}
              />
            ))}
          </div>
        </div>

        {/* Meta */}
        <div
          ref={metaReveal.ref as unknown as React.RefObject<HTMLDivElement>}
          className={`bg-white dark:bg-[#2d2d2d] rounded-2xl p-6 shadow-lg transition-all duration-500 ease-in-out delay-200 ${metaReveal.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="flex flex-wrap gap-2 items-center">
            {project.tags.map((tag, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-[#d9cab1] dark:bg-[#1a1a1a] text-[#8f1819] dark:text-[#bd7b6a] rounded-full text-sm">
                <Tag className="h-4 w-4" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxSrc(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxSrc(null)}
              aria-label="Close"
              className="absolute -top-12 right-0 text-white/90 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full aspect-[16/9] rounded-xl overflow-hidden">
              <img src={lightboxSrc} alt="Preview" className="w-full h-full object-contain bg-black" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsPage;
