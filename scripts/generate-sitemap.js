const fs = require('fs');
const path = require('path');

const EXTERNAL_DATA_URL = 'https://aiskoa.vercel.app';

const generateSitemap = () => {
  const postsDirectory = path.join(process.cwd(), 'posts');
  
  // Escanear posts en inglés (default locale)
  const enPosts = fs.readdirSync(path.join(postsDirectory, 'en')).filter(file => file.endsWith('.md'));
  
  // Escanear posts en español
  const esPosts = fs.readdirSync(path.join(postsDirectory, 'es')).filter(file => file.endsWith('.md'));

  // Páginas estáticas principales
  const staticPages = [
    '',
    '/portfolio',
    '/skills',
    '/contact',
    '/blog',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages (EN & ES) -->
  ${staticPages
    .map((route) => {
      return `
  <url>
    <loc>${`${EXTERNAL_DATA_URL}${route}`}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${`${EXTERNAL_DATA_URL}/es${route}`}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`;
    })
    .join('')}

  <!-- Blog Posts (EN) -->
  ${enPosts
    .map((post) => {
      const slug = post.replace('.md', '');
      return `
  <url>
    <loc>${`${EXTERNAL_DATA_URL}/blog/${slug}`}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join('')}

  <!-- Blog Posts (ES) -->
  ${esPosts
    .map((post) => {
      const slug = post.replace('.md', '');
      return `
  <url>
    <loc>${`${EXTERNAL_DATA_URL}/es/blog/${slug}`}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join('')}
</urlset>
`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully in public/sitemap.xml');
};

generateSitemap();