/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.bizleap.in',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  // Exclude: admin routes, API routes, and the non-approved author page
  exclude: [
    '/authors/aditya-sule',
    '/api/*',
    '/404',
    '/500',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    additionalSitemaps: [],
  },
};
