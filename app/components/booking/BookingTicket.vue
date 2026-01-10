<template>
    <div class="space-y-6">
        <!-- Ticket Preview -->
        <div ref="ticketRef"
            class="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-2xl overflow-hidden border-2 border-red-200">
            <!-- Ticket Header -->
            <div class="bg-gradient-to-r from-red-600 to-orange-600 text-white p-8">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-4">
                        <!-- Logo -->
                        <img src="/images/Sapa_logo.png" alt="Sapa Paragliding Logo"
                            class="w-16 h-16 object-contain bg-white rounded-lg p-2" />
                        <div>
                            <h1 class="text-4xl font-black">{{ $t('booking.ticket.title') }}</h1>
                            <p class="text-red-100 text-sm mt-1">{{ $t('booking.ticket.subtitle') }}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-red-100">{{ $t('booking.ticket.bookingId') }}</p>
                        <p class="text-2xl font-mono font-bold">{{ bookingData.bookingId || 'PENDING' }}</p>
                    </div>
                </div>

                <!-- Company Info -->
                <div class="border-t border-red-400 pt-4 mt-4">
                    <p class="text-lg font-bold">{{ companyName }}</p>
                    <p class="text-sm text-red-100">{{ companyInfo }}</p>
                    <p class="text-sm text-white mt-2">
                        <span class="font-semibold">Hotline / WhatsApp / Zalo (24/7):</span>
                        <a href="tel:+84386887489" class="hover:underline">+84 386 887 489</a> |
                        <a href="tel:+84776499562" class="hover:underline">+84 776 499 562</a>
                    </p>
                </div>
            </div>

            <!-- Ticket Body -->
            <div class="p-8 space-y-8">
                <!-- Booking Information -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Left Column: Flight Details -->
                    <div class="space-y-6">
                        <div>
                            <h3 class="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">{{
                                $t('booking.ticket.flightDetails') }}</h3>
                            <div class="bg-white rounded-lg p-4 space-y-3">
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-600">{{ $t('booking.step5Details.service') }}</span>
                                    <span class="font-bold text-gray-900">{{ bookingData.serviceName }}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-600">{{ $t('booking.step5Details.date') }}</span>
                                    <span class="font-bold text-gray-900">{{ formatDate(bookingData.preferredDate)
                                        }}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-600">{{ $t('booking.step5Details.time') }}</span>
                                    <span class="font-bold text-gray-900">{{ bookingData.preferredTime ||
                                        $t('booking.step4Details.flexible') }}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-600">{{ $t('booking.step5Details.passengers') }}</span>
                                    <span class="font-bold text-gray-900">{{ bookingData.numberOfPassengers }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Passenger & Contact Info -->
                    <div class="space-y-6">
                        <div>
                            <h3 class="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">{{
                                $t('booking.ticket.passengerInfo') }}</h3>
                            <div class="bg-white rounded-lg p-4 space-y-3">
                                <div>
                                    <p class="text-xs text-gray-500 uppercase">{{ $t('booking.step2Details.contactName')
                                        }}</p>
                                    <p class="font-bold text-gray-900">{{ bookingData.contactName }}</p>
                                </div>
                                <div>
                                    <p class="text-xs text-gray-500 uppercase">{{ $t('booking.step2Details.email') }}
                                    </p>
                                    <p class="font-mono text-sm text-gray-900">{{ bookingData.email }}</p>
                                </div>
                                <div>
                                    <p class="text-xs text-gray-500 uppercase">{{ $t('booking.step2Details.phone') }}
                                    </p>
                                    <p class="font-mono text-sm text-gray-900">{{ bookingData.phone }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- Passengers List -->
                <div v-if="bookingData.passengers.length > 0">
                    <h3 class="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">{{
                        $t('booking.ticket.passengersList') }}</h3>
                    <div class="bg-white rounded-lg p-4 border border-gray-200">
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <div v-for="(passenger, idx) in bookingData.passengers" :key="idx"
                                class="bg-gray-50 rounded-lg px-4 py-2 text-center border border-gray-200">
                                <span class="text-xs font-bold text-gray-500 mr-2">{{ idx + 1 }}.</span>
                                <span class="text-sm text-gray-900 font-medium">{{ passenger.fullName }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pricing Summary -->
                <div class="bg-white rounded-lg p-6 border-2 border-red-200">
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">{{ $t('booking.step1Details.flightPrice') }}</span>
                            <span class="font-semibold">{{ formatPrice(bookingData.servicePrice) }} × {{
                                bookingData.numberOfPassengers }}</span>
                        </div>
                        <div v-if="bookingData.discount > 0" class="flex justify-between items-center text-red-600">
                            <span>{{ $t('booking.step1Details.discount') }} ({{ Math.round(bookingData.discount * 100)
                                }}%)</span>
                            <span class="font-semibold">-{{ formatPrice(bookingData.servicePrice *
                                bookingData.numberOfPassengers *
                                bookingData.discount) }}</span>
                        </div>
                        <div class="border-t-2 border-gray-200 pt-3 flex justify-between items-center">
                            <span class="text-lg font-bold text-gray-900">{{ $t('booking.step5Details.total') }}</span>
                            <span class="text-2xl font-bold text-red-600">{{ formatPrice(bookingData.totalPrice)
                                }}</span>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="border-t-2 border-gray-200 pt-6 text-center">
                    <p class="text-sm text-gray-600 mb-2">{{ $t('booking.ticket.validationDate') }}: {{ formatDate(new
                        Date().toISOString()) }}</p>
                    <p class="text-xs text-gray-500">{{ $t('booking.ticket.footer') }}</p>
                </div>
            </div>
        </div>

        <!-- Download Button -->
        <div class="flex flex-col sm:flex-row gap-4">
            <button @click="downloadTicketPDF" class="flex-1 btn-primary flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {{ $t('booking.ticket.downloadPDF') }}
            </button>
            <button @click="downloadTicketImage" class="flex-1 btn-secondary flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {{ $t('booking.ticket.downloadImage') }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useBookingStore } from '~/stores/booking'

const bookingStore = useBookingStore()
const bookingData = computed(() => bookingStore.bookingData)
const ticketRef = ref<HTMLElement | null>(null)

const companyName = 'SAPA PARAGLIDING'
const companyInfo = 'Experience the dream of flying in Sapa'

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

const downloadTicketImage = async () => {
    if (!ticketRef.value) return

    try {
        const html2canvasLib = (await import('html2canvas')).default
        const canvas = await html2canvasLib(ticketRef.value, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff'
        })

        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/png')
        link.download = `booking-ticket-${bookingData.value.bookingId || 'draft'}.png`
        link.click()
    } catch (error) {
        console.error('Error generating image:', error)
        alert('Failed to download ticket image')
    }
}

const downloadTicketPDF = async () => {
    if (!ticketRef.value) return

    try {
        const html2canvas = (await import('html2canvas')).default
        const { jsPDF } = await import('jspdf')

        const canvas = await html2canvas(ticketRef.value, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff'
        })

        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        })

        const imgWidth = 210 // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
        pdf.save(`booking-ticket-${bookingData.value.bookingId || 'draft'}.pdf`)
    } catch (error) {
        console.error('Error generating PDF:', error)
        alert('Failed to download ticket PDF')
    }
}
</script>
