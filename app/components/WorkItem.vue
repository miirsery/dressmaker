<script setup lang="ts">
import type { Work } from '~/data/works'

defineProps<{ work: Work, level?: 2 | 3, flip?: boolean, eager?: boolean }>()
</script>

<template>
  <article :id="work.slug" class="work rise" :class="{ 'work--flip': flip }">
    <div class="work__frame">
      <WorkPhoto :src="work.src" :alt="work.alt" :aspect="work.aspect" :focus="work.focus" :eager="eager" />
      <span class="work__pin" aria-hidden="true" />
    </div>

    <div class="work__text">
      <p class="work__flag">Пример работы, фото временное</p>
      <component :is="level === 3 ? 'h3' : 'h2'" class="work__title">{{ work.title }}</component>
      <p class="work__summary">{{ work.summary }}</p>

      <dl class="work__facts">
        <dt class="work__sub">Материалы</dt>
        <dd class="work__materials">{{ work.materials.join(', ') }}</dd>
        <dt class="work__sub">Этапы, {{ work.hours }} часов</dt>
        <dd class="work__dd">
          <ol class="work__stages">
            <li v-for="stage in work.stages" :key="stage">{{ stage }}</li>
          </ol>
        </dd>
      </dl>

      <a v-if="work.creditUrl" class="work__credit" :href="work.creditUrl" rel="noopener nofollow">Источник фото: Unsplash</a>
    </div>
  </article>
</template>

<style scoped>
.work {
  display: grid;
  gap: 18px;
}

.work__frame {
  position: relative;
  border: 1px solid var(--ink);
  padding: 8px;
  background: var(--white);
}

.work__pin {
  position: absolute;
  top: -11px;
  left: 50%;
  width: 16px;
  height: 22px;
  background: var(--thread);
  border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
  border: 1px solid var(--ink);
}

.work__flag {
  margin: 0 0 4px;
  font: 600 1.2rem/1.2 var(--font-hand);
  color: var(--chalk);
}

.work__title {
  margin: 0 0 8px;
  font: 900 clamp(1.75rem, 5vw, 2.5rem)/1.05 var(--font-display);
}

.work__summary { margin: 0 0 16px; max-width: 42ch; }

.work__sub {
  margin: 14px 0 4px;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.work__facts { margin: 0; }
.work__materials { margin: 0; max-width: 42ch; }
.work__dd { margin: 0; }

.work__stages {
  padding-left: 1.3em;
  margin: 0;
  max-width: 42ch;
}

.work__stages li::marker {
  color: var(--thread);
  font-weight: 700;
}

.work__credit {
  display: inline-block;
  padding-block: 10px 0;
  font-size: 0.875rem;
  color: var(--ink-soft);
}

@media (min-width: 760px) {
  .work {
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1fr);
    gap: 40px;
    align-items: end;
  }

  .work--flip { grid-template-columns: minmax(0, 1fr) minmax(0, 0.8fr); }
  .work--flip .work__frame { order: 2; }
}
</style>
