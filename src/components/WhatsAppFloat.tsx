/**
 * WhatsAppFloat component (collapsible chat-style widget)
 * Compact floating WhatsApp preview with a collapsible content area to save space.
 * - Collapsed: renders only a circular WhatsApp icon button.
 * - Expanded: header + sample messages + CTA.
 * - Clicking the messages area or CTA opens WhatsApp with a prefilled message.
 * - Localized EN/AR and supports dark/light themes.
 */
import React, { useMemo, useState, MouseEvent } from 'react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';

/**
 * Single chat message definition for the sample preview.
 */
interface ChatMessage {
  /** Who sent the message */
  from: 'me' | 'them';
  /** Message content (localized) */
  text: { en: string; ar: string };
  /** Optional timestamp string (localized) */
  time?: { en: string; ar: string };
}

/**
 * Open WhatsApp chat in a new tab with a prefilled message.
 */
function openWhatsApp(phone: string, message: string) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Chevron icon (minimal) for expand/collapse indication
 */
const ChevronIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M6 9l6 6 6-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * WhatsApp-like floating widget:
 * - When collapsed, shows only a circular WhatsApp icon (saves space).
 * - When expanded, shows the full chat-style card with messages and a CTA.
 */
const WhatsAppFloat: React.FC = () => {
  const { language } = useTheme();
  const [expanded, setExpanded] = useState<boolean>(false);

  // Business profile data
  const whatsappNumber = '+966504487308';
  const prefillMessage =
    language === 'ar'
      ? 'مرحباً! أود التحدث حول مشروع تصميم جديد.'
      : "Hello! I'd like to discuss a new design project.";

  // Sample messages (localized)
  const messages: ChatMessage[] = useMemo(
    () => [
      {
        from: 'them',
        text: {
          en: "Hi! 👋 I'm Emad. How can I help you today?",
          ar: 'مرحباً! 👋 أنا عماد. كيف يمكنني مساعدتك اليوم؟',
        },
        time: { en: '11:18', ar: '11:18' },
      },
      {
        from: 'me',
        text: {
          en: "Hello! I'd like to discuss a new branding project.",
          ar: 'مرحباً! أرغب في مناقشة مشروع علامة تجارية جديد.',
        },
        time: { en: '11:19', ar: '11:19' },
      },
      {
        from: 'them',
        text: {
          en: 'Great! Please share a brief, timeline, and any references.',
          ar: 'رائع! شاركني موجزاً، والمدة الزمنية، وأي مراجع لديك.',
        },
        time: { en: '11:20', ar: '11:20' },
      },
    ],
    [language]
  );

  // Localized header bits
  const headerName = language === 'ar' ? 'م. عماد الدين' : 'Emad Alddine';
  const headerTitle = language === 'ar' ? 'مصمم جرافيك أول' : 'Senior Graphic Designer';
  const onlineText = language === 'ar' ? 'متصل الآن' : 'Online';
  const tapToChat = language === 'ar' ? 'انقر للدردشة عبر واتساب' : 'Tap to chat on WhatsApp';
  const expandLabel = language === 'ar' ? (expanded ? 'طي المحادثة' : 'عرض المحادثة') : expanded ? 'Collapse' : 'Expand';
  const openLabel = language === 'ar' ? 'فتح دردشة واتساب' : 'Open WhatsApp chat';

  // Profile image (from uploaded assets)
  const avatarSrc =
    'https://pub-cdn.sider.ai/u/U0AWH647XGE/web-coder/68867f69f2d3a0ac8dcde35e/resource/d349de7c-8cfe-4e22-80a8-669f9b8a7475.jpg';

  /**
   * Toggle expand/collapse.
   */
  const toggleExpand = (e?: MouseEvent) => {
    if (e) e.stopPropagation();
    setExpanded((prev) => !prev);
  };

  /**
   * Handle click on the content area: opens WhatsApp chat.
   */
  const handleOpenChat = () => {
    openWhatsApp(whatsappNumber, prefillMessage);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Collapsed: icon-only button */}
      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          aria-label={openLabel}
          title={openLabel}
          className={[
            // size + shape
            'h-14 w-14 rounded-full',
            // brand bg + ring
            'bg-[#25D366] hover:bg-[#1fb257] text-white shadow-xl ring-1 ring-black/10',
            // layout
            'flex items-center justify-center',
            // focus + transitions
            'transition-colors focus:outline-none focus:ring-4 focus:ring-[#25D366]/30',
          ].join(' ')}
        >
          {/* subtle pulsing halo */}
          <span className="absolute -z-10 h-16 w-16 rounded-full bg-[#25D366]/20 blur-xl animate-pulse" />
          <WhatsAppIcon className="h-7 w-7" />
        </button>
      )}

      {/* Expanded: full chat-style card */}
      {expanded && (
        <div className="relative">
          {/* Subtle pulsing halo */}
          <div className="absolute inset-0 translate-x-2 translate-y-2 -z-10 pointer-events-none">
            <span className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-[#25D366]/20 blur-3xl animate-pulse" />
          </div>

          {/* Container Card */}
          <div
            className={[
              'w-72 sm:w-80 select-none rounded-2xl overflow-hidden shadow-xl',
              'bg-white dark:bg-[#111315] border border-black/5 dark:border-white/10',
              'transition-all duration-300',
            ].join(' ')}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#25D366] to-[#128C7E] px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-white/30 shadow">
                  <img
                    src={avatarSrc}
                    alt={headerName}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <WhatsAppIcon className="h-4 w-4 opacity-90" />
                    <h3 className="text-sm font-semibold truncate">{headerName}</h3>
                  </div>
                  <p className="text-[11px] opacity-90 truncate">{headerTitle}</p>
                </div>

                <div className="ml-auto flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-300" />
                    <span className="text-[11px] opacity-90">{onlineText}</span>
                  </div>
                  {/* Expand/Collapse button -> collapse to icon-only */}
                  <button
                    onClick={toggleExpand}
                    aria-label={expandLabel}
                    title={expandLabel}
                    className={[
                      'p-1 rounded-md text-white/90 hover:text-white hover:bg-white/10',
                      'transition-colors focus:outline-none focus:ring-2 focus:ring-white/40',
                    ].join(' ')}
                  >
                    <ChevronIcon className="transform rotate-180 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Collapsible Content (always visible when expanded) */}
            <div className="transition-all duration-300 ease-out overflow-hidden max-h-[520px] opacity-100">
              <div className="px-3 py-3 bg-[#f6f6f6] dark:bg-[#0b141a]">
                {/* Messages area (click to open WhatsApp) */}
                <button
                  type="button"
                  onClick={handleOpenChat}
                  aria-label={tapToChat}
                  title={tapToChat}
                  className="w-full text-left"
                >
                  <div className="flex flex-col gap-2 max-h-44 overflow-hidden">
                    {messages.map((m, idx) => {
                      const isMe = m.from === 'me';
                      return (
                        <div
                          key={idx}
                          className={isMe ? 'flex justify-end' : 'flex justify-start'}
                        >
                          <div
                            className={[
                              'max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm',
                              isMe
                                ? 'bg-[#dcf8c6] text-[#1a1a1a] dark:bg-[#075E54] dark:text-white'
                                : 'bg-white text-[#1a1a1a] dark:bg-[#1f2c34] dark:text-[#e8e8e8]',
                              'border border-black/5 dark:border-white/10',
                            ].join(' ')}
                          >
                            <p className="leading-snug">{m.text[language]}</p>
                            {m.time && (
                              <div
                                className={[
                                  'mt-1 text-[10px]',
                                  isMe ? 'text-[#5f6f52] dark:text-white/70' : 'text-[#7a7a7a] dark:text-white/50',
                                  'text-right',
                                ].join(' ')}
                              >
                                {m.time[language]}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </button>

                {/* Faux input hint */}
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-white dark:bg-[#1f2c34] border border-black/5 dark:border-white/10 px-3 py-2">
                  <span className="text-xs text-[#7a7a7a] dark:text-white/60 truncate">
                    {language === 'ar' ? 'اكتب رسالة...' : 'Type a message...'}
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1 text-[#25D366]">
                    <WhatsAppIcon className="h-4 w-4" />
                  </span>
                </div>

                {/* CTA: Open WhatsApp */}
                <div className="mt-3">
                  <Button
                    onClick={handleOpenChat}
                    className="w-full bg-[#25D366] hover:bg-[#1fb257] text-white active:brightness-95 transition-all duration-300 ease-in-out"
                  >
                    {language === 'ar' ? 'الدردشة على واتساب' : 'Chat on WhatsApp'}
                  </Button>
                  <p className="mt-2 text-center text-[11px] text-[#6b7280] dark:text-white/50">
                    {tapToChat}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppFloat;
