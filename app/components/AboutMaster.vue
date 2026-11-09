<script setup lang="ts">
import { about, site } from '~/data/site'
</script>

<template>
  <section class="section" aria-labelledby="about-title">
    <div class="wrap about">
      <div class="about__frame rise">
        <WorkPhoto :src="about.photo.src" :alt="about.photo.alt" aspect="4/5" focus="50% 30%" />
      </div>
      <div>
        <p class="note about__note">{{ site.name }}, фото пока временное</p>
        <h2 id="about-title" class="section__title">{{ about.title }}</h2>
        <p class="about__text">{{ about.text }}</p>
        <dl class="about__facts">
          <div v-for="fact in about.facts" :key="fact.term" class="about__row">
            <dt>{{ fact.term }}</dt>
            <dd>{{ fact.detail }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about { display: grid; gap: 28px; }

.about__frame {
  padding: 8px;
  background: var(--white);
  border: 1px solid var(--ink);
}

.about__note { margin: 0 0 6px; }

.about__text { max-width: 50ch; margin: 0 0 22px; }

.about__facts { margin: 0; }

.about__row {
  display: grid;
  gap: 2px;
  padding-block: 11px;
  border-top: 1.5px dashed var(--ink);
}

.about__row dt { font-weight: 700; }
.about__row dd { margin: 0; }

@media (min-width: 820px) {
  .about {
    grid-template-columns: minmax(0, 0.7fr) minmax(0, 1fr);
    gap: 64px;
    align-items: center;
  }

  .about__row { grid-template-columns: 180px 1fr; gap: 16px; }
}
</style>
