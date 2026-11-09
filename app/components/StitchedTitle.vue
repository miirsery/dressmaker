<script setup lang="ts">
// Заголовок-аппликация: фетровая подложка, буквы и стежок по контуру. Текст для чтения лежит в h1.
interface Line { text: string, x: number, y: number, size: number, width: number, italic?: boolean }

defineProps<{ lines: Line[], viewBox: string }>()
</script>

<template>
  <svg class="stitched" :viewBox="viewBox" aria-hidden="true" focusable="false">
    <g v-for="line in lines" :key="line.text" :class="{ 'stitched__line--italic': line.italic }">
      <text
        v-for="layer in ['felt', 'seam', 'cover', 'fill']"
        :key="layer"
        :class="`stitched__${layer}`"
        :x="line.x"
        :y="line.y"
        :font-size="line.size"
        :textLength="line.width"
        lengthAdjust="spacingAndGlyphs"
      >{{ line.text }}</text>
    </g>
  </svg>
</template>

<style scoped>
.stitched {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.stitched text {
  font-family: var(--font-display);
  font-weight: 900;
}

.stitched__line--italic text { font-style: italic; }

.stitched__felt,
.stitched__cover {
  fill: var(--tape);
  stroke: var(--tape);
  stroke-linejoin: round;
}

.stitched__felt { stroke-width: 21; }
.stitched__cover { stroke-width: 11; }

.stitched__fill { fill: var(--ink); }

/* Широкий пунктир перекрыт слоем сверху, виден только тонкий круговой стежок */
.stitched__seam {
  fill: none;
  stroke: var(--thread);
  stroke-width: 16;
  stroke-linejoin: round;
  stroke-dasharray: 6 4.5;
}
</style>
