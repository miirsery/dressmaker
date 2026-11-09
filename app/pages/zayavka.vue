<script setup lang="ts">
import { site } from '~/data/site'

const { orderEndpoint } = useRuntimeConfig().public

usePageSeo({
  title: 'Заявка на пошив косплея или расчёт производства | Анна Швецова',
  description: 'Опишите костюм или модель, приложите референс и укажите дату. Отвечу в течение дня и скажу, успеваем ли.',
  path: '/zayavka',
})
</script>

<template>
  <div>
    <header class="page-head wrap">
      <h1 class="page-head__title">Заявка</h1>
      <p class="page-head__lead">Расскажите, что нужно сшить или посчитать. Отвечу в течение дня и скажу, успеваем ли.</p>
    </header>

    <SeamLine />

    <div class="section wrap request">
      <OrderForm v-if="orderEndpoint" />
      <OrderDirect v-else />

      <aside class="request__side" aria-label="Другие способы связи">
        <p class="note request__slot">ближайшее свободное окно: {{ site.nextSlot }}</p>
        <h2 class="request__title">Удобнее написать самим?</h2>
        <ul class="request__links">
          <li><a :href="`mailto:${site.email}`">{{ site.email }}</a></li>
          <li><a :href="site.telegram" rel="noopener">Telegram {{ site.telegramLabel }}</a></li>
        </ul>
        <p>{{ site.city }}. {{ site.hours }}.</p>
      </aside>
    </div>

    <SeamLine />
  </div>
</template>

<style scoped>
.request { display: grid; gap: 40px; }

.request__slot { margin: 0 0 18px; }

.request__title {
  margin: 0 0 10px;
  font: 900 1.75rem/1.1 var(--font-display);
}

.request__links {
  padding: 0;
  margin: 0 0 12px;
  list-style: none;
}

.request__links a {
  display: inline-block;
  padding-block: 6px;
  font-weight: 600;
  overflow-wrap: anywhere;
}

@media (min-width: 880px) {
  .request { grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); gap: 72px; }
}
</style>
