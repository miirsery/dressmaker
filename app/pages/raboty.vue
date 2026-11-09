<script setup lang="ts">
import { works } from '~/data/works'

usePageSeo({
  title: 'Работы: костюмы, материалы и этапы пошива | Анна Швецова',
  description: 'Примеры косплей-костюмов: доспех, бальное платье, кимоно и многослойные образы. Для каждого указаны материалы, этапы и часы работы.',
  path: '/raboty',
})

useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  'name': 'Работы',
  'itemListElement': works.map((work, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'name': work.title,
    'description': work.summary,
  })),
})
</script>

<template>
  <div>
    <header class="page-head wrap">
      <h1 class="page-head__title">Работы</h1>
      <p class="page-head__lead">
        У каждого костюма указаны материалы, этапы и часы. Сейчас здесь временные фото других косплееров с Unsplash, они показывают формат будущей галереи.
      </p>
    </header>

    <SeamLine />

    <section class="section wrap" aria-label="Галерея работ">
      <div class="gallery">
        <LazyWorkItem v-for="(work, i) in works" :key="work.slug" hydrate-never :work="work" :flip="i % 2 === 1" :eager="i === 0" />
      </div>
    </section>

    <SeamLine />
  </div>
</template>

<style scoped>
.gallery { display: grid; gap: 64px; }

@media (min-width: 760px) {
  .gallery { gap: 112px; }
}
</style>
