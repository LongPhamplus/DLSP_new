import { defineStore } from 'pinia'

export interface PassengerInfo {
  fullName: string
  dateOfBirth: string
  gender: string
  nationality: string
  weight: number
  passportOrId: string
}

export interface BookingData {
  // Step 1: Service Selection
  serviceId: string
  serviceName: string
  servicePrice: number
  numberOfPassengers: number
  totalPrice: number
  discount: number
  selectedOptions: string[] // Optional services: hotel-transfer, drone, camera360
  serviceQuantities?: Record<string, number> // Quantity for drone and camera360

  // Step 2: Contact Information
  contactName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  specialRequests: string
  pickupLocation: string // Địa điểm đón (if hotel-transfer selected)
  telegramChatId?: string // Telegram Chat ID for bot notifications

  // Step 3: Passenger Details
  passengers: PassengerInfo[]

  // Step 4: Terms Agreement
  agreedToTerms: boolean

  // Booking Status
  bookingId?: string
  status: 'draft' | 'submitted' | 'confirmed' | 'completed'
}

export const useBookingStore = defineStore('booking', {
  state: (): { currentStep: number; bookingData: BookingData } => ({
    currentStep: 1,
    bookingData: {
      serviceId: '',
      serviceName: '',
      servicePrice: 0,
      numberOfPassengers: 1,
      totalPrice: 0,
      discount: 0,
      selectedOptions: [],
      serviceQuantities: {
        'drone': 1,
        'camera360': 1
      },
      contactName: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      specialRequests: '',
      pickupLocation: '',
      telegramChatId: '5066728656', // Admin chat ID (hardcoded)
      passengers: [],
      agreedToTerms: false,
      status: 'draft'
    }
  }),

  getters: {
    // Calculate discount based on number of passengers
    calculatedDiscount: (state): number => {
      const passengers = state.bookingData.numberOfPassengers
      if (passengers >= 5) return 0.15 // 15% for 5+
      if (passengers >= 3) return 0.10 // 10% for 3-4
      if (passengers >= 2) return 0.05 // 5% for 2
      return 0
    },

    // Calculate total price with discount
    finalPrice: (state): number => {
      const basePrice = state.bookingData.servicePrice * state.bookingData.numberOfPassengers
      const discount = state.bookingData.discount || 0
      return basePrice * (1 - discount)
    },

    // Check if current step is valid
    isStepValid: (state): boolean => {
      switch (state.currentStep) {
        case 1:
          return !!state.bookingData.serviceId && state.bookingData.numberOfPassengers > 0
        case 2:
          return !!(
            state.bookingData.contactName &&
            state.bookingData.email &&
            state.bookingData.phone &&
            state.bookingData.preferredDate
          )
        case 3:
          return state.bookingData.passengers.length === state.bookingData.numberOfPassengers &&
            state.bookingData.passengers.every(p =>
              p.fullName && p.dateOfBirth && p.gender && p.nationality && p.weight > 0 && p.passportOrId
            )
        case 4:
          return state.bookingData.agreedToTerms
        default:
          return false
      }
    },

    // Get booking summary for confirmation
    bookingSummary: (state) => ({
      service: state.bookingData.serviceName || '',
      passengers: state.bookingData.numberOfPassengers || 0,
      date: state.bookingData.preferredDate || '',
      time: state.bookingData.preferredTime || '',
      contact: {
        name: state.bookingData.contactName || '',
        email: state.bookingData.email || '',
        phone: state.bookingData.phone || ''
      },
      pricing: {
        basePrice: state.bookingData.servicePrice || 0,
        quantity: state.bookingData.numberOfPassengers || 0,
        discount: state.bookingData.discount || 0,
        total: state.bookingData.totalPrice || 0
      }
    })
  },

  actions: {
    // Set service selection (Step 1)
    setService(serviceId: string, serviceName: string, servicePrice: number) {
      this.bookingData.serviceId = serviceId
      this.bookingData.serviceName = serviceName
      this.bookingData.servicePrice = servicePrice
      this.updatePricing()
    },

    // Set number of passengers
    setNumberOfPassengers(count: number) {
      this.bookingData.numberOfPassengers = count
      this.updatePricing()
      // Initialize passenger array
      this.bookingData.passengers = Array(count).fill(null).map(() => ({
        fullName: '',
        dateOfBirth: '',
        gender: '',
        nationality: '',
        weight: 0,
        passportOrId: ''
      }))
    },

    // Update pricing calculations
    updatePricing() {
      this.bookingData.discount = this.calculatedDiscount
      this.bookingData.totalPrice = this.finalPrice
    },

    // Set contact information (Step 2)
    setContactInfo(data: {
      contactName: string
      email: string
      phone: string
      preferredDate: string
      preferredTime: string
      specialRequests?: string
    }) {
      Object.assign(this.bookingData, data)
    },

    // Set passenger information (Step 3)
    setPassengerInfo(index: number, passengerData: PassengerInfo) {
      if (this.bookingData.passengers[index]) {
        this.bookingData.passengers[index] = passengerData
      }
    },

    // Set all passengers at once
    setAllPassengers(passengers: PassengerInfo[]) {
      this.bookingData.passengers = passengers
    },

    // Agree to terms (Step 4)
    setTermsAgreement(agreed: boolean) {
      this.bookingData.agreedToTerms = agreed
    },

    // Navigation
    nextStep() {
      if (this.currentStep < 5 && this.isStepValid) {
        this.currentStep++
      }
    },

    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },

    goToStep(step: number) {
      if (step >= 1 && step <= 5) {
        this.currentStep = step
      }
    },

    // Submit booking
    async submitBooking() {
      try {
        this.bookingData.status = 'submitted'

        // Send booking data to API
        const response = await $fetch('/api/send-booking', {
          method: 'POST',
          body: this.bookingData
        })

        if (response.success) {
          if ('bookingId' in response && response.bookingId) {
            this.bookingData.bookingId = response.bookingId
          }
          this.bookingData.status = 'confirmed'
          this.currentStep = 5

          // Send booking to Telegram bot (always send to admin)
          try {
            await $fetch('/api/send-booking-telegram', {
              method: 'POST',
              body: this.bookingData
            })
            console.log('✅ Booking notification sent to Telegram bot')
          } catch (telegramError) {
            console.warn('⚠️  Failed to send Telegram notification:', telegramError)
            // Don't fail the booking if Telegram fails
          }

          return { success: true, bookingId: this.bookingData.bookingId || '' }
        }

        return { success: false, error: 'Booking submission failed' }
      } catch (error) {
        console.error('Booking error:', error)
        this.bookingData.status = 'draft'
        return { success: false, error: 'Network error' }
      }
    },

    // Reset booking
    resetBooking() {
      this.currentStep = 1
      this.bookingData = {
        serviceId: '',
        serviceName: '',
        servicePrice: 0,
        numberOfPassengers: 1,
        totalPrice: 0,
        discount: 0,
        selectedOptions: [],
        serviceQuantities: {
          'drone': 1,
          'camera360': 1
        },
        contactName: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        specialRequests: '',
        pickupLocation: '',
        telegramChatId: '5066728656', // Admin chat ID (hardcoded)
        passengers: [],
        agreedToTerms: false,
        status: 'draft'
      }
    },

    // Set Telegram Chat ID
    setTelegramChatId(chatId: string) {
      this.bookingData.telegramChatId = chatId
    }
  }
})
