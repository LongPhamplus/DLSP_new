<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container-custom">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="section-title">{{ $t('pilots.title') }}</h1>
        <p class="text-xl text-gray-600">{{ $t('pilots.subtitle') }}</p>
      </div>

      <!-- Pilots Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PilotCard
          v-for="pilot in 14"
          :key="pilot"
          :pilotId="pilot"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

// SEO
useHead({
  title: 'Our Expert Pilots - Sapa Paragliding',
  meta: [
    { name: 'description', content: 'Meet our professional team of certified paragliding pilots in Sapa' }
  ]
})
</script>
