# Портфолио швеи-технолога

Nuxt 4. Страницы готовятся заранее. Сейчас сайт публикуется на GitHub Pages: каждый пуш в `main` запускает `.github/workflows/pages.yml`.

На Pages нет сервера, поэтому `/zayavka` показывает прямые контакты вместо формы, а поиск закрыт через `NUXT_SITE_INDEXABLE=false`. Для формы нужен хостинг с Node.js: задайте при сборке `NUXT_PUBLIC_ORDER_ENDPOINT=/api/order` и используйте `yarn build`.

```bash
yarn install
yarn dev
yarn test
yarn build
yarn preview
```

Собирайте на той же архитектуре, где будет работать сервер: в сборку попадают бинарники обработки изображений.

## Переменные окружения

| Переменная | Когда нужна | Зачем |
|---|---|---|
| `NUXT_PUBLIC_SITE_URL` | при сборке | адрес для canonical, sitemap, robots и Open Graph |
| `NUXT_APP_BASE_URL` | при сборке | подкаталог сайта, например `/dressmaker/` |
| `NUXT_SITE_INDEXABLE` | при сборке | `false` закрывает сайт от поисковиков |
| `NUXT_PUBLIC_ORDER_ENDPOINT` | при сборке | адрес приёма заявок, без него форма скрыта |
| `NUXT_TELEGRAM_BOT_TOKEN` | при запуске | токен бота, который получает заявки |
| `NUXT_TELEGRAM_CHAT_ID` | при запуске | чат, куда приходят заявки |
| `NUXT_PUBLIC_METRIKA_ID` | при сборке | счётчик Метрики, загружается только после согласия посетителя |
| `NUXT_PUBLIC_YANDEX_VERIFICATION` | при сборке | код подтверждения Яндекс Вебмастера |

Без токена форма показывает сообщение и контакты для прямой связи.

## Что заменить

- Имя, город, контакты, данные оператора, ближайшее окно, блок о мастере, FAQ и отзывы: `app/data/site.ts`. Пока список отзывов пуст, блок не показывается.
- Работы: `app/data/works.ts`. Положите фото в `public/works/` и укажите `src: '/works/armor.jpg'`. Локальные файлы сами конвертируются в AVIF и WebP. Рамка задаёт пропорции через `aspect`, а `focus` выбирает видимую часть снимка. Затем удалите `creditUrl` и подпись «фото временное» в `app/components/WorkItem.vue`.
- Снимки этапов: `processPhotos` в том же файле.
- Сравнение лица и изнанки: компонент `LazyFaceBack` в `app/pages/index.vue`, нужны два снимка одной вещи.
- Цены: `app/data/prices.ts`. Коэффициенты калькулятора: `app/utils/estimate.ts`.
- Образец техкарты: `scripts/techcard.html`, пересборка PDF командой `yarn techcard`.
- Картинка для соцсетей: `yarn og`.
- Тексты `/politika` и `/soglasie` покажите юристу перед публикацией.
