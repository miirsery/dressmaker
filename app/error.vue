<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const notFound = computed(() => props.error.statusCode === 404)

useSeoMeta({
  title: () => notFound.value ? 'Страница не найдена | Анна Швецова' : 'Ошибка на сайте | Анна Швецова',
  robots: 'noindex',
})

const home = () => clearError({ redirect: '/' })
</script>

<template>
  <a class="skip" href="#main">Перейти к содержимому</a>
  <TapeStrip />
  <SiteHeader />
  <main id="main" tabindex="-1" class="wrap oops">
    <p class="note oops__note">{{ notFound ? 'стежок сбился' : 'нитка оборвалась' }}</p>
    <h1 class="page-head__title">{{ notFound ? 'Такой страницы нет' : 'Что-то сломалось' }}</h1>
    <p class="page-head__lead">
      {{ notFound ? 'Возможно, ссылка устарела или в адресе опечатка. Работы и цены на месте.' : 'Обновите страницу через минуту. Если не поможет, напишите мне напрямую.' }}
    </p>
    <div class="oops__links">
      <button class="btn" type="button" @click="home">Вернуться на главную</button>
    </div>
  </main>
  <LazySiteFooter hydrate-never />
</template>

<style scoped>
.oops { padding-block: 40px 96px; }

.oops__note { margin: 0 0 8px; }

.oops__links { margin-top: 28px; }
</style>
