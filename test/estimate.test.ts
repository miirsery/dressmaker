import { describe, expect, it } from 'vitest'
import { describeEstimate, estimate, parseEstimateQuery, pluralRu } from '../app/utils/estimate'
import type { EstimateInput } from '../app/utils/estimate'

const base: EstimateInput = { job: 'costume', complexity: 'medium', volume: 3, urgency: 'normal', materials: 'middle' }

describe('estimate', () => {
  it('считает работу, материалы и диапазон', () => {
    expect(estimate(base)).toEqual({ labor: 43200, materials: 17300, urgency: 0, from: 54500, to: 69500 })
  })

  it('добавляет наценку за срочность только к работе', () => {
    const rush = estimate({ ...base, urgency: 'rush' })
    expect(rush.urgency).toBe(21600)
    expect(rush.materials).toBe(17300)
  })

  it('не считает материалы для услуг технолога', () => {
    expect(estimate({ ...base, job: 'tech' }).materials).toBe(0)
  })

  it('растёт вместе с объёмом и сложностью', () => {
    expect(estimate({ ...base, volume: 4 }).from).toBeGreaterThan(estimate(base).from)
    expect(estimate({ ...base, complexity: 'stage' }).from).toBeGreaterThan(estimate(base).from)
  })
})

describe('pluralRu', () => {
  const forms = ['модель', 'модели', 'моделей'] as const

  it.each([[1, 'модель'], [3, 'модели'], [5, 'моделей'], [11, 'моделей'], [12, 'моделей'], [21, 'модель'], [24, 'модели']])('%i → %s', (n, word) => {
    expect(pluralRu(n, forms)).toBe(word)
  })
})

describe('parseEstimateQuery', () => {
  const query = { job: 'tech', complexity: 'hard', volume: '6', urgency: 'fast', materials: 'budget' }

  it('разбирает корректную ссылку', () => {
    expect(parseEstimateQuery(query)).toEqual({ ...query, volume: 6 })
  })

  it.each([
    [{ ...query, job: 'constructor' }],
    [{ ...query, complexity: '__proto__' }],
    [{ ...query, volume: '13' }],
    [{ ...query, volume: '1.5' }],
    [{}],
  ])('отклоняет %j', (bad) => {
    expect(parseEstimateQuery(bad)).toBeNull()
  })

  it('не упоминает материалы в описании услуг технолога', () => {
    expect(describeEstimate({ ...base, job: 'tech' })).not.toContain('Материалы')
  })
})
