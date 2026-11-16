import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PROJECTS } from '../data/projects';

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/**
 * Atualiza título, descrição, og:* e twitter:* conforme a rota e o idioma.
 * É uma SPA, então sem isso todas as páginas compartilhariam os dados da home.
 */
export function useDocumentMeta(projectId: string | null, isPortfolio: boolean) {
  const { t, tOptional, language } = useLanguage();

  useEffect(() => {
    const baseTitle = t('meta.title');
    let title = baseTitle;
    let description = t('meta.description');
    let path = '/';

    if (projectId && PROJECTS.some((p) => p.id === projectId)) {
      title = `${t(`projects.items.${projectId}.title`)} | Filipi Soares`;
      description = tOptional(`projects.items.${projectId}.short_desc`) ?? description;
      path = `/#/project/${projectId}`;
    } else if (isPortfolio) {
      title = `${t('portfolio.title')} | Filipi Soares`;
      description = t('portfolio.subtitle');
      path = '/#/portfolio';
    }

    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', `${window.location.origin}${path}`);
    setMeta('meta[property="og:locale"]', 'content', language === 'pt' ? 'pt_BR' : 'en_US');
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
  }, [projectId, isPortfolio, language, t, tOptional]);
}
