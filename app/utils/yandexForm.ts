const FORMS_HOST = /^forms(\.cloud)?\.yandex\.(ru|com)$/

/**
 * Собирает адрес Яндекс Формы. Расчёт передаётся в скрытый вопрос с ID estimate.
 * Для чужих и некорректных адресов возвращает null.
 */
export const yandexFormUrl = (formUrl: string, options: { iframe?: boolean, estimate?: string } = {}): string | null => {
  let url: URL
  try {
    url = new URL(formUrl)
  }
  catch {
    return null
  }
  if (url.protocol !== 'https:' || !FORMS_HOST.test(url.hostname)) return null

  url.searchParams.delete('iframe')
  url.searchParams.delete('theme')
  if (options.iframe) {
    url.searchParams.set('iframe', '1')
    url.searchParams.set('theme', 'light')
  }
  if (options.estimate) url.searchParams.set('estimate', options.estimate)
  return url.href
}
