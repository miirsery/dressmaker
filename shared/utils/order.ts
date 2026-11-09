export interface OrderFields {
  name: string
  contact: string
  idea: string
  date: string
  estimate: string
  consent: boolean
}

export type OrderErrors = Partial<Record<keyof OrderFields | 'file', string>>

export const MAX_FILE_BYTES = 8 * 1024 * 1024

const LIMITS = { name: 80, contact: 120, idea: 2000, date: 60, estimate: 600 }

const clean = (value: unknown, limit: number): string =>
  typeof value === 'string' ? value.trim().slice(0, limit) : ''

export const validateOrder = (input: Record<string, unknown>): { value: OrderFields, errors: OrderErrors } => {
  const value: OrderFields = {
    name: clean(input.name, LIMITS.name),
    contact: clean(input.contact, LIMITS.contact),
    idea: clean(input.idea, LIMITS.idea),
    date: clean(input.date, LIMITS.date),
    estimate: clean(input.estimate, LIMITS.estimate),
    consent: input.consent === true || input.consent === 'true' || input.consent === 'on',
  }

  const errors: OrderErrors = {}
  if (value.name.length < 2) errors.name = 'Напишите, как к вам обращаться.'
  if (value.contact.length < 4) errors.contact = 'Укажите Telegram или почту, чтобы я могла ответить.'
  if (value.idea.length < 10) errors.idea = 'Опишите задачу хотя бы одним предложением.'
  if (!value.consent) errors.consent = 'Без согласия я не смогу принять заявку.'

  return { value, errors }
}

/** Проверяет настоящий тип файла по первым байтам, а не по расширению. */
export const detectImage = (bytes: Uint8Array): 'jpg' | 'png' | 'webp' | null => {
  if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) return 'jpg'
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) return 'png'
  const tag = (from: number) => String.fromCharCode(...bytes.slice(from, from + 4))
  if (tag(0) === 'RIFF' && tag(8) === 'WEBP') return 'webp'
  return null
}

export const formatOrder = (order: OrderFields): string => [
  'Новая заявка с сайта',
  '',
  `Имя: ${order.name}`,
  `Связь: ${order.contact}`,
  order.date ? `Дата: ${order.date}` : '',
  '',
  order.idea,
  order.estimate ? `\nИз калькулятора:\n${order.estimate}` : '',
].filter((line, i, all) => line !== '' || all[i - 1] !== '').join('\n')
