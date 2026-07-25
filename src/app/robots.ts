import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // Typical to disallow api routes
    },
    sitemap: 'https://sunflowerpetals.com/sitemap.xml',
  }
}
