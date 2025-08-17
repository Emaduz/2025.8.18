/**
 * localize helper
 * Returns a localized string from a { en, ar } object using the current language.
 * Falls back to English and then to an empty string for safety.
 */
import type { LocalizedText } from '../data/projects';

/**
 * Safely localize a LocalizedText value.
 */
export function localize(text: LocalizedText, lang: 'en' | 'ar'): string {
  if (!text) return '';
  // Prefer current language, then English, else empty string
  return (text as any)[lang] ?? (text as any).en ?? '';
}
