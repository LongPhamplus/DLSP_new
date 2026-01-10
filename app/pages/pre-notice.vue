<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Video Header Section -->
    <div class="relative h-[400px] md:h-[500px] overflow-hidden">
      <!-- Background Video -->
      <!-- Background Image -->
      <div class="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style="background-image: url('/images/pilot_background.jpeg');"></div>
      <video autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-contain">
        <source src="/videos/header/about_new.mp4" type="video/mp4">
      </video>

      <!-- Overlay -->
    </div>

    <!-- Main Content with Background -->
    <div class="relative py-16">
      <!-- Background Image -->
      <div class="absolute inset-0 bg-cover bg-center bg-fixed"
        style="background-image: url('/images/pilot_background.jpeg');">
        <div class="absolute inset-0 bg-black/40"></div>
      </div>

      <div class="relative z-10 container-custom">
        <div class="max-w-5xl mx-auto">
          <!-- Header -->
          <div class="text-center mb-14">
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">{{ $t('preNotice.title') }}</h1>
            <p class="text-xl text-white/90 drop-shadow-md">{{ $t('preNotice.subtitle') }}</p>
          </div>

          <!-- Important Notices - Staggered Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            <template v-for="(item, key, index) in noticeItems" :key="key">
              <div :class="[
                'glass-card rounded-2xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl',
                index % 2 === 0 ? 'md:translate-y-0' : 'md:translate-y-8'
              ]">
                <div class="flex items-center mb-4">
                  <div
                    class="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 border border-white/30">
                    <component :is="item.icon" class="w-6 h-6 text-white" />
                  </div>
                  <h3 class="text-lg font-bold text-white">
                    {{ $t(`preNotice.items.${key}.title`) }}
                  </h3>
                </div>
                <p class="text-white/85 leading-relaxed text-sm">
                  {{ $t(`preNotice.items.${key}.description`) }}
                </p>
              </div>
            </template>
          </div>

          <!-- Flight Locations - Glass Card -->
          <div class="glass-card rounded-2xl p-8 mb-10">
            <h2 class="text-2xl font-bold text-white mb-8 flex items-center">
              <svg class="w-7 h-7 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ $t('preNotice.locations.title') }}
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Take-off Point -->
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 bg-red-500/30 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-white">
                    {{ $t('preNotice.locations.takeoff') }}
                  </h3>
                </div>
                <p class="text-white/80 mb-4 text-sm">
                  Ham Rong Mountain, Sapa Town<br />
                  Lao Cai Province, Vietnam
                </p>
                <div class="bg-black/20 rounded-lg p-3 mb-4">
                  <p class="text-xs text-white/60 mb-1">Coordinates:</p>
                  <p class="font-mono text-sm text-white/90">22.3364° N, 103.8438° E</p>
                </div>
                <a href="https://maps.google.com/?q=22.3364,103.8438" target="_blank" rel="noopener noreferrer"
                  class="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm transition-colors border border-white/30">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ $t('preNotice.locations.getDirections') }}
                </a>
              </div>

              <!-- Landing Zone -->
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-white">
                    {{ $t('preNotice.locations.landing') }}
                  </h3>
                </div>
                <p class="text-white/80 mb-4 text-sm">
                  Muong Hoa Valley<br />
                  Sapa, Lao Cai Province
                </p>
                <div class="bg-black/20 rounded-lg p-3 mb-4">
                  <p class="text-xs text-white/60 mb-1">Coordinates:</p>
                  <p class="font-mono text-sm text-white/90">22.3256° N, 103.8321° E</p>
                </div>
                <a href="https://maps.google.com/?q=22.3256,103.8321" target="_blank" rel="noopener noreferrer"
                  class="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm transition-colors border border-white/30">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ $t('preNotice.locations.getDirections') }}
                </a>
              </div>
            </div>
          </div>

          <!-- Safety Requirements - Glass Card -->
          <div class="glass-card-warning rounded-2xl p-6 mb-10">
            <div class="flex items-start">
              <div
                class="flex-shrink-0 w-12 h-12 bg-yellow-500/30 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 border border-yellow-400/40">
                <svg class="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-yellow-200 mb-3">Safety Requirements</h3>
                <ul class="space-y-2 text-white/85">
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    {{ $t('booking.step3Details.minAge') }}
                  </li>
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    {{ $t('booking.step3Details.goodHealth') }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- CTA - Glass Card -->
          <div class="glass-card rounded-2xl p-10 text-center">
            <h2 class="text-3xl font-bold text-white mb-4">Ready to Fly?</h2>
            <p class="text-white/80 mb-8 max-w-lg mx-auto">
              Book your paragliding adventure now and experience the thrill of flying
            </p>
            <button @click="localizedNavigateTo('/booking')"
              class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              {{ $t('buttons.book') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'

const router = useRouter()
const { locale } = useI18n()

const localizedNavigateTo = (path: string) => {
  const currentLocale = locale.value || 'vi' // mặc định là vi
  // Nếu ngôn ngữ là vi thì không thêm prefix
  const fullPath = currentLocale === 'vi' ? path : `/${currentLocale}${path}`
  router.push(fullPath)
}

// Icon components as render functions
const CameraIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
  }),
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M15 13a3 3 0 11-6 0 3 3 0 016 0z'
  })
])

const ClockIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
  })
])

const PhoneIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
  })
])

const BriefcaseIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z'
  })
])

const ShirtIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  })
])

const UserCheckIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  })
])

const CloudIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
  })
])

const noticeItems = {
  photoSupport: { icon: CameraIcon },
  timing: { icon: ClockIcon },
  storage: { icon: PhoneIcon },
  baggage: { icon: BriefcaseIcon },
  clothing: { icon: ShirtIcon },
  beginner: { icon: UserCheckIcon },
  weather: { icon: CloudIcon }
}

// SEO
useHead({
  title: 'Pre-Flight Notice - Sapa Paragliding',
  meta: [
    { name: 'description', content: 'Important information and requirements before your paragliding flight in Sapa' }
  ]
})
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.glass-card-warning {
  background: rgba(251, 191, 36, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(251, 191, 36, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
</style>
