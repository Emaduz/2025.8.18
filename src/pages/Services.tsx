/**
 * Services page component showcasing design services offered
 * Professional cards, WhatsApp CTA (prefilled without price), and an infographic process section
 * Now priced in Saudi Riyal with a custom SR logo icon.
 */
import React from 'react';
import {
  Palette,
  Layout,
  Printer,
  Globe,
  Camera,
  CheckCircle,
  ArrowRight,
  Star,
  // Infographic step icons and connectors
  MessageSquare,
  Lightbulb,
  PenTool,
  FileCheck,
  ArrowDown,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';
import SRLogoIcon from '../components/icons/SRLogo';

/**
 * Service definition with localized content
 */
interface Service {
  /** Icon to illustrate the service */
  icon: React.ElementType;
  /** Localized title */
  title: { en: string; ar: string };
  /** Localized description */
  description: { en: string; ar: string };
  /** Localized feature bullets */
  features: { en: string[]; ar: string[] };
  /** Price value in SAR (shown with SR logo; label localized separately) */
  priceSar: number;
  /** Highlight as popular */
  popular?: boolean;
}

/**
 * Props for the individual service card component
 */
interface ServiceCardProps {
  /** Service data to display */
  service: Service;
  /** Current language */
  language: 'en' | 'ar';
  /** Callback for WhatsApp CTA */
  onStart: (service: Service) => void;
}

/**
 * Format a SAR amount with locale-aware digits and grouping.
 */
function formatSar(amount: number, lang: 'en' | 'ar') {
  // Use Saudi locales for proper digits/grouping
  const locale = lang === 'en' ? 'en-SA' : 'ar-SA';
  return amount.toLocaleString(locale);
}

/**
 * ServiceCard - a professional, compact card for a single service
 * Shows icon, title, short description, features list, and CTA for WhatsApp
 */
const ServiceCard: React.FC<ServiceCardProps> = ({ service, language, onStart }) => {
  const Icon = service.icon;

  return (
    <div
      className={`relative group rounded-2xl bg-white dark:bg-[#2d2d2d] shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden`}
    >
      {/* Top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-[#8f1819] to-[#bd7b6a]" />

      {/* Popular badge */}
      {service.popular && (
        <div className="absolute top-4 ltr:right-4 rtl:left-4 inline-flex items-center gap-1 rounded-full bg-[#8f1819] dark:bg-[#bd7b6a] text-white px-3 py-1 text-xs font-medium shadow">
          <Star className="h-3.5 w-3.5" />
          <span>{language === 'en' ? 'Most Popular' : 'الأكثر شعبية'}</span>
        </div>
      )}

      <div className="p-8 space-y-6">
        {/* Icon + title */}
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-xl bg-[#8f1819]/10 dark:bg-[#bd7b6a]/10 flex items-center justify-center">
            <Icon className="h-7 w-7 text-[#8f1819] dark:text-[#bd7b6a]" />
          </div>
          <div className="min-w-0">
            <h3 className="text-2xl font-bold text-[#8f1819] dark:text-[#bd7b6a] truncate">
              {service.title[language]}
            </h3>
            <p className="text-sm text-[#9c7860] dark:text-[#d9cab1]/80 line-clamp-2">
              {service.description[language]}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3">
          {service.features[language].map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-[#8f1819] dark:text-[#bd7b6a] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#9c7860] dark:text-[#d9cab1]/80">{feature}</span>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="pt-6 border-t border-[#d9cab1] dark:border-[#9c7860]/20 flex items-center justify-between gap-4 flex-wrap">
          {/* Price block with SR logo (no currency text) */}
          <div className="text-xl font-bold text-[#8f1819] dark:text-[#bd7b6a] flex items-center gap-2">
            <span>{language === 'en' ? 'Starting at' : 'ابتداءً من'}</span>
            <SRLogoIcon className="h-5 w-5" />
            <span>{formatSar(service.priceSar, language)}</span>
          </div>
          <Button
            onClick={() => onStart(service)}
            className="bg-[#8f1819] hover:bg-[#bd7b6a] text-white btn-animate"
          >
            {language === 'en' ? 'Get Started' : 'ابدأ الآن'}
            <ArrowRight className={`h-4 w-4 ${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
          </Button>
        </div>
      </div>

      {/* Hover ring */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-[#8f1819]/15 dark:group-hover:ring-[#bd7b6a]/15 transition" />
    </div>
  );
};

/**
 * Helper: open WhatsApp with a prefilled message
 * Excludes price from the content by design
 */
function openWhatsAppPrefilled(
  phone: string,
  message: string
) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

/**
 * Process step definition for the infographic
 */
interface ProcessStep {
  /** Step index label like "01" */
  step: string;
  /** Localized title */
  title: { en: string; ar: string };
  /** Localized description */
  description: { en: string; ar: string };
  /** Icon component to represent the step */
  icon: React.ElementType<React.SVGProps<SVGSVGElement>>;
}

/**
 * StepCard - a visual card for each step (used both in horizontal and vertical layouts)
 */
const StepCard: React.FC<{
  step: ProcessStep;
  language: 'en' | 'ar';
}> = ({ step, language }) => {
  const Icon = step.icon;
  return (
    <div className="relative group rounded-xl p-6 bg-[#d9cab1] dark:bg-[#1a1a1a] shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Floating number badge */}
      <div className="absolute -top-3 ltr:-right-3 rtl:-left-3 h-8 w-8 rounded-full bg-[#8f1819] dark:bg-[#bd7b6a] text-white text-xs font-bold shadow flex items-center justify-center">
        {step.step}
      </div>

      {/* Icon */}
      <div className="h-12 w-12 rounded-full bg-white dark:bg-[#2d2d2d] text-[#8f1819] dark:text-[#bd7b6a] flex items-center justify-center shadow ring-1 ring-black/5 dark:ring-white/10 mb-4">
        <Icon className="h-6 w-6" />
      </div>

      {/* Title + description */}
      <div className="space-y-2">
        <h4 className="text-lg font-bold text-[#8f1819] dark:text-[#bd7b6a]">
          {step.title[language]}
        </h4>
        <p className="text-sm leading-relaxed text-[#9c7860] dark:text-[#d9cab1]/80">
          {step.description[language]}
        </p>
      </div>

      {/* Decorative ring on hover */}
      <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-transparent group-hover:ring-[#8f1819]/15 dark:group-hover:ring-[#bd7b6a]/15 transition duration-300"></span>
    </div>
  );
};

/**
 * ProcessInfographic - responsive infographic for the design process
 * - Desktop: horizontal flow with dashed connectors and arrows
 * - Mobile: vertical flow with downward connectors and arrows
 */
const ProcessInfographic: React.FC<{
  steps: ProcessStep[];
  language: 'en' | 'ar';
}> = ({ steps, language }) => {
  return (
    <div className="bg-white dark:bg-[#2d2d2d] rounded-2xl p-12 shadow-lg mb-20">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold text-[#8f1819] dark:text-[#bd7b6a]">
          {language === 'en' ? 'My Design Process' : 'عملية التصميم'}
        </h2>
        <p className="text-xl text-[#9c7860] dark:text-[#d9cab1]/80 max-w-2xl mx-auto">
          {language === 'en'
            ? 'A streamlined process to ensure your project is delivered on time and exceeds expectations'
            : 'عملية مبسطة لضمان تسليم مشروعك في الوقت المحدد وتجاوز التوقعات'}
        </p>
      </div>

      {/* Horizontal infographic (desktop) */}
      <div className="hidden lg:flex items-stretch">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex-1">
              <StepCard step={step} language={language} />
            </div>

            {/* Connector (skip after last step) */}
            {index < steps.length - 1 && (
              <div className="mx-3 flex items-center self-center">
                <span className="h-0.5 w-10 border-t-2 border-dashed border-[#d9cab1] dark:border-[#9c7860]" />
                <ArrowRight className="mx-2 h-5 w-5 text-[#9c7860] dark:text-[#d9cab1]/80" />
                <span className="h-0.5 w-10 border-t-2 border-dashed border-[#d9cab1] dark:border-[#9c7860]" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Vertical infographic (mobile/tablet) */}
      <div className="grid grid-cols-1 gap-8 lg:hidden">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <StepCard step={step} language={language} />
            {index < steps.length - 1 && (
              <div className="flex flex-col items-center -mt-2 -mb-2">
                <span className="w-0.5 h-4 border-l-2 border-dashed border-[#d9cab1] dark:border-[#9c7860]" />
                <ArrowDown className="my-1 h-5 w-5 text-[#9c7860] dark:text-[#d9cab1]/80" />
                <span className="w-0.5 h-4 border-l-2 border-dashed border-[#d9cab1] dark:border-[#9c7860]" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const ServicesPage: React.FC = () => {
  const { language } = useTheme();
  const { t } = useTranslation(language);

  // WhatsApp number for direct contact
  const WHATSAPP_NUMBER = '+966504487308';

  /**
   * Services list
   * Converted to SAR using ≈ 3.75 SAR per USD, rounded to the nearest 5 for tidy pricing.
   * - Logo Design: $150 -> ~562.5 -> 560 SAR
   * - Brand Identity: $400 -> 1500 SAR
   * - Print Design: $100 -> 375 SAR
   * - Web Design: $500 -> 1875 SAR
   * - Social Media Design: $50 -> ~187.5 -> 190 SAR
   */
  const services: Service[] = [
    {
      icon: Palette,
      title: { en: 'Logo Design', ar: 'تصميم الشعارات' },
      description: {
        en: 'Creating unique and memorable logos that represent your brand identity perfectly.',
        ar: 'إنشاء شعارات فريدة ولا تُنسى تمثل هوية علامتك التجارية بشكل مثالي.',
      },
      features: {
        en: [
          '3 Initial Concepts',
          'Unlimited Revisions',
          'Vector Files (AI, EPS)',
          'PNG & JPG Files',
          'Brand Guidelines',
        ],
        ar: ['3 مفاهيم أولية', 'تعديلات غير محدودة', 'ملفات فيكتور (AI, EPS)', 'ملفات PNG و JPG', 'إرشادات العلامة التجارية'],
      },
      priceSar: 560,
      popular: true,
    },
    {
      icon: Layout,
      title: { en: 'Brand Identity', ar: 'الهوية التجارية' },
      description: {
        en: 'Complete brand identity packages including logo, colors, typography, and guidelines.',
        ar: 'حزم هوية تجارية كاملة تشمل الشعار والألوان والطباعة والإرشادات.',
      },
      features: {
        en: [
          'Logo Design',
          'Color Palette',
          'Typography Guide',
          'Business Cards',
          'Letterhead Design',
          'Brand Guidelines',
        ],
        ar: ['تصميم الشعار', 'لوحة الألوان', 'دليل الطباعة', 'بطاقات العمل', 'تصميم ورق الخطابات', 'إرشادات العلامة التجارية'],
      },
      priceSar: 1500,
    },
    {
      icon: Printer,
      title: { en: 'Print Design', ar: 'التصميم الطباعي' },
      description: {
        en: 'Professional print materials including brochures, flyers, posters, and marketing collateral.',
        ar: 'مواد طباعة احترافية تشمل الكتيبات والنشرات والملصقات والمواد التسويقية.',
      },
      features: {
        en: [
          'Brochure Design',
          'Flyer Design',
          'Poster Design',
          'Magazine Layout',
          'Packaging Design',
          'Print-Ready Files',
        ],
        ar: ['تصميم الكتيبات', 'تصميم النشرات', 'تصميم الملصقات', 'تخطيط المجلات', 'تصميم التعبئة', 'ملفات جاهزة للطباعة'],
      },
      priceSar: 375,
    },
    {
      icon: Globe,
      title: { en: 'Web Design', ar: 'تصميم المواقع' },
      description: {
        en: 'Modern and responsive website designs that engage users and drive conversions.',
        ar: 'تصاميم مواقع عصرية ومتجاوبة تجذب المستخدمين وتحقق التحويلات.',
      },
      features: {
        en: [
          'Responsive Design',
          'Landing Pages',
          'E-commerce Design',
          'CMS Integration',
          'SEO Optimization',
          'Performance Optimization',
        ],
        ar: ['تصميم متجاوب', 'صفحات الهبوط', 'تصميم التجارة الإلكترونية', 'تكامل CMS', 'تحسين SEO', 'تحسين الأداء'],
      },
      priceSar: 1875,
    },
    {
      icon: Camera,
      title: { en: 'Social Media Design', ar: 'تصميم وسائل التواصل' },
      description: {
        en: 'Eye-catching social media graphics and templates for all major platforms.',
        ar: 'جرافيك وسائل التواصل الاجتماعي ونماذج جذابة لجميع المنصات الرئيسية.',
      },
      features: {
        en: ['Instagram Posts', 'Facebook Covers', 'Twitter Headers', 'LinkedIn Banners', 'Story Templates', 'Animated Graphics'],
        ar: ['منشورات إنستغرام', 'أغلفة فيسبوك', 'رؤوس تويتر', 'بانرات لينكدإن', 'قوالب القصص', 'رسوم متحركة'],
      },
      priceSar: 190,
    },
  ];

  /**
   * Build a localized WhatsApp message for a service request (no price included)
   */
  const buildMessage = (service: Service, lang: 'en' | 'ar') => {
    if (lang === 'ar') {
      return [
        'مرحباً! أود الاستفسار عن الخدمة التالية:',
        `• الخدمة: ${service.title.ar}`,
        `• المزايا: ${service.features.ar.join(', ')}`,
        'يرجى التواصل معي لمناقشة التفاصيل والمدة الزمنية. شكراً لك.',
      ].join('\n');
    }
    return [
      "Hello! I'd like to inquire about the following service:",
      `• Service: ${service.title.en}`,
      `• Key features: ${service.features.en.join(', ')}`,
      'Please contact me to discuss details and timeline. Thank you.',
    ].join('\n');
  };

  /**
   * Handle WhatsApp CTA with a prefilled message
   */
  const handleGetStarted = (service: Service) => {
    const message = buildMessage(service, language);
    openWhatsAppPrefilled(WHATSAPP_NUMBER, message);
    // Note: price is intentionally excluded from the prefilled message
  };

  // Infographic steps with icons
  const processSteps: ProcessStep[] = [
    {
      step: '01',
      title: { en: 'Consultation', ar: 'الاستشارة' },
      description: {
        en: 'We discuss your project requirements, goals, and vision in detail.',
        ar: 'نناقش متطلبات مشروعك وأهدافك ورؤيتك بالتفصيل.',
      },
      icon: MessageSquare,
    },
    {
      step: '02',
      title: { en: 'Concept Development', ar: 'تطوير المفهوم' },
      description: {
        en: 'I create initial concepts and present multiple design directions.',
        ar: 'أنشئ المفاهيم الأولية وأقدم اتجاهات تصميم متعددة.',
      },
      icon: Lightbulb,
    },
    {
      step: '03',
      title: { en: 'Design & Refinement', ar: 'التصميم والتحسين' },
      description: {
        en: 'Based on your feedback, I refine the chosen concept to perfection.',
        ar: 'بناءً على ملاحظاتك، أقوم بتحسين المفهوم المختار إلى الكمال.',
      },
      icon: PenTool,
    },
    {
      step: '04',
      title: { en: 'Final Delivery', ar: 'التسليم النهائي' },
      description: {
        en: 'You receive all final files in various formats ready for use.',
        ar: 'تتلقى جميع الملفات النهائية بتنسيقات مختلفة جاهزة للاستخدام.',
      },
      icon: FileCheck,
    },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl font-bold text-[#8f1819] dark:text-[#bd7b6a]">{t('servicesTitle')}</h1>
          <p className="text-xl text-[#9c7860] dark:text-[#d9cab1]/80 max-w-3xl mx-auto">
            {t('servicesSubtitle')}
          </p>
        </div>

        {/* Services Grid (Professional layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              language={language}
              onStart={handleGetStarted}
            />
          ))}
        </div>

        {/* Process Section (Infographic) */}
        <ProcessInfographic steps={processSteps} language={language} />

        {/* CTA Section */}
        <div className="bg-[#a76552] dark:bg-[#1a1a1a] rounded-2xl p-12 text-center space-y-6">
          <h2 className="text-4xl font-bold text-white dark:text-[#d9cab1]">
            {language === 'en' ? 'Ready to Get Started?' : 'جاهز للبدء؟'}
          </h2>
          <p className="text-white/90 dark:text-[#d9cab1]/80 text-xl max-w-2xl mx-auto">
            {language === 'en'
              ? "Let's discuss your project and create something amazing together. Contact me for a free consultation."
              : 'دعنا نناقش مشروعك وننشئ شيئاً مذهلاً معاً. تواصل معي للحصول على استشارة مجانية.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Removed "Get Free Quote" button globally per user request */}
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#a76552] bg-transparent"
              onClick={() => {
                const generic = language === 'ar'
                  ? 'مرحباً! أود التحدث حول مشروع تصميم جديد. هل يمكننا بدء المحادثة؟'
                  : "Hello! I'd like to discuss a new design project. Could we start a chat?";
                openWhatsAppPrefilled(WHATSAPP_NUMBER, generic);
              }}
            >
              {language === 'en' ? 'WhatsApp Chat' : 'محادثة واتساب'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
