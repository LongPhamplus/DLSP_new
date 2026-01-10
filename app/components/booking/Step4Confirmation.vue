<template>
    <div class="space-y-6">
        <div>
            <h2 class="section-title">{{ $t('booking.step4') }}</h2>
            <p class="text-gray-600">{{ $t('booking.confirmDetails') }}</p>
        </div>

        <!-- Booking Summary -->
        <div class="bg-white rounded-none shadow-lg overflow-hidden border-t-4 border-red-600">
            <!-- Service Details -->
            <div class="bg-gradient-to-br from-red-50 to-orange-50 p-6 border-b-2 border-gray-100">
                <h3 class="text-xl font-bold text-gray-900 mb-4">{{ $t('booking.step4Details.serviceDetails') }}</h3>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <p class="text-sm text-gray-600">{{ $t('booking.step4Details.service') }}</p>
                        <p class="font-semibold">{{ bookingData.serviceName }}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">{{ $t('booking.step4Details.passengers') }}</p>
                        <p class="font-semibold">{{ bookingData.numberOfPassengers }}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">{{ $t('booking.step4Details.date') }}</p>
                        <p class="font-semibold">{{ formatDate(bookingData.preferredDate) }}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">{{ $t('booking.step4Details.time') }}</p>
                        <p class="font-semibold">{{ bookingData.preferredTime || $t('booking.step4Details.flexible') }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Contact Information -->
            <div class="p-6 border-b">
                <h3 class="text-xl font-bold text-gray-900 mb-4">{{ $t('booking.step4Details.contactInformation') }}
                </h3>
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span class="text-gray-600">{{ $t('booking.step4Details.name') }}</span>
                        <span class="font-semibold">{{ bookingData.contactName }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">{{ $t('booking.step4Details.email') }}</span>
                        <span class="font-semibold">{{ bookingData.email }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">{{ $t('booking.step4Details.phone') }}</span>
                        <span class="font-semibold">{{ bookingData.phone }}</span>
                    </div>
                    <div v-if="bookingData.specialRequests" class="pt-2">
                        <p class="text-gray-600 mb-1">{{ $t('booking.step4Details.specialRequests') }}</p>
                        <p class="text-sm bg-gray-50 p-3 rounded">{{ bookingData.specialRequests }}</p>
                    </div>
                </div>
            </div>

            <!-- Passenger Information - Accordion -->
            <div class="p-6 border-b">
                <h3 class="text-xl font-bold text-gray-900 mb-4">{{ $t('booking.step4Details.passengerInformation') }}
                </h3>
                <div class="space-y-3">
                    <div v-for="(passenger, index) in bookingData.passengers" :key="index"
                        class="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200"
                        :class="expandedPassenger === index ? 'bg-red-50 border-red-300 border-l-4 border-l-red-600' : 'bg-white hover:bg-gray-50'">
                        <!-- Accordion Header -->
                        <button @click="togglePassenger(index)"
                            class="w-full px-4 py-3 flex items-center justify-between text-left focus:outline-none">
                            <div class="flex items-center space-x-3">
                                <div
                                    class="w-8 h-8 bg-red-600 text-white rounded-none flex items-center justify-center font-bold text-sm">
                                    {{ index + 1 }}
                                </div>
                                <div>
                                    <p class="font-semibold text-gray-900">{{ passenger.fullName }}</p>
                                    <p class="text-xs text-gray-500">{{ passenger.nationality }}</p>
                                </div>
                            </div>

                            <!-- Chevron Icon -->
                            <svg class="w-5 h-5 text-gray-500 transition-transform duration-200"
                                :class="expandedPassenger === index ? 'transform rotate-180' : ''" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <!-- Accordion Content -->
                        <Transition name="accordion">
                            <div v-if="expandedPassenger === index" class="px-4 pb-4">
                                <div
                                    class="grid grid-cols-2 gap-3 text-sm bg-white p-4 rounded-none border-l-2 border-red-500">
                                    <div>
                                        <span class="text-gray-600">{{ $t('booking.step4Details.fullName') }}</span>
                                        <p class="font-medium text-gray-900 mt-1">{{ passenger.fullName }}</p>
                                    </div>
                                    <div>
                                        <span class="text-gray-600">{{ $t('booking.step4Details.dateOfBirth') }}</span>
                                        <p class="font-medium text-gray-900 mt-1">{{ formatDate(passenger.dateOfBirth)
                                        }}</p>
                                    </div>
                                    <div>
                                        <span class="text-gray-600">{{ $t('booking.step4Details.gender') }}</span>
                                        <p class="font-medium text-gray-900 mt-1 capitalize">{{ passenger.gender }}</p>
                                    </div>
                                    <div>
                                        <span class="text-gray-600">{{ $t('booking.step4Details.weight') }}</span>
                                        <p class="font-medium text-gray-900 mt-1">{{ passenger.weight }} kg</p>
                                    </div>
                                    <div class="col-span-2">
                                        <span class="text-gray-600">{{ $t('booking.step4Details.nationality') }}</span>
                                        <p class="font-medium text-gray-900 mt-1">{{ passenger.nationality }}</p>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>

            <!-- Price Summary -->
            <div class="p-6 bg-gray-50">
                <h3 class="text-xl font-bold text-gray-900 mb-4">{{ $t('booking.step4Details.priceSummary') }}</h3>
                <div class="space-y-2">
                    <div class="flex justify-between text-gray-600">
                        <span>{{ $t('booking.step4Details.basePrice') }} ({{ bookingData.numberOfPassengers }}x):</span>
                        <span>{{ formatPrice(bookingData.servicePrice * bookingData.numberOfPassengers) }}</span>
                    </div>
                    <div v-if="bookingData.discount > 0" class="flex justify-between text-red-600">
                        <span>{{ $t('booking.step4Details.discount') }}:</span>
                        <span>-{{ formatPrice(bookingData.servicePrice * bookingData.numberOfPassengers *
                            bookingData.discount / 1000000)
                        }}</span>
                    </div>
                    <div class="border-t pt-2 flex justify-between text-2xl font-bold text-gray-900">
                        <span>Total:</span>
                        <span class="text-red-600">{{ formatPrice(bookingData.totalPrice) }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Terms and Conditions -->
        <div class="bg-white rounded-none p-6 shadow border-l-4 border-red-600">
            <div class="flex items-start">
                <input id="terms" v-model="agreedToTerms" type="checkbox"
                    class="w-5 h-5 text-red-600 border-gray-300 rounded-none focus:ring-red-500" />
                <label for="terms" class="ml-3 text-sm text-gray-700">
                    {{ $t('booking.terms.agree') }}
                    <a href="/Mien tru trach nhiem bay doi 2025 Sapa.pdf" target="_blank" rel="noopener noreferrer"
                        class="text-red-600 hover:underline font-semibold">{{ $t('booking.terms.termsAndConditions')
                        }}</a>
                    {{ $t('booking.terms.and') }}
                    <a href="/Mien tru trach nhiem bay doi 2025 Sapa.pdf" target="_blank" rel="noopener noreferrer"
                        class="text-red-600 hover:underline font-semibold">{{ $t('booking.terms.privacyPolicy') }}</a>
                </label>
            </div>
        </div>

        <!-- Important Notice -->
        <div class="notice-box">
            <div class="flex items-start">
                <svg class="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                </svg>
                <div class="text-sm text-yellow-800">
                    <p class="font-semibold mb-1">{{ $t('booking.step4Details.paymentInfo') }}</p>
                    <p>{{ $t('booking.step4Details.paymentText') }}</p>
                </div>
            </div>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between">
            <button type="button" @click="handleBack" class="btn-secondary">
                {{ $t('buttons.back') }}
            </button>
            <button type="button" @click="handleSubmit" :disabled="!agreedToTerms || isSubmitting"
                class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                <span v-if="!isSubmitting">{{ $t('buttons.confirm') }}</span>
                <span v-else class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    {{ $t('booking.step4Details.processing') }}
                </span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useBookingStore } from '~/stores/booking'

const bookingStore = useBookingStore()
const bookingData = computed(() => bookingStore.bookingData)

const agreedToTerms = ref(bookingStore.bookingData.agreedToTerms)
const isSubmitting = ref(false)
const expandedPassenger = ref<number | null>(null)

// Toggle passenger accordion
const togglePassenger = (index: number) => {
    if (expandedPassenger.value === index) {
        expandedPassenger.value = null
    } else {
        expandedPassenger.value = index
    }
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

const handleBack = () => {
    bookingStore.previousStep()
}

const handleSubmit = async () => {
    if (!agreedToTerms.value) return

    isSubmitting.value = true
    bookingStore.setTermsAgreement(agreedToTerms.value)

    try {
        const result = await bookingStore.submitBooking()

        if (result.success) {
            // Move to step 5 (completion)
            // Store already handles this in submitBooking
        } else {
            alert('Booking submission failed. Please try again.')
        }
    } catch (error) {
        console.error('Booking error:', error)
        alert('An error occurred. Please try again.')
    } finally {
        isSubmitting.value = false
    }
}

watch(agreedToTerms, (newValue) => {
    bookingStore.setTermsAgreement(newValue)
})
</script>

<style scoped>
/* Accordion transition */
.accordion-enter-active,
.accordion-leave-active {
    transition: all 0.3s ease-out;
    overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
}

.accordion-enter-to,
.accordion-leave-from {
    opacity: 1;
    max-height: 500px;
    transform: translateY(0);
}
</style>
