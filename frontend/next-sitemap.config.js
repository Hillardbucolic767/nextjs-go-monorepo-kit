/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  autoLastmod: false,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: "public",
};
