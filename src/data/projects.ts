/**
 * Centralized projects data and types
 * Updated to use the information and picture links you provided in the text file.
 * UI and design are unchanged; only data entries are updated.
 */

export type ProjectCategory = 'logos' | 'branding' | 'print' | 'uiux';

/** Localized text structure for EN/AR */
export interface LocalizedText {
  /** English text */
  en: string;
  /** Arabic text */
  ar: string;
}

/** Project data model used across Portfolio and Project Details pages */
export interface Project {
  /** Unique numeric id used in routes */
  id: number;
  /** Localized project title */
  title: LocalizedText;
  /** Localized short description */
  description: LocalizedText;
  /** Category for filtering */
  category: ProjectCategory;
  /** Tag list (simple strings for both languages) */
  tags: string[];
  /** Array of image URLs. First image acts as the default thumbnail. */
  images: string[];
  /** Optional customer comments/testimonials for this project (localized) */
  comments?: LocalizedText[];
}

/**
 * Helper: smart placeholder (kept for compatibility; not used in the new data)
 * Keeping the function so other modules importing it don't break in future edits.
 */
const ph = (keyword: string) =>
  `https://pub-cdn.sider.ai/u/U0AWH647XGE/web-coder/68867f69f2d3a0ac8dcde35e/resource/73f1f4ea-9b6d-4cab-865f-066c0a7a4100.jpg`;

/**
 * Projects dataset
 * Notes:
 * - Image links are taken exactly from your text file.
 * - Project 9 (Social Media Adv) is mapped to 'branding' to avoid UI/filter changes.
 * - Each project currently includes one image (as provided). The carousel supports single images.
 * - Comments (localized) added for the new Testimonials section on Home.
 */
export const projects: Project[] = [
  {
    id: 1,
    title: {
      en: 'Logo Brand & Identity For Ekleel Alenayah Medical Co.',
      ar: 'شعار وهوية بصرية لشركة إكليل العناية الطبية',
    },
    description: {
      en: 'Luxury medical brand visual identity',
      ar: 'هوية بصرية فاخرة لعلامة طبية',
    },
    category: 'branding',
    tags: ['Medica', 'Luxury', 'Branding'],
    images: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/5d60ca214380481.675743f089720.jpeg',
    ],
    comments: [
      {
        en: 'Professional, on-time delivery and a refined brand system. Great collaboration.',
        ar: 'احترافية وتسليم في الوقت المناسب وهوية علامة متقنة. تعاون رائع.',
      },
      {
        en: 'Our medical brand finally looks premium and trustworthy.',
        ar: 'علامتنا الطبية أصبحت تبدو فاخرة وجديرة بالثقة.',
      },
    ],
  },
  {
    id: 2,
    title: {
      en: 'Caesar Restaurant Logo Brand',
      ar: 'تصميم شعار سلسلة مطاعم القيصر',
    },
    description: {
      en: 'Modern logo designs for restaurant chain',
      ar: 'تصاميم شعارات عصرية لسلسلة مطاعم',
    },
    category: 'logos',
    tags: ['Logo', 'Food', 'Modern'],
    images: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/60a714214380481.675743f084bea.jpeg',
    ],
    comments: [
      {
        en: 'The new logo boosted our brand recognition. Guests love it!',
        ar: 'الشعار الجديد عزز تميّزنا. الزبائن أحبّوه!',
      },
    ],
  },
  {
    id: 3,
    title: {
      en: 'Balsam Taiba Medical Co. Identity Design',
      ar: 'تصميم شعار وهوية شركة بلسم طيبة الطبية',
    },
    description: {
      en: 'Complete brand identity package for tech company',
      ar: 'حزمة هوية تجارية كاملة لشركة تقنية',
    },
    category: 'branding',
    tags: ['branding', 'Logo', 'Guidelines'],
    images: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/3ae409214380481.675743f08c104.jpeg',
    ],
    comments: [
      {
        en: 'Clear guidelines and a strong identity we can scale with.',
        ar: 'إرشادات واضحة وهوية قوية يمكننا التوسع بها.',
      },
    ],
  },
  {
    id: 4,
    title: {
      en: 'Jawaher Al Alamia Exchange',
      ar: 'تصميم شعار جواهر العالمية للصرافة',
    },
    description: {
      en: 'Expert Logo demonstrates simplicity and artistic customer touches',
      ar: 'تصميم احترافي يتميز بالبساطة وتظهر فيه لمسات العميل',
    },
    category: 'logos',
    tags: ['Ai/Ps', 'Brand', 'Logo Design'],
    images: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/baa953214380481.675743f08b86f.jpeg',
    ],
    comments: [
      {
        en: 'Elegant and memorable—exactly what we wanted.',
        ar: 'أنيق ولا ينسى—تماماً ما أردناه.',
      },
    ],
  },
  {
    id: 5,
    title: {
      en: 'Logo Brand & Identity For Kahraman & Zapheer Jewels Co.',
      ar: 'شعار وهوية بصرية لشركة مجوهرات كهرمان وزفير',
    },
    description: {
      en: 'Luxury medical brand visual identity',
      ar: 'هوية بصرية فاخرة لعلامة طبية',
    },
    category: 'branding',
    tags: ['Gold', 'Luxury', 'Branding'],
    images: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/699a54214380481.675743f087224.jpeg',
    ],
    comments: [
      {
        en: 'Premium look that resonates with our jewelry audience.',
        ar: 'مظهر فاخر ينسجم مع جمهور المجوهرات لدينا.',
      },
    ],
  },
  {
    id: 6,
    title: {
      en: 'Al Khattabi Press Logo',
      ar: 'شعار مطابع الخطابي',
    },
    description: {
      en: 'Innovative logo for Printing Press startups',
      ar: 'شعار مبتكر لشركة طباعة',
    },
    category: 'logos',
    tags: ['Printing', 'Startup', 'Materials'],
    images: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/12d4c7214380481.675743f08a857.jpeg',
    ],
    comments: [
      {
        en: 'Simple, smart, and highly printable across materials.',
        ar: 'بسيط وذكي وقابل للطباعة على مختلف المواد.',
      },
    ],
  },
  {
    id: 7,
    title: {
      en: 'Bahaa Silver Logo Design',
      ar: 'تصميم شعار شركة بهاء الفضة',
    },
    description: {
      en: 'Creative Brand Logo by typography',
      ar: 'شعار علامة تجارية إبداعي بطريقة التايبوجرافي',
    },
    category: 'print',
    tags: ['Gold & Silver', 'Typography', 'Layout'],
    images: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/8d1d60214380481.675743f07ecfa.jpeg',
    ],
    comments: [
      {
        en: 'Typography-led concept that stands out.',
        ar: 'مفهوم قائم على التايبوغرافي يبرز بقوة.',
      },
    ],
  },
  {
    id: 8,
    title: {
      en: 'Jenan Yemeni Hony Logo Design',
      ar: 'تصميم شعار شركة جنان للعسل اليمني',
    },
    description: {
      en: 'Modern commerce branding design',
      ar: 'تصميم هوية تجارية عصرية',
    },
    category: 'branding',
    tags: ['Commerce', 'Branding', 'Logo'],
    images: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/9a450c214380481.675743f081bb3.jpeg',
    ],
    comments: [
      {
        en: 'Captured our product story beautifully.',
        ar: 'عكس قصة منتجنا بشكل جميل.',
      },
    ],
  },
  {
    id: 9,
    title: {
      en: 'Social Media Adv',
      ar: 'تصاميم السوشال ميديا',
    },
    description: {
      en: 'Expert social media design',
      ar: 'تصميم احترافي لوسائل التواصل الاجتماعي',
    },
    // Mapped to 'branding' to keep existing filters/UI unchanged
    category: 'branding',
    tags: ['Ai/Ps', 'Social', 'Design'],
    images: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/bed92e214380481.675743f08c922.jpeg',
    ],
    comments: [
      {
        en: 'Engagement went up after the new creatives.',
        ar: 'زاد التفاعل بعد التصاميم الجديدة.',
      },
    ],
  },
  {
    id: 10,
    title: {
      en: 'Annual Report Design',
      ar: 'تصميم التقرير السنوي',
    },
    description: {
      en: 'Professional annual report layout and design',
      ar: 'تخطيط وتصميم تقرير سنوي احترافي',
    },
    category: 'print',
    tags: ['Print', 'Layout', 'Corporate'],
    images: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/6c98f5214380481.675743f092c71.jpeg',
    ],
    comments: [
      {
        en: 'Clear structure, premium layouts, and on-time delivery.',
        ar: 'هيكل واضح وتخطيطات فاخرة وتسليم في الوقت.',
      },
    ],
  },
];

/** Helper to find a project by id */
export const getProjectById = (id: number) => projects.find((p) => p.id === id);