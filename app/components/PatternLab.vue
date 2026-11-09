<script setup lang="ts">
import { fabrics, patterns } from '~/data/fabrics'

const fabricId = ref(fabrics[1]!.id)
const patternId = ref(patterns[0]!.id)

const fabric = computed(() => fabrics.find(f => f.id === fabricId.value)!)
const pattern = computed(() => patterns.find(p => p.id === patternId.value)!)
const meters = computed(() => (pattern.value.baseMeters * (1 + fabric.value.extra / 100)).toFixed(2).replace('.', ','))
const description = computed(() => `Выкройка «${pattern.value.name}» из ткани ${fabric.value.name}. Детали: ${pattern.value.pieces.map(p => p.label).join('; ')}.`)
</script>

<template>
  <div class="lab">
    <div class="lab__sheet">
      <svg class="lab__svg" viewBox="0 0 640 520" role="img" :aria-label="description">
        <defs>
          <pattern id="f-len" width="7" height="7" patternUnits="userSpaceOnUse">
            <rect width="7" height="7" fill="#dcc6a0" />
            <path d="M0 2h7M0 5h7" stroke="#a98b58" stroke-opacity=".55" />
            <path d="M2 0v7M5 0v7" stroke="#f1e4c8" stroke-opacity=".8" />
          </pattern>
          <pattern id="f-barhat" width="90" height="90" patternUnits="userSpaceOnUse">
            <rect width="90" height="90" fill="#7a1740" />
            <path d="M0 90L90 0" stroke="#a02a5c" stroke-width="26" stroke-opacity=".5" />
            <path d="M-20 40L40 -20" stroke="#5e0f30" stroke-width="20" stroke-opacity=".5" />
          </pattern>
          <pattern id="f-atlas" width="34" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
            <rect width="34" height="34" fill="#ecbfca" />
            <rect width="9" height="34" fill="#fbe6ea" />
            <rect x="18" width="3" height="34" fill="#f7d6de" />
          </pattern>
          <pattern id="f-organza" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="#d6e6f2" fill-opacity=".72" />
            <circle cx="2.5" cy="2.5" r="1" fill="#fff" />
            <circle cx="7.5" cy="7.5" r="1" fill="#fff" />
          </pattern>
          <pattern id="f-kozha" width="16" height="16" patternUnits="userSpaceOnUse">
            <rect width="16" height="16" fill="#4a3a46" />
            <path d="M0 8Q4 3 8 8T16 8M8 0Q3 4 8 8T8 16" fill="none" stroke="#352733" stroke-width="1.4" />
          </pattern>
          <marker id="grain-tip" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10" fill="none" stroke="#fffefa" stroke-width="1.6" />
          </marker>
        </defs>

        <g :key="`${patternId}-${fabricId}`" class="lab__pieces">
          <g v-for="piece in pattern.pieces" :key="piece.label">
            <path class="lab__allowance" :d="piece.d" />
            <path class="lab__gap" :d="piece.d" />
            <path class="lab__piece" :d="piece.d" :fill="`url(#f-${fabricId})`" />
            <line
              class="lab__grain"
              :x1="piece.grain[0]" :y1="piece.grain[1]" :x2="piece.grain[2]" :y2="piece.grain[3]"
              marker-start="url(#grain-tip)" marker-end="url(#grain-tip)"
            />
            <g :transform="`translate(${piece.tagX} ${piece.tagY})`">
              <rect class="lab__tag" :width="piece.label.length * 8.6 + 16" height="30" />
              <text class="lab__label" x="8" y="22">{{ piece.label }}</text>
            </g>
          </g>
        </g>
      </svg>
    </div>

    <div class="lab__panel">
      <fieldset class="lab__group">
        <legend class="lab__legend">Выкройка</legend>
        <div class="lab__patterns">
          <label v-for="p in patterns" :key="p.id" class="lab__pattern" @pointerenter="patternId = p.id">
            <input v-model="patternId" class="sr-only" type="radio" name="pattern" :value="p.id">
            <span>{{ p.name }}</span>
          </label>
        </div>
      </fieldset>

      <fieldset class="lab__group">
        <legend class="lab__legend">Ткань</legend>
        <div class="lab__swatches">
          <label v-for="f in fabrics" :key="f.id" class="lab__swatch" @pointerenter="fabricId = f.id">
            <input v-model="fabricId" class="sr-only" type="radio" name="fabric" :value="f.id">
            <i class="lab__cloth" :style="{ backgroundColor: f.swatch }" aria-hidden="true" />
            <span>{{ f.name }}</span>
          </label>
        </div>
      </fieldset>

      <div class="lab__result" aria-live="polite">
        <p class="lab__meters"><b>{{ meters }} м</b> ткани при ширине 150 см</p>
        <p class="lab__note">{{ fabric.note }}</p>
        <p class="lab__needle">{{ fabric.needle }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lab {
  display: grid;
  gap: 24px;
}

.lab__sheet {
  padding: 10px;
  background: var(--white);
  border: 1px solid var(--ink);
}

.lab__svg { display: block; width: 100%; height: auto; }

.lab__pieces { animation: lay-down 0.35s ease-out; }

@keyframes lay-down {
  from { opacity: 0.2; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}

.lab__piece { stroke: var(--ink); stroke-width: 1.6; }

/* Линия припуска: широкий пунктир мелом, середину закрывает белый слой */
.lab__allowance {
  fill: none;
  stroke: var(--chalk);
  stroke-width: 24;
  stroke-linejoin: round;
  stroke-dasharray: 9 6;
}

.lab__gap {
  fill: var(--white);
  stroke: var(--white);
  stroke-width: 21;
  stroke-linejoin: round;
}

.lab__grain {
  stroke: #fffefa;
  stroke-width: 1.6;
  mix-blend-mode: difference;
}

.lab__tag { fill: var(--white); stroke: var(--ink); stroke-width: 0.8; }

.lab__label {
  font: 600 19px var(--font-hand);
  fill: var(--ink);
}

.lab__group {
  padding: 0;
  margin: 0 0 18px;
  border: 0;
}

.lab__legend {
  padding: 0;
  margin-bottom: 8px;
  font-weight: 700;
}

.lab__patterns,
.lab__swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.lab__pattern span {
  display: inline-block;
  padding: 10px 14px;
  font-weight: 600;
  border: 1.5px dashed var(--ink);
}

.lab__pattern input:checked + span {
  color: var(--paper);
  background: var(--ink);
  border-style: solid;
}

.lab__pattern input:focus-visible + span,
.lab__swatch input:focus-visible ~ span {
  outline: 3px solid var(--chalk);
  outline-offset: 2px;
}

.lab__swatch {
  display: grid;
  gap: 4px;
  justify-items: center;
  width: 76px;
  font-size: 0.9375rem;
}

/* Зубчатый край как у образца из раскладки */
.lab__cloth {
  display: block;
  width: 64px;
  height: 56px;
  --z: 5px;
  clip-path: polygon(
    0 0, 12.5% var(--z), 25% 0, 37.5% var(--z), 50% 0, 62.5% var(--z), 75% 0, 87.5% var(--z), 100% 0,
    calc(100% - var(--z)) 25%, 100% 50%, calc(100% - var(--z)) 75%, 100% 100%,
    87.5% calc(100% - var(--z)), 75% 100%, 62.5% calc(100% - var(--z)), 50% 100%, 37.5% calc(100% - var(--z)), 25% 100%, 12.5% calc(100% - var(--z)), 0 100%,
    var(--z) 75%, 0 50%, var(--z) 25%
  );
  transition: transform 0.15s;
}

.lab__swatch:hover .lab__cloth { transform: rotate(-4deg); }

.lab__swatch input:checked ~ .lab__cloth { transform: translateY(-3px) rotate(-4deg); }

.lab__swatch input:checked ~ span {
  font-weight: 700;
  text-decoration: underline wavy var(--thread) 1.5px;
  text-underline-offset: 3px;
}

.lab__result {
  min-height: 190px;
  padding-top: 14px;
  border-top: 2px dashed var(--ink);
}

.lab__meters { margin: 0 0 8px; }

.lab__meters b {
  font: 900 2.25rem/1 var(--font-display);
  color: var(--thread);
}

.lab__note { margin: 0 0 8px; max-width: 46ch; }

.lab__needle {
  margin: 0;
  font: 600 1.3rem/1.2 var(--font-hand);
  color: var(--chalk);
}

@media (min-width: 900px) {
  .lab {
    grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
    gap: 44px;
    align-items: start;
  }
}
</style>
