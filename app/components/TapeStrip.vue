<script setup lang="ts">
const marks = Array.from({ length: 80 }, (_, i) => i)
</script>

<template>
  <div class="tape-strip" aria-hidden="true">
    <div class="tape-strip__run">
      <span v-for="m in marks" :key="m" class="tape-strip__cm" :class="{ 'tape-strip__cm--ten': m % 10 === 0 }">{{ m }}</span>
    </div>
  </div>
</template>

<style scoped>
.tape-strip {
  position: sticky;
  top: 0;
  z-index: 40;
  height: 26px;
  overflow: hidden;
  background: var(--tape);
  border-bottom: 1px solid var(--ink);
}

.tape-strip__run {
  display: flex;
  width: max-content;
  animation: tape-pull linear both;
  animation-timeline: scroll(root);
}

.tape-strip__cm {
  width: 48px;
  height: 25px;
  padding-left: 4px;
  font: 600 12px/25px var(--font-body);
  font-variant-numeric: tabular-nums;
  color: var(--ink);
  background:
    repeating-linear-gradient(to right, var(--ink) 0 1px, transparent 1px 4.8px) 0 0 / 100% 7px no-repeat,
    linear-gradient(var(--ink), var(--ink)) 0 0 / 1px 14px no-repeat;
}

.tape-strip__cm--ten {
  color: var(--thread);
  font-weight: 700;
}

@keyframes tape-pull {
  to { transform: translateX(calc(-3840px + 100vw)); }
}

@media (prefers-reduced-motion: reduce) {
  .tape-strip__run { animation: none; }
}
</style>
