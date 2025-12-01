<template>
  <div v-if="pilot" class="min-h-screen bg-fixed bg-cover bg-center" :style="{ backgroundImage: `url(${heroImage})` }">
    <!-- Fixed Background Overlay (below header) -->
    <div class="fixed inset-0 bg-black/40 pointer-events-none z-10"></div>

    <!-- Main Content -->
    <div class="relative z-20">
      <!-- Hero Section Full Width -->
      <section class="h-screen flex items-center justify-center px-4 md:px-6">
        <div class="w-full max-w-6xl">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <!-- Left: Pilot Info -->
            <div class="text-white space-y-8">
              <div>
                <h1 class="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4" style="text-shadow: 3px 3px 12px rgba(0,0,0,0.8)">
                  {{ pilot.name }}
                </h1>
                <div class="h-1 w-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
              </div>
              
              <div class="space-y-4">
                <p class="text-2xl md:text-3xl font-bold text-green-300">
                  {{ pilot.role }}
                </p>
                <p class="text-lg text-gray-200 font-light">
                  {{ currentLocale === 'vi' ? `Biệt danh: ` : `Nickname: ` }}<span class="font-semibold text-white italic">{{ pilot.nickname }}</span>
                </p>
              </div>

            </div>

            <!-- Right: Pilot Images Collage -->
            <div class="relative h-[400px] md:h-[500px] lg:h-[600px] group hidden lg:block">
              <img
                v-for="(image, i) in heroCollage"
                :key="i"
                :src="image"
                :alt="`Pilot ${i + 1}`"
                class="absolute rounded-2xl shadow-2xl border-4 border-white/90 transition-all duration-500"
                :style="getCollageStyle(i)"
                @error="handleImageError"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Content Section in Centered Card -->
      <section class="px-4 md:px-6 py-12 md:py-20">
        <div class="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div class="p-8 md:p-12 lg:p-16 space-y-16">
            <!-- Bio Section -->
            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <div class="h-1 w-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
                <h2 class="text-3xl md:text-4xl font-black text-gray-900">
                  {{ currentLocale === 'vi' ? 'Về Tôi' : 'About Me' }}
                </h2>
              </div>
              <p class="text-lg text-gray-700 leading-relaxed font-medium">
                {{ pilot.des }}
              </p>
              <div class="inline-block px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <p class="text-base text-gray-700">
                  <span class="font-semibold text-gray-900">{{ currentLocale === 'vi' ? 'Biệt danh: ' : 'Nickname: ' }}</span>
                  <span class="italic text-green-700 font-medium">{{ pilot.nickname }}</span>
                </p>
              </div>
            </div>

            <!-- Experience & Achievements Section -->
            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <svg class="w-8 h-8 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
                <h2 class="text-3xl md:text-4xl font-black text-gray-900">
                  {{ currentLocale === 'vi' ? 'Kinh Nghiệm & Thành Tích' : 'Experience & Achievements' }}
                </h2>
              </div>
              <ul class="space-y-3">
                <li v-for="(item, idx) in achievements" :key="idx" class="flex items-start gap-4 p-4 rounded-lg hover:bg-green-50 transition-colors duration-200">
                  <span class="text-green-600 font-bold text-xl flex-shrink-0 mt-1">✓</span>
                  <span class="text-lg text-gray-700 font-medium leading-relaxed">{{ item }}</span>
                </li>
              </ul>
            </div>

            <!-- Personality Section with Alternating Image -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="space-y-6 order-2 lg:order-1">
                <div class="flex items-center gap-4">
                  <svg class="w-8 h-8 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <h2 class="text-3xl md:text-4xl font-black text-gray-900">
                    {{ currentLocale === 'vi' ? 'Cá Tính' : 'Personality' }}
                  </h2>
                </div>
                <div class="space-y-4">
                  <p v-for="(fact, idx) in funFacts" :key="idx" class="text-lg text-gray-700 italic leading-relaxed font-medium p-6 bg-gray-50 rounded-lg border-l-4 border-green-400">
                    "{{ fact }}"
                  </p>
                </div>
              </div>
              <div class="order-1 lg:order-2">
                <img
                  v-if="contentImages[1]"
                  :src="contentImages[1]"
                  :alt="`Pilot ${pilot.name}`"
                  class="w-full rounded-2xl shadow-lg object-cover h-96 hover:shadow-xl transition-shadow duration-300"
                  @error="handleImageError"
                />
              </div>
            </div>

            <!-- Gallery Section with Alternating Images -->
            <div class="space-y-8">
              <div class="flex items-center gap-4">
                <svg class="w-8 h-8 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <h2 class="text-3xl md:text-4xl font-black text-gray-900">
                  {{ currentLocale === 'vi' ? 'Thư Viện Ảnh' : 'Photo Gallery' }}
                </h2>
              </div>

              <!-- Image 1 - Left -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div class="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <img
                    v-if="contentImages[0]"
                    :src="contentImages[0]"
                    :alt="`Pilot ${pilot.name}`"
                    class="w-full object-cover h-96 group-hover:scale-110 transition-transform duration-500"
                    @error="handleImageError"
                  />
                </div>
                <div class="text-center lg:text-left">
                  <p class="text-lg text-gray-700 font-medium leading-relaxed">
                    {{ currentLocale === 'vi' ? 'Những khoảnh khắc đáng nhớ từ các chuyến bay' : 'Memorable moments from our flights' }}
                  </p>
                </div>
              </div>

              <!-- Image 2 - Right -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div class="text-center lg:text-right order-2 lg:order-1">
                  <p class="text-lg text-gray-700 font-medium leading-relaxed">
                    {{ currentLocale === 'vi' ? 'Trải nghiệm bay paragliding tuyệt vời' : 'Amazing paragliding experiences' }}
                  </p>
                </div>
                <div class="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group order-1 lg:order-2">
                  <img
                    v-if="contentImages[2]"
                    :src="contentImages[2]"
                    :alt="`Pilot ${pilot.name}`"
                    class="w-full object-cover h-96 group-hover:scale-110 transition-transform duration-500"
                    @error="handleImageError"
                  />
                </div>
              </div>
            </div>

            <!-- CTA Section -->
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 md:p-12 text-center border border-green-200">
              <h2 class="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                {{ currentLocale === 'vi' ? `Muốn bay cùng ${pilot.name}?` : `Want to fly with ${pilot.name}?` }}
              </h2>
              <p class="text-lg text-gray-700 mb-8 font-medium">
                {{ currentLocale === 'vi' ? 'Đặt chuyến bay của bạn ngay hôm nay' : 'Book your flight today' }}
              </p>
              <button @click="localizedNavigateTo('/booking')" class="btn-primary text-lg px-10 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                {{ $t('buttons.book') }}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

  <!-- Pilot Not Found -->
  <div v-else class="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
    <div class="text-center px-6">
      <svg class="w-24 h-24 mx-auto mb-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <h2 class="text-4xl font-bold text-gray-900 mb-4">{{ currentLocale === 'vi' ? 'Không tìm thấy phi công' : 'Pilot Not Found' }}</h2>
      <p class="text-lg text-gray-600 mb-8">{{ currentLocale === 'vi' ? 'Phi công bạn tìm kiếm không tồn tại hoặc đã bị xóa.' : 'The pilot you are looking for does not exist or has been removed.' }}</p>
      <button @click="localizedNavigateTo('/pilots')" class="text-green-600 hover:text-green-700 font-semibold text-lg inline-flex items-center gap-2 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        {{ currentLocale === 'vi' ? 'Quay lại danh sách' : 'Back to Pilots' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { locale, t } = useI18n()
const pilotId = route.params.id as string

const currentLocale = computed(() => locale.value || 'vi')

const toggleLanguage = () => {
  locale.value = currentLocale.value === 'vi' ? 'en' : 'vi'
}

const localizedNavigateTo = (path: string) => {
  const fullPath = currentLocale.value === 'vi' ? path : `/${currentLocale.value}${path}` 
  router.push(fullPath)
}

// Get pilot data from i18n
const pilot = computed(() => {
  try {
    return {
      name: t(`pilots.${pilotId}.name`),
      nickname: t(`pilots.${pilotId}.nickname`),
      role: t(`pilots.${pilotId}.role`),
      des: t(`pilots.${pilotId}.des`),
      img: t(`pilots.${pilotId}.img`),
      fullname: t(`pilots.${pilotId}.fullname`),
      experience: t(`pilots.${pilotId}.experience`),
      records: t(`pilots.${pilotId}.records`),
      personality: t(`pilots.${pilotId}.personality`)
    }
  } catch (error) {
    return null
  }
})

// Generate gallery images from folder structure
const galleryImages = computed(() => {
  const images: string[] = []
  
  // Extract pilot number from pilotId (e.g., "pilot1" -> "1")
  const pilotNumber = pilotId.replace('pilot', '')
  const basePath = `/images/pilots/pilot${pilotNumber}`
  
  // Add header images (header1.png to header5.png)
  for (let i = 1; i <= 5; i++) {
    images.push(`${basePath}/header${i}.png`)
  }
  
  // Add body images (body1.png to body2.png)
  for (let i = 1; i <= 2; i++) {
    images.push(`${basePath}/body${i}.png`)
  }
  
  return images
})

// Hero section collage (first 5 images)
const heroCollage = computed(() => galleryImages.value.slice(0, 5))

// Content section images (images 5-8)
const contentImages = computed(() => galleryImages.value.slice(5, 8))

// Hero background image
const heroImage = computed(() => {
  return galleryImages.value[0] || `/images/pilots/pilot${pilotId.replace('pilot', '')}/header1.png`
})

// Get collage positioning styles
const getCollageStyle = (index: number) => {
  const styles = [
    { top: '-5%', left: '-8%', width: '40%', transform: 'rotate(-12deg)', zIndex: 10 },
    { top: '0%', right: '-12%', width: '40%', transform: 'rotate(6deg)', zIndex: 20 },
    { bottom: '25%', left: '30%', width: '40%', transform: 'rotate(2deg)', zIndex: 30 },
    { bottom: '-10%', left: '5%', width: '40%', transform: 'rotate(-6deg)', zIndex: 20 },
    { bottom: '-5%', right: '-2%', width: '40%', transform: 'rotate(12deg)', zIndex: 10 }
  ]
  return styles[index] || {}
}

// Parse achievements from experience text
const achievements = computed(() => {
  if (!pilot.value?.experience) return []
  return pilot.value.experience.split('\n').filter(line => line.trim())
})

// Parse fun facts from personality text
const funFacts = computed(() => {
  if (!pilot.value?.personality) return []
  return pilot.value.personality.split('\n').filter(line => line.trim())
})

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/800x600?text=Pilot'
}

// SEO
useHead({
  title: computed(() => pilot.value ? `${pilot.value.fullname} - Sapa Paragliding` : 'Pilot - Sapa Paragliding'),
  meta: computed(() => [
    { 
      name: 'description', 
      content: pilot.value ? pilot.value.des : 'Meet our professional paragliding pilots'
    }
  ])
})
</script>
