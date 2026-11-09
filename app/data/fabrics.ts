export interface Fabric {
  id: string
  name: string
  swatch: string
  note: string
  /** Поправка к базовому расходу, в процентах */
  extra: number
  needle: string
}

export const fabrics: Fabric[] = [
  {
    id: 'len',
    name: 'Лён',
    swatch: '#d9c29a',
    note: 'Садится при стирке, поэтому декатирую до раскроя. Прощает неточности и хорошо держит заглаженную складку.',
    extra: 4,
    needle: 'Игла 90, нитка 40 ЛЛ',
  },
  {
    id: 'barhat',
    name: 'Бархат',
    swatch: '#7a1740',
    note: 'Все детали кладутся ворсом в одну сторону. Швы прокалываю булавками в припуск, утюгом только через игольную подушку.',
    extra: 15,
    needle: 'Игла 80, лапка с верхним транспортёром',
  },
  {
    id: 'atlas',
    name: 'Атлас',
    swatch: '#e9b8c4',
    note: 'Блестит на вспышке и показывает каждый неровный шов. Режу роликовым ножом, смётываю вручную, подкладка обязательна.',
    extra: 8,
    needle: 'Игла Microtex 70, нитка 100 ЛШ',
  },
  {
    id: 'organza',
    name: 'Органза',
    swatch: '#cfe0ee',
    note: 'Швы видны насквозь, поэтому только французский шов или узкая подгибка. Осыпается, срезы обрабатываю сразу после раскроя.',
    extra: 12,
    needle: 'Игла 60, частая строчка 1,8 мм',
  },
  {
    id: 'kozha',
    name: 'Кожзам',
    swatch: '#4a3a46',
    note: 'Прокол не исчезает, поэтому переделать шов нельзя. Вместо булавок зажимы, вместо утюга молоток и клей в припусках.',
    extra: 10,
    needle: 'Игла Leather 100, тефлоновая лапка',
  },
]

export interface PatternPiece {
  label: string
  d: string
  tagX: number
  tagY: number
  grain: [number, number, number, number]
}

export interface GarmentPattern {
  id: string
  name: string
  baseMeters: number
  pieces: PatternPiece[]
}

export const patterns: GarmentPattern[] = [
  {
    id: 'korset',
    name: 'Корсет',
    baseMeters: 1.2,
    pieces: [
      { label: 'Перед, 1 по сгибу', d: 'M50 110 Q105 74 170 96 L180 256 L170 436 Q108 462 50 444 Z', tagX: 58, tagY: 400, grain: [110, 130, 110, 320] },
      { label: 'Бочок, 2', d: 'M226 98 Q276 82 324 104 L314 256 L330 424 Q276 442 220 428 L234 256 Z', tagX: 224, tagY: 390, grain: [276, 130, 276, 320] },
      { label: 'Спинка, 2', d: 'M380 124 L486 98 L498 256 L490 414 L384 432 L396 256 Z', tagX: 390, tagY: 390, grain: [442, 130, 442, 320] },
      { label: 'Планка', d: 'M540 84 L604 84 L604 452 L540 452 Z', tagX: 532, tagY: 410, grain: [572, 120, 572, 340] },
    ],
  },
  {
    id: 'plashch',
    name: 'Плащ',
    baseMeters: 3.4,
    pieces: [
      { label: 'Плащ, 1 полусолнце', d: 'M40 486 A260 260 0 0 1 560 486 L384 486 A84 84 0 0 0 216 486 Z', tagX: 44, tagY: 440, grain: [300, 262, 300, 390] },
      { label: 'Капюшон, 2', d: 'M56 196 Q52 52 170 40 Q262 46 276 132 L288 196 Z', tagX: 90, tagY: 150, grain: [170, 70, 170, 140] },
      { label: 'Подборт, 2', d: 'M372 52 L606 52 L606 118 L372 118 Z', tagX: 380, tagY: 74, grain: [560, 85, 480, 85] },
    ],
  },
  {
    id: 'rukav',
    name: 'Юбка и рукав',
    baseMeters: 4.6,
    pieces: [
      { label: 'Рукав, 2', d: 'M44 214 Q146 34 248 214 L222 376 L72 376 Z', tagX: 76, tagY: 310, grain: [146, 110, 146, 280] },
      { label: 'Манжета, 2', d: 'M64 412 L232 412 L232 480 L64 480 Z', tagX: 76, tagY: 434, grain: [90, 446, 210, 446] },
      { label: 'Клин юбки, 8', d: 'M366 44 L470 44 L620 490 L276 490 Z', tagX: 350, tagY: 410, grain: [446, 80, 446, 340] },
    ],
  },
]
