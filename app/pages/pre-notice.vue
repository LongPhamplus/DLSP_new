<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="section-title">{{ $t('preNotice.title') }}</h1>
          <p class="text-xl text-gray-600">{{ $t('preNotice.subtitle') }}</p>
        </div>

        <!-- Important Notices -->
        <div class="space-y-6 mb-12">
          <div
            v-for="(item, key) in noticeItems"
            :key="key"
            class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div class="flex items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <component :is="item.icon" class="w-6 h-6 text-green-600" />
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-900 mb-2">
                  {{ $t(`preNotice.items.${key}.title`) }}
                </h3>
                <p class="text-gray-700 leading-relaxed">
                  {{ $t(`preNotice.items.${key}.description`) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Flight Locations -->
        <div class="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            {{ $t('preNotice.locations.title') }}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Take-off Point -->
            <div>
              <div class="flex items-center mb-3">
                <svg class="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                </svg>
                <h3 class="text-lg font-bold text-gray-900">
                  {{ $t('preNotice.locations.takeoff') }}
                </h3>
              </div>
              <p class="text-gray-700 mb-3">
                Ham Rong Mountain, Sapa Town<br />
                Lao Cai Province, Vietnam
              </p>
              <div class="bg-gray-100 rounded-lg p-3 mb-3">
                <p class="text-sm text-gray-600 mb-1">Coordinates:</p>
                <p class="font-mono text-sm">22.3364° N, 103.8438° E</p>
              </div>
              <a
                href="https://maps.google.com/?q=22.3364,103.8438"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-outline inline-flex items-center"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {{ $t('preNotice.locations.getDirections') }}
              </a>
            </div>

            <!-- Landing Zone -->
            <div>
              <div class="flex items-center mb-3">
                <svg class="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                </svg>
                <h3 class="text-lg font-bold text-gray-900">
                  {{ $t('preNotice.locations.landing') }}
                </h3>
              </div>
              <p class="text-gray-700 mb-3">
                Muong Hoa Valley<br />
                Sapa, Lao Cai Province
              </p>
              <div class="bg-gray-100 rounded-lg p-3 mb-3">
                <p class="text-sm text-gray-600 mb-1">Coordinates:</p>
                <p class="font-mono text-sm">22.3256° N, 103.8321° E</p>
              </div>
              <a
                href="https://maps.google.com/?q=22.3256,103.8321"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-outline inline-flex items-center"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {{ $t('preNotice.locations.getDirections') }}
              </a>
            </div>
          </div>
        </div>

        <!-- Safety Requirements -->
        <div class="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
          <div class="flex items-start">
            <svg class="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            <div>
              <h3 class="text-lg font-bold text-yellow-900 mb-2">Safety Requirements</h3>
              <ul class="space-y-2 text-yellow-800">
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span>Minimum age: 5 years old (with parental consent for minors)</span>
                </li>
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span>Weight range: < 100 kg</span>
                </li>
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span>Must be in good physical and mental health</span>
                </li>
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span>Pregnant women cannot participate</span>
                </li>
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span>Not recommended for people with heart conditions, back problems, or fear of heights</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center bg-white rounded-xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Ready to Fly?</h2>
          <p class="text-gray-600 mb-6">
            Book your paragliding adventure now and experience the thrill of flying
          </p>
          <button @click="localizedNavigateTo('/booking')" class="btn-primary inline-block">
            {{ $t('buttons.book') }}
          </button>
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

const ShirtIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h10a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
  })
])

const ShoeIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
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
  timing: { icon: ClockIcon },
  clothing: { icon: ShirtIcon },
  footwear: { icon: ShoeIcon },
  storage: { icon: PhoneIcon },
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
