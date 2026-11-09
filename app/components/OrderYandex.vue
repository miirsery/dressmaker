<script setup lang="ts">
// Заявку принимает Яндекс Форма. Сайту сервер не нужен, расчёт уходит в скрытый вопрос.
import { describeEstimate, parseEstimateQuery } from '~/utils/estimate'
import { yandexFormUrl } from '~/utils/yandexForm'

const route = useRoute()
const { yandexFormUrl: formUrl } = useRuntimeConfig().public

const estimate = ref('')
const frame = ref<string | null>(null)
const oneLine = computed(() => estimate.value.replaceAll('\n', '; '))
const directLink = computed(() => yandexFormUrl(formUrl, { estimate: oneLine.value }))

// Адрес зависит от параметров ссылки, поэтому iframe появляется после загрузки страницы
onMounted(() => {
  const input = parseEstimateQuery(route.query)
  if (input) estimate.value = describeEstimate(input)
  frame.value = yandexFormUrl(formUrl, { iframe: true, estimate: oneLine.value })
})
</script>

<template>
  <div class="yandex">
    <div v-if="estimate" class="yandex__estimate">
      <p class="note yandex__estimate-title">расчёт из калькулятора придёт вместе с заявкой</p>
      <p class="yandex__estimate-text">{{ estimate }}</p>
    </div>

    <div class="yandex__frame">
      <iframe
        v-if="frame"
        class="yandex__iframe"
        :src="frame"
        title="Форма заявки"
        width="100%"
        height="100%"
      />
    </div>

    <p class="yandex__fallback">
      Форма не загрузилась? <a v-if="directLink" :href="directLink" target="_blank" rel="noopener">Откройте её в новой вкладке</a>
    </p>
  </div>
</template>

<style scoped>
.yandex { display: grid; gap: 14px; min-width: 0; }

.yandex__estimate {
  padding: 12px 16px;
  background: var(--white);
  border: 1px solid var(--ink);
}

.yandex__estimate-title { margin: 0 0 4px; }

.yandex__estimate-text { margin: 0; white-space: pre-line; }

/* Высота задана заранее, чтобы страница не прыгала, пока форма загружается */
.yandex__frame {
  height: 1040px;
  background: var(--white);
  border: 1px solid var(--ink);
}

.yandex__iframe {
  display: block;
  border: 0;
}

.yandex__fallback { margin: 0; font-size: 0.9375rem; }

@media (min-width: 760px) {
  .yandex__frame { height: 900px; }
}
</style>
