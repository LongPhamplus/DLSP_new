<template>
  <div class="space-y-6">
    <div>
      <h2 class="section-title">{{ $t('booking.step2') }}</h2>
      <p class="text-gray-600">{{ $t('booking.contactInfo') }}</p>
    </div>

    <form @submit.prevent="handleNext" class="space-y-6">
      <!-- Full Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('booking.fields.fullName') }} *
        </label>
        <input
          v-model="formData.contactName"
          type="text"
          required
          class="input-field"
          :placeholder="$t('booking.fields.fullName')"
        />
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('booking.fields.email') }} *
        </label>
        <input
          v-model="formData.email"
          type="email"
          required
          class="input-field"
          :placeholder="$t('booking.fields.email')"
        />
      </div>

      <!-- Phone -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('booking.fields.phone') }} *
        </label>
        <input
          v-model="formData.phone"
          type="tel"
          required
          class="input-field"
          placeholder="+84 123 456 789"
        />
      </div>

      <!-- Date and Time -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('booking.fields.date') }} *
          </label>
          <input
            v-model="formData.preferredDate"
            type="date"
            required
            :min="minDate"
            class="input-field"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('booking.fields.time') }}
          </label>
          <select v-model="formData.preferredTime" class="input-field">
            <option value="">{{ $t('booking.step2Details.selectTime') }}</option>
            <option value="06:00">06:00 AM</option>
            <option value="07:00">07:00 AM</option>
            <option value="08:00">08:00 AM</option>
            <option value="09:00">09:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="13:00">01:00 PM</option>
            <option value="14:00">02:00 PM</option>
            <option value="15:00">03:00 PM</option>
            <option value="16:00">04:00 PM</option>
            <option value="17:00">05:00 PM</option>
            <option value="18:00">06:00 PM</option>
          </select>
        </div>
      </div>

      <!-- Pickup Location (only if hotel-transfer is selected) -->
      <Transition name="slide-down">
        <div v-if="hasHotelTransfer" class="bg-green-50 border-2 border-green-200 rounded-lg p-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            <span class="flex items-center">
              <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              {{ $t('booking.step2Details.pickupLocation') }}
            </span>
          </label>
          <input
            v-model="formData.pickupLocation"
            type="text"
            required
            class="input-field"
            :placeholder="$t('booking.step2Details.pickupPlaceholder')"
          />
          <p class="text-xs text-gray-600 mt-2">
            {{ $t('booking.step2Details.pickupNote') }}
          </p>
        </div>
      </Transition>

      <!-- Special Requests -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('booking.fields.specialRequests') }}
        </label>
        <textarea
          v-model="formData.specialRequests"
          rows="4"
          class="input-field resize-none"
          :placeholder="$t('booking.fields.specialRequests')"
        />
      </div>

      <!-- Important Notice -->
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          <div class="text-sm text-yellow-800">
            <p class="font-semibold mb-1">{{ $t('booking.step2Details.importantNotice') }}</p>
            <p>{{ $t('booking.step2Details.weatherNotice') }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex justify-between">
        <button
          type="button"
          @click="handleBack"
          class="btn-secondary"
        >
          {{ $t('buttons.back') }}
        </button>
        <button
          type="submit"
          class="btn-primary"
        >
          {{ $t('buttons.next') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useBookingStore } from '~/stores/booking'

const bookingStore = useBookingStore()

const formData = reactive({
  contactName: bookingStore.bookingData.contactName || '',
  email: bookingStore.bookingData.email || '',
  phone: bookingStore.bookingData.phone || '',
  preferredDate: bookingStore.bookingData.preferredDate || '',
  preferredTime: bookingStore.bookingData.preferredTime || '',
  specialRequests: bookingStore.bookingData.specialRequests || '',
  pickupLocation: bookingStore.bookingData.pickupLocation || ''
})

// Check if hotel transfer is selected
const hasHotelTransfer = computed(() => {
  return bookingStore.bookingData.selectedOptions.includes('hotel-transfer')
})

// Set minimum date to tomorrow
const minDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate())
  return tomorrow.toISOString().split('T')[0]
})

const handleNext = () => {
  bookingStore.setContactInfo(formData)
  // Also save pickup location
  bookingStore.bookingData.pickupLocation = formData.pickupLocation
  bookingStore.nextStep()
}

const handleBack = () => {
  bookingStore.previousStep()
}
</script>

<style scoped>
/* Slide down transition for pickup location */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-out;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 200px;
}
</style>
