<template>
  <div class="space-y-6">
    <div>
      <h2 class="section-title">{{ $t('booking.step3') }}</h2>
      <p class="text-gray-600">{{ $t('booking.passengerInfo') }}</p>
    </div>

    <!-- Personal Info Notice -->
    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div class="flex items-start">
        <svg class="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd" />
        </svg>
        <div class="text-sm text-yellow-800">
          <p class="font-semibold">{{ $t('booking.step3Details.personalInfoNotice') }}</p>
        </div>
      </div>
    </div>

    <!-- Passenger Forms -->
    <div class="space-y-6">
      <div v-for="(passenger, index) in passengers" :key="index" class="bg-gray-50 rounded-xl p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ $t('booking.step3Details.passenger') }} {{ index + 1 }}
          </h3>
          <button v-if="index === 0" type="button" @click="fillContactInfo(index)"
            class="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
            Điền thông tin người đăng ký
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Full Name -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('booking.fields.fullName') }} *
            </label>
            <input v-model="passenger.fullName" type="text" required class="input-field"
              :placeholder="$t('booking.fields.fullName')" />
          </div>

          <!-- Date of Birth -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('booking.fields.dateOfBirth') }} *
            </label>
            <input v-model="passenger.dateOfBirth" type="date" required :max="maxDate" class="input-field" />
          </div>

          <!-- Gender -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('booking.fields.gender') }} *
            </label>
            <select v-model="passenger.gender" required class="input-field">
              <option value="">{{ $t('booking.step3Details.selectGender') }}</option>
              <option value="male">{{ $t('booking.fields.male') }}</option>
              <option value="female">{{ $t('booking.fields.female') }}</option>
            </select>
          </div>

          <!-- Nationality -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('booking.fields.nationality') }} *
            </label>
            <input v-model="passenger.nationality" type="text" required class="input-field" placeholder="Vietnam" />
          </div>

          <!-- Passport/CCCD -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('booking.fields.passportOrId') }} *
            </label>
            <input v-model="passenger.passportOrId" type="text" required class="input-field"
              :placeholder="$t('booking.fields.passportOrIdPlaceholder')" />
          </div>

          <!-- Weight -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('booking.fields.weight') }} *
            </label>
            <input v-model.number="passenger.weight" type="number" required max="100" class="input-field"
              placeholder="70" />
            <p class="text-xs text-gray-500 mt-1">
              {{ $t('booking.step3Details.weightLimit') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Safety Information -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div class="flex items-start">
        <svg class="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd" />
        </svg>
        <div class="text-sm text-blue-800">
          <p class="font-semibold mb-1">{{ $t('booking.step3Details.safetyRequirements') }}</p>
          <ul class="list-disc list-inside space-y-1">
            <li>{{ $t('booking.step3Details.minAge') }}</li>
            <li>{{ $t('booking.step3Details.goodHealth') }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between">
      <button type="button" @click="handleBack" class="btn-secondary">
        {{ $t('buttons.back') }}
      </button>
      <button type="button" @click="handleNext" :disabled="!isFormValid"
        class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
        {{ $t('buttons.next') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBookingStore } from '~/stores/booking'
import type { PassengerInfo } from '~/stores/booking'

const bookingStore = useBookingStore()

// Initialize passengers array based on number of passengers
const passengers = ref<PassengerInfo[]>(
  bookingStore.bookingData.passengers.length > 0
    ? [...bookingStore.bookingData.passengers]
    : Array(bookingStore.bookingData.numberOfPassengers).fill(null).map(() => ({
      fullName: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      weight: 0,
      passportOrId: ''
    }))
)

// Max date is today (no future birth dates)
const maxDate = computed(() => {
  return new Date().toISOString().split('T')[0]
})

// Validate all passenger forms
const isFormValid = computed(() => {
  return passengers.value.every(p =>
    p.fullName.trim() !== '' &&
    p.dateOfBirth !== '' &&
    p.gender !== '' &&
    p.nationality.trim() !== '' &&
    p.passportOrId.trim() !== '' &&
    p.weight <= 100
  )
})

const handleNext = () => {
  if (isFormValid.value) {
    bookingStore.setAllPassengers(passengers.value)
    bookingStore.nextStep()
  }
}

const handleBack = () => {
  bookingStore.previousStep()
}

// Fill contact info from Step 2 into first passenger
const fillContactInfo = (index: number) => {
  if (index !== 0) return // Only for first passenger

  const contactInfo = bookingStore.bookingData

  // Fill the first passenger with contact info
  passengers.value[0] = {
    fullName: contactInfo.contactName || '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    weight: 0,
    passportOrId: ''
  }
}
</script>
