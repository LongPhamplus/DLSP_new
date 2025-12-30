<template>
  <div class="space-y-8">
    <!-- Title -->
    <div>
      <h2 class="text-3xl font-bold text-gray-900 text-center mb-2">{{ $t('booking.selectService') }}</h2>
    </div>

    <!-- Number of Passengers - Modern Compact Style -->
    <div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Left: Passenger Selection -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="bg-green-600 p-2.5 rounded-lg">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p class="text-xs text-gray-600 font-medium uppercase tracking-wide">{{
                $t('booking.step1Details.numberOfPassengers') }}</p>
              <p class="text-xl font-bold text-gray-900">{{ numberOfPassengers }} {{ $t('booking.step1Details.people')
                }}</p>
            </div>
          </div>

          <div class="flex items-center bg-white rounded-lg shadow-sm p-0.5 border border-gray-200">
            <button @click="decreasePassengers" :disabled="numberOfPassengers <= 1"
              class="w-9 h-9 rounded-md bg-gray-50 hover:bg-green-600 hover:text-white text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center font-bold text-lg">
              −
            </button>
            <span class="px-4 text-center font-bold text-green-600 text-lg">{{ numberOfPassengers }}</span>
            <button @click="increasePassengers" :disabled="numberOfPassengers >= 20"
              class="w-9 h-9 rounded-md bg-gray-50 hover:bg-green-600 hover:text-white text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center font-bold text-lg">
              +
            </button>
          </div>
        </div>

        <!-- Right: Total Price Display -->
        <div class="flex items-center justify-between bg-white rounded-lg p-4 border border-green-200">
          <div>
            <p class="text-xs text-gray-500 font-medium uppercase tracking-wide">{{
              $t('booking.step1Details.estimatedTotal') }}</p>
            <p class="text-2xl font-bold text-green-600 mt-1">{{ formatPriceVND(totalPrice) }}</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-gray-500 font-medium uppercase tracking-wide">USD</p>
            <p class="text-xl font-bold text-gray-700 mt-1">{{ formatPriceUSD(totalPriceUSD) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Service Information -->
    <div class="bg-gray-50 rounded-xl p-6 space-y-6">
      <!-- Base Price -->
      <div>
        <h3 class="text-xl font-bold text-gray-900 mb-3">{{ $t('booking.step1Details.flightPrice') }}</h3>
        <p class="text-2xl font-semibold text-green-600">
          {{ $t('booking.step1Details.from') }} {{ formatPriceVND(basePrice) }}{{ $t('booking.step1Details.perFlight')
          }}
        </p>
        <p class="text-lg text-gray-600">({{ formatPriceUSD(basePriceUSD) }}{{ $t('booking.step1Details.perFlight') }})
        </p>
      </div>

      <!-- Duration -->
      <div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">{{ $t('booking.step1Details.tourDuration') }}</h3>
        <p class="text-gray-700">{{ $t('booking.step1Details.durationText') }}</p>
      </div>

      <!-- Included Services -->
      <div>
        <h3 class="text-xl font-bold text-gray-900 mb-3">{{ $t('booking.step1Details.included') }}</h3>
        <ul class="space-y-2">
          <li v-for="(item, index) in includedServices" :key="index" class="flex items-start">
            <svg class="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd" />
            </svg>
            <span class="text-gray-700">{{ item }}</span>
          </li>
        </ul>
      </div>

      <!-- Optional Services -->
      <div>
        <h3 class="text-xl font-bold text-gray-900 mb-3">{{ $t('booking.step1Details.optionalServices') }}</h3>
        <div class="space-y-3">
          <label v-for="option in optionalServices" :key="option.id"
            class="flex items-start p-4 bg-white rounded-lg border-2 cursor-pointer hover:border-green-500 transition-all"
            :class="selectedOptions.includes(option.id) ? 'border-green-500 bg-green-50' : 'border-gray-200'">
            <input type="checkbox" :value="option.id" v-model="selectedOptions"
              class="mt-1 w-5 h-5 text-green-600 rounded focus:ring-green-500" />
            <div class="ml-3 flex-1">
              <p class="font-semibold text-gray-900">{{ option.name }}</p>
              <p class="text-sm text-gray-600 mt-1">{{ option.description }}</p>

              <!-- Quantity selector for drone and camera360 -->
              <div v-if="selectedOptions.includes(option.id) && (option.id === 'drone' || option.id === 'camera360')"
                class="mt-3 flex items-center gap-3">
                <span class="text-sm text-gray-700 font-medium">{{ $t('booking.step1Details.numberOfPeople') }}:</span>
                <div class="flex items-center bg-gray-100 rounded-full p-1">
                  <button @click.prevent="decreaseServiceQuantity(option.id)"
                    :disabled="(serviceQuantities[option.id] ?? 1) <= 1"
                    class="w-8 h-8 rounded-full bg-white hover:bg-green-600 hover:text-white text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center font-bold">
                    −
                  </button>
                  <span class="px-4 text-center font-bold text-green-600">{{ serviceQuantities[option.id] ?? 1 }}</span>
                  <button @click.prevent="increaseServiceQuantity(option.id)"
                    :disabled="(serviceQuantities[option.id] ?? 1) >= numberOfPassengers"
                    class="w-8 h-8 rounded-full bg-white hover:bg-green-600 hover:text-white text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center font-bold">
                    +
                  </button>
                </div>
              </div>

              <p class="text-lg font-bold text-green-600 mt-2">
                {{ formatPriceVND(option.priceVND * (selectedOptions.includes(option.id) && (option.id === 'drone' ||
                  option.id === 'camera360') ? serviceQuantities[option.id] || 1 : 1)) }}/{{ option.unit }}
                <span class="text-sm text-gray-500">({{ formatPriceUSD(option.priceUSD *
                  (selectedOptions.includes(option.id) && (option.id === 'drone' || option.id === 'camera360') ?
                  serviceQuantities[option.id] || 1 : 1)) }}/{{ option.unit }})</span>
              </p>
            </div>
          </label>
        </div>
      </div>

      <!-- Locations -->
      <div>
        <h3 class="text-xl font-bold text-gray-900 mb-3">{{ $t('booking.step1Details.locations') }}</h3>
        <div class="space-y-3">
          <div class="flex items-start">
            <svg class="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <div>
              <p class="font-semibold text-gray-900">{{ $t('booking.step1Details.takeoffPoint') }}</p>
              <a href="https://maps.app.goo.gl/bGtKFTuxyZvJhsJZ9" target="_blank"
                class="text-green-600 hover:underline text-sm">
                {{ $t('booking.step1Details.viewMap') }}
              </a>
            </div>
          </div>
          <div class="flex items-start">
            <svg class="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <div>
              <p class="font-semibold text-gray-900">{{ $t('booking.step1Details.landingPoint') }}</p>
              <a href="https://maps.app.goo.gl/mYnh4KJVk3aQZLYC6" target="_blank"
                class="text-green-600 hover:underline text-sm">
                {{ $t('booking.step1Details.viewMap') }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Promotions -->
      <div class="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <svg class="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
          {{ $t('booking.step1Details.promotionInfo') }}
        </h3>
        <ul class="space-y-2">
          <li v-for="promo in promotions" :key="promo.minPeople"
            class="flex items-center justify-between p-3 bg-white rounded-lg"
            :class="numberOfPassengers >= promo.minPeople ? 'ring-2 ring-green-500' : ''">
            <div class="flex items-center">
              <svg v-if="numberOfPassengers >= promo.minPeople" class="w-5 h-5 text-green-600 mr-2" fill="currentColor"
                viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd" />
              </svg>
              <span :class="numberOfPassengers >= promo.minPeople ? 'font-bold text-green-700' : 'text-gray-700'">
                {{ promo.text }}
              </span>
            </div>
            <span :class="numberOfPassengers >= promo.minPeople ? 'font-bold text-green-600' : 'text-gray-600'">
              -{{ formatPriceVND(promo.discountVND) }}/người
              <span class="text-sm">({{ formatPriceUSD(promo.discountUSD) }})</span>
            </span>
          </li>
        </ul>

        <!-- Active Discount Display -->
        <div v-if="activeDiscount" class="mt-4 p-4 bg-green-600 text-white rounded-lg">
          <p class="font-bold text-lg">{{ $t('booking.step1Details.youSave') }} {{ formatPriceVND(activeDiscount *
            numberOfPassengers) }}</p>
          <p class="text-sm">({{ formatPriceUSD(activeDiscountUSD * numberOfPassengers) }})</p>
        </div>
      </div>
    </div>

    <!-- Price Summary -->
    <div class="bg-white border-2 border-gray-200 rounded-xl p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-4">{{ $t('booking.step1Details.priceSummary') }}</h3>
      <div class="space-y-3">
        <div class="flex justify-between text-gray-700">
          <span>{{ $t('booking.step1Details.flightPriceFor') }} ({{ numberOfPassengers }} {{
            $t('booking.step1Details.people') }})</span>
          <span class="font-semibold">{{ formatPriceVND(basePrice * numberOfPassengers) }}</span>
        </div>

        <!-- Optional Services Total -->
        <div v-if="optionalServicesTotal > 0" class="flex justify-between text-gray-700">
          <span>{{ $t('booking.step1Details.optionalServicesTotal') }}</span>
          <span class="font-semibold">{{ formatPriceVND(optionalServicesTotal) }}</span>
        </div>

        <!-- Discount -->
        <div v-if="activeDiscount > 0" class="flex justify-between text-green-600">
          <span>{{ $t('booking.step1Details.groupDiscount') }}</span>
          <span class="font-semibold">-{{ formatPriceVND(activeDiscount * numberOfPassengers) }}</span>
        </div>

        <div class="border-t-2 border-gray-200 pt-3">
          <div class="flex justify-between items-center">
            <span class="text-2xl font-bold text-gray-900">{{ $t('booking.step1Details.total') }}</span>
            <div class="text-right">
              <p class="text-3xl font-bold text-green-600">{{ formatPriceVND(totalPrice) }}</p>
              <p class="text-lg text-gray-500">({{ formatPriceUSD(totalPriceUSD) }})</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-end">
      <button @click="handleNext" class="btn-primary text-lg px-12 py-4">
        {{ $t('booking.step1Details.continue') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBookingStore } from '~/stores/booking'

interface OptionalService {
  id: string
  name: string
  description: string
  priceVND: number
  priceUSD: number
  unit: string
}

const bookingStore = useBookingStore()

// Base pricing
const basePrice = 2190000 // VND
const basePriceUSD = 85 // USD

// Number of passengers
const numberOfPassengers = ref(bookingStore.bookingData.numberOfPassengers || 1)

const { t } = useI18n()

// Included services
const includedServices = computed(() => [
  t('booking.step1Details.includedItems.flight'),
  t('booking.step1Details.includedItems.photoVideo'),
  t('booking.step1Details.includedItems.drinks'),
  t('booking.step1Details.includedItems.insurance'),
  t('booking.step1Details.includedItems.certificate'),
  t('booking.step1Details.includedItems.equipment'),
  t('booking.step1Details.includedItems.reschedulePolicy')
])

// Optional services
const optionalServices = computed(() => [
  {
    id: 'hotel-transfer',
    name: t('booking.step1Details.optionalItems.hotelTransfer.name'),
    description: t('booking.step1Details.optionalItems.hotelTransfer.description'),
    priceVND: 100000,
    priceUSD: 5,
    unit: t('booking.step1Details.people')
  },
  {
    id: 'drone',
    name: t('booking.step1Details.optionalItems.drone.name'),
    description: t('booking.step1Details.optionalItems.drone.description'),
    priceVND: 300000,
    priceUSD: 12,
    unit: t('booking.step1Details.perFlight').replace('/', '')
  },
  {
    id: 'camera360',
    name: t('booking.step1Details.optionalItems.camera360.name'),
    description: t('booking.step1Details.optionalItems.camera360.description'),
    priceVND: 500000,
    priceUSD: 20,
    unit: t('booking.step1Details.perFlight').replace('/', '')
  }
])

const selectedOptions = ref<string[]>(bookingStore.bookingData.selectedOptions || [])

// Track quantity for services that require per-person pricing
const serviceQuantities = ref<Record<string, number>>(
  bookingStore.bookingData.serviceQuantities || {
    'drone': 1,
    'camera360': 1
  }
)

// Promotions
const promotions = computed(() => [
  { minPeople: 2, text: t('booking.step1Details.promotions.group2'), discountVND: 50000, discountUSD: 2 },
  { minPeople: 3, text: t('booking.step1Details.promotions.group3'), discountVND: 70000, discountUSD: 3 },
  { minPeople: 4, text: t('booking.step1Details.promotions.group4'), discountVND: 100000, discountUSD: 4 },
  { minPeople: 6, text: t('booking.step1Details.promotions.group6'), discountVND: 150000, discountUSD: 6 }
])

// Calculate active discount
const activeDiscount = computed(() => {
  for (let i = promotions.value.length - 1; i >= 0; i--) {
    const promo = promotions.value[i]
    if (promo && numberOfPassengers.value >= promo.minPeople) {
      return promo.discountVND
    }
  }
  return 0
})

const activeDiscountUSD = computed(() => {
  for (let i = promotions.value.length - 1; i >= 0; i--) {
    const promo = promotions.value[i]
    if (promo && numberOfPassengers.value >= promo.minPeople) {
      return promo.discountUSD
    }
  }
  return 0
})

// Calculate optional services total
const optionalServicesTotal = computed(() => {
  let total = 0
  selectedOptions.value.forEach(optionId => {
    const service = optionalServices.value.find((s: OptionalService) => s.id === optionId)
    if (service) {
      // Hotel transfer is per person
      if (service.id === 'hotel-transfer') {
        total += service.priceVND * numberOfPassengers.value
      }
      // Drone and camera360 are per person based on selected quantity
      else if (service.id === 'drone' || service.id === 'camera360') {
        const quantity = serviceQuantities.value[service.id] || 1
        total += service.priceVND * quantity
      }
      // Other services are per trip
      else {
        total += service.priceVND
      }
    }
  })
  return total
})

const optionalServicesTotalUSD = computed(() => {
  let total = 0
  selectedOptions.value.forEach(optionId => {
    const service = optionalServices.value.find((s: OptionalService) => s.id === optionId)
    if (service) {
      if (service.id === 'hotel-transfer') {
        total += service.priceUSD * numberOfPassengers.value
      }
      else if (service.id === 'drone' || service.id === 'camera360') {
        const quantity = serviceQuantities.value[service.id] || 1
        total += service.priceUSD * quantity
      }
      else {
        total += service.priceUSD
      }
    }
  })
  return total
})

// Calculate total price
const totalPrice = computed(() => {
  const base = basePrice * numberOfPassengers.value
  const discount = activeDiscount.value * numberOfPassengers.value
  const optional = optionalServicesTotal.value
  return base - discount + optional
})

const totalPriceUSD = computed(() => {
  const base = basePriceUSD * numberOfPassengers.value
  const discount = activeDiscountUSD.value * numberOfPassengers.value
  const optional = optionalServicesTotalUSD.value
  return base - discount + optional
})

// Format functions
const formatPriceVND = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

const formatPriceUSD = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

// Passenger controls
const increasePassengers = () => {
  if (numberOfPassengers.value < 20) {
    numberOfPassengers.value++
  }
}

const decreasePassengers = () => {
  if (numberOfPassengers.value > 1) {
    numberOfPassengers.value--
  }
}

// Handle next
const handleNext = () => {
  bookingStore.setService(
    'paragliding-standard',
    'Dù lượn Sapa',
    basePrice
  )
  bookingStore.setNumberOfPassengers(numberOfPassengers.value)
  // Save selected options to store
  bookingStore.bookingData.selectedOptions = selectedOptions.value
  bookingStore.bookingData.serviceQuantities = serviceQuantities.value
  bookingStore.nextStep()
}

// Increase/decrease service quantity
const increaseServiceQuantity = (serviceId: string) => {
  if (!serviceQuantities.value[serviceId]) {
    serviceQuantities.value[serviceId] = 1
  }
  if (serviceQuantities.value[serviceId] < numberOfPassengers.value) {
    serviceQuantities.value[serviceId]++
  }
}

const decreaseServiceQuantity = (serviceId: string) => {
  if (!serviceQuantities.value[serviceId]) {
    serviceQuantities.value[serviceId] = 1
  }
  if (serviceQuantities.value[serviceId] > 1) {
    serviceQuantities.value[serviceId]--
  }
}
</script>
