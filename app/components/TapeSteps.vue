<script setup lang="ts">
// Порядок здесь настоящий, поэтому шаги стоят на ленте как отметки времени.
const steps = [
  { when: 'День 1', title: 'Мерки и референсы', text: 'Снимаю 24 мерки лично или по видео. Разбираем персонажа: что обязательно, а что можно упростить.' },
  { when: 'Неделя 1', title: 'Смета', text: 'Фиксирую материалы, часы и срок до начала работы. Цена не растёт без вашего согласия.' },
  { when: 'Неделя 2', title: 'Макет из бязи', text: 'Проверяю посадку на дешёвой ткани, чтобы правки не стоили бархата.' },
  { when: 'Недели 3–6', title: 'Пошив и примерки', text: 'Две примерки и фото каждого этапа. Сложные узлы показываю до финальной строчки.' },
  { when: 'Сдача', title: 'Костюм и ремонтный набор', text: 'Отдаю костюм с запасными нитками, крючками и картой ухода.' },
]
</script>

<template>
  <ol class="steps">
    <li v-for="step in steps" :key="step.title" class="steps__item rise">
      <span class="steps__when">{{ step.when }}</span>
      <h3 class="steps__title">{{ step.title }}</h3>
      <p class="steps__text">{{ step.text }}</p>
    </li>
  </ol>
</template>

<style scoped>
.steps {
  padding: 0 0 0 44px;
  margin: 0;
  list-style: none;
  background:
    repeating-linear-gradient(to bottom, var(--ink) 0 1px, transparent 1px 10px) 22px 0 / 8px 100% no-repeat,
    repeating-linear-gradient(to bottom, var(--ink) 0 1px, transparent 1px 50px) 16px 0 / 14px 100% no-repeat,
    linear-gradient(var(--tape), var(--tape)) 0 0 / 30px 100% no-repeat;
}

.steps__item { padding-block: 0 30px; }

.steps__when {
  display: inline-block;
  padding: 1px 8px;
  margin-left: -8px;
  font: 600 1.35rem/1.2 var(--font-hand);
  color: var(--thread);
}

.steps__title {
  margin: 0 0 4px;
  font: 900 1.5rem/1.1 var(--font-display);
}

.steps__text { margin: 0; max-width: 40ch; }

@media (min-width: 980px) {
  .steps {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 26px;
    padding: 44px 0 0;
    background:
      repeating-linear-gradient(to right, var(--ink) 0 1px, transparent 1px 10px) 0 0 / 100% 8px no-repeat,
      repeating-linear-gradient(to right, var(--ink) 0 1px, transparent 1px 50px) 0 0 / 100% 14px no-repeat,
      linear-gradient(var(--tape), var(--tape)) 0 0 / 100% 30px no-repeat;
  }

  .steps__item { padding: 0; }
}
</style>
