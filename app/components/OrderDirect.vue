<script setup lang="ts">
// Для сборки без сервера: заявка уходит из почты посетителя, расчёт подставляется в письмо.
import { site } from '~/data/site'
import { describeEstimate, parseEstimateQuery } from '~/utils/estimate'

const route = useRoute()
const estimate = ref('')

onMounted(() => {
  const input = parseEstimateQuery(route.query)
  if (input) estimate.value = describeEstimate(input)
})

const mailto = computed(() => {
  const body = ['Что нужно сшить или посчитать:', '', 'К какой дате:', '', estimate.value].join('\n').trim()
  return `mailto:${site.email}?subject=${encodeURIComponent('Заявка с сайта')}&body=${encodeURIComponent(body)}`
})
</script>

<template>
  <div class="direct">
    <h2 class="direct__title">Напишите напрямую</h2>
    <p class="direct__lead">Пришлите референс, дату и бюджет. Для производства приложите эскиз или образец и объём партии.</p>

    <div v-if="estimate" class="direct__estimate">
      <p class="note direct__estimate-title">расчёт из калькулятора</p>
      <p class="direct__estimate-text">{{ estimate }}</p>
    </div>

    <p class="direct__actions">
      <a class="btn" :href="mailto">Написать письмо</a>
      <a class="btn btn--light" :href="site.telegram" rel="noopener">Написать в Telegram</a>
    </p>
  </div>
</template>

<style scoped>
.direct__title {
  margin: 0 0 10px;
  font: 900 clamp(1.9rem, 6vw, 3rem)/1.05 var(--font-display);
}

.direct__lead { max-width: 50ch; margin: 0 0 22px; }

.direct__estimate {
  padding: 12px 16px;
  margin-bottom: 22px;
  background: var(--white);
  border: 1px solid var(--ink);
}

.direct__estimate-title { margin: 0 0 4px; }

.direct__estimate-text { margin: 0; white-space: pre-line; }

.direct__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0;
}
</style>
