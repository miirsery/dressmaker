<template>
  <div class="seam" data-seam aria-hidden="true">
    <svg width="100%" height="4"><line x1="0" y1="2" x2="100%" y2="2" /></svg>
  </div>
</template>

<style scoped>
.seam {
  height: 4px;
  line-height: 0;
}

.seam svg { display: block; overflow: visible; }

.seam line {
  stroke: var(--chalk);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 10 9;
  opacity: 0.55;
}
</style>
