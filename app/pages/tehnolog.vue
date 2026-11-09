<script setup lang="ts">
const { baseURL } = useRuntimeConfig().app
const base = useSiteBase()

usePageSeo({
  title: 'Технолог швейного производства: техкарты и себестоимость | Анна Швецова',
  description: 'Техническое описание модели, спецификации, нормы расхода, последовательность операций и расчёт себестоимости для брендов одежды и швейных студий.',
  path: '/tehnolog',
})

useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'Service',
  'serviceType': 'Технолог швейного производства',
  'name': 'Техкарты и расчёт себестоимости',
  'url': `${base}/tehnolog`,
  'provider': { '@id': `${base}/#business` },
  'areaServed': 'RU',
})

const deliverables = [
  { title: 'Техническое описание', text: 'Эскиз, конструктивные узлы, допуски и обработка срезов. Цех шьёт без звонков с вопросами.' },
  { title: 'Спецификация и нормы расхода', text: 'Ткани, фурнитура и нитки на единицу с учётом раскладки и потерь.' },
  { title: 'Последовательность операций', text: 'Операции по порядку, оборудование и время. На этой таблице строится расценка.' },
  { title: 'Расчёт себестоимости', text: 'Сколько стоит единица при разных тиражах и где выгоднее поменять материал или узел.' },
  { title: 'Контроль образца', text: 'Проверяю образец и первый тираж по меркам и узлам, составляю список правок.' },
]

const costs = [
  ['Основная ткань, 2,4 м', '1 680'],
  ['Подкладка, 1,6 м', '320'],
  ['Фурнитура и нитки', '210'],
  ['Пошив, 3 ч 40 мин', '1 650'],
  ['Раскрой и ВТО', '260'],
  ['Упаковка и маркировка', '70'],
  ['Брак и потери, 3 %', '125'],
]
</script>

<template>
  <div>
    <header class="page-head wrap">
      <h1 class="page-head__title">Технолог</h1>
      <p class="page-head__lead">
        Для брендов одежды, швейных студий и авторов, которые переходят от одной вещи к партии. Подготовлю модель так, чтобы цех понял её с первого раза, а вы заранее знали её цену.
      </p>
    </header>

    <SeamLine />

    <section class="section wrap">
      <h2 class="section__title">Что вы получите</h2>
      <dl class="deliver">
        <div v-for="item in deliverables" :key="item.title" class="deliver__row rise">
          <dt class="deliver__name">{{ item.title }}</dt>
          <dd class="deliver__text">{{ item.text }}</dd>
        </div>
      </dl>
    </section>

    <SeamLine />

    <section class="section wrap cost">
      <div>
        <h2 class="section__title">Как выглядит расчёт</h2>
        <p class="section__lead">Пример для платья на подкладке при партии 50 штук. Цифры условные, в реальном расчёте они берутся из вашей раскладки и расценок цеха.</p>
        <p class="cost__actions">
          <a class="btn" :href="`${baseURL}primer-tehkarty.pdf`" download>Скачать пример техкарты, PDF</a>
          <NuxtLink to="/ceny#tehnolog">Цены на услуги технолога</NuxtLink>
        </p>
      </div>

      <table class="sheet rise">
        <caption class="sheet__cap">Себестоимость единицы, пример</caption>
        <thead>
          <tr><th scope="col">Статья</th><th scope="col">₽ на единицу</th></tr>
        </thead>
        <tbody>
          <tr v-for="[name, value] in costs" :key="name"><th scope="row">{{ name }}</th><td>{{ value }}</td></tr>
        </tbody>
        <tfoot>
          <tr><th scope="row">Итого</th><td>4 315</td></tr>
        </tfoot>
      </table>
    </section>

    <SeamLine />
  </div>
</template>

<style scoped>
.deliver { margin: 28px 0 0; }

.deliver__row {
  display: grid;
  gap: 4px;
  padding-block: 18px;
  border-top: 1.5px dashed var(--ink);
}

.deliver__name { font: italic 900 1.625rem/1.15 var(--font-display); }
.deliver__text { margin: 0; max-width: 54ch; }

.cost { display: grid; gap: 36px; }

.cost__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px 22px;
  align-items: center;
  margin: 0;
}

.sheet {
  width: 100%;
  background-color: var(--white);
  background-image: var(--weave);
  border: 1px solid var(--ink);
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;
}

.sheet__cap {
  padding-bottom: 8px;
  font: 600 1.4rem/1.2 var(--font-hand);
  color: var(--chalk);
  text-align: left;
}

.sheet th, .sheet td {
  padding: 11px 14px;
  border-bottom: 1px solid var(--ink);
}

.sheet th { font-weight: 400; text-align: left; }
.sheet td, .sheet thead th:last-child { text-align: right; white-space: nowrap; }
.sheet thead th { font-weight: 700; background: var(--tape); }
.sheet tfoot th, .sheet tfoot td { font-weight: 700; font-size: 1.25rem; border-bottom: 0; }

@media (min-width: 820px) {
  .deliver__row { grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); gap: 32px; }
  .cost { grid-template-columns: 1fr 1.1fr; gap: 64px; align-items: start; }
}
</style>
