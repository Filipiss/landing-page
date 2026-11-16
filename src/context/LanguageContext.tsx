import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode, FC } from 'react';
import { translations, Language } from '../translations';
import { safeStorage } from '../utils/safeStorage';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  /** Texto da chave. Se a chave não existir, devolve a própria chave (e avisa no console em dev). */
  t: (path: string) => string;
  /** Texto da chave, ou undefined se ela não existir. Para campos opcionais, como live_url. */
  tOptional: (path: string) => string | undefined;
  /** Valor bruto da chave (listas, objetos), ou undefined se não existir. */
  tRaw: <T = unknown>(path: string) => T | undefined;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

function lookup(source: unknown, path: string): unknown {
  let value = source;
  for (const key of path.split('.')) {
    if (value === null || typeof value !== 'object' || !(key in value)) return undefined;
    value = (value as Record<string, unknown>)[key];
  }
  return value;
}

function initialLanguage(): Language {
  const saved = safeStorage.get('language');
  if (saved === 'pt' || saved === 'en') return saved;
  return (navigator.language || '').toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  useEffect(() => {
    safeStorage.set('language', language);
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  }, [language]);

  const tRaw = useCallback(
    <T,>(path: string): T | undefined => lookup(translations[language], path) as T | undefined,
    [language]
  );

  const tOptional = useCallback(
    (path: string): string | undefined => {
      const value = lookup(translations[language], path);
      return typeof value === 'string' && value !== '' ? value : undefined;
    },
    [language]
  );

  const t = useCallback(
    (path: string): string => {
      const value = tOptional(path);
      if (value === undefined && import.meta.env.DEV) {
        console.warn(`[i18n] Chave ausente em "${language}": ${path}`);
      }
      return value ?? path;
    },
    [tOptional, language]
  );

  const value = useMemo(
    () => ({ language, setLanguage, t, tOptional, tRaw }),
    [language, t, tOptional, tRaw]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
