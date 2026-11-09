# Портфолио швеи-технолога

Nuxt 4, статическая генерация. Страницы: `/`, `/raboty`, `/ceny`, `/tehnolog`.

```bash
yarn install
yarn dev
yarn generate
```

Перед публикацией задайте адрес сайта, он нужен для canonical, sitemap, robots и Open Graph:

```bash
NUXT_PUBLIC_SITE_URL=https://ваш-домен.ru yarn generate
```

## Что заменить

- Имя, город и контакты: `app/data/site.ts`.
- Работы: `app/data/works.ts`. Положите фото в `public/works/` и укажите `src: '/works/armor.jpg'`. Локальные файлы сами конвертируются в AVIF и WebP с нужными размерами. Рамка задаёт пропорции через `aspect`, а `focus` выбирает, какая часть снимка видна. Заодно удалите `creditUrl` и подпись «фото временное» в `app/components/WorkItem.vue`.
- Цены: `app/data/prices.ts`. Коэффициенты калькулятора: `app/utils/estimate.ts`.
- Картинка для соцсетей: `yarn og` пересобирает `public/og.png` из `scripts/make-og.mjs`.
