<script setup lang="ts">
// Показывается, только если задан счётчик. Метрика загружается исключительно после разрешения.
const KEY = 'metrika-consent'

const { metrikaId } = useRuntimeConfig().public
const router = useRouter()
const visible = ref(false)

type Ym = ((...args: unknown[]) => void) & { a?: unknown[], l?: number }

const load = () => {
  const host = window as unknown as { ym?: Ym }
  const ym: Ym = host.ym ?? ((...args: unknown[]) => { (ym.a ??= []).push(args) })
  ym.l = Date.now()
  host.ym = ym

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://mc.yandex.ru/metrika/tag.js'
  document.head.append(script)

  ym(metrikaId, 'init', { defer: true, trackLinks: true, accurateTrackBounce: true })
  ym(metrikaId, 'hit', location.href)
  router.afterEach(to => ym(metrikaId, 'hit', to.fullPath))
}

const remember = (value: string) => {
  try {
    localStorage.setItem(KEY, value)
  }
  catch {
    // Без хранилища уведомление просто появится при следующем визите
  }
}

const choose = (allowed: boolean) => {
  remember(allowed ? 'yes' : 'no')
  visible.value = false
  if (allowed) load()
}

onMounted(() => {
  if (!metrikaId) return
  let saved: string | null = null
  try {
    saved = localStorage.getItem(KEY)
  }
  catch {
    saved = null
  }
  if (saved === 'yes') load()
  else if (saved !== 'no') visible.value = true
})
</script>

<template>
  <section v-if="visible" class="consent" aria-label="Файлы cookie">
    <p class="consent__text">Разрешите учитывать посещения Яндекс Метрикой с файлами cookie? Подробности в <NuxtLink to="/politika">политике обработки данных</NuxtLink>.</p>
    <div class="consent__actions">
      <button class="btn" type="button" @click="choose(true)">Разрешить</button>
      <button class="btn btn--light" type="button" @click="choose(false)">Отказаться</button>
    </div>
  </section>
</template>

<style scoped>
.consent {
  position: fixed;
  right: 12px;
  bottom: 12px;
  left: 12px;
  z-index: 50;
  max-width: 480px;
  padding: 16px 18px;
  background: var(--white);
  border: 1px solid var(--ink);
}

.consent__text { margin: 0 0 12px; font-size: 0.9375rem; }

.consent__actions { display: flex; flex-wrap: wrap; gap: 10px; }
</style>
