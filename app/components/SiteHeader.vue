<script setup lang="ts">
import { nav, site } from '~/data/site'
</script>

<template>
  <header class="head wrap">
    <NuxtLink to="/" class="head__label" :aria-label="`${site.name}, на главную`">
      <i class="head__tack head__tack--a" aria-hidden="true" />
      <i class="head__tack head__tack--b" aria-hidden="true" />
      <i class="head__tack head__tack--c" aria-hidden="true" />
      <i class="head__tack head__tack--d" aria-hidden="true" />
      <span class="head__name">{{ site.name }}</span>
      <span class="head__role">{{ site.role }}</span>
    </NuxtLink>

    <nav aria-label="Основная">
      <ul class="head__nav">
        <li v-for="item in nav" :key="item.to">
          <NuxtLink :to="item.to" class="head__link">{{ item.label }}</NuxtLink>
        </li>
        <li><a href="#kontakty" class="head__link">Написать</a></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px 24px;
  padding-block: 18px;
}

.head__label {
  position: relative;
  display: inline-block;
  padding: 9px 20px 8px;
  color: var(--ink);
  text-decoration: none;
  background: var(--white);
  border: 1px solid var(--ink);
}

.head__name {
  display: block;
  font: italic 900 1.15rem/1.1 var(--font-display);
}

.head__role {
  display: block;
  font-size: 0.8125rem;
  letter-spacing: 0.04em;
}

/* Четыре стежка по углам бирки */
.head__tack {
  position: absolute;
  width: 9px;
  height: 2px;
  background: var(--thread);
  rotate: 45deg;
}

.head__tack--a { top: 6px; left: 4px; }
.head__tack--b { top: 6px; right: 4px; rotate: -45deg; }
.head__tack--c { bottom: 6px; left: 4px; rotate: -45deg; }
.head__tack--d { bottom: 6px; right: 4px; }

.head__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 2px 20px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.head__link {
  display: inline-block;
  padding-block: 10px;
  font-weight: 600;
  color: var(--ink);
  text-decoration: none;
  background: linear-gradient(to right, var(--thread) 60%, transparent 0) 0 calc(100% - 7px) / 9px 2px repeat-x;
  background-size: 0 2px;
  transition: background-size 0.2s;
}

.head__link:hover,
.head__link.router-link-active {
  background-size: 9px 2px;
}

.head__link.router-link-active {
  color: var(--thread);
}
</style>
