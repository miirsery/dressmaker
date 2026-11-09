<script setup lang="ts">
import { MAX_FILE_BYTES, validateOrder } from '#shared/utils/order'
import type { OrderErrors } from '#shared/utils/order'
import { describeEstimate, parseEstimateQuery } from '~/utils/estimate'

const route = useRoute()

const form = reactive({ name: '', contact: '', idea: '', date: '', consent: false, website: '' })
const estimate = ref('')
const file = ref<File>()
const errors = ref<OrderErrors>({})
const status = ref<'idle' | 'sending' | 'sent'>('idle')
const failure = ref('')
const root = ref<HTMLFormElement>()

// Запрос читаем после гидратации: страница заранее отрендерена без параметров
onMounted(() => {
  const input = parseEstimateQuery(route.query)
  if (input) estimate.value = describeEstimate(input)
})

const focusFirstError = async () => {
  await nextTick()
  root.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
}

const onFile = (event: Event) => {
  const picked = (event.target as HTMLInputElement).files?.[0]
  const { file: _old, ...rest } = errors.value
  errors.value = rest
  file.value = picked
  if (picked && picked.size > MAX_FILE_BYTES) {
    errors.value = { ...rest, file: 'Файл больше 8 МБ. Уменьшите его или пришлите ссылку в описании.' }
  }
}

const submit = async () => {
  failure.value = ''
  const { errors: found } = validateOrder({ ...form, estimate: estimate.value })
  errors.value = { ...found, ...(errors.value.file ? { file: errors.value.file } : {}) }
  if (Object.keys(errors.value).length) {
    await focusFirstError()
    return
  }

  const body = new FormData()
  Object.entries(form).forEach(([key, value]) => body.append(key, String(value)))
  body.append('estimate', estimate.value)
  if (file.value) body.append('file', file.value)

  status.value = 'sending'
  try {
    await $fetch(useRuntimeConfig().public.orderEndpoint, { method: 'POST', body })
    status.value = 'sent'
  }
  catch (error) {
    status.value = 'idle'
    const data = (error as { data?: { data?: { message?: string, errors?: OrderErrors } } }).data?.data
    errors.value = data?.errors ?? {}
    failure.value = data?.message ?? 'Заявка не отправилась. Напишите мне напрямую, контакты рядом с формой.'
    await focusFirstError()
  }
}
</script>

<template>
  <p v-if="status === 'sent'" class="order__done" role="status">
    Заявка отправлена. Отвечу в течение дня.
  </p>

  <form v-else ref="root" class="order" novalidate @submit.prevent="submit">
    <div class="order__field">
      <label for="order-name">Как к вам обращаться</label>
      <input id="order-name" v-model="form.name" type="text" autocomplete="name" maxlength="80" required :aria-invalid="!!errors.name" :aria-describedby="errors.name ? 'order-name-error' : undefined">
      <p v-if="errors.name" id="order-name-error" class="order__error">{{ errors.name }}</p>
    </div>

    <div class="order__field">
      <label for="order-contact">Telegram или почта</label>
      <input id="order-contact" v-model="form.contact" type="text" autocomplete="email" maxlength="120" required :aria-invalid="!!errors.contact" :aria-describedby="errors.contact ? 'order-contact-error' : undefined">
      <p v-if="errors.contact" id="order-contact-error" class="order__error">{{ errors.contact }}</p>
    </div>

    <div class="order__field">
      <label for="order-idea">Что нужно сшить или посчитать</label>
      <textarea id="order-idea" v-model="form.idea" rows="5" maxlength="2000" required :aria-invalid="!!errors.idea" :aria-describedby="errors.idea ? 'order-idea-error' : undefined" />
      <p v-if="errors.idea" id="order-idea-error" class="order__error">{{ errors.idea }}</p>
    </div>

    <div class="order__field">
      <label for="order-date">К какой дате, если она есть</label>
      <input id="order-date" v-model="form.date" type="text" maxlength="60" placeholder="Например, фестиваль 14 марта">
    </div>

    <div class="order__field">
      <label for="order-file">Референс: JPG, PNG или WebP до 8 МБ</label>
      <input id="order-file" type="file" accept="image/jpeg,image/png,image/webp" :aria-invalid="!!errors.file" :aria-describedby="errors.file ? 'order-file-error' : undefined" @change="onFile">
      <p v-if="errors.file" id="order-file-error" class="order__error">{{ errors.file }}</p>
    </div>

    <div v-if="estimate" class="order__estimate">
      <p class="note order__estimate-title">расчёт из калькулятора</p>
      <p class="order__estimate-text">{{ estimate }}</p>
    </div>

    <div class="order__trap" aria-hidden="true">
      <label for="order-website">Сайт</label>
      <input id="order-website" v-model="form.website" type="text" tabindex="-1" autocomplete="off">
    </div>

    <div class="order__consent">
      <input id="order-consent" v-model="form.consent" type="checkbox" required :aria-invalid="!!errors.consent" :aria-describedby="errors.consent ? 'order-consent-error' : undefined">
      <label for="order-consent">Даю <NuxtLink to="/soglasie" target="_blank">согласие на обработку персональных данных</NuxtLink></label>
      <p v-if="errors.consent" id="order-consent-error" class="order__error">{{ errors.consent }}</p>
    </div>

    <p v-if="failure" class="order__failure" role="alert">{{ failure }}</p>

    <button class="btn" type="submit" :disabled="status === 'sending'">
      {{ status === 'sending' ? 'Отправляю заявку…' : 'Отправить заявку' }}
    </button>
    <p class="order__fine">Нажимая кнопку, вы подтверждаете, что прочитали <NuxtLink to="/politika" target="_blank">политику обработки данных</NuxtLink>.</p>
  </form>
</template>

<style scoped>
.order { display: grid; gap: 18px; justify-items: start; }

.order__field { display: grid; gap: 5px; width: 100%; }

.order__field label { font-weight: 700; }

.order input[type='text'],
.order textarea {
  width: 100%;
  padding: 11px 12px;
  font: inherit;
  color: var(--ink);
  background: var(--white);
  border: 1.5px dashed var(--ink);
  border-radius: 0;
}

.order input[type='file'] { font: inherit; max-width: 100%; }

.order input::placeholder { color: var(--ink-soft); }

.order [aria-invalid='true'] {
  border: 2px solid var(--thread);
}

.order__error {
  margin: 0;
  font-weight: 600;
  color: var(--thread);
}

.order__error::before { content: '× '; }

.order__estimate {
  width: 100%;
  padding: 12px 16px;
  background: var(--white);
  border: 1px solid var(--ink);
}

.order__estimate-title { margin: 0 0 4px; }

.order__estimate-text { margin: 0; white-space: pre-line; }

.order__trap {
  position: absolute;
  left: -9999px;
}

.order__consent {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 4px 10px;
  align-items: start;
}

.order__consent input { width: 22px; height: 22px; margin: 2px 0 0; accent-color: var(--ink); }

.order__consent .order__error { grid-column: 2; }

.order__failure {
  width: 100%;
  padding: 12px 16px;
  margin: 0;
  font-weight: 600;
  color: var(--ink);
  background: var(--tape);
}

.order__fine { margin: 0; font-size: 0.9375rem; }

.order .btn[disabled] { opacity: 0.7; }

.order__done {
  padding: 22px 24px;
  margin: 0;
  font: italic 900 1.75rem/1.2 var(--font-display);
  background: var(--tape);
}
</style>
