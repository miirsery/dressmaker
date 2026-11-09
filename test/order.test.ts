import { describe, expect, it } from 'vitest'
import { detectImage, formatOrder, validateOrder } from '../shared/utils/order'

const good = { name: 'Мария', contact: '@maria', idea: 'Нужно сшить платье к фестивалю', date: '', estimate: '', consent: 'true' }

describe('validateOrder', () => {
  it('принимает заполненную заявку', () => {
    expect(validateOrder(good).errors).toEqual({})
  })

  it('требует согласие', () => {
    expect(validateOrder({ ...good, consent: 'false' }).errors.consent).toBeTruthy()
  })

  it('отмечает пустые обязательные поля', () => {
    expect(Object.keys(validateOrder({}).errors).sort()).toEqual(['consent', 'contact', 'idea', 'name'])
  })

  it('обрезает слишком длинный текст', () => {
    expect(validateOrder({ ...good, idea: 'я'.repeat(5000) }).value.idea).toHaveLength(2000)
  })
})

describe('detectImage', () => {
  it('определяет форматы по сигнатуре', () => {
    expect(detectImage(new Uint8Array([0xFF, 0xD8, 0xFF, 0xE0]))).toBe('jpg')
    expect(detectImage(new Uint8Array([0x89, 0x50, 0x4E, 0x47]))).toBe('png')
    expect(detectImage(new TextEncoder().encode('RIFF1234WEBP'))).toBe('webp')
  })

  it('не верит файлу с другим содержимым', () => {
    expect(detectImage(new TextEncoder().encode('<script>alert(1)</script>'))).toBeNull()
  })
})

describe('formatOrder', () => {
  it('включает только заполненные поля', () => {
    const text = formatOrder({ name: 'Мария', contact: '@maria', idea: 'Платье', date: '', estimate: '', consent: true })
    expect(text).toContain('Связь: @maria')
    expect(text).not.toContain('Дата')
    expect(text).not.toContain('калькулятора')
  })
})
