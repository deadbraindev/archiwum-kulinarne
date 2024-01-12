export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/nieznaleziono',
    },
    sitemap: 'https://archiwumkulinarne.deadbrain.dev/sitemap.xml',
  };
}
