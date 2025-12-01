<template>
  <div class="card group cursor-pointer" >
    <div class="relative overflow-hidden h-96">
      <!-- Image Gallery Carousel -->
      <div class="relative w-full h-full">
        <img
          :src="`/images/pilots/${currentImage}`"
          :alt="pilotData.name"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          @error="handleImageError"
        />
        
        <!-- Gallery Navigation - only visible on hover if multiple images -->
        <div v-if="galleryImages.length > 1" class="gallery-nav opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            @click.stop="previousImage" 
            class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
            aria-label="Previous image"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            @click.stop="nextImage" 
            class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
            aria-label="Next image"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <!-- Image indicators -->
          <div class="absolute bottom-20 left-0 right-0 flex justify-center gap-2">
            <button
              v-for="(img, index) in galleryImages"
              :key="index"
              @click.stop="currentImageIndex = index"
              class="w-2 h-2 rounded-full transition-all"
              :class="currentImageIndex === index ? 'bg-white w-6' : 'bg-white/50'"
              :aria-label="`Go to image ${index + 1}`"
            />
          </div>
        </div>
      </div>
      
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
      
      <!-- Pilot info - always visible -->
      <div class="absolute bottom-0 left-0 right-0 p-4 text-white pointer-events-none">
        <h3 class="text-xl font-bold">{{ pilotData.name }}</h3>
        <p class="text-sm text-gray-200">{{ pilotData.nickname }}</p>
      </div>
      
      <!-- Description overlay - only visible on hover -->
      <div class="description-overlay absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
        <p class="text-white text-sm leading-relaxed line-clamp-6">
          {{ pilotData.des }}
        </p>
      </div>
    </div>
    
    <div class="p-6">
      <div class="mb-4">
        <span class="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
          {{ pilotData.role }}
        </span>
      </div>
      
      <button class="btn-outline w-full" @click="navigateToPilot">
        {{ $t('buttons.viewMore') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  pilotId: number
}>()

const router = useRouter()
const { locale, t } = useI18n()

// Get pilot data from i18n
const pilotData = computed(() => {
  const pilotKey = `pilot${props.pilotId}`
  return {
    id: pilotKey,
    name: t(`pilots.${pilotKey}.name`),
    nickname: t(`pilots.${pilotKey}.nickname`),
    role: t(`pilots.${pilotKey}.role`),
    des: t(`pilots.${pilotKey}.des`),
    img: t(`pilots.${pilotKey}.img`)
  }
})

// Gallery functionality
const currentImageIndex = ref(0)

// Get gallery images - try to get from i18n, fallback to main image
const galleryImages = computed(() => {
  const pilotKey = `pilot${props.pilotId}`
  try {
    const gallery = t(`pilots.${pilotKey}.gallery`)
    // If gallery exists and is an array, use it
    if (gallery && Array.isArray(gallery) && gallery.length > 0) {
      return gallery
    }
  } catch (e) {
    // Gallery doesn't exist, use main image only
  }
  // Fallback to main image
  return [pilotData.value.img]
})

const currentImage = computed(() => {
  return galleryImages.value[currentImageIndex.value] || pilotData.value.img
})

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % galleryImages.value.length
}

const previousImage = () => {
  currentImageIndex.value = currentImageIndex.value === 0 
    ? galleryImages.value.length - 1 
    : currentImageIndex.value - 1
}

const localizedNavigateTo = (path: string) => {
  const currentLocale = locale.value || 'vi'
  const fullPath = currentLocale === 'vi' ? path : `/${currentLocale}${path}` 
  
  nextTick(() => {
    router.push(fullPath)
  })
}

const navigateToPilot = () => {
  localizedNavigateTo(`/pilots/pilot${props.pilotId}`)
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/images/placeholder-pilot.jpg'
}
</script>

<style scoped>
/* Image container - expands on hover */


.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 3;
}

.line-clamp-6 {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 6;
}

/* Description overlay - hidden by default, appears on hover */
.description-overlay {
  pointer-events: none;
}

.group:hover .description-overlay {
  pointer-events: auto;
}
</style>
