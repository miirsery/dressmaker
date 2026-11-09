<template>
  <div class="legal section wrap">
    <slot />
  </div>
</template>

<style scoped>
.legal { max-width: calc(68ch + 2 * var(--gutter)); }

.legal :deep(h2) {
  margin: 32px 0 8px;
  font: 900 1.5rem/1.15 var(--font-display);
}

.legal :deep(p),
.legal :deep(ul) { margin: 0 0 12px; }
</style>
