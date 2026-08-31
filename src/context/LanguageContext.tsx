import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import pt from '../translations/pt.json';
import en from '../translations/en.json';

export type Language = 'pt' | 'en';

interface LanguageContextProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const translations: Record<Language, any> = { pt, en };

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        const saved = localStorage.getItem('language');
        if (saved === 'pt' || saved === 'en') return saved as Language;

        // Check browser default
        const browserLang = navigator.language || '';
        if (browserLang.toLowerCase().startsWith('pt')) return 'pt';
        return 'en';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    }, [language]);

    const t = (path: string): string => {
        const keys = path.split('.');
        let value = translations[language];
        for (const key of keys) {
            if (value && value[key] !== undefined) {
                value = value[key];
            } else {
                return path; // Return the path if key not found
            }
        }
        return typeof value === 'string' ? value : path;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextProps => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
