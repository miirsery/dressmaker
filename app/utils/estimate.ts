export type JobType = 'costume' | 'repair' | 'tech'
export type Complexity = 'simple' | 'medium' | 'hard' | 'stage'
export type Urgency = 'normal' | 'fast' | 'rush'
export type Materials = 'client' | 'budget' | 'middle' | 'premium'

export interface EstimateInput {
  job: JobType
  complexity: Complexity
  volume: number
  urgency: Urgency
  materials: Materials
}

export interface Estimate {
  labor: number
  materials: number
  urgency: number
  from: number
  to: number
}

export const JOBS: Record<JobType, { label: string, base: number, unit: number, units: [string, string, string], usesMaterials: boolean }> = {
  costume: { label: 'Костюм', base: 9000, unit: 6000, units: ['элемент костюма', 'элемента костюма', 'элементов костюма'], usesMaterials: true },
  repair: { label: 'Ремонт или переделка', base: 500, unit: 900, units: ['вещь', 'вещи', 'вещей'], usesMaterials: true },
  tech: { label: 'Расчёт производства', base: 2000, unit: 4500, units: ['модель', 'модели', 'моделей'], usesMaterials: false },
}

export const COMPLEXITY: Record<Complexity, { label: string, hint: string, factor: number }> = {
  simple: { label: 'Простая', hint: 'один слой, понятный силуэт', factor: 1 },
  medium: { label: 'Средняя', hint: 'подкладка, застёжки, отделка', factor: 1.6 },
  hard: { label: 'Сложная', hint: 'корсет, слои, нестандартный крой', factor: 2.4 },
  stage: { label: 'Сценическая', hint: 'доспех, каркас, вышивка', factor: 3.4 },
}

export const URGENCY: Record<Urgency, { label: string, hint: string, factor: number }> = {
  normal: { label: 'Без спешки', hint: 'от 6 недель', factor: 1 },
  fast: { label: 'Быстрее', hint: '3–5 недель, +25 %', factor: 1.25 },
  rush: { label: 'Срочно', hint: 'до 3 недель, +50 %', factor: 1.5 },
}

export const MATERIALS: Record<Materials, { label: string, hint: string, share: number }> = {
  client: { label: 'Ваши', hint: 'привезёте сами', share: 0 },
  budget: { label: 'Простые', hint: 'поплин, габардин', share: 0.2 },
  middle: { label: 'Хорошие', hint: 'атлас, лён, Worbla', share: 0.4 },
  premium: { label: 'Лучшие', hint: 'шёлк, бархат, ручная вышивка', share: 0.75 },
}

const roundTo = (value: number, step: number): number => Math.round(value / step) * step

export const estimate = (input: EstimateInput): Estimate => {
  const job = JOBS[input.job]
  const labor = (job.base + job.unit * input.volume) * COMPLEXITY[input.complexity].factor
  const materials = job.usesMaterials ? labor * MATERIALS[input.materials].share : 0
  const urgency = labor * (URGENCY[input.urgency].factor - 1)
  const total = labor + materials + urgency

  return {
    labor: roundTo(labor, 100),
    materials: roundTo(materials, 100),
    urgency: roundTo(urgency, 100),
    from: roundTo(total * 0.9, 500),
    to: roundTo(total * 1.15, 500),
  }
}

export const pluralRu = (n: number, forms: readonly [string, string, string]): string => {
  const tens = n % 100
  const ones = n % 10
  if (tens > 10 && tens < 20) return forms[2]
  if (ones === 1) return forms[0]
  if (ones >= 2 && ones <= 4) return forms[1]
  return forms[2]
}

export const rub = (n: number): string => `${n.toLocaleString('ru-RU')} ₽`

const pickKey = <T extends string>(value: unknown, map: Record<T, unknown>): T | null =>
  typeof value === 'string' && Object.hasOwn(map, value) ? value as T : null

/** Разбирает параметры ссылки из калькулятора. Любое неверное значение отменяет разбор. */
export const parseEstimateQuery = (query: Record<string, unknown>): EstimateInput | null => {
  const job = pickKey(query.job, JOBS)
  const complexity = pickKey(query.complexity, COMPLEXITY)
  const urgency = pickKey(query.urgency, URGENCY)
  const materials = pickKey(query.materials, MATERIALS)
  const volume = Number(query.volume)
  if (!job || !complexity || !urgency || !materials) return null
  if (!Number.isInteger(volume) || volume < 1 || volume > 12) return null
  return { job, complexity, urgency, materials, volume }
}

export const describeEstimate = (input: EstimateInput): string => {
  const job = JOBS[input.job]
  const total = estimate(input)
  return [
    job.label,
    `Сложность: ${COMPLEXITY[input.complexity].label}`,
    `Объём: ${input.volume} ${pluralRu(input.volume, job.units)}`,
    `Срок: ${URGENCY[input.urgency].label}`,
    ...(job.usesMaterials ? [`Материалы: ${MATERIALS[input.materials].label}`] : []),
    `Ориентир: ${rub(total.from)} – ${rub(total.to)}`,
  ].join('\n')
}
