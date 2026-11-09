const siteUrl = process.env.NUXT_PUBLIC_SITE_URL ?? 'https://atelier-shvetsova.example'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  modules: ['@nuxt/fonts', '@nuxt/image', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  css: ['~/assets/css/main.css'],

  site: {
    url: siteUrl,
    name: 'Анна Швецова, швея-технолог',
    defaultLocale: 'ru',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      viewport: 'width=device-width, initial-scale=1',
      meta: [{ name: 'theme-color', content: '#f7cb3f' }],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://images.unsplash.com', crossorigin: '' },
      ],
    },
  },

  fonts: {
    defaults: { subsets: ['cyrillic', 'latin'], display: 'swap' },
    families: [
      { name: 'Vollkorn', provider: 'google', weights: [900], styles: ['normal', 'italic'], global: true },
      { name: 'Commissioner', provider: 'google', weights: ['400 700'], styles: ['normal'], global: true },
      { name: 'Caveat', provider: 'google', weights: [600], styles: ['normal'], global: true },
    ],
  },

  image: {
    quality: 68,
    domains: ['images.unsplash.com'],
    unsplash: {},
    screens: { xs: 360, sm: 640, md: 820, lg: 1100, xl: 1440 },
  },

  features: { inlineStyles: true },

  hooks: {
    // Заранее грузим только точку входа, остальные чанки подтянутся при необходимости
    'build:manifest': (manifest) => {
      Object.values(manifest).forEach((chunk) => {
        if (!chunk.isEntry) chunk.preload = false
        chunk.prefetch = false
      })
    },
  },

  experimental: {
    appManifest: false,
    defaults: { nuxtLink: { prefetchOn: { interaction: true, visibility: false } } },
  },

  nitro: {
    prerender: { crawlLinks: true, routes: ['/', '/sitemap.xml', '/robots.txt'] },
  },
})
