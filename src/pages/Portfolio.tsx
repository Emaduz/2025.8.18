/**
 * Portfolio page with per-project carousels
 * Each project card shows a swipeable/arrow-controlled preview slider
 * - Header and grid reveal animations
 * - Load More paging: show 9 initially, reveal more in steps of 9
 */
import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';
import ProjectCard from '../components/ProjectCard';
import { projects as allProjects } from '../data/projects';
import { useInView } from '../hooks/useInView';

type FilterKey = 'all' | 'logos' | 'branding' | 'print' | 'uiux';

const PAGE_SIZE = 9;

const PortfolioPage: React.FC = () => {
  const { language } = useTheme();
  const { t } = useTranslation(language);
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  const filters = [
    { key: 'all', label: { en: 'All Projects', ar: 'جميع المشاريع' } },
    { key: 'logos', label: { en: 'Logos', ar: 'الشعارات' } },
    { key: 'branding', label: { en: 'Branding', ar: 'العلامة التجارية' } },
    { key: 'print', label: { en: 'Print Design', ar: 'التصميم الطباعي' } },
    { key: 'uiux', label: { en: 'UI/UX', ar: 'واجهات المستخدم' } },
  ] as const;

  // Filter projects by category
  const filteredProjects = activeFilter === 'all'
    ? allProjects
    : allProjects.filter(p => p.category === activeFilter);

  // Visible slice (pagination)
  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const headerReveal = useInView({ threshold: 0.1, once: true });
  const gridReveal = useInView({ threshold: 0.1, once: true });

  /**
   * Reset visible count when filter changes
   */
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeFilter]);

  /**
   * Load next page of projects
   */
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerReveal.ref as unknown as React.RefObject<HTMLDivElement>}
          className={`text-center space-y-4 mb-16 transition-all duration-500 ease-in-out ${headerReveal.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <h1 className="text-5xl font-bold text-[#8f1819] dark:text-[#bd7b6a]">
            {t('portfolioTitle')}
          </h1>
          <p className="text-xl text-[#9c7860] dark:text-[#d9cab1]/80 max-w-3xl mx-auto">
            {t('portfolioSubtitle')}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key as FilterKey)}
              variant={activeFilter === filter.key ? 'default' : 'outline'}
              className={
                activeFilter === filter.key
                  ? 'bg-[#8f1819] hover:bg-[#bd7b6a] text-white active:brightness-95 transition-all duration-300 ease-in-out'
                  : 'border-[#9c7860] text-[#9c7860] hover:bg-[#9c7860] hover:text-white dark:border-[#d9cab1] dark:text-[#d9cab1] dark:hover:bg-[#d9cab1] dark:hover:text-[#1a1a1a] bg-transparent active:brightness-95 transition-all duration-300 ease-in-out'
              }
            >
              {filter.label[language]}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          ref={gridReveal.ref as unknown as React.RefObject<HTMLDivElement>}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ease-in-out ${gridReveal.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Load More Button */}
        {filteredProjects.length > visibleCount && (
          <div className="text-center mt-12">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              size="lg"
              className="border-[#9c7860] text-[#9c7860] hover:bg-[#9c7860] hover:text-white dark:border-[#d9cab1] dark:text-[#d9cab1] dark:hover:bg-[#d9cab1] dark:hover:text-[#1a1a1a] bg-transparent active:brightness-95 transition-all duration-300 ease-in-out"
            >
              {language === 'en' ? 'Load More Projects' : 'تحميل المزيد من المشاريع'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
