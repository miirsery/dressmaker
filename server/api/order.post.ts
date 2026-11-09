import { MAX_FILE_BYTES, detectImage, formatOrder, validateOrder } from '#shared/utils/order'
import type { OrderErrors } from '#shared/utils/order'

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

const isLimited = (key: string): boolean => {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter(time => now - time < WINDOW_MS)
  recent.push(now)
  hits.set(key, recent)
  return recent.length > MAX_PER_WINDOW
}

const fail = (statusCode: number, message: string, errors?: OrderErrors) =>
  createError({ statusCode, statusMessage: 'Order rejected', data: { message, errors } })

export default defineEventHandler(async (event) => {
  if (isLimited(getRequestIP(event, { xForwardedFor: true }) ?? 'unknown')) {
    throw fail(429, 'Слишком много заявок подряд. Попробуйте через 10 минут или напишите мне напрямую.')
  }

  const parts = await readMultipartFormData(event) ?? []
  const fields: Record<string, string> = {}
  let file: { data: Buffer, type: 'jpg' | 'png' | 'webp' } | undefined
  const errors: OrderErrors = {}

  for (const part of parts) {
    if (!part.name) continue
    if (part.name !== 'file') {
      fields[part.name] = part.data.toString('utf8')
      continue
    }
    if (!part.data.length) continue
    const type = detectImage(part.data)
    if (part.data.length > MAX_FILE_BYTES) errors.file = 'Файл больше 8 МБ. Уменьшите его или пришлите ссылку в описании.'
    else if (!type) errors.file = 'Подойдёт только JPG, PNG или WebP.'
    else file = { data: part.data, type }
  }

  // Поле-ловушка скрыто от людей: бот получает «успех», а заявка никуда не уходит
  if (fields.website) return { ok: true }

  const { value, errors: fieldErrors } = validateOrder(fields)
  const allErrors = { ...fieldErrors, ...errors }
  if (Object.keys(allErrors).length) throw fail(422, 'Проверьте поля формы.', allErrors)

  const { telegramBotToken: token, telegramChatId: chatId, telegramApiBase: base } = useRuntimeConfig(event)
  if (!token || !chatId) throw fail(503, 'Форма пока не подключена. Напишите мне напрямую.')

  try {
    await $fetch(`${base}/bot${token}/sendMessage`, {
      method: 'POST',
      body: { chat_id: chatId, text: formatOrder(value) },
    })

    if (file) {
      const form = new FormData()
      form.append('chat_id', String(chatId))
      form.append('document', new Blob([new Uint8Array(file.data)]), `reference.${file.type}`)
      await $fetch(`${base}/bot${token}/sendDocument`, { method: 'POST', body: form })
    }
  }
  catch {
    throw fail(502, 'Заявка не отправилась. Напишите мне напрямую, контакты рядом с формой.')
  }

  return { ok: true }
})
