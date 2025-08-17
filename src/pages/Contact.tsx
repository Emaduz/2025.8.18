/**
 * Contact page component with contact form and information
 * Provides multiple ways to get in touch including form, WhatsApp, and social media
 * - Enhanced focus styling
 * - Animated status message on submit
 */
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';

/** Centralized contact email */
const CONTACT_EMAIL = 'info@emadalddine.com';

const ContactPage: React.FC = () => {
  const { language } = useTheme();
  const { t } = useTranslation(language);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  /**
   * Handle controlled input changes
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Submit handler
   * Performs basic validation and opens a pre-filled mailto draft
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: 'error',
        text: language === 'en' ? 'Please fill in the required fields.' : 'يرجى ملء الحقول المطلوبة.',
      });
      setTimeout(() => setStatus(null), 2500);
      return;
    }

    setStatus({
      type: 'info',
      text: language === 'en' ? 'Opening your email app…' : 'يتم فتح تطبيق البريد…',
    });

    const subject = encodeURIComponent(formData.subject || 'Design Project Inquiry');
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
    `);
    
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;

    // Show success briefly
    setTimeout(() => {
      setStatus({
        type: 'success',
        text: language === 'en' ? 'Email draft opened. I will get back to you soon!' : 'تم فتح مسودة البريد. سأعاود الاتصال بك قريبًا!',
      });
      setTimeout(() => setStatus(null), 2500);
    }, 800);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: { en: 'Email', ar: 'البريد الإلكتروني' },
      value: CONTACT_EMAIL,
      link: `mailto:${CONTACT_EMAIL}`,
    },
    {
      icon: Phone,
      title: { en: 'Phone', ar: 'الهاتف' },
      value: '+966 504487308',
      link: 'tel:+966504487308',
    },
    {
      icon: MapPin,
      title: { en: 'Location', ar: 'الموقع' },
      value: 'Al-Madina, Saudi Arabia',
      link: null,
    },
    {
      icon: MessageSquare,
      title: { en: 'WhatsApp', ar: 'واتساب' },
      value: { en: 'Quick Chat', ar: 'محادثة سريعة' },
      link: 'https://wa.me/+966504487308',
    },
  ];

  /**
   * Social links set (Dribbble removed as requested)
   */
  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/emadalddine',
      icon: Instagram,
      color: 'hover:text-pink-500',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/emadalddine',
      icon: Linkedin,
      color: 'hover:text-blue-600',
    },
    {
      name: 'Behance',
      href: 'https://behance.net/emadalddine',
      icon: () => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3.729-.229-3.729h-3.355v3.729zm0 1.629v3.330h3.687c3.195 0 2.906-3.33 0-3.33h-3.687z"/>
        </svg>
      ),
      color: 'hover:text-blue-500',
    },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl font-bold text-[#8f1819] dark:text-[#bd7b6a]">
            {t('contactTitle')}
          </h1>
          <p className="text-xl text-[#9c7860] dark:text-[#d9cab1]/80 max-w-3xl mx-auto">
            {t('contactSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-[#2d2d2d] rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#8f1819] dark:text-[#bd7b6a] mb-6">
              {language === 'en' ? 'Send me a message' : 'أرسل لي رسالة'}
            </h2>

            {/* Animated status */}
            <div className={`overflow-hidden transition-all duration-300 ${status ? 'max-h-24 mb-4' : 'max-h-0 mb-0'}`}>
              {status && (
                <div
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 ${
                    status.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                    status.type === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                    'bg-[#d9cab1] text-[#8f1819] dark:bg-[#1a1a1a] dark:text-[#bd7b6a]'
                  }`}
                >
                  {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : status.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                  <span className="text-sm">{status.text}</span>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#9c7860] dark:text-[#d9cab1] mb-2">
                    {t('name')} *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder={language === 'en' ? 'Your name' : 'اسمك'}
                    className="border-[#d9cab1] dark:border-[#9c7860] focus:border-[#8f1819] dark:focus:border-[#bd7b6a] focus:ring-2 focus:ring-[#8f1819]/20 dark:focus:ring-[#bd7b6a]/20 transition-shadow"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#9c7860] dark:text-[#d9cab1] mb-2">
                    {t('email')} *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder={language === 'en' ? 'your.email@example.com' : 'your.email@example.com'}
                    className="border-[#d9cab1] dark:border-[#9c7860] focus:border-[#8f1819] dark:focus:border-[#bd7b6a] focus:ring-2 focus:ring-[#8f1819]/20 dark:focus:ring-[#bd7b6a]/20 transition-shadow"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9c7860] dark:text-[#d9cab1] mb-2">
                  {language === 'en' ? 'Subject' : 'الموضوع'}
                </label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={language === 'en' ? 'Project inquiry' : 'استفسار عن مشروع'}
                  className="border-[#d9cab1] dark:border-[#9c7860] focus:border-[#8f1819] dark:focus:border-[#bd7b6a] focus:ring-2 focus:ring-[#8f1819]/20 dark:focus:ring-[#bd7b6a]/20 transition-shadow"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9c7860] dark:text-[#d9cab1] mb-2">
                  {t('message')} *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder={language === 'en' 
                    ? 'Tell me about your project, timeline, and budget...' 
                    : 'أخبرني عن مشروعك والجدول الزمني والميزانية...'
                  }
                  className="border-[#d9cab1] dark:border-[#9c7860] focus:border-[#8f1819] dark:focus:border-[#bd7b6a] focus:ring-2 focus:ring-[#8f1819]/20 dark:focus:ring-[#bd7b6a]/20 resize-none transition-shadow"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#8f1819] hover:bg-[#bd7b6a] text-white active:brightness-95 transition-all duration-300 ease-in-out"
              >
                <Send className={`h-5 w-5 ${language === 'ar' ? 'mr-2' : 'mr-2'}`} />
                {t('sendMessage')}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-[#2d2d2d] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      <div className="w-12 h-12 bg-[#8f1819]/10 dark:bg-[#bd7b6a]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-[#8f1819] dark:text-[#bd7b6a]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-[#8f1819] dark:text-[#bd7b6a] mb-2">
                          {info.title[language]}
                        </h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-[#9c7860] dark:text-[#d9cab1]/80 hover:text-[#8f1819] dark:hover:text-[#bd7b6a] transition-colors duration-200 break-words"
                            target={info.link.startsWith('http') ? '_blank' : '_self'}
                            rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                          >
                            {typeof info.value === 'string' ? info.value : info.value[language]}
                          </a>
                        ) : (
                          <span className="text-[#9c7860] dark:text-[#d9cab1]/80">
                            {typeof info.value === 'string' ? info.value : info.value[language]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Profile Image */}
            <div className="bg-white dark:bg-[#2d2d2d] rounded-2xl p-8 shadow-lg text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 shadow-lg">
                <img
                  src="https://pub-cdn.sider.ai/u/U0AWH647XGE/web-coder/68867f69f2d3a0ac8dcde35e/resource/855be7ed-4b6e-432c-8175-95813175c674.jpg"
                  alt="EmadAlddine Ismael"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-[#8f1819] dark:text-[#bd7b6a] mb-2">
                {t('title')}
              </h3>
              <p className="text-[#9c7860] dark:text-[#d9cab1]/80 mb-6">
                {t('subtitle')}
              </p>
              
              {/* Response Time */}
              <div className="bg-[#d9cab1] dark:bg-[#1a1a1a] rounded-xl p-4 mb-6">
                <p className="text-sm text-[#8f1819] dark:text-[#bd7b6a] font-medium">
                  {language === 'en' 
                    ? '⚡ Usually responds within 2 hours' 
                    : '⚡ يرد عادة خلال ساعتين'
                  }
                </p>
              </div>

              {/* Social Media Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-[#8f1819] dark:text-[#bd7b6a]">
                  {t('followMe')}
                </h4>
                <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-full bg-[#d9cab1] dark:bg-[#1a1a1a] text-[#9c7860] dark:text-[#d9cab1] ${social.color} transition-transform duration-300 hover:scale-110 hover:rotate-3`}
                        aria-label={social.name}
                      >
                        <Icon />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#25D366] hover:bg-[#128C7E] text-white active:brightness-95 transition-all duration-300 ease-in-out"
              >
                <a
                  href="https://wa.me/+966504487308"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className={`h-5 w-5 ${language === 'ar' ? 'mr-2' : 'mr-2'}`} />
                  {language === 'en' ? 'WhatsApp' : 'واتساب'}
                </a>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#8f1819] text-[#8f1819] hover:bg-[#8f1819] hover:text-white dark:border-[#bd7b6a] dark:text-[#bd7b6a] dark:hover:bg-[#bd7b6a] dark:hover:text-white bg-transparent active:brightness-95 transition-all duration-300 ease-in-out"
              >
                <a href="tel:+966504487308">
                  <Phone className={`h-5 w-5 ${language === 'ar' ? 'mr-2' : 'mr-2'}`} />
                  {language === 'en' ? 'Call Now' : 'اتصل الآن'}
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 bg-white dark:bg-[#2d2d2d] rounded-2xl p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-[#8f1819] dark:text-[#bd7b6a] text-center mb-12">
            {language === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#8f1819] dark:text-[#bd7b6a] mb-2">
                  {language === 'en' ? "What's your typical turnaround time?" : 'ما هو الوقت المعتاد للتسليم؟'}
                </h3>
                <p className="text-[#9c7860] dark:text-[#d9cab1]/80">
                  {language === 'en' 
                    ? 'Logo design: 3-5 days, Brand identity: 1-2 weeks, Complex projects: 2-4 weeks. Rush orders available.'
                    : 'تصميم الشعار: 3-5 أيام، الهوية التجارية: 1-2 أسبوع، المشاريع المعقدة: 2-4 أسابيع. طلبات عاجلة متاحة.'
                  }
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#8f1819] dark:text-[#bd7b6a] mb-2">
                  {language === 'en' ? 'Do you offer revisions?' : 'هل تقدم تعديلات؟'}
                </h3>
                <p className="text-[#9c7860] dark:text-[#d9cab1]/80">
                  {language === 'en' 
                    ? "Yes! I offer unlimited revisions until you're 100% satisfied with the final design."
                    : 'نعم! أقدم تعديلات غير محدودة حتى تكون راضياً بنسبة 100% عن التصميم النهائي.'
                  }
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#8f1819] dark:text-[#bd7b6a] mb-2">
                  {language === 'en' ? 'What file formats do you provide?' : 'ما هي تنسيقات الملفات التي تقدمها؟'}
                </h3>
                <p className="text-[#9c7860] dark:text-[#d9cab1]/80">
                  {language === 'en' 
                    ? 'All projects include vector files (AI, EPS), high-res raster files (PNG, JPG), and web-optimized versions.'
                    : 'جميع المشاريع تشمل ملفات فيكتور (AI, EPS)، ملفات عالية الدقة (PNG, JPG)، وإصدارات محسنة للويب.'
                  }
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#8f1819] dark:text-[#bd7b6a] mb-2">
                  {language === 'en' ? 'How do we communicate during the project?' : 'كيف نتواصل أثناء المشروع؟'}
                </h3>
                <p className="text-[#9c7860] dark:text-[#d9cab1]/80">
                  {language === 'en' 
                    ? 'Primary communication via WhatsApp and email. Regular updates and progress sharing throughout the project.'
                    : 'التواصل الأساسي عبر واتساب والبريد الإلكتروني. تحديثات منتظمة ومشاركة التقدم خلال المشروع.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
