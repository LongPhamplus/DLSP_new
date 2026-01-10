<template>
    <div class="space-y-6">
        <!-- Success Message -->
        <div class="text-center py-8">
            <div
                class="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-none mb-6 border-4 border-red-600">
                <svg class="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />
                </svg>
            </div>

            <h2 class="text-3xl font-bold text-gray-900 mb-3">
                {{ $t('booking.bookingComplete') }}
            </h2>
            <p class="text-xl text-gray-600 mb-2">
                {{ $t('booking.thankYou') }}
            </p>

            <div v-if="bookingData.bookingId"
                class="mt-4 inline-block bg-gray-100 px-6 py-3 rounded-none border-l-4 border-red-600">
                <p class="text-sm text-gray-600">{{ $t('booking.step5Details.bookingId') }}</p>
                <p class="text-lg font-mono font-bold text-gray-900">{{ bookingData.bookingId }}</p>
            </div>
        </div>

        <!-- Booking Ticket -->
        <BookingTicket />

        <!-- Contact Information -->
        <div class="booking-section bg-gradient-to-br from-red-50 to-orange-50">
            <h3 class="text-lg font-bold text-gray-900 mb-3">
                {{ $t('booking.contactUs') }}
            </h3>
            <p class="text-gray-700 mb-4">
                {{ $t('booking.scanQR') }}
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Zalo QR -->
                <div class="bg-white rounded-none p-6 text-center shadow-lg border-t-4 border-blue-500">
                    <div class="w-48 h-48 mx-auto bg-gray-200 rounded-none flex items-center justify-center mb-3">
                        <img src="/images/contacts/qr-zl.png" alt="Zalo" class="w-full h-full">
                    </div>
                    <p class="font-semibold text-gray-900">Zalo</p>
                    <a :href="config.public.zaloUrl" target="_blank" rel="noopener noreferrer"
                        class="text-red-600 hover:underline text-sm font-bold">
                        {{ $t('booking.step5Details.openZalo') }}
                    </a>
                </div>

                <!-- WhatsApp QR -->
                <div class="bg-white rounded-none p-6 text-center shadow-lg border-t-4 border-red-500">
                    <div class="w-48 h-48 mx-auto bg-gray-200 rounded-none flex items-center justify-center mb-3">
                        <img src="/images/contacts/qr-wa.png" alt="WhatsApp" class="w-full h-full">
                    </div>
                    <p class="font-semibold text-gray-900">WhatsApp</p>
                    <a :href="config.public.whatsappUrl" target="_blank" rel="noopener noreferrer"
                        class="text-red-600 hover:underline text-sm font-bold">
                        {{ $t('booking.step5Details.openWhatsApp') }}
                    </a>
                </div>
            </div>
        </div>

        <!-- Next Steps -->
        <div class="booking-section">
            <h3 class="text-lg font-bold text-gray-900 mb-4">{{ $t('booking.step5Details.whatsNext') }}</h3>
            <ol class="space-y-3">
                <li class="flex items-start">
                    <span
                        class="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-none flex items-center justify-center text-sm font-bold mr-3">1</span>
                    <p class="text-gray-700">{{ $t('booking.step5Details.step2') }}</p>
                </li>
                <li class="flex items-start">
                    <span
                        class="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-none flex items-center justify-center text-sm font-bold mr-3">2</span>
                    <p class="text-gray-700">{{ $t('booking.step5Details.step3') }}</p>
                </li>
                <li class="flex items-start">
                    <span
                        class="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-none flex items-center justify-center text-sm font-bold mr-3">3</span>
                    <p class="text-gray-700">{{ $t('booking.step5Details.step4') }}</p>
                </li>
            </ol>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4">
            <button @click="localizedNavigateTo('/')" class="btn-primary text-center">
                {{ $t('booking.step5Details.backToHome') }}
            </button>
            <button @click="handleNewBooking" class="btn-secondary">
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
