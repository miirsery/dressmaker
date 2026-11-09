<script setup lang="ts">
import { caseNotes, processPhotos, works } from '~/data/works'

const route = useRoute()
const index = works.findIndex(item => item.slug === route.params.slug)
const work = works[index]

if (!work) {
  throw createError({ statusCode: 404, statusMessage: 'Такой работы нет', fatal: true })
}

const notes = caseNotes[work.slug]
const next = works[(index + 1) % works.length]!
const base = useSiteBase()

usePageSeo({
  title: `${work.title}: материалы и этапы пошива | Анна Швецова`,
  description: `${work.summary} Материалы: ${work.materials.join(', ')}.`,
  path: `/raboty/${work.slug}`,
})

useJsonLd({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Работы', 'item': `${base}/raboty` },
        { '@type': 'ListItem', 'position': 2, 'name': work.title, 'item': `${base}/raboty/${work.slug}` },
      ],
    },
    {
      '@type': 'CreativeWork',
      'name': work.title,
      'description': work.summary,
      'material': work.materials.join(', '),
      'creator': { '@id': `${base}/#person` },
    },
  ],
})
</script>

<template>
  <div v-if="work">
    <header class="page-head wrap">
      <nav class="crumbs" aria-label="Хлебные крошки">
        <NuxtLink to="/raboty">Работы</NuxtLink>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{{ work.title }}</span>
      </nav>
      <h1 class="case-title">{{ work.title }}</h1>
      <p class="page-head__lead">{{ work.summary }}</p>
    </header>

    <SeamLine />

    <section class="section wrap case" aria-label="О работе">
      <div class="case__frame">
        <WorkPhoto :src="work.src" :alt="work.alt" :aspect="work.aspect" :focus="work.focus" eager />
      </div>

      <div>
        <p class="note case__flag">Пример работы, фото временное</p>
        <template v-if="notes">
          <h2 class="case__sub">Задача</h2>
          <p class="case__text">{{ notes.task }}</p>
          <h2 class="case__sub">Решение</h2>
          <p class="case__text">{{ notes.solution }}</p>
        </template>
        <h2 class="case__sub">Материалы</h2>
        <ul class="case__materials">
          <li v-for="item in work.materials" :key="item">{{ item }}</li>
        </ul>
        <p class="case__hours">{{ work.hours }} часов работы</p>
        <a v-if="work.creditUrl" class="case__credit" :href="work.creditUrl" rel="noopener nofollow">Источник фото: Unsplash</a>
      </div>
    </section>

    <SeamLine />

    <section class="section wrap">
      <h2 class="section__title">Этапы</h2>
      <ol class="stages">
        <li v-for="(stage, i) in work.stages" :key="stage" class="stages__item rise">
          <WorkPhoto
            :src="processPhotos[i % processPhotos.length]!.src"
            :alt="processPhotos[i % processPhotos.length]!.alt"
            aspect="4/3"
            sizes="(min-width: 820px) 40vw, 85vw"
          />
          <p class="stages__name">{{ stage }}</p>
        </li>
      </ol>
      <p class="case__next">Следующая работа: <NuxtLink :to="`/raboty/${next.slug}`">{{ next.title }}</NuxtLink></p>
    </section>

    <SeamLine />
  </div>
</template>

<style scoped>
.crumbs { margin-bottom: 14px; }
.crumbs a { display: inline-block; padding-block: 6px; }

.case-title {
  margin: 0 0 12px;
  font: italic 900 clamp(2.5rem, 9vw, 5.5rem)/1 var(--font-display);
}

.case { display: grid; gap: 28px; }

.case__frame {
  padding: 8px;
  background: var(--white);
  border: 1px solid var(--ink);
}

.case__flag { margin: 0 0 10px; }

.case__sub {
  margin: 18px 0 6px;
  font: 900 1.625rem/1.15 var(--font-display);
}

.case__text { max-width: 48ch; margin: 0; }

.case__materials { padding-left: 1.1em; margin: 0; }
.case__materials li::marker { content: '× '; color: var(--thread); font-weight: 700; }

.case__hours { margin: 18px 0 4px; font-weight: 700; }

.case__credit { display: inline-block; padding-block: 8px; font-size: 0.875rem; color: var(--ink-soft); }

.stages {
  display: grid;
  gap: 30px;
  padding: 0;
  margin: 28px 0 0;
  list-style: none;
  counter-reset: stage;
}

.stages__item { counter-increment: stage; }

.stages__name { margin: 10px 0 0; font-weight: 600; }

.stages__name::before {
  margin-right: 8px;
  font: 600 1.5rem/1 var(--font-hand);
  color: var(--thread);
  content: counter(stage) '.';
}

.case__next { margin: 44px 0 0; font-size: 1.125rem; }

@media (min-width: 820px) {
  .case { grid-template-columns: minmax(0, 0.8fr) minmax(0, 1fr); gap: 56px; align-items: start; }
  .stages { grid-template-columns: repeat(2, 1fr); gap: 44px; }
}
</style>
