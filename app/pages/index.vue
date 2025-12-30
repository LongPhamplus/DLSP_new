<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import servicesData from '~/data/services.json'
import galleryData from '~/data/gallery.json'
import { usePostsStore } from '~/stores/posts'

const { locale, t } = useI18n()
const router = useRouter()
const postsStore = usePostsStore()

const currentLocale = computed(() => locale.value || 'vi')
const dbPosts = ref<any[]>([])
const currentPostIndex = ref(0)

const basicItemKeys = ['flight', 'photoVideo', 'drinks', 'insurance', 'certificate']
const standardItemKeys = ['flight', 'photoVideo', 'drinks', 'insurance', 'certificate', 'hotelTransfer']
const premiumItemKeys = ['flight', 'photoVideo', 'drinks', 'insurance', 'certificate', 'hotelTransfer', 'drone', 'camera360']

const latestPosts = computed(() => {
  const posts = dbPosts.value.length > 0 ? dbPosts.value : postsStore.latestPosts
  return posts
    .filter(p => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)
})

const fetchPostsFromDB = async () => {
  try {
    const response = await $fetch<any>('/api/admin/posts')
    if (response?.success && response?.posts) {
      dbPosts.value = response.posts
    }
  } catch (error) {
    console.error('Error fetching posts from database:', error)
  }
}

const localizedNavigateTo = (path: string) => {
  const currentLocale = locale.value || 'vi'
  const fullPath = currentLocale === 'vi' ? path : `/${currentLocale}${path}`
  router.push(fullPath)
}

const nextPost = () => {
  const maxIndex = Math.ceil(latestPosts.value.length / 3) - 1
  if (currentPostIndex.value < maxIndex) {
    currentPostIndex.value++
  }
}

const previousPost = () => {
  if (currentPostIndex.value > 0) {
    currentPostIndex.value--
  }
}


const gallery = ref(galleryData)


const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/800x600?text=Sapa+Paragliding'
}

const formatPostDate = (date: string) => {
  return new Date(date).toLocaleDateString(currentLocale.value === 'vi' ? 'vi-VN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const navigateToPost = (id: string) => {
  localizedNavigateTo(`/posts/${id}`)
}

const scrollToAbout = () => {
  const aboutSection = document.querySelector('#about')
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// Fetch posts and setup scroll reveal animation
onMounted(() => {
  // Fetch posts from MongoDB
  fetchPostsFromDB()

  // Scroll reveal animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || '0'
        setTimeout(() => {
          entry.target.classList.add('revealed')
        }, parseInt(delay))
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  const elements = document.querySelectorAll('.scroll-reveal')
  elements.forEach(el => observer.observe(el))
})

// SEO
useHead({
  title: 'Dù Lượn Sapa - Sapa Paragliding',
  meta: [
    { name: 'description', content: 'Experience the dream of flying in Sapa - Book your paragliding adventure today' }
  ]
})
</script>
<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Video -->
      <div class="absolute inset-0">
        <video poster="/images/header-pic.jpeg" autoplay muted loop playsinline preload="metadata"
          class="w-full h-full object-cover">
          <source src="/videos/header/header-low.mp4" type="video/mp4">
        </video>
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 text-center text-white px-4 w-full max-w-7xl mx-auto">
        <h1
          class="text-[50px] sm:text-[70px] md:text-[90px] lg:text-[120px] font-black leading-none mb-6 text-shadow animate-fade-in uppercase tracking-wider hero-title">
          {{ $t('hero.title') }}
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-shadow animate-fade-in-delay">
          {{ $t('hero.subtitle') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
          <button @click="localizedNavigateTo('/booking')" class="btn-primary text-lg px-8 py-4">
            {{ $t('hero.bookNow') }}
          </button>
          <button @click="scrollToAbout" class="btn-secondary text-lg px-8 py-4 bg-white/90 hover:bg-white">
            {{ $t('buttons.learnMore') }}
          </button>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- Gallery Section - Khoảnh khắc dù lượn -->
    <section id="about" class="py-20 bg-white">
      <div class="container-custom">
        <div class="text-center mb-12 scroll-reveal">
          <h2 class="section-title">Khoảnh khắc dù lượn</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="(item, index) in gallery" :key="item.id"
            class="relative group overflow-hidden rounded-lg cursor-pointer aspect-square scroll-reveal"
            :data-delay="(index % 4) * 50">
            <img :src="`${item.image}`" :alt="item.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy"
              @error="handleImageError" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 class="font-bold">{{ item.title }}</h3>
                <p class="text-sm">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section - Giá bay -->
    <section class="relative isolate pb-32 min-h-[600px] overflow-hidden z-10">
      <!-- Background Layer -->
      <div class="absolute inset-0 z-0">
        <img src="/images/svg/section-backgroud.svg" alt="background" class="w-full h-full object-cover">
      </div>
      <div class="container-custom relative z-10">
        <div class="text-center mb-12 scroll-reveal">
          <h2 class="section-title">{{ $t('pricing.title') }}</h2>
          <p class="text-xl text-gray-600">{{ $t('pricing.subtitle') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Basic Package -->
          <div class="card hover:scale-105 transition-transform duration-300 scroll-reveal flex flex-col"
            data-delay="100">
            <div class="p-6 flex flex-col flex-grow">
              <h3 class="text-2xl font-bold mb-2 text-green-600">{{ $t('pricing.packages.basic.name') }}</h3>
              <div class="mb-4">
                <p class="text-3xl font-bold text-gray-900">{{ $t('pricing.packages.basic.price') }}</p>
                <p class="text-sm text-gray-600">({{ $t('pricing.packages.basic.priceUsd') }})</p>
              </div>

              <div class="mb-4 pb-4 border-b">
                <p class="text-sm font-semibold text-gray-700 mb-2">{{ $t('pricing.packages.basic.duration') }}</p>
                <p class="text-xs text-gray-600">{{ $t('pricing.packages.basic.weatherNote') }}</p>
              </div>

              <div class="mb-4 pb-4 border-b flex-grow">
                <p class="text-sm font-semibold text-gray-700 mb-2">{{ $t('pricing.packages.basic.included') }}</p>
                <ul class="text-xs text-gray-600 space-y-1">
                  <li v-for="key in basicItemKeys" :key="key">• {{ $t(`pricing.packages.basic.items.${key}`) }}</li>
                </ul>
              </div>

              <button @click="localizedNavigateTo('/booking')" class="btn-primary w-full text-center block mt-auto">
                {{ $t('buttons.book') }}
              </button>
            </div>
          </div>

          <!-- Standard Package -->
          <div
            class="card hover:scale-105 transition-transform duration-300 scroll-reveal border-2 border-green-500 flex flex-col"
            data-delay="200">
            <div class="p-6 flex flex-col flex-grow">
              <div class="mb-2">
                <span class="inline-block px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">{{
                  $t('pricing.packages.standard.badge') }}</span>
              </div>
              <h3 class="text-2xl font-bold mb-2 text-green-600">{{ $t('pricing.packages.standard.name') }}</h3>
              <div class="mb-4">
                <p class="text-3xl font-bold text-gray-900">{{ $t('pricing.packages.standard.price') }}</p>
                <p class="text-sm text-gray-600">({{ $t('pricing.packages.standard.priceUsd') }})</p>
              </div>

              <div class="mb-4 pb-4 border-b">
                <p class="text-sm font-semibold text-gray-700 mb-2">{{ $t('pricing.packages.standard.duration') }}</p>
                <p class="text-xs text-gray-600">{{ $t('pricing.packages.standard.weatherNote') }}</p>
              </div>

              <div class="mb-4 pb-4 border-b flex-grow">
                <p class="text-sm font-semibold text-gray-700 mb-2">{{ $t('pricing.packages.standard.included') }}</p>
                <ul class="text-xs text-gray-600 space-y-1">
                  <li v-for="key in standardItemKeys" :key="key">• {{ $t(`pricing.packages.standard.items.${key}`) }}
                  </li>
                </ul>
              </div>

              <button @click="localizedNavigateTo('/booking')" class="btn-primary w-full text-center block mt-auto">
                {{ $t('buttons.book') }}
              </button>
            </div>
          </div>

          <!-- Premium Package -->
          <div class="card hover:scale-105 transition-transform duration-300 scroll-reveal flex flex-col"
            data-delay="300">
            <div class="p-6 flex flex-col flex-grow">
              <h3 class="text-2xl font-bold mb-2 text-green-600">{{ $t('pricing.packages.premium.name') }}</h3>
              <div class="mb-4">
                <p class="text-3xl font-bold text-gray-900">{{ $t('pricing.packages.premium.price') }}</p>
                <p class="text-sm text-gray-600">({{ $t('pricing.packages.premium.priceUsd') }})</p>
              </div>

              <div class="mb-4 pb-4 border-b">
                <p class="text-sm font-semibold text-gray-700 mb-2">{{ $t('pricing.packages.premium.duration') }}</p>
                <p class="text-xs text-gray-600">{{ $t('pricing.packages.premium.weatherNote') }}</p>
              </div>

              <div class="mb-4 pb-4 border-b flex-grow">
                <p class="text-sm font-semibold text-gray-700 mb-2">{{ $t('pricing.packages.premium.included') }}</p>
                <ul class="text-xs text-gray-600 space-y-1">
                  <li v-for="key in premiumItemKeys" :key="key">• {{ $t(`pricing.packages.premium.items.${key}`) }}</li>
                </ul>
              </div>

              <button @click="localizedNavigateTo('/booking')" class="btn-primary w-full text-center block mt-auto">
                {{ $t('buttons.book') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative isolate pt-48 pb-20 text-white overflow-hidden z-20"
      style="background-image: url('/images/svg/hero-shape.svg'); background-size: cover; background-position: center; background-repeat: no-repeat;">
      <div class="container-custom pb-20">
        <div class="text-center mb-12 scroll-reveal">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">{{ $t('posts.latestPosts') }}</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ $t('posts.latestPostsDescription') }}
          </p>
        </div>

        <!-- Posts Carousel -->
        <div class="relative">
          <!-- Carousel Container -->
          <div class="overflow-hidden rounded-2xl ">
            <div class="flex transition-transform duration-500 ease-out m-[40px]"
              :style="{ transform: `translateX(-${currentPostIndex * 100}%)` }">
              <div v-for="(post, index) in latestPosts" :key="post.id" class="w-full md:w-1/3 flex-shrink-0 px-3">
                <div @click="navigateToPost(post.id)"
                  class="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 h-full hover:-translate-y-2 group">
                  <!-- Image Container with Badge -->
                  <div class="relative h-56 overflow-hidden bg-gradient-to-br from-green-400 to-green-600">
                    <img :src="post.image" :alt="currentLocale === 'vi' ? post.titleVi : post.title"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <!-- Overlay -->
                    <div
                      class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <!-- Category Badge -->
                    <div class="absolute top-4 right-4">
                      <span class="px-4 py-2 text-xs font-bold text-white bg-green-600 rounded-full shadow-lg">
                        {{ post.category }}
                      </span>
                    </div>

                    <!-- New Badge (for first post) -->
                    <div v-if="index === 0" class="absolute top-4 left-4">
                      <span
                        class="px-4 py-2 text-xs font-bold text-white bg-red-500 rounded-full shadow-lg animate-pulse">
                        🆕 MỚI NHẤT
                      </span>
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="p-6 flex flex-col h-full">
                    <!-- Date -->
                    <div class="flex items-center text-sm text-gray-500 mb-3">
                      <svg class="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span class="font-medium">{{ formatPostDate(post.date) }}</span>
                    </div>

                    <!-- Title -->
                    <h3
                      class="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                      {{ currentLocale === 'vi' ? post.titleVi : post.title }}
                    </h3>

                    <!-- Excerpt -->
                    <p class="text-gray-600 mb-6 line-clamp-3 flex-grow text-sm leading-relaxed">
                      {{ currentLocale === 'vi' ? post.excerptVi : post.excerpt }}
                    </p>

                    <!-- Read More Link -->
                    <div
                      class="flex items-center text-green-600 font-bold text-sm group-hover:text-green-700 transition-colors">
                      {{ $t('posts.readMore') }}
                      <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Controls -->
          <div v-if="latestPosts.length > 3" class="flex justify-center items-center gap-6 mt-12">
            <!-- Previous Button -->
            <button @click="previousPost"
              class="p-3 rounded-full bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-110"
              :disabled="currentPostIndex === 0" title="Bài viết trước">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <!-- Dots Indicator -->
            <div class="flex gap-3">
              <button v-for="(_, index) in Math.ceil(latestPosts.length / 3)" :key="index"
                @click="currentPostIndex = index" :class="[
                  'rounded-full transition-all duration-300',
                  currentPostIndex === index
                    ? 'w-8 h-3 bg-green-600 shadow-lg'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                ]" :title="`Trang ${index + 1}`" />
            </div>

            <!-- Next Button -->
            <button @click="nextPost"
              class="p-3 rounded-full bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-110"
              :disabled="currentPostIndex >= Math.ceil(latestPosts.length / 3) - 1" title="Bài viết tiếp theo">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="relative z-10 container-custom text-center scroll-reveal">
        <h2 class="text-4xl font-bold mb-6">Ready for Your Adventure?</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Book your paragliding experience today and create memories that will last a lifetime
        </p>
        <button @click="localizedNavigateTo('/booking')"
          class="btn-primary bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4 inline-block">
          {{ $t('hero.bookNow') }}
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 3;
}

.animate-fade-in-delay {
  animation: fade-in 1s ease-out 0.3s both;
}

.animate-fade-in-delay-2 {
  animation: fade-in 1s ease-out 0.6s both;
}

/* Scroll Reveal Animations */
.scroll-reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Hero Title - Bold & Strong Typography */
.hero-title {
  -webkit-text-stroke: 2px rgba(255, 255, 255, 0.3);
  text-shadow:
    0 4px 8px rgba(0, 0, 0, 0.4),
    0 8px 16px rgba(0, 0, 0, 0.3),
    0 0 40px rgba(0, 0, 0, 0.2);
  filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.4));
}
</style>
