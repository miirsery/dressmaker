// Запасной вариант для браузеров без animation-timeline: view().
export default defineNuxtPlugin((nuxtApp) => {
  const supported = CSS.supports('animation-timeline', 'view()')
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (supported || reduced || !('IntersectionObserver' in window)) return

  document.documentElement.classList.add('js-io')

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('in')
      observer.unobserve(entry.target)
    })
  }, { rootMargin: '0px 0px -8% 0px' })

  const watch = () => document.querySelectorAll('.rise:not(.in), .swing:not(.in)').forEach(el => observer.observe(el))

  nuxtApp.hook('app:mounted', watch)
  nuxtApp.hook('page:finish', () => requestAnimationFrame(watch))
})
