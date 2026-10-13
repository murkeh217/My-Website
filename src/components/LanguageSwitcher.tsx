'use client';

import { useLanguage } from './LanguageProvider';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return <div className="language-switch" role="group" aria-label="Language">
    <button type="button" aria-label="English" aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>EN</button>
    <button type="button" aria-label="Hindi" aria-pressed={locale === 'hi'} onClick={() => setLocale('hi')}>हिन्दी</button>
    <button type="button" aria-label="Chinese" aria-pressed={locale === 'zh-CN'} onClick={() => setLocale('zh-CN')}>中文</button>
  </div>;
}
