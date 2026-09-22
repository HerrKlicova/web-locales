import type { APIRoute } from 'astro';

/**
 * robots.txt. `site` solo está definido en producción (astro.config), así que la demo
 * sale siempre con Disallow, en línea con su `noindex` (§9). El sitemap solo se anuncia
 * cuando la web vive en su dominio.
 */
export const GET: APIRoute = ({ site }) => {
  const lineas = site
    ? ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('sitemap-index.xml', site).href}`]
    : ['User-agent: *', 'Disallow: /'];
  return new Response(`${lineas.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
