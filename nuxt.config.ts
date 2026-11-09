const siteUrl = process.env.NUXT_PUBLIC_SITE_URL ?? 'https://atelier-shvetsova.example'
const baseURL = process.env.NUXT_APP_BASE_URL ?? '/'
// robots.txt работает только в корне домена, в подкаталоге GitHub Pages он не нужен
const hasRobotsTxt = baseURL === '/'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  modules: ['@nuxt/fonts', '@nuxt/image', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  css: ['~/assets/css/main.css'],

  site: {
    url: siteUrl,
    name: 'Анна Швецова, швея-технолог',
    defaultLocale: 'ru',
    indexable: process.env.NUXT_SITE_INDEXABLE !== 'false',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      viewport: 'width=device-width, initial-scale=1',
      meta: [{ name: 'theme-color', content: '#f7cb3f' }],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: `${baseURL}favicon.svg` },
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

  runtimeConfig: {
    telegramBotToken: '',
    telegramChatId: '',
    telegramApiBase: 'https://api.telegram.org',
    public: {
      // Пустое значение: сборка без сервера, вместо формы показываются прямые контакты
      orderEndpoint: '',
      // Ссылка на Яндекс Форму: показывается на /zayavka, если нет своего приёма заявок
      yandexFormUrl: '',
      metrikaId: '',
      yandexVerification: '',
    },
  },

  sitemap: { exclude: ['/politika', '/soglasie'] },

  robots: { robotsTxt: hasRobotsTxt },

  // Страницы готовятся заранее, живым остаётся только приём заявок
  routeRules: { '/**': { prerender: true }, '/api/**': { prerender: false } },

  nitro: {
    compressPublicAssets: true,
    prerender: { crawlLinks: true, routes: ['/', '/sitemap.xml', ...(hasRobotsTxt ? ['/robots.txt'] : [])] },
  },
})
