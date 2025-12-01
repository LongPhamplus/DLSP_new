export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // Generate booking ID: phone_date_time
    const now = new Date()
    const date = now.toISOString().split('T')[0].replace(/-/g, '') // YYYYMMDD
    const time = now.toTimeString().split(' ')[0].replace(/:/g, '') // HHMMSS
    const phone = body.phone ? body.phone.replace(/\D/g, '') : 'UNKNOWN' // Remove non-digits
    const bookingId = `BID_${phone}_${date}_${time}`

    console.log(`✅ Booking received: ${bookingId}`)
    console.log(`📱 Telegram Chat ID: ${body.telegramChatId || 'Not provided'}`)

    return {
      success: true,
      bookingId,
      message: 'Booking submitted successfully. Telegram notification will be sent.'
    }
  } catch (error) {
    console.error('Booking error:', error)
    
    return {
      success: false,
      error: 'Failed to process booking',
      message: error instanceof Error ? error.message : 'Unknown error'
    }
  }
})
