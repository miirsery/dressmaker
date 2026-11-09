<script setup lang="ts">
import { reviews } from '~/data/site'
</script>

<template>
  <section v-if="reviews.length" class="section" aria-labelledby="reviews-title">
    <div class="wrap">
      <h2 id="reviews-title" class="section__title">Что говорят заказчики</h2>
      <ul class="reviews">
        <li v-for="review in reviews" :key="review.author" class="reviews__item rise">
          <blockquote class="reviews__text">{{ review.text }}</blockquote>
          <p class="reviews__author"><b>{{ review.author }}</b>, {{ review.role }}</p>
        </li>
      </ul>
    </div>
  </section>
  <SeamLine v-if="reviews.length" />
</template>

<style scoped>
.reviews {
  display: grid;
  gap: 28px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.reviews__text {
  margin: 0 0 8px;
  font: 600 1.6rem/1.25 var(--font-hand);
}

.reviews__author { margin: 0; }

@media (min-width: 820px) {
  .reviews { grid-template-columns: repeat(2, 1fr); gap: 48px; }
}
</style>
