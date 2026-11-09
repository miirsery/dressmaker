<script setup lang="ts">
import { site } from '~/data/site'

const { url } = useSiteConfig()
const base = url.replace(/\/$/, '')

useHead({
  titleTemplate: (title?: string) => title ?? 'Анна Швецова, швея-технолог',
})

useJsonLd({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${base}/#person`,
      'name': site.name,
      'jobTitle': 'Швея-технолог',
      'url': `${base}/`,
      'email': `mailto:${site.email}`,
      'knowsAbout': ['пошив косплея', 'технология швейного производства', 'расчёт себестоимости'],
      'sameAs': [site.telegram, site.vk],
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${base}/#business`,
      'name': `Мастерская ${site.name.replace('Анна Швецова', 'Анны Швецовой')}`,
      'url': `${base}/`,
      'image': `${base}/og.png`,
      'email': site.email,
      'founder': { '@id': `${base}/#person` },
      'priceRange': '₽₽',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': site.city,
        'addressRegion': site.region,
        'addressCountry': site.country,
      },
      'areaServed': 'RU',
    },
  ],
})
</script>

<template>
  <a class="skip" href="#main">Перейти к содержимому</a>
  <TapeStrip />
  <SiteHeader />
  <main id="main" tabindex="-1">
    <NuxtPage />
  </main>
  <LazySiteFooter hydrate-never />
  <ThreadRunner />
</template>
