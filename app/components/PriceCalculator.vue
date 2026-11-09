<script setup lang="ts">
import { site } from '~/data/site'
import type { Complexity, JobType, Materials, Urgency } from '~/utils/estimate'
import { COMPLEXITY, JOBS, MATERIALS, URGENCY, estimate, pluralRu, rub } from '~/utils/estimate'

const job = ref<JobType>('costume')
const complexity = ref<Complexity>('medium')
const volume = ref(3)
const urgency = ref<Urgency>('normal')
const materials = ref<Materials>('middle')

const result = computed(() => estimate({
  job: job.value,
  complexity: complexity.value,
  volume: volume.value,
  urgency: urgency.value,
  materials: materials.value,
}))

const jobInfo = computed(() => JOBS[job.value])
const volumeText = computed(() => `${volume.value} ${pluralRu(volume.value, jobInfo.value.units)}`)

const mailto = computed(() => {
  const lines = [
    `Вид работы: ${jobInfo.value.label}`,
    `Сложность: ${COMPLEXITY[complexity.value].label}`,
    `Объём: ${volumeText.value}`,
    `Срок: ${URGENCY[urgency.value].label}`,
    ...(jobInfo.value.usesMaterials ? [`Материалы: ${MATERIALS[materials.value].label}`] : []),
    `Ориентир: ${rub(result.value.from)} – ${rub(result.value.to)}`,
  ]
  return `mailto:${site.email}?subject=${encodeURIComponent('Расчёт с сайта')}&body=${encodeURIComponent(lines.join('\n'))}`
})

const ticks = Array.from({ length: 12 }, (_, i) => i + 1)
</script>

<template>
  <form class="calc" @submit.prevent>
    <div class="calc__fields">
      <fieldset class="calc__set">
        <legend>Что делаем</legend>
        <div class="calc__options">
          <label v-for="(item, key) in JOBS" :key="key" class="calc__opt">
            <input v-model="job" class="sr-only" type="radio" name="job" :value="key">
            <span class="calc__box"><b>{{ item.label }}</b></span>
          </label>
        </div>
      </fieldset>

      <fieldset class="calc__set">
        <legend>Сложность</legend>
        <div class="calc__options">
          <label v-for="(item, key) in COMPLEXITY" :key="key" class="calc__opt">
            <input v-model="complexity" class="sr-only" type="radio" name="complexity" :value="key">
            <span class="calc__box"><b>{{ item.label }}</b><small>{{ item.hint }}</small></span>
          </label>
        </div>
      </fieldset>

      <div class="calc__set">
        <label class="calc__legend" for="volume">Объём: <output for="volume">{{ volumeText }}</output></label>
        <div class="calc__tape">
          <input id="volume" v-model.number="volume" class="calc__range" type="range" min="1" max="12" step="1" :aria-valuetext="volumeText">
          <div class="calc__ticks" aria-hidden="true">
            <span v-for="t in ticks" :key="t">{{ t }}</span>
          </div>
        </div>
      </div>

      <fieldset class="calc__set">
        <legend>Срок</legend>
        <div class="calc__options">
          <label v-for="(item, key) in URGENCY" :key="key" class="calc__opt">
            <input v-model="urgency" class="sr-only" type="radio" name="urgency" :value="key">
            <span class="calc__box"><b>{{ item.label }}</b><small>{{ item.hint }}</small></span>
          </label>
        </div>
      </fieldset>

      <fieldset v-if="jobInfo.usesMaterials" class="calc__set">
        <legend>Материалы</legend>
        <div class="calc__options">
          <label v-for="(item, key) in MATERIALS" :key="key" class="calc__opt">
            <input v-model="materials" class="sr-only" type="radio" name="materials" :value="key">
            <span class="calc__box"><b>{{ item.label }}</b><small>{{ item.hint }}</small></span>
          </label>
        </div>
      </fieldset>
    </div>

    <aside class="receipt" aria-label="Ориентировочная стоимость">
      <p class="receipt__head">Ориентировочно</p>
      <p class="receipt__total" aria-live="polite" aria-atomic="true">
        {{ rub(result.from) }}<br>– {{ rub(result.to) }}
      </p>
      <table class="receipt__table">
        <caption class="sr-only">Из чего складывается сумма</caption>
        <tbody>
          <tr><th scope="row">Работа</th><td>{{ rub(result.labor) }}</td></tr>
          <tr v-if="jobInfo.usesMaterials"><th scope="row">Материалы</th><td>{{ rub(result.materials) }}</td></tr>
          <tr><th scope="row">За срочность</th><td>{{ rub(result.urgency) }}</td></tr>
        </tbody>
      </table>
      <p class="receipt__fine">Это прикидка, а не договорная цена. Точную сумму посчитаю индивидуально, когда увижу референс и сниму мерки.</p>
      <a class="btn" :href="mailto">Отправить расчёт на почту</a>
    </aside>
  </form>
</template>

<style scoped>
.calc {
  display: grid;
  gap: 32px;
}

.calc__set {
  padding: 0;
  margin: 0 0 24px;
  border: 0;
}

.calc__set legend,
.calc__legend {
  display: block;
  padding: 0;
  margin-bottom: 8px;
  font-size: 1.125rem;
  font-weight: 700;
}

.calc__options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 8px;
}

.calc__box {
  display: block;
  height: 100%;
  padding: 10px 12px;
  background: var(--white);
  border: 1.5px dashed var(--ink);
}

.calc__box b { display: block; line-height: 1.25; }

.calc__box small {
  display: block;
  font-size: 0.875rem;
  line-height: 1.3;
  color: var(--ink-soft);
}

.calc__opt input:checked + .calc__box {
  color: var(--paper);
  background: var(--ink);
  border-style: solid;
}

.calc__opt input:checked + .calc__box small { color: var(--paper); }

.calc__opt input:focus-visible + .calc__box {
  outline: 3px solid var(--chalk);
  outline-offset: 2px;
}

/* Ползунок: сантиметровая лента */
.calc__tape {
  background: var(--tape);
  border: 1px solid var(--ink);
  padding: 8px 10px 4px;
}

.calc__range {
  display: block;
  width: 100%;
  height: 34px;
  margin: 0;
  appearance: none;
  background:
    repeating-linear-gradient(to right, var(--ink) 0 1px, transparent 1px 8px) 0 0 / 100% 12px no-repeat;
}

.calc__range::-webkit-slider-thumb {
  width: 22px;
  height: 34px;
  appearance: none;
  background: var(--thread);
  border: 2px solid var(--white);
  outline: 1px solid var(--ink);
  clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%);
}

.calc__range::-moz-range-thumb {
  width: 18px;
  height: 30px;
  background: var(--thread);
  border: 2px solid var(--white);
  border-radius: 0;
}

.calc__ticks {
  display: flex;
  justify-content: space-between;
  padding-inline: 5px;
  font-size: 0.875rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.receipt {
  padding: 24px 22px 26px;
  background-color: var(--white);
  background-image: var(--weave);
  border: 1px solid var(--ink);
}

.receipt__head {
  margin: 0;
  font: 600 1.4rem/1.2 var(--font-hand);
  color: var(--chalk);
}

.receipt__total {
  margin: 0 0 16px;
  font: 900 clamp(2.25rem, 9vw, 3rem)/1.05 var(--font-display);
  font-variant-numeric: lining-nums tabular-nums;
  color: var(--thread);
}

.receipt__table {
  width: 100%;
  margin-bottom: 14px;
  border-collapse: collapse;
}

.receipt__table th,
.receipt__table td {
  padding: 7px 0;
  border-bottom: 1.5px dashed var(--ink);
}

.receipt__table th { font-weight: 400; text-align: left; }
.receipt__table td { font-weight: 700; text-align: right; white-space: nowrap; }

.receipt__fine { margin: 0 0 18px; font-size: 0.9375rem; }

@media (min-width: 940px) {
  .calc {
    grid-template-columns: minmax(0, 1.6fr) minmax(320px, 1fr);
    gap: 48px;
    align-items: start;
  }

  .receipt { position: sticky; top: 50px; }
}
</style>
