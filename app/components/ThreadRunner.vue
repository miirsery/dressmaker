<script setup lang="ts">
// Нитка, которая прошивает страницу по мере прокрутки: идёт по полям и пересекает её на швах секций.
const route = useRoute()
const svg = ref<SVGSVGElement>()
const path = ref<SVGPathElement>()
const needle = ref<SVGGElement>()
const size = { width: 0, height: 0 }
const d = ref('')

const STITCH = 12
const GAP = 8
const PERIOD = STITCH + GAP
const TABLE_STEP = 90

let table: { y: number, length: number }[] = []
let total = 0
let current = 0
let target = 0
let stitches = -1
let frame = 0
let reduced = false

const pageY = (el: Element) => el.getBoundingClientRect().top + window.scrollY

const build = () => {
  const width = document.documentElement.clientWidth
  const height = document.body.offsetHeight
  if (d.value && width === size.width && height === size.height) return
  size.width = width
  size.height = height

  const margin = width < 700 ? 9 : 20
  const left = margin
  const right = width - margin
  const seams = [...document.querySelectorAll('[data-seam]')].map(el => pageY(el) + 12)
  const end = document.querySelector('[data-thread-end]')
  const endY = end ? pageY(end) + 34 : height - 40

  let x = left
  let y = 110
  let out = `M ${left} ${y}`

  seams.forEach((seamY, index) => {
    if (seamY <= y + 40) return
    const next = x === left ? right : left
    const mid = width / 2
    const loop = Math.min(26, width * 0.05)
    out += ` L ${x} ${seamY - 36}`
    out += ` C ${x} ${seamY} ${x} ${seamY} ${(x + mid) / 2} ${seamY}`
    if (index % 2 === 0) {
      out += ` L ${mid - loop} ${seamY} C ${mid + loop * 1.4} ${seamY} ${mid + loop * 1.2} ${seamY - loop * 1.8} ${mid} ${seamY - loop * 1.8}`
      out += ` C ${mid - loop * 1.2} ${seamY - loop * 1.8} ${mid - loop * 1.4} ${seamY} ${mid + loop} ${seamY}`
    }
    out += ` L ${(next + mid) / 2} ${seamY} C ${next} ${seamY} ${next} ${seamY} ${next} ${seamY + 36}`
    x = next
    y = seamY + 36
  })

  out += ` L ${x} ${endY}`
  // Узелок в конце шва
  const toCentre = x === left ? 1 : -1
  out += ` C ${x} ${endY + 30} ${x + 20 * toCentre} ${endY + 34} ${x + 26 * toCentre} ${endY + 16}`
  out += ` C ${x + 30 * toCentre} ${endY} ${x + 8 * toCentre} ${endY} ${x + 12 * toCentre} ${endY + 18}`
  d.value = out

  nextTick(() => {
    const el = path.value
    if (!el) return
    total = el.getTotalLength()
    table = []
    let maxY = 0
    // Нитка почти везде вертикальна, поэтому хватает редкой таблицы с интерполяцией
    for (let length = 0; length <= total + TABLE_STEP; length += TABLE_STEP) {
      maxY = Math.max(maxY, el.getPointAtLength(Math.min(length, total)).y)
      table.push({ y: maxY, length: Math.min(length, total) })
    }
    stitches = -1
    if (reduced) {
      el.style.strokeDasharray = `${STITCH} ${GAP}`
      return
    }
    onScroll()
    current = target
    draw()
  })
}

const lengthAtY = (y: number) => {
  let low = 0
  let high = table.length - 1
  while (low < high) {
    const mid = (low + high) >> 1
    if (table[mid]!.y < y) low = mid + 1
    else high = mid
  }
  const after = table[low]
  const before = table[low - 1]
  if (!after) return 0
  if (!before || after.y === before.y) return after.length
  return before.length + (after.length - before.length) * (y - before.y) / (after.y - before.y)
}

const draw = () => {
  const el = path.value
  const tip = needle.value
  if (!el || !tip) return

  const count = Math.floor(current / PERIOD)
  if (count !== stitches) {
    stitches = count
    el.style.strokeDasharray = `${`${STITCH} ${GAP} `.repeat(count)}0 ${Math.ceil(total) + 100}`
  }

  const point = el.getPointAtLength(current)
  const ahead = el.getPointAtLength(Math.min(current + 4, total))
  const angle = Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180 / Math.PI
  tip.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle})`)
  tip.style.opacity = total && current >= total - 2 ? '0' : '1'
}

const tick = () => {
  const delta = target - current
  current = Math.abs(delta) < 1 ? target : current + delta * 0.18
  draw()
  frame = current === target ? 0 : requestAnimationFrame(tick)
}

const onScroll = () => {
  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4
  target = atBottom ? total : lengthAtY(window.scrollY + window.innerHeight * 0.62)
  if (!frame) frame = requestAnimationFrame(tick)
}

let timer = 0
const schedule = () => {
  clearTimeout(timer)
  timer = window.setTimeout(build, 120)
}

let observer: ResizeObserver | undefined

onMounted(() => {
  reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  // Нитка декоративная, поэтому строится, когда браузер освободится
  const start = () => {
    observer = new ResizeObserver(schedule)
    observer.observe(document.body)
    if (!reduced) window.addEventListener('scroll', onScroll, { passive: true })
    build()
  }
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 2500 })
  else setTimeout(start, 900)
})

watch(() => route.path, () => setTimeout(build, 200))

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(frame)
  clearTimeout(timer)
})
</script>

<template>
  <svg
    ref="svg"
    class="thread"
    aria-hidden="true"
    focusable="false"
  >
    <path ref="path" class="thread__line" :d="d" />
    <g ref="needle" class="thread__needle">
      <path d="M-34 0 L-6 -1.8 L18 0 L-6 1.8 Z" fill="#6d6470" stroke="#2a1930" stroke-width="0.8" stroke-linejoin="round" />
      <ellipse cx="-26" cy="0" rx="4" ry="1" fill="#fff9ec" />
    </g>
  </svg>
</template>

<style scoped>
.thread {
  position: absolute;
  top: 0;
  left: 0;
  /* Слой всегда равен body, поэтому не может растянуть страницу после перехода с длинной */
  width: 100%;
  height: 100%;
  z-index: 30;
  pointer-events: none;
}

.thread__line {
  fill: none;
  stroke: var(--thread);
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 0 100000;
}

/* Появляется, только когда нитка построена. При отключённых анимациях шов показан целиком, без иглы */
.thread__needle { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .thread__needle { display: none; }
}

@media print {
  .thread { display: none; }
}
</style>
