import { dikiMetadata } from '@/constants';
import { fetchTermsData } from '@/utils/fetchData';

interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

const escapeXML = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

const encodeURL = (url: string): string => {
  return url.replace(/[&<>"'*]/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&apos;',
    };

    return entities[char] || char;
  });
};

const generateSitemapURL = ({ loc, lastmod, changefreq, priority }: SitemapURL): string => {
  return `
    <url>
      <loc>${ loc }</loc>
      <lastmod>${ lastmod }</lastmod>
      <changefreq>${ changefreq }</changefreq>
      <priority>${ priority }</priority>
    </url>
  `;
};

const generateSitemapByEscapeXML = ({ urls }: { urls: SitemapURL[] }): string => {
  return escapeXML(`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${ urls.map(({ loc, lastmod, changefreq, priority }) => `
      <url>
        <loc>${ loc }</loc>
        <lastmod>${ lastmod }</lastmod>
        <changefreq>${ changefreq }</changefreq>
        <priority>${ priority }</priority>
      </url>
    `).join('') }
  </urlset>`);
};

const generateSitemapByEncodeXML = ({ urls }: { urls: SitemapURL[] }): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${ urls.map(({ loc, lastmod, changefreq, priority }) => `
      <url>
        <loc>${ encodeURL(loc) }</loc>
        <lastmod>${ lastmod }</lastmod>
        <changefreq>${ changefreq }</changefreq>
        <priority>${ priority }</priority>
      </url>
    `).join('') }
  </urlset>`;
};

const generateSitemapXML = (urls: SitemapURL[]): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${ urls.map(generateSitemapURL).join('') }
    </urlset>`;
};

export const getSitemapURLs = async (): Promise<SitemapURL[]> => {
  const baseUrl = dikiMetadata.url;
  const postLists = await fetchTermsData();

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0] + 'T00:00:00+00:00';
  };

  const urls: SitemapURL[] = [
    {
      loc: baseUrl,
      lastmod: formatDate(new Date()),
      changefreq: 'always',
      priority: 1.00,
    },
    {
      loc: `${ baseUrl }/posts`,
      lastmod: formatDate(new Date()),
      changefreq: 'always',
      priority: 0.80,
    },
    ...postLists.map(({ url, metadata }) => {
      const date = metadata?.updated_at || metadata?.created_at;
      const lastmod = date ? new Date(date) : new Date();

      return {
        loc: `${ baseUrl }${ url }`,
        lastmod: formatDate(lastmod),
        changefreq: 'always',
        priority: 0.64,
      };
    }),
  ];

  return urls;
};

export { generateSitemapXML, generateSitemapByEscapeXML, generateSitemapByEncodeXML };