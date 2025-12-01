<template>
  <div class="space-y-6">
    <!-- Success Message -->
    <div class="text-center py-8">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
        <svg class="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
      </div>
      
      <h2 class="text-3xl font-bold text-gray-900 mb-3">
        {{ $t('booking.bookingComplete') }}
      </h2>
      <p class="text-xl text-gray-600 mb-2">
        {{ $t('booking.thankYou') }}
      </p>
      
      <div v-if="bookingData.bookingId" class="mt-4 inline-block bg-gray-100 px-6 py-3 rounded-lg">
        <p class="text-sm text-gray-600">{{ $t('booking.step5Details.bookingId') }}</p>
        <p class="text-lg font-mono font-bold text-gray-900">{{ bookingData.bookingId }}</p>
      </div>
    </div>

    <!-- Booking Ticket -->
    <BookingTicket />

    <!-- Contact Information -->
    <div class="bg-green-50 rounded-xl p-6">
      <h3 class="text-lg font-bold text-gray-900 mb-3">
        {{ $t('booking.contactUs') }}
      </h3>
      <p class="text-gray-700 mb-4">
        {{ $t('booking.scanQR') }}
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Zalo QR -->
        <div class="bg-white rounded-lg p-6 text-center">
          <div class="w-48 h-48 mx-auto bg-gray-200 rounded-lg flex items-center justify-center mb-3">
            <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm.699 14.97l-3.11-3.315-6.068 3.315 6.676-7.087 3.187 3.315 6.008-3.315-6.693 7.087z"/>
            </svg>
          </div>
          <p class="font-semibold text-gray-900">Zalo</p>
          <a
            :href="config.public.zaloUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-green-600 hover:underline text-sm"
          >
            {{ $t('booking.step5Details.openZalo') }}
          </a>
        </div>

        <!-- WhatsApp QR -->
        <div class="bg-white rounded-lg p-6 text-center">
          <div class="w-48 h-48 mx-auto bg-gray-200 rounded-lg flex items-center justify-center mb-3">
            <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <p class="font-semibold text-gray-900">WhatsApp</p>
          <a
            :href="config.public.whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-green-600 hover:underline text-sm"
          >
            {{ $t('booking.step5Details.openWhatsApp') }}
          </a>
        </div>
      </div>
    </div>

    <!-- Next Steps -->
    <div class="bg-white rounded-xl shadow p-6">
      <h3 class="text-lg font-bold text-gray-900 mb-4">{{ $t('booking.step5Details.whatsNext') }}</h3>
      <ol class="space-y-3">
        <li class="flex items-start">
          <span class="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
          <p class="text-gray-700">{{ $t('booking.step5Details.step1') }}</p>
        </li>
        <li class="flex items-start">
          <span class="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
          <p class="text-gray-700">{{ $t('booking.step5Details.step2') }}</p>
        </li>
        <li class="flex items-start">
          <span class="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
          <p class="text-gray-700">{{ $t('booking.step5Details.step3') }}</p>
        </li>
        <li class="flex items-start">
          <span class="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
          <p class="text-gray-700">{{ $t('booking.step5Details.step4') }}</p>
        </li>
      </ol>
    </div>

    <!-- Actions -->
    <div class="flex flex-col sm:flex-row gap-4">
      <button @click="localizedNavigateTo('/')" class="btn-primary text-center">
        {{ $t('booking.step5Details.backToHome') }}
      </button>
      <button
        @click="handleNewBooking"
        class="btn-secondary"
      >
        {{ $t('booking.step5Details.makeAnother') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBookingStore } from '~/stores/booking'

const bookingStore = useBookingStore()
const config = useRuntimeConfig()
const router = useRouter()
const { locale } = useI18n()

const bookingData = computed(() => bookingStore.bookingData)

const localizedNavigateTo = (path: string) => {
  const currentLocale = locale.value || 'vi' // mặc định là vi
  // Nếu ngôn ngữ là vi thì không thêm prefix
  const fullPath = currentLocale === 'vi' ? path : `/${currentLocale}${path}` 
  
  nextTick(() => {
    router.push(fullPath)
  })
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

const handleNewBooking = () => {
  bookingStore.resetBooking()
  localizedNavigateTo('/booking')
}
</script>
