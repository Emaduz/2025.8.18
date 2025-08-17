/**
 * Translation utilities for bilingual support
 * Contains all text content in English and Arabic
 */

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    portfolio: 'Portfolio',
    about: 'About',
    services: 'Services',
    contact: 'Contact',
    
    // Header
    title: 'Eng.EmadAlddine',
    subtitle: 'Senior Graphic Designer',
    
    // Hero Section
    heroTitle: 'Creative Design Solutions',
    heroSubtitle: 'Transforming ideas into impactful visual experiences with 9+ years of expertise',
    seeMyWork: 'See My Work',
    hireMe: 'Hire Me',
    
    // About
    aboutTitle: 'About Me',
    aboutDescription: 'Creative and experienced Branding and Logo Designer with over 9 years of expertise in developing impactful visual identities. Skilled in managing design teams, fostering collaboration, and ensuring the successful execution of creative projects.',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    
    // Services
    servicesTitle: 'My Services',
    servicesSubtitle: 'Professional design solutions tailored to your needs',
    logoDesign: 'Logo Design',
    logoDesc: 'Creating memorable and impactful brand identities',
    branding: 'Branding',
    brandingDesc: 'Complete brand identity development and guidelines',
    printDesign: 'Print Design',
    printDesc: 'Professional printing materials and marketing collateral',
    uiuxDesign: 'UI/UX Design',
    uiuxDesc: 'User-centered interface and experience design',
    
    // Portfolio
    portfolioTitle: 'My Portfolio',
    portfolioSubtitle: 'Showcasing creative excellence across various design disciplines',
    allProjects: 'All Projects',
    logos: 'Logos',
    posters: 'Posters',
    viewProject: 'View Project',
    
    // Testimonials
    testimonialsTitle: 'What Our Customers Say',

    // Contact
    contactTitle: 'Get In Touch',
    contactSubtitle: 'Let\'s discuss your next project',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    sendMessage: 'Send Message',
    
    // Footer
    followMe: 'Follow Me',
    allRightsReserved: 'All rights reserved',
    
    // Languages
    english: 'English',
    arabic: 'العربية',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    portfolio: 'المعرض',
    about: 'نبذة عني',
    services: 'الخدمات',
    contact: 'التواصل',
    
    // Header
    title: 'م.عماد الدين',
    subtitle: 'مصمم جرافيك أول',
    
    // Hero Section
    heroTitle: 'حلول تصميم إبداعية',
    heroSubtitle: 'تحويل الأفكار إلى تجارب بصرية مؤثرة بخبرة تزيد عن 9 سنوات',
    seeMyWork: 'شاهد أعمالي',
    hireMe: 'وظفني',
    
    // About
    aboutTitle: 'نبذة عني',
    aboutDescription: 'مصمم علامات تجارية وشعارات مبدع وذو خبرة تزيد عن 9 سنوات في تطوير الهويات البصرية المؤثرة. ماهر في إدارة فرق التصميم وتعزيز التعاون وضمان التنفيذ الناجح للمشاريع الإبداعية.',
    experience: 'الخبرة',
    education: 'التعليم',
    skills: 'المهارات',
    
    // Services
    servicesTitle: 'خدماتي',
    servicesSubtitle: 'حلول تصميم احترافية مصممة خصيصاً لاحتياجاتك',
    logoDesign: 'تصميم الشعارات',
    logoDesc: 'إنشاء هويات تجارية لا تُنسى ومؤثرة',
    branding: 'العلامة التجارية',
    brandingDesc: 'تطوير الهوية التجارية الكاملة والإرشادات',
    printDesign: 'التصميم الطباعي',
    printDesc: 'مواد طباعة احترافية ومواد تسويقية',
    uiuxDesign: 'تصميم واجهات المستخدم',
    uiuxDesc: 'تصميم واجهات وتجارب مستخدم محورية',
    
    // Portfolio
    portfolioTitle: 'معرض أعمالي',
    portfolioSubtitle: 'عرض التميز الإبداعي عبر مختلف تخصصات التصميم',
    allProjects: 'جميع المشاريع',
    logos: 'الشعارات',
    posters: 'الملصقات',
    viewProject: 'عرض المشروع',
    
    // Testimonials
    testimonialsTitle: 'ماذا يقول عملاؤنا',

    // Contact
    contactTitle: 'تواصل معي',
    contactSubtitle: 'لنناقش مشروعك القادم',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    message: 'الرسالة',
    sendMessage: 'إرسال الرسالة',
    
    // Footer
    followMe: 'تابعني',
    allRightsReserved: 'جميع الحقوق محفوظة',
    
    // Languages
    english: 'English',
    arabic: 'العربية',
  }
};

export const useTranslation = (language: 'en' | 'ar') => {
  return {
    t: (key: keyof typeof translations.en) => translations[language][key] || translations.en[key]
  };
};