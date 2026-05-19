export async function getServerSideProps({ res }) {
  const today = new Date().toISOString().split('T')[0];

  const pages = [
    // Core pages - highest priority
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/about', changefreq: 'monthly', priority: '0.9' },
    { url: '/services', changefreq: 'weekly', priority: '0.9' },
    { url: '/contact', changefreq: 'monthly', priority: '0.9' },
    { url: '/work', changefreq: 'weekly', priority: '0.9' },
    { url: '/team', changefreq: 'monthly', priority: '0.8' },

    // Service pages
    { url: '/aiservices', changefreq: 'weekly', priority: '0.8' },
    { url: '/brandidentity', changefreq: 'weekly', priority: '0.8' },
    { url: '/influencer', changefreq: 'weekly', priority: '0.8' },
    { url: '/seowebsite', changefreq: 'weekly', priority: '0.8' },
    { url: '/socialmedia', changefreq: 'weekly', priority: '0.8' },
    { url: '/webdesign', changefreq: 'weekly', priority: '0.8' },

    // Portfolio / Case study pages
    { url: '/creators', changefreq: 'monthly', priority: '0.7' },
    { url: '/solarark', changefreq: 'monthly', priority: '0.7' },
    { url: '/tempwork', changefreq: 'monthly', priority: '0.7' },
    { url: '/tulirestro', changefreq: 'monthly', priority: '0.7' },

    // Team member profile pages
    { url: '/akshat', changefreq: 'monthly', priority: '0.7' },
    { url: '/kaushal', changefreq: 'monthly', priority: '0.7' },
    { url: '/masato', changefreq: 'monthly', priority: '0.7' },
    { url: '/meher', changefreq: 'monthly', priority: '0.7' },
  ];

  const urlEntries = pages
    .map(
      ({ url, changefreq, priority }) => `
    <url>
      <loc>https://bizleap.in${url}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>`
    )
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}
