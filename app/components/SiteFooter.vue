<script setup lang="ts">
import { nav, site } from '~/data/site'

const year = 2026
</script>

<template>
  <footer id="kontakty" class="foot" data-thread-end>
    <div class="wrap foot__grid">
      <div>
        <p class="note foot__note">напишите, что хотите сшить</p>
        <h2 class="foot__title">Пришлите референс, дату и бюджет.</h2>
        <p class="foot__lead">Отвечу в течение дня и скажу, успеваем ли. Для производства приложите эскиз или образец и объём партии.</p>
        <p class="foot__cta"><NuxtLink class="btn" to="/zayavka">Оставить заявку</NuxtLink></p>
      </div>

      <div class="foot__links">
        <a class="foot__big" :href="`mailto:${site.email}`">{{ site.email }}</a>
        <a class="foot__big" :href="site.telegram" rel="noopener">Telegram {{ site.telegramLabel }}</a>
        <p class="foot__meta">{{ site.city }}. {{ site.hours }}.</p>
        <ul class="foot__nav">
          <li v-for="item in nav" :key="item.to">
            <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
          </li>
          <li><a :href="site.vk" rel="noopener">ВКонтакте</a></li>
          <li><NuxtLink to="/politika">Обработка данных</NuxtLink></li>
        </ul>
      </div>
    </div>
    <p class="wrap foot__copy">© {{ year }} {{ site.name }}. Фото на сайте пока временные, с Unsplash.</p>
  </footer>
</template>

<style scoped>
.foot {
  padding-block: 56px 28px;
  background-color: var(--tape);
  background-image: var(--weave-dark);
}

.foot__grid {
  display: grid;
  gap: 36px;
}

.foot__note { margin: 0 0 6px; color: var(--ink); }

.foot__title {
  max-width: 14ch;
  margin: 0 0 16px;
  font: 900 clamp(2.5rem, 8vw, 4.5rem)/1 var(--font-display);
}

.foot__lead { max-width: 46ch; margin: 0; }

.foot__cta { margin: 22px 0 0; }

.foot__links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.foot__big {
  font: italic 900 clamp(1.4rem, 5vw, 2rem)/1.2 var(--font-display);
  color: var(--ink);
  overflow-wrap: anywhere;
}

.foot__meta { margin: 6px 0 0; }

.foot__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 18px;
  padding: 0;
  margin: 8px 0 0;
  list-style: none;
}

.foot__nav a { display: inline-block; padding-block: 8px; color: var(--ink); }

.foot__copy { margin-block: 36px 0; font-size: 0.875rem; }

@media (min-width: 900px) {
  .foot { padding-block: 96px 32px; }
  .foot__grid { grid-template-columns: 1.3fr 1fr; align-items: end; }
}
</style>
