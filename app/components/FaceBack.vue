<script setup lang="ts">
// Два снимка одной вещи. Ползунок открывает изнанку, управлять можно мышью, пальцем и стрелками.
interface Shot { src: string, alt: string, focus?: string }

const props = withDefaults(defineProps<{
  face: Shot
  back: Shot
  faceLabel?: string
  backLabel?: string
}>(), { faceLabel: 'Лицо', backLabel: 'Изнанка' })

const pos = ref(50)
const valueText = computed(() => `${props.backLabel}: открыто на ${pos.value} %`)
</script>

<template>
  <figure class="compare">
    <div class="compare__stage" :style="{ '--pos': `${pos}%` }">
      <WorkPhoto :src="face.src" :alt="face.alt" :focus="face.focus" aspect="4/5" />
      <div class="compare__top">
        <WorkPhoto :src="back.src" :alt="back.alt" :focus="back.focus" aspect="4/5" />
      </div>
      <div class="compare__seam" aria-hidden="true" />
      <span class="compare__tag compare__tag--back" aria-hidden="true">{{ backLabel }}</span>
      <span class="compare__tag compare__tag--face" aria-hidden="true">{{ faceLabel }}</span>
      <input v-model.number="pos" class="compare__range" type="range" min="0" max="100" :aria-label="`Сколько открыть: ${backLabel.toLowerCase()}`" :aria-valuetext="valueText">
    </div>
    <figcaption class="compare__note"><slot /></figcaption>
  </figure>
</template>

<style scoped>
.compare { margin: 0; }

.compare__stage {
  position: relative;
  border: 8px solid var(--white);
  outline: 1px solid var(--ink);
}

.compare__top {
  position: absolute;
  inset: 0;
  clip-path: inset(0 calc(100% - var(--pos, 50%)) 0 0);
}

.compare__seam {
  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--pos, 50%);
  border-left: 3px dashed var(--white);
  filter: drop-shadow(0 0 1px var(--ink));
  translate: -1.5px 0;
}

.compare__tag {
  position: absolute;
  bottom: 10px;
  padding: 0 8px;
  font: 600 1.25rem/1.4 var(--font-hand);
  background: var(--white);
  border: 1px solid var(--ink);
}

.compare__tag--back { left: 10px; }
.compare__tag--face { right: 10px; }

.compare__range {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: ew-resize;
  opacity: 0;
  touch-action: pan-y;
}

.compare__stage:has(.compare__range:focus-visible) {
  outline: 3px solid var(--chalk);
  outline-offset: 2px;
}

.compare__note {
  max-width: 52ch;
  margin-top: 10px;
  font-size: 0.9375rem;
  color: var(--ink-soft);
}
</style>
