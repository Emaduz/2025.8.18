/**
 * Main navigation header component
 * Features logo, navigation menu, theme toggle, and language switcher
 * - Sticky with shrink-on-scroll
 * - Sliding underline for current page
 * - Animated hamburger icon
 */
import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, language, toggleTheme, toggleLanguage } = useTheme();
  const { t } = useTranslation(language);
  const location = useLocation();
  const scrolled = useScrollTrigger(10);

  const navigation = useMemo(
    () => [
      { name: t('home'), href: '/' },
      { name: t('portfolio'), href: '/portfolio' },
      { name: t('about'), href: '/about' },
      { name: t('services'), href: '/services' },
      { name: t('contact'), href: '/contact' },
    ],
    [t]
  );

  const isActiveRoute = (href: string) => location.pathname === href;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[#9c7860]/20 dark:border-[#d9cab1]/20 transition-all duration-300 
      ${scrolled ? 'bg-[#d9cab1]/90 dark:bg-[#1a1a1a]/90 shadow-md' : 'bg-[#d9cab1]/80 dark:bg-[#1a1a1a]/80'} 
      ${scrolled ? 'py-1' : 'py-2'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse group">
            <div className={`rounded-full overflow-hidden transition-all duration-300 ${theme === 'light' ? 'bg-white p-1' : ''} ${scrolled ? 'w-9 h-9' : 'w-10 h-10'}`}>
              <img
                src="https://pub-cdn.sider.ai/u/U0AWH647XGE/web-coder/68867f69f2d3a0ac8dcde35e/resource/2f8833bb-848a-4376-9d94-4e9992a5b2b2.png"
                alt="EmadAlddine Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-[#8f1819] dark:text-[#bd7b6a] transition-all duration-300 ${scrolled ? 'text-base' : 'text-lg'}`}>
                {t('title')}
              </span>
              <span className={`text-[#9c7860] dark:text-[#d9cab1]/80 transition-opacity duration-300 ${scrolled ? 'text-[10px] opacity-90' : 'text-xs opacity-100'}`}>
                {t('subtitle')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navigation.map((item) => {
              const active = isActiveRoute(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group relative text-sm font-medium transition-colors duration-200 
                  ${active ? 'text-[#8f1819] dark:text-[#bd7b6a]' : 'text-[#9c7860] dark:text-[#d9cab1] hover:text-[#8f1819] dark:hover:text-[#bd7b6a]'}`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#8f1819] dark:bg-[#bd7b6a] transition-transform duration-300 origin-left
                    ${active ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'}`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="border-[#9c7860] text-[#9c7860] hover:bg-[#9c7860] hover:text-white dark:border-[#d9cab1] dark:text-[#d9cab1] dark:hover:bg-[#d9cab1] dark:hover:text-[#1a1a1a] bg-transparent"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="border-[#9c7860] text-[#9c7860] hover:bg-[#9c7860] hover:text-white dark:border-[#d9cab1] dark:text-[#d9cab1] dark:hover:bg-[#d9cab1] dark:hover:text-[#1a1a1a] bg-transparent"
            >
              <Globe className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
              {language === 'en' ? 'ع' : 'EN'}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2 rtl:space-x-reverse">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="border-[#9c7860] text-[#9c7860] hover:bg-[#9c7860] hover:text-white dark:border-[#d9cab1] dark:text-[#d9cab1] dark:hover:bg-[#d9cab1] dark:hover:text-[#1a1a1a] bg-transparent"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="border-[#9c7860] text-[#9c7860] hover:bg-[#9c7860] hover:text-white dark:border-[#d9cab1] dark:text-[#d9cab1] dark:hover:bg-[#d9cab1] dark:hover:text-[#1a1a1a] bg-transparent"
            >
              {language === 'en' ? 'ع' : 'EN'}
            </Button>
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className={`text-[#9c7860] dark:text-[#d9cab1] hover:text-[#8f1819] dark:hover:text-[#bd7b6a] transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#d9cab1] dark:bg-[#1a1a1a] border-t border-[#9c7860]/20 dark:border-[#d9cab1]/20">
              {navigation.map((item) => {
                const active = isActiveRoute(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                      active
                        ? 'text-[#8f1819] dark:text-[#bd7b6a] bg-[#9c7860]/10 dark:bg-[#d9cab1]/10'
                        : 'text-[#9c7860] dark:text-[#d9cab1] hover:text-[#8f1819] dark:hover:text-[#bd7b6a] hover:bg-[#9c7860]/10 dark:hover:bg-[#d9cab1]/10'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
