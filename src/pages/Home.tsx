/**
 * Homepage component with hero section, featured projects, testimonials, and CTA
 * Main landing page showcasing designer's profile and key information
 * - Staggered reveals
 * - Subtle parallax on profile image
 * - Testimonials section after Featured Work pulling comments from projects
 * - Brand logo is shown prominently; site title text is hidden per request
 */
import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, Star, Users, Award, Briefcase } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';
import { useInView } from '../hooks/useInView';
import Parallax from '../components/Parallax';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import Testimonials from '../components/Testimonials';
import SEO from '../components/SEO';

const HomePage: React.FC = () => {
  const { language } = useTheme();
  const { t } = useTranslation(language);

  // Stats (Awards removed as requested)
  const stats = [
    { icon: Briefcase, value: '9+', label: language === 'en' ? 'Years Experience' : 'سنوات خبرة' },
    { icon: Users, value: '200+', label: language === 'en' ? 'Happy Clients' : 'عميل سعيد' },
    { icon: Star, value: '500+', label: language === 'en' ? 'Projects Completed' : 'مشروع مكتمل' },
  ];

  const featuredProjects = [
    {
      id: 1,
      image: 'https://pub-cdn.sider.ai/u/U0AWH647XGE/web-coder/68867f69f2d3a0ac8dcde35e/resource/160a3f0c-bc9c-4a75-8e33-245300003eda.jpg',
    },
    {
      id: 2,
      image: 'https://pub-cdn.sider.ai/u/U0AWH647XGE/web-coder/68867f69f2d3a0ac8dcde35e/resource/4f105e41-42fd-4247-9128-198f8887e857.jpg',
    },
    {
      id: 3,
      image: 'https://pub-cdn.sider.ai/u/U0AWH647XGE/web-coder/68867f69f2d3a0ac8dcde35e/resource/45b52b6a-1af8-4ba9-9528-8ec3e506eb17.jpg',
    },
  ];

  // Staggered reveals
  const heroText = useInView({ threshold: 0.15, once: true });
  const heroActions = useInView({ threshold: 0.15, once: true });
  const heroStats = useInView({ threshold: 0.15, once: true });

  return (
    <>
      {/* Per-page SEO and Open Graph tags (does not override tab title) */}
      <SEO
        title="Eng.EmadAlddine"
        description={t('heroSubtitle')}
        image={brandLogo}
        url="https://emadalddine.com/"
        type="website"
        setTitle={false}
      />

      <div className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className={`space-y-8 ${language === 'ar' ? 'lg:order-2' : 'lg:order-1'}`}>
                <div
                  ref={heroText.ref as unknown as React.RefObject<HTMLDivElement>}
                  className={`space-y-4 transition-all duration-500 ${heroText.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                >
                  {/* Brand row: Logo only (title text removed per request) */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img
                      src={brandLogo}
                      alt="Brand Logo"
                      className="h-12 w-auto sm:h-14 object-contain drop-shadow-md"
                      loading="eager"
                    />
                  </div>

                  <h1 className="text-5xl lg:text-6xl font-bold text-[#8f1819] dark:text-[#bd7b6a] leading-tight">
                    {t('heroTitle').split(' ').map((word, index) => (
                      <span key={index} className="inline-block animate-fade-in-up" style={{ animationDelay: `${index * 0.08}s` }}>
                        {word}{' '}
                      </span>
                    ))}
                  </h1>
                  <p className="text-xl text-[#9c7860] dark:text-[#d9cab1]/80 leading-relaxed max-w-2xl">
                    {t('heroSubtitle')}
                  </p>
                </div>

                <div
                  ref={heroActions.ref as unknown as React.RefObject<HTMLDivElement>}
                  className={`flex flex-col sm:flex-row gap-4 transition-all duration-500 delay-100 ${heroActions.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                >
                  <Button asChild size="lg" className="bg-[#8f1819] hover:bg-[#bd7b6a] text-white active:brightness-95 transition-all duration-300 ease-in-out">
                    <Link to="/portfolio">
                      {t('seeMyWork')}
                      <ArrowRight className={`h-5 w-5 ${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-[#9c7860] text-[#9c7860] hover:bg-[#9c7860] hover:text-white dark:border-[#d9cab1] dark:text-[#d9cab1] dark:hover:bg-[#d9cab1] dark:hover:text-[#1a1a1a] bg-transparent active:brightness-95 transition-all duration-300 ease-in-out">
                    <Link to="/contact">
                      {t('hireMe')}
                    </Link>
                  </Button>
                </div>

                {/* Stats */}
                <div
                  ref={heroStats.ref as unknown as React.RefObject<HTMLDivElement>}
                  className={`grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 transition-all duration-500 delay-200 ${heroStats.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                >
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="text-center space-y-2">
                        <Icon className="h-8 w-8 text-[#8f1819] dark:text-[#bd7b6a] mx-auto" />
                        <div className="text-2xl font-bold text-[#8f1819] dark:text-[#bd7b6a]">
                          {stat.value}
                        </div>
                        <div className="text-sm text-[#9c7860] dark:text-[#d9cab1]/80">
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Content - Profile Image with parallax */}
              <Parallax speed={0.22} className={`relative ${language === 'ar' ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto">
                  {/* Background Decoration */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8f1819]/20 to-[#bd7b6a]/20 rounded-full animate-pulse"></div>
                  <div className="absolute inset-4 bg-gradient-to-r from-[#a76552]/30 to-[#9c7860]/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  
                  {/* Profile Image */}
                  <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-white dark:border-[#2d2d2d] shadow-2xl">
                    <img
                      src="https://pub-cdn.sider.ai/u/U0AWH647XGE/web-coder/68867f69f2d3a0ac8dcde35e/resource/855be7ed-4b6e-432c-8175-95813175c674.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-[#8f1819] text-white p-3 rounded-full shadow-lg animate-bounce">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-[#bd7b6a] text-white p-3 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }}>
                    <Star className="h-6 w-6" />
                  </div>
                </div>
              </Parallax>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-20 bg-white dark:bg-[#2d2d2d]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl font-bold text-[#8f1819] dark:text-[#bd7b6a]">
                {language === 'en' ? 'Lates Work' : 'آخر الأعمال'}
              </h2>
              <p className="text-xl text-[#9c7860] dark:text-[#d9cab1]/80 max-w-2xl mx-auto">
                {language === 'en' 
                  ? 'A showcase of my recent creative projects and design solutions'
                  : 'عرض لأحدث مشاريعي الإبداعية وحلول التصميم'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <div key={project.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-[#bd7b6a]">
                        {project.category}
                      </span>
                      <h3 className="text-lg font-bold">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-[#8f1819] hover:bg-[#bd7b6a] text-white active:brightness-95 transition-all duration-300 ease-in-out">
                <Link to="/portfolio">
                  {language === 'en' ? 'View All Projects' : 'عرض جميع المشاريع'}
                  <ArrowRight className={`h-5 w-5 ${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section (pop-up infographic cards) */}
        <Testimonials />

        {/* CTA Section */}
        <section className="py-20 bg-[#a76552] dark:bg-[#1a1a1a] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-4xl font-bold">
              {language === 'en' ? 'Ready to Start Your Project?' : 'جاهز لبدء مشروعك؟'}
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              {language === 'en' 
                ? "Let's work together to create something amazing. Contact me today to discuss your design needs."
                : 'دعنا نعمل معاً لإنشاء شيء مذهل. تواصل معي اليوم لمناقشة احتياجات التصميم الخاصة بك.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#a76552] bg-transparent active:brightness-95 transition-all duration-300 ease-in-out">
                <Link to="/contact">
                  {t('contact')}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#a76552] bg-transparent active:brightness-95 transition-all duration-300 ease-in-out">
                <a href="https://wa.me/+966504487308" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                  <WhatsAppIcon className={`h-5 w-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                  {language === 'en' ? 'WhatsApp' : 'واتساب'}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
