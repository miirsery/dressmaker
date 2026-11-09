<script setup lang="ts">
import { priceCategories } from '~/data/prices'
</script>

<template>
  <div class="board">
    <section v-for="category in priceCategories" :id="category.id" :key="category.id" class="board__group">
      <header class="board__head">
        <ThreadIcon :name="category.icon" />
        <div>
          <h2 class="board__title">{{ category.title }}</h2>
          <p class="board__lead">{{ category.lead }}</p>
        </div>
      </header>

      <ul class="board__rail">
        <li v-for="pack in category.packages" :key="pack.tier" class="board__hang swing">
          <article class="tag" :class="{ 'tag--top': pack.tier === 'Премиум' }">
            <p class="tag__tier">{{ pack.tier }}</p>
            <h3 class="tag__name">{{ pack.name }}</h3>
            <p class="tag__price">{{ pack.price }}</p>
            <ul class="tag__list">
              <li v-for="item in pack.includes" :key="item">{{ item }}</li>
            </ul>
          </article>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.board { display: grid; gap: 64px; }

.board__head {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  margin-bottom: 26px;
}

.board__head > div { min-width: 0; }

.board__head :deep(svg) { flex: none; }

.board__title {
  margin: 0 0 4px;
  font: 900 clamp(1.55rem, 6vw, 3rem)/1.05 var(--font-display);
  overflow-wrap: break-word;
}

.board__lead { margin: 0; max-width: 50ch; }

.board__rail {
  display: grid;
  gap: 34px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.board__hang {
  position: relative;
  filter: drop-shadow(0 3px 0 rgb(42 25 48 / 0.18));
}

/* Петля бирки */
.board__hang::before {
  position: absolute;
  top: -34px;
  left: 50%;
  z-index: 1;
  width: 0;
  height: 56px;
  content: '';
  border-left: 2px dashed var(--thread);
}

.tag {
  --cut: 28px;
  height: 100%;
  padding: 44px 24px 26px;
  background-color: var(--white);
  background-image: var(--weave);
  clip-path: polygon(var(--cut) 0, calc(100% - var(--cut)) 0, 100% var(--cut), 100% 100%, 0 100%, 0 var(--cut));
  mask: radial-gradient(circle 8px at 50% 20px, transparent 97%, #000);
}

.tag--top {
  background-color: var(--tape);
  background-image: var(--weave-dark);
}

.tag__tier {
  margin: 0;
  font: 600 1.35rem/1.2 var(--font-hand);
  color: var(--chalk);
}

.tag--top .tag__tier { color: var(--ink); }

.tag__name {
  margin: 0 0 12px;
  font: italic 900 1.75rem/1.1 var(--font-display);
}

.tag__price {
  padding-block: 8px;
  margin: 0 0 12px;
  font-size: 1.3125rem;
  font-weight: 700;
  border-block: 1.5px dashed var(--ink);
}

.tag__list {
  padding-left: 1.1em;
  margin: 0;
}

.tag__list li::marker { content: '× '; color: var(--thread); font-weight: 700; }

@media (min-width: 820px) {
  .board__rail {
    grid-template-columns: repeat(3, 1fr);
    gap: 26px;
    padding-top: 26px;
    border-top: 2px dashed var(--thread);
  }

  .board__hang:nth-child(1) { rotate: -1.4deg; }
  .board__hang:nth-child(2) { rotate: 0.9deg; margin-top: 16px; }
  .board__hang:nth-child(3) { rotate: -0.6deg; margin-top: 4px; }

  .board__hang::before { top: -30px; height: 52px; }

  @media (prefers-reduced-motion: no-preference) {
    .board__hang { transition: rotate 0.25s; }
    .board__hang:hover { rotate: 0deg; }
  }
}
</style>
