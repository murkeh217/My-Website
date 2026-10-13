'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type Locale = 'en' | 'hi' | 'zh-CN';

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const storageKey = 'mk-portfolio-locale';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const savedLocale = window.localStorage.getItem(storageKey);
    if (savedLocale === 'en' || savedLocale === 'hi' || savedLocale === 'zh-CN') setLocale(savedLocale);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
