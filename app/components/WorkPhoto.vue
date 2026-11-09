<script setup lang="ts">
// Рамка задаёт пропорции, фото заполняет её. Замена src на локальный файл ничего не сдвигает.
const props = withDefaults(defineProps<{
  src: string
  alt: string
  aspect?: string
  focus?: string
  sizes?: string
  eager?: boolean
}>(), {
  aspect: '3/4',
  focus: '50% 50%',
  sizes: '(min-width: 1240px) 500px, (min-width: 760px) 40vw, 85vw',
  eager: false,
})

const WIDTHS = [360, 480, 640, 800, 1000, 1240]

const $img = useImage()
const provider = props.src.startsWith('/') ? 'ipx' : 'unsplash'

const url = (width: number, format: string, quality: number) =>
  $img(props.src, { width, format, quality }, { provider })

const srcset = (format: string, quality: number) =>
  WIDTHS.map(width => `${url(width, format, quality)} ${width}w`).join(', ')

const avif = srcset('avif', 45)
const webp = srcset('webp', 62)
const fallback = url(800, 'jpg', 68)

const [ratioW = 3, ratioH = 4] = props.aspect.split('/').map(Number)
const height = Math.round(800 * ratioH / ratioW)

if (props.eager) {
  useHead({
    link: [{ rel: 'preload', as: 'image', type: 'image/avif', imagesrcset: avif, imagesizes: props.sizes, fetchpriority: 'high' }],
  })
}
</script>

<template>
  <div class="photo" :style="{ aspectRatio: aspect }">
    <picture>
      <source type="image/avif" :srcset="avif" :sizes="sizes">
      <source type="image/webp" :srcset="webp" :sizes="sizes">
      <img
        :src="fallback"
        :alt="alt"
        width="800"
        :height="height"
        :loading="eager ? 'eager' : 'lazy'"
        :fetchpriority="eager ? 'high' : 'auto'"
        decoding="async"
        :style="{ objectPosition: focus }"
      >
    </picture>
  </div>
</template>

<style scoped>
.photo {
  position: relative;
  overflow: hidden;
  background-color: var(--linen);
  background-image: var(--weave);
}

.photo picture,
.photo img {
  display: block;
  width: 100%;
  height: 100%;
}

.photo img {
  object-fit: cover;
}
</style>
