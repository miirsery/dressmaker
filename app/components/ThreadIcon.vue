<script setup lang="ts">
// Иконки нарисованы одной линией с пунктиром стежка.
defineProps<{ name: 'spool' | 'unpick' | 'square' }>()
</script>

<template>
  <svg class="icon" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true" focusable="false">
    <template v-if="name === 'spool'">
      <path class="icon__solid" d="M12 8h24M12 40h24M16 8v32M32 8v32" />
      <path class="icon__stitch" d="M16 14l16 4M16 20l16 4M16 26l16 4M16 32l16 4M32 36c6 2 10-1 12 4" />
    </template>
    <template v-else-if="name === 'unpick'">
      <path class="icon__solid" d="M8 42l10-10M15 29l5 5" />
      <path class="icon__solid" d="M20 28L38 8c2 8-1 12-6 13l-1 4" />
      <path class="icon__stitch" d="M28 32l12 10M38 26l6 5" />
    </template>
    <template v-else>
      <path class="icon__solid" d="M8 40V8l32 32H8zM8 30h4M8 22h4M8 14h4" />
      <path class="icon__stitch" d="M15 33V24l9 9h-9" />
    </template>
  </svg>
</template>

<style scoped>
.icon { display: block; }

.icon path {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.icon__stitch {
  stroke: var(--thread) !important;
  stroke-dasharray: 3 4;
}
</style>
