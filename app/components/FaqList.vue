<script setup lang="ts">
import { faq } from '~/data/site'
</script>

<template>
  <div class="faq">
    <details v-for="item in faq" :key="item.question" class="faq__item">
      <summary class="faq__question">{{ item.question }}</summary>
      <p class="faq__answer">{{ item.answer }}</p>
    </details>
  </div>
</template>

<style scoped>
.faq { border-bottom: 1.5px dashed var(--ink); }

.faq__item { border-top: 1.5px dashed var(--ink); }

.faq__question {
  padding-block: 14px;
  font: italic 900 1.375rem/1.2 var(--font-display);
}

.faq__question::marker { color: var(--thread); }

.faq__answer { max-width: 60ch; margin: 0 0 18px; }
</style>
