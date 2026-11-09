// Единое место для имени, города и контактов. Всё здесь пока заглушки.
export const site = {
  name: 'Анна Швецова',
  role: 'швея-технолог',
  city: 'Санкт-Петербург',
  region: 'Санкт-Петербург',
  country: 'RU',
  email: 'hello@example.com',
  telegram: 'https://t.me/example',
  telegramLabel: '@example',
  vk: 'https://vk.com/example',
  hours: 'Приём по записи, пн–сб, 11:00–20:00',
} as const

export const nav = [
  { to: '/raboty', label: 'Работы' },
  { to: '/ceny', label: 'Цены' },
  { to: '/tehnolog', label: 'Технолог' },
] as const
