import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

/**
 * Crawlers de WhatsApp, LinkedIn e afins não executam JavaScript, então
 * og:image, og:url e canonical precisam de URL absoluta já no index.html.
 * Ordem: VITE_SITE_URL (.env) → domínio de produção da Vercel → caminho relativo.
 */
function siteUrlPlugin(siteUrl: string): Plugin {
    return {
        name: 'site-url',
        transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl),
    }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const vercelUrl = env.VERCEL_PROJECT_PRODUCTION_URL
    const siteUrl = (env.VITE_SITE_URL || (vercelUrl ? `https://${vercelUrl}` : '')).replace(/\/$/, '')

    return {
        plugins: [react(), siteUrlPlugin(siteUrl)],
    }
})
