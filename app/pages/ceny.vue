<script setup lang="ts">
import { priceCategories } from '~/data/prices'

const { url } = useSiteConfig()
const base = url.replace(/\/$/, '')

usePageSeo({
  title: 'Цены на пошив косплея, ремонт и услуги технолога | Анна Швецова',
  description: 'Ориентировочные цены на пошив косплея, ремонт и технологические услуги. Калькулятор считает примерную стоимость по сложности, объёму, сроку и материалам.',
  path: '/ceny',
})

useJsonLd({
  '@context': 'https://schema.org',
  '@graph': priceCategories.map(category => ({
    '@type': 'Service',
    'name': category.title,
    'description': category.lead,
    'url': `${base}/ceny#${category.id}`,
    'provider': { '@id': `${base}/#business` },
    'areaServed': 'RU',
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': category.title,
      'itemListElement': category.packages.map(pack => ({
        '@type': 'Offer',
        'name': `${pack.tier}: ${pack.name}`,
        'description': pack.includes.join('; '),
        'priceSpecification': {
          '@type': 'PriceSpecification',
          'minPrice': pack.priceFrom,
          'priceCurrency': 'RUB',
        },
      })),
    },
  })),
})
</script>

<template>
  <div>
    <header class="page-head wrap">
      <h1 class="page-head__title">Цены</h1>
      <p class="page-head__lead">
        Все суммы здесь ориентировочные и пока служат примером. Точная стоимость считается индивидуально, после референса и мерок.
      </p>
    </header>

    <SeamLine />

    <div class="section wrap">
      <LazyPriceBoard hydrate-never />
    </div>

    <SeamLine />

    <section id="kalkulyator" class="section wrap">
      <h2 class="section__title">Калькулятор</h2>
      <p class="section__lead">Отметьте параметры заказа, и справа появится примерная цена с разбивкой.</p>
      <LazyPriceCalculator hydrate-on-visible />
    </section>

    <SeamLine />
  </div>
</template>
