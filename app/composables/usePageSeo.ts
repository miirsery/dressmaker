interface PageSeo {
  title: string
  description: string
  path: string
}

/** Полный адрес сайта с подкаталогом, без завершающего слэша */
export const useSiteBase = () => {
  const { url } = useSiteConfig()
  const { baseURL } = useRuntimeConfig().app
  return `${url.replace(/\/$/, '')}${baseURL.replace(/\/$/, '')}`
}

export const usePageSeo = ({ title, description, path }: PageSeo) => {
  const base = useSiteBase()
  const canonical = `${base}${path}`
  const image = `${base}/og.png`

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: canonical,
    ogType: 'website',
    ogLocale: 'ru_RU',
    ogSiteName: 'Анна Швецова',
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: 'Надпись «Шью косплей. Считаю производство.» на миллиметровке с выкройкой',
    twitterCard: 'summary_large_image',
  })

  useHead({ link: [{ rel: 'canonical', href: canonical }] })
}

export const useJsonLd = (data: Record<string, unknown>) => {
  useHead({
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(data) }],
  })
}
