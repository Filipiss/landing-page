import pt from './pt.json';
import enJson from './en.json';

export type Language = 'pt' | 'en';

/**
 * O pt.json é a referência. Atribuir o en.json a este tipo faz o TypeScript
 * acusar, no build, qualquer chave que exista em um idioma e falte no outro.
 */
export type TranslationSchema = typeof pt;
const en: TranslationSchema = enJson;

export const translations: Record<Language, TranslationSchema> = { pt, en };
