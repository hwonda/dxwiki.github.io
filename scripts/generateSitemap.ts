import { promises as fs } from 'fs';
import { getSitemapURLs, generateSitemapXML } from '../src/utils/sitemap';

(async () => {
  const urls = await getSitemapURLs();
  const sitemap = generateSitemapXML(urls);

  // 사이트맵 파일 생성
  await fs.writeFile('public/sitemap.xml', sitemap);
  console.log('sitemap.xml generated', sitemap);
})();
