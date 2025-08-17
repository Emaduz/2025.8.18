/**
 * About page component displaying designer's background and experience
 * Shows biography, education, skills (icon-based), and professional experience
 */
import React from 'react';
import {
  Calendar,
  MapPin,
  Award,
  GraduationCap,
  Briefcase,
  PenTool,
  Image as ImageIcon,
  Layers,
  Type,
  Printer,
  Smartphone,
  Box,
  Palette,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';

/**
 * Skill item interface for icon-based skills
 */
interface SkillItem {
  /** Unique key for the skill */
  key: string;
  /** Localized name */
  name: { en: string; ar: string };
  /** Icon component from lucide-react */
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const AboutPage: React.FC = () => {
  const { language } = useTheme();
  const { t } = useTranslation(language);

  // Experiences list (latest first, no date ranges; "Present" shown only for ongoing roles)
  const experiences = [
    {
      title: { en: 'Volunteer Infographic Designer', ar: 'مصمم إنفوجرافيك متطوع' },
      company: { en: 'Al Masjid Al Nabawi', ar: 'المسجد النبوي' },
      status: { en: 'Present', ar: 'الحاضر' },
      location: 'Al-Madina, Saudi Arabia',
      description: {
        en: "Design volunteer infographics for awareness and guidance campaigns at the Prophet's Mosque, ensuring clarity and visual impact.",
        ar: 'تصميم إنفوجرافيك تطوعي لحملات التوعية والإرشاد في المسجد النبوي، مع ضمان الوضوح والأثر البصري.',
      },
    },
    {
      title: { en: 'Graphic Designer & Printing Specialist', ar: 'مصمم جرافيك وأخصائي طباعة' },
      company: { en: 'Al Fanoos Trading Co.', ar: 'شركة الفانوس التجارية' },
      status: { en: 'Present', ar: 'الحاضر' },
      location: 'Al-Madina, Saudi Arabia',
      description: {
        en: 'Design and supervise print-ready marketing materials, optimize prepress workflows, and ensure color-accurate outputs across offset and digital.',
        ar: 'تصميم والإشراف على مواد تسويقية جاهزة للطباعة، وتحسين عمليات ما قبل الطباعة، وضمان دقة الألوان عبر الطباعة الأوفست والرقمية.',
      },
    },
    {
      title: { en: 'Senior Graphic Designer', ar: 'مصمم جرافيك أول' },
      company: { en: 'Yemen Palestine Charity Foundation', ar: 'مؤسسة يمن فلسطين الخيرية' },
      location: 'Yemen',
      description: {
        en: 'Led creative direction and produced campaign visuals for humanitarian initiatives while maintaining brand consistency.',
        ar: 'قاد التوجيه الإبداعي وأنتج مواد حملات للمبادرات الإنسانية مع الحفاظ على اتساق الهوية.',
      },
    },
    {
      title: { en: 'Media & Communication Manager', ar: 'مدير الإعلام والاتصال' },
      company: { en: 'Mozn Charity Foundation', ar: 'مؤسسة مزن الخيرية' },
      location: 'Yemen',
      description: {
        en: 'Managed media strategy, content production, and outreach; coordinated designers and volunteers to deliver campaigns.',
        ar: 'إدارة استراتيجية الإعلام وإنتاج المحتوى والتواصل؛ تنسيق عمل المصممين والمتطوعين لتنفيذ الحملات.',
      },
    },
    {
      title: { en: 'Freelance Designer', ar: 'مصمم مستقل' },
      company: { en: 'Self-Employed', ar: 'عمل حر' },
      status: { en: 'Present', ar: 'الحاضر' },
      location: { en: 'Remote', ar: 'عن بُعد' },
      description: {
        en: 'Delivered custom design solutions for clients across various industries. Built strong client relationships and maintained high satisfaction rates.',
        ar: 'تقديم حلول تصميم مخصصة للعملاء في مختلف الصناعات. بناء علاقات قوية مع العملاء والحفاظ على معدلات رضا عالية.',
      },
    },
  ];

  // Education list
  const education = [
    { title: { en: 'Bachelor of Graphic & Multimedia', ar: 'بكالوريوس في الجرافيك والوسائط المتعددة' }, year: '2021' },
    { title: { en: 'TOFEL ITP Certificate', ar: 'شهادة توفل ITP' }, year: '2021' },
    { title: { en: 'Diplôme français junior', ar: 'دبلوم فرنسي مبتدئ' }, year: '2022' },
    { title: { en: 'English Advanced Diploma', ar: 'دبلوم اللغة الإنجليزية المتقدم' }, year: '2018' },
    { title: { en: 'Designing Diploma', ar: 'دبلوم التصميم' }, year: '2016' },
    { title: { en: 'ICDL Certificate', ar: 'شهادة ICDL' }, year: '2016' },
  ];

  /**
   * Icon-based skills (no percentages)
   * Each tile shows an icon and localized label
   */
  const skills: SkillItem[] = [
    { key: 'adobe', name: { en: 'Adobe Creative Suite', ar: 'حزمة أدوبي' }, icon: ImageIcon },
    { key: 'vector', name: { en: 'Vector & Logo', ar: 'فيكتور والشعارات' }, icon: PenTool },
    { key: '3d', name: { en: '3D Modeling', ar: 'نمذجة ثلاثية الأبعاد' }, icon: Box },
    { key: 'uiux', name: { en: 'UI/UX Design', ar: 'تصميم واجهات المستخدم' }, icon: Layers },
    { key: 'typography', name: { en: 'Typography & Branding', ar: 'الخطوط وهوية العلامة' }, icon: Type },
    { key: 'print', name: { en: 'Print Design', ar: 'التصميم الطباعي' }, icon: Printer },
    { key: 'mobile', name: { en: 'Mobile App UI', ar: 'واجهات تطبيقات' }, icon: Smartphone },
    { key: 'branding', name: { en: 'Brand Systems', ar: 'أنظمة العلامات' }, icon: Palette },
  ];

  const languages = [
    { name: { en: 'Arabic', ar: 'العربية' }, level: { en: 'Mother Tongue', ar: 'اللغة الأم' }, percentage: 100 },
    { name: { en: 'English', ar: 'الإنجليزية' }, level: { en: 'Advanced', ar: 'متقدم' }, percentage: 90 },
    { name: { en: 'French', ar: 'الفرنسية' }, level: { en: 'Elementary', ar: 'مبتدئ' }, percentage: 40 },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl font-bold text-[#8f1819] dark:text-[#bd7b6a]">
            {t('aboutTitle')}
          </h1>
          <p className="text-xl text-[#9c7860] dark:text-[#d9cab1]/80 max-w-3xl mx-auto">
            {language === 'en'
              ? 'Passionate designer with 9+ years of experience creating impactful visual solutions'
              : 'مصمم شغوف بخبرة تزيد عن 9 سنوات في إنشاء حلول بصرية مؤثرة'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Profile & Bio */}
          <div className="lg:col-span-1 space-y-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-full max-w-sm mx-auto">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://pub-cdn.sider.ai/u/U0AWH647XGE/web-coder/68867f69f2d3a0ac8dcde35e/resource/855be7ed-4b6e-432c-8175-95813175c674.jpg"
                    alt="EmadAlddine Ismael"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="bg-white dark:bg-[#2d2d2d] rounded-2xl p-6 shadow-lg space-y-4">
              <h3 className="text-xl font-bold text-[#8f1819] dark:text-[#bd7b6a] mb-4">
                {language === 'en' ? 'Personal Information' : 'المعلومات الشخصية'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <MapPin className="h-5 w-5 text-[#9c7860] dark:text-[#bd7b6a]" />
                  <span className="text-[#9c7860] dark:text-[#d9cab1]/80">Al-Madina, Saudi Arabia</span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Calendar className="h-5 w-5 text-[#9c7860] dark:text-[#bd7b6a]" />
                  <span className="text-[#9c7860] dark:text-[#d9cab1]/80">
                    {language === 'en' ? 'Yemeni Nationality' : 'الجنسية اليمنية'}
                  </span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Award className="h-5 w-5 text-[#9c7860] dark:text-[#bd7b6a]" />
                  <span className="text-[#9c7860] dark:text-[#d9cab1]/80">
                    {language === 'en' ? '9+ Years Experience' : '9+ سنوات خبرة'}
                  </span>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white dark:bg-[#2d2d2d] rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#8f1819] dark:text-[#bd7b6a] mb-6">
                {language === 'en' ? 'Languages' : 'اللغات'}
              </h3>
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-[#9c7860] dark:text-[#d9cab1]">
                        {lang.name[language]}
                      </span>
                      <span className="text-sm text-[#9c7860] dark:text-[#d9cab1]/80">
                        {lang.level[language]}
                      </span>
                    </div>
                    <div className="w-full bg-[#d9cab1] dark:bg-[#1a1a1a] rounded-full h-2">
                      <div
                        className="bg-[#8f1819] dark:bg-[#bd7b6a] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${lang.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Experience & Skills */}
          <div className="lg:col-span-2 space-y-12">
            {/* Bio */}
            <div className="bg-white dark:bg-[#2d2d2d] rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-[#8f1819] dark:text-[#bd7b6a] mb-6">
                {language === 'en' ? 'About Me' : 'نبذة عني'}
              </h3>
              <p className="text-[#9c7860] dark:text-[#d9cab1]/80 leading-relaxed text-lg">
                {language === 'en'
                  ? 'Creative and experienced Branding and Logo Designer with over 9 years of expertise in developing impactful visual identities. Skilled in managing design teams, fostering collaboration, and ensuring the successful execution of creative projects. Proficient in delivering professional logo designs, brand guidelines, and cohesive marketing materials. Capable of taking on senior-level roles as a Senior Graphic Designer to lead projects and mentor junior designers. Passionate about design innovation and achieving excellence in every project.'
                  : 'مصمم علامات تجارية وشعارات مبدع وذو خبرة تزيد عن 9 سنوات في تطوير الهويات البصرية المؤثرة. ماهر في إدارة فرق التصميم وتعزيز التعاون وضمان التنفيذ الناجح للمشاريع الإبداعية. متمكن من تقديم تصاميم شعارات احترافية وإرشادات العلامة التجارية ومواد تسويقية متماسكة. قادر على تولي أدوار على مستوى أول كمصمم جرافيك أول لقيادة المشاريع وتوجيه المصممين المبتدئين. شغوف بالابتكار في التصميم وتحقيق التميز في كل مشروع.'}
              </p>
            </div>

            {/* Experience */}
            <div className="bg-white dark:bg-[#2d2d2d] rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-[#8f1819] dark:text-[#bd7b6a] mb-8">
                {t('experience')}
              </h3>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-8 rtl:pl-0 rtl:pr-8">
                    {/* Timeline dot */}
                    <div className="absolute left-0 rtl:left-auto rtl:right-0 top-0 w-4 h-4 bg-[#8f1819] dark:bg-[#bd7b6a] rounded-full"></div>
                    {/* Timeline line */}
                    {index < experiences.length - 1 && (
                      <div className="absolute left-2 rtl:left-auto rtl:right-2 top-4 w-0.5 h-16 bg-[#d9cab1] dark:bg-[#9c7860]"></div>
                    )}

                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h4 className="text-lg font-bold text-[#8f1819] dark:text-[#bd7b6a]">
                          {exp.title[language]}
                        </h4>
                        {/* Show status only (no dates) */}
                        {'status' in exp && (exp as any).status && (
                          <span className="text-sm text-[#9c7860] dark:text-[#d9cab1]/80 bg-[#d9cab1] dark:bg-[#1a1a1a] px-3 py-1 rounded-full">
                            {(exp as any).status[language]}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-[#9c7860] dark:text-[#d9cab1]/80">
                        <Briefcase className="h-4 w-4" />
                        <span>{exp.company[language]}</span>
                        <span>•</span>
                        <span>{typeof exp.location === 'string' ? exp.location : exp.location[language]}</span>
                      </div>
                      <p className="text-[#9c7860] dark:text-[#d9cab1]/80 leading-relaxed">
                        {exp.description[language]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills (Icon-based, no percentages) */}
            <div className="bg-white dark:bg-[#2d2d2d] rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-[#8f1819] dark:text-[#bd7b6a] mb-8">
                {t('skills')}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={skill.key}
                      className="group relative flex flex-col items-center justify-center gap-3 rounded-xl p-5 bg-[#d9cab1] dark:bg-[#1a1a1a] shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
                      aria-label={skill.name[language]}
                      title={skill.name[language]}
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white dark:bg-[#2d2d2d] shadow ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-300 group-hover:scale-105">
                        <Icon className="h-6 w-6 text-[#8f1819] dark:text-[#bd7b6a]" />
                      </span>
                      <span className="text-sm font-semibold text-center text-[#9c7860] dark:text-[#d9cab1]">
                        {skill.name[language]}
                      </span>
                      {/* Decorative accent */}
                      <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-transparent group-hover:ring-[#8f1819]/15 dark:group-hover:ring-[#bd7b6a]/15 transition duration-300"></span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
