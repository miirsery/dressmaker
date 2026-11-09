<script setup lang="ts">
import { works } from '~/data/works'

usePageSeo({
  title: 'Анна Швецова: косплей на заказ и технолог швейного производства',
  description: 'Шью костюмы для сцены и конвентов в Санкт-Петербурге. Составляю техкарты и считаю себестоимость для брендов и швейных студий.',
  path: '/',
})

const selected = works.slice(1, 4)

const mobileLines = [
  { text: 'Шью косплей.', x: 8, y: 66, size: 70, width: 400 },
  { text: 'Считаю', x: 8, y: 146, size: 62, width: 216, italic: true },
  { text: 'производство.', x: 8, y: 216, size: 62, width: 400, italic: true },
]

const desktopLines = [
  { text: 'Шью косплей.', x: 8, y: 92, size: 108, width: 640 },
  { text: 'Считаю', x: 8, y: 208, size: 96, width: 344, italic: true },
  { text: 'производство.', x: 8, y: 312, size: 96, width: 640, italic: true },
]
</script>

<template>
  <div>
    <section class="hero wrap">
      <div class="hero__copy">
        <p class="note hero__eyebrow">швея-технолог, Санкт-Петербург</p>
        <h1 class="sr-only">Шью косплей. Считаю производство.</h1>
        <StitchedTitle class="hero__title hero__title--s" viewBox="0 0 416 232" :lines="mobileLines" />
        <StitchedTitle class="hero__title hero__title--l" viewBox="0 0 660 330" :lines="desktopLines" />
        <p class="hero__lead">
          Костюмы для сцены и конвентов, которые не расходятся на третий час. Техкарты и расчёт себестоимости для брендов и швейных студий.
        </p>
        <div class="hero__cta">
          <NuxtLink class="btn" to="/ceny#kalkulyator">Посчитать стоимость</NuxtLink>
          <NuxtLink class="btn btn--light" to="/raboty">Смотреть работы</NuxtLink>
        </div>
      </div>

      <div class="hero__piece">
        <svg width="0" height="0" class="hero__defs" aria-hidden="true">
          <clipPath id="bodice" clipPathUnits="objectBoundingBox">
            <path d="M.18 0 L.36 .05 Q.5 .13 .64 .05 L.82 0 L.87 .2 Q.82 .33 .97 .38 L1 1 L0 1 L.03 .38 Q.18 .33 .13 .2 Z" />
          </clipPath>
        </svg>
        <div class="hero__cut">
          <WorkPhoto
            :src="works[0]!.src"
            :alt="works[0]!.alt"
            aspect="10/13"
            focus="50% 12%"
            sizes="(min-width: 980px) 460px, 88vw"
            eager
          />
        </div>
        <svg class="hero__marks" viewBox="0 0 100 130" preserveAspectRatio="none" aria-hidden="true">
          <path d="M18 0 L36 6.5 Q50 16.9 64 6.5 L82 0 L87 26 Q82 42.9 97 49.4 L100 130 L0 130 L3 49.4 Q18 42.9 13 26 Z" />
        </svg>
        <p class="note hero__tag hero__tag--a" aria-hidden="true">перед, крой 1 по сгибу</p>
        <p class="note hero__tag hero__tag--b" aria-hidden="true">долевая ↕</p>
      </div>
    </section>

    <SeamLine />

    <section class="sides section">
      <div class="wrap sides__grid">
        <h2 class="section__title sides__title">У каждого костюма две стороны</h2>

        <div class="sides__face rise">
          <p class="note sides__mark">лицо</p>
          <h3 class="sides__sub">То, что видят зал и камера</h3>
          <ul class="sides__list">
            <li>Силуэт и пропорции по референсу персонажа</li>
            <li>Ткани, которые не бликуют на вспышке</li>
            <li>Детали, в которых можно двигаться и садиться</li>
          </ul>
          <NuxtLink to="/raboty">Посмотреть работы</NuxtLink>
        </div>

        <div class="sides__back rise">
          <p class="note sides__mark">изнанка</p>
          <h3 class="sides__sub">То, что держит костюм и считает деньги</h3>
          <ul class="sides__list">
            <li>Конструкция и последовательность операций</li>
            <li>Нормы расхода и спецификация материалов</li>
            <li>Себестоимость единицы до запуска партии</li>
          </ul>
          <NuxtLink to="/tehnolog">Что делаю как технолог</NuxtLink>
        </div>
      </div>
    </section>

    <SeamLine />

    <section class="section lab-section">
      <div class="wrap">
        <h2 class="section__title">Примерьте ткань на выкройку</h2>
        <p class="section__lead">Одна и та же деталь ведёт себя по-разному в разных тканях. Выберите образец, и поменяются расход и заметки к пошиву.</p>
        <LazyPatternLab hydrate-on-visible />
      </div>
    </section>

    <SeamLine />

    <section class="section">
      <div class="wrap">
        <h2 class="section__title">Что уже сшито</h2>
        <p class="section__lead">У каждой работы указаны материалы и этапы. Сейчас вместо моих снимков стоят временные фото.</p>
        <div class="works-list">
          <LazyWorkItem hydrate-never v-for="(work, i) in selected" :key="work.slug" :work="work" :level="3" :flip="i % 2 === 1" />
        </div>
        <p class="works-more"><NuxtLink class="btn" to="/raboty">Все работы</NuxtLink></p>
      </div>
    </section>

    <SeamLine />

    <section class="section">
      <div class="wrap">
        <h2 class="section__title">Как идёт работа</h2>
        <p class="section__lead">От первого письма до готового костюма обычно проходит от шести недель.</p>
        <LazyTapeSteps hydrate-never />
      </div>
    </section>

    <SeamLine />
  </div>
</template>

<style scoped>
.hero {
  display: grid;
  gap: 30px;
  padding-block: 14px 56px;
}

.hero__eyebrow { margin: 0 0 12px; }

.hero__title--l { display: none; }

.hero__lead {
  max-width: 46ch;
  margin: 26px 0 22px;
  font-size: 1.1875rem;
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero__piece {
  position: relative;
  width: min(100%, 460px);
  margin-inline: auto;
}

.hero__defs { position: absolute; }

.hero__cut { clip-path: url(#bodice); }

.hero__marks {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.hero__marks path {
  fill: none;
  stroke: var(--ink);
  stroke-width: 1.6;
  stroke-dasharray: 8 6;
  vector-effect: non-scaling-stroke;
}

.hero__tag {
  position: absolute;
  margin: 0;
  background: var(--white);
  padding: 0 8px;
  border: 1px solid var(--ink);
}

.hero__tag--a { left: 0; bottom: 10%; rotate: -5deg; }
.hero__tag--b { right: 0; top: 34%; rotate: 4deg; font-size: 1.15rem; }

.sides__grid { display: grid; gap: 28px; }

.sides__face,
.sides__back {
  padding: 22px 22px 26px;
}

.sides__face {
  background: var(--white);
  border: 1px solid var(--ink);
}

/* Изнанка: лён и обмёточный край */
.sides__back {
  background-color: var(--linen);
  background-image: var(--weave);
  border-left: 6px double var(--thread);
}

.sides__mark { margin: 0; }

.sides__sub {
  margin: 0 0 12px;
  font: 900 1.75rem/1.1 var(--font-display);
}

.sides__list {
  padding-left: 1.1em;
  margin: 0 0 16px;
}

.sides__list li::marker { content: '× '; color: var(--thread); font-weight: 700; }

.works-list { display: grid; gap: 64px; }

.works-more { margin: 48px 0 0; }

@media (min-width: 760px) {
  .works-list { gap: 96px; }
  .sides__grid { grid-template-columns: 1fr 1fr; gap: 0; }
  .sides__title { grid-column: 1 / -1; margin-bottom: 36px; }
  .sides__face, .sides__back { padding: 36px 40px 40px; }
  .sides__back { translate: -1px 40px; }
}

@media (min-width: 980px) {
  .hero {
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
    gap: 48px;
    align-items: center;
    padding-block: 28px 96px;
  }

  .hero__title--s { display: none; }
  .hero__title--l { display: block; }
}

@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) and (min-width: 980px) {
    .hero__piece {
      animation: piece-drift linear both;
      animation-timeline: scroll(root);
      animation-range: 0 700px;
    }
  }
}

@keyframes piece-drift {
  to { transform: translateY(60px) rotate(2.5deg); }
}
</style>
