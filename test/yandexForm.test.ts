import { describe, expect, it } from 'vitest'
import { yandexFormUrl } from '../app/utils/yandexForm'

const form = 'https://forms.yandex.ru/u/abc123/'

describe('yandexFormUrl', () => {
  it('добавляет параметры для iframe', () => {
    const url = new URL(yandexFormUrl(form, { iframe: true })!)
    expect(url.pathname).toBe('/u/abc123/')
    expect(url.searchParams.get('iframe')).toBe('1')
    expect(url.searchParams.get('theme')).toBe('light')
  })

  it('передаёт расчёт в скрытый вопрос и кодирует его', () => {
    const url = new URL(yandexFormUrl(form, { estimate: 'Костюм; 54 500 ₽ – 69 500 ₽' })!)
    expect(url.searchParams.get('estimate')).toBe('Костюм; 54 500 ₽ – 69 500 ₽')
    expect(url.searchParams.has('iframe')).toBe(false)
  })

  it('не добавляет пустой расчёт', () => {
    expect(new URL(yandexFormUrl(form, { iframe: true, estimate: '' })!).searchParams.has('estimate')).toBe(false)
  })

  it('принимает ссылку, скопированную из кода iframe', () => {
    const url = new URL(yandexFormUrl(`${form}?iframe=1&theme=dark`)!)
    expect(url.search).toBe('')
  })

  it.each([
    [''],
    ['не ссылка'],
    ['http://forms.yandex.ru/u/abc/'],
    ['https://evil.example/u/abc/'],
    ['https://forms.yandex.ru.evil.example/u/abc/'],
  ])('отклоняет %j', (bad) => {
    expect(yandexFormUrl(bad)).toBeNull()
  })
})
