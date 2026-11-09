export interface Work {
  slug: string
  title: string
  summary: string
  /** Путь вида photo-… из Unsplash или локальный файл из public/, например /works/armor.jpg */
  src: string
  alt: string
  /** Рамка задаёт пропорции, поэтому фото другого формата просто обрежется */
  aspect: '3/4' | '4/5' | '2/3'
  focus?: string
  creditUrl?: string
  hours: number
  materials: string[]
  stages: string[]
}

export const works: Work[] = [
  {
    slug: 'rogatyj-dospeh',
    title: 'Рогатый доспех',
    summary: 'Доспех с рогами и шипами для выхода на сцену. Весит меньше 4 кг и снимается за две минуты.',
    src: 'photo-1735720518631-60257e2fde92',
    alt: 'Человек в чёрно-красном фэнтезийном доспехе с большими изогнутыми рогами и шипами на плечах',
    aspect: '2/3',
    focus: '50% 20%',
    creditUrl: 'https://unsplash.com/photos/a-woman-dressed-in-a-costume-with-horns-and-horns-QTV1iJdinxQ',
    hours: 210,
    materials: ['термопласт Worbla', 'EVA 2 и 5 мм', 'стрейч-бархат', 'акриловая роспись'],
    stages: ['Каркас по слепку из скотча', 'Формовка и шлифовка EVA', 'Подкладка и крепления на магнитах', 'Роспись и состаривание'],
  },
  {
    slug: 'golubaya-feya',
    title: 'Голубое бальное платье',
    summary: 'Пышное платье с бантами и корсетной основой. Держит форму без кринолина.',
    src: 'photo-1727409021722-0a9dd41b8dda',
    alt: 'Косплеер с бирюзовыми волосами в бело-голубом пышном платье с бантами в торговом зале',
    aspect: '3/4',
    focus: '50% 25%',
    creditUrl: 'https://unsplash.com/photos/a-woman-dressed-in-a-cosplay-costume-fpANejEQJJQ',
    hours: 120,
    materials: ['атлас-дюшес', 'органза', 'спиральные косточки', 'сетка-фатин жёсткая'],
    stages: ['Макет корсета из бязи', 'Две примерки', 'Сборка юбки из 5 ярусов', 'Ручная пришивка бантов'],
  },
  {
    slug: 'gotika',
    title: 'Готическое платье с розовым париком',
    summary: 'Чёрное платье с контрастной отделкой. Юбка раскроена так, чтобы не мялась в дороге.',
    src: 'photo-1618588064115-ee5dfbd55e68',
    alt: 'Косплеер с длинными розовыми волосами в чёрном платье с белой отделкой на фоне городских домов',
    aspect: '4/5',
    focus: '50% 22%',
    creditUrl: 'https://unsplash.com/photos/woman-in-red-and-black-long-sleeve-dress-wearing-gray-hat-Of9qr_xjlUo',
    hours: 64,
    materials: ['костюмный габардин', 'хлопковое кружево', 'потайная молния', 'регилин'],
    stages: ['Построение по меркам', 'Настил и раскрой', 'Обработка срезов', 'Влажно-тепловая обработка'],
  },
  {
    slug: 'kovboj',
    title: 'Многослойный образ со шляпой',
    summary: 'Пять слоёв ткани, ни один не тянет соседний. Шляпа держится на скрытой резинке.',
    src: 'photo-1727409051606-16c4ae5d57d4',
    alt: 'Косплеер с рыжими волосами в белой многослойной одежде и широкополой светлой шляпе',
    aspect: '3/4',
    focus: '50% 15%',
    creditUrl: 'https://unsplash.com/photos/a-woman-with-red-hair-wearing-a-costume-xEgltuVmxc4',
    hours: 92,
    materials: ['лён костюмный', 'шифон', 'искусственная замша', 'фетр для шляпы'],
    stages: ['Эскиз слоёв и расчёт припусков', 'Шляпа на болванке', 'Пошив слоёв по отдельности', 'Сборка на одну застёжку'],
  },
  {
    slug: 'kimono',
    title: 'Расписное кимоно',
    summary: 'Узор нанесён вручную до раскроя, поэтому рисунок сходится по швам.',
    src: 'photo-1598318705047-75f6290c64c7',
    alt: 'Косплеер в белом кимоно с тонким чёрным рисунком паутины и малиновым поясом',
    aspect: '2/3',
    focus: '50% 20%',
    creditUrl: 'https://unsplash.com/photos/woman-in-white-and-black-floral-kimono-E1_U3UN1Kfs',
    hours: 78,
    materials: ['шёлк-креп', 'текстильная тушь', 'хлопковая подкладка'],
    stages: ['Перенос рисунка на полотно', 'Фиксация краски утюгом', 'Прямой крой без отходов', 'Ручной подшив'],
  },
  {
    slug: 'kurtka-i-plate',
    title: 'Джинсовая куртка поверх платья',
    summary: 'Куртка перешита из готовой: новая пройма, укороченная длина, родная фурнитура.',
    src: 'photo-1577210944661-d982e8dae6e5',
    alt: 'Косплеер со светлыми волосами в синей джинсовой куртке поверх белого платья, сложив руки у груди',
    aspect: '4/5',
    focus: '50% 25%',
    creditUrl: 'https://unsplash.com/photos/selective-focus-photography-of-cosplayer-qNCOVaOmzSo',
    hours: 26,
    materials: ['готовая джинсовая куртка', 'поплин', 'нитки 40 ЛШ'],
    stages: ['Распарывание рукавов', 'Перекрой проймы', 'Повторная отстрочка в тон', 'Подгонка длины'],
  },
]
