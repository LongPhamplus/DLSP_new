<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
      class="relative h-96 flex items-center justify-center overflow-hidden bg-gradient-to-r from-green-600 to-emerald-700">
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-black/50" />
      </div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4 text-shadow">{{ $t('about.title') }}</h1>
        <p class="text-xl text-shadow mb-2">{{ $t('about.subtitle') }}</p>
        <p class="text-lg italic text-shadow opacity-90">{{ $t('about.tagline') }}</p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl font-bold text-gray-900 mb-6">
            {{ $t('about.intro.title') }}
          </h2>
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            {{ $t('about.intro.description') }}
          </p>
          <div class="inline-flex items-center gap-4 text-green-600 font-semibold text-sm">
            <span>{{ $t('about.intro.highlight') }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="py-16 bg-gray-50">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <!-- Mission -->
          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              {{ $t('about.mission.title') }}
            </h3>
            <p class="text-gray-700 leading-relaxed mb-4">
              {{ $t('about.mission.description') }}
            </p>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                {{ $t('about.mission.points.safety') }}
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                {{ $t('about.mission.points.experience') }}
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                {{ $t('about.mission.points.nature') }}
              </li>
            </ul>
          </div>

          <!-- Vision -->
          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              {{ $t('about.vision.title') }}
            </h3>
            <p class="text-gray-700 leading-relaxed mb-4">
              {{ $t('about.vision.description') }}
            </p>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                {{ $t('about.vision.goals.leader') }}
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                {{ $t('about.vision.goals.international') }}
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                {{ $t('about.vision.goals.community') }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Values -->
    <!-- Core Values -->
    <section class="py-20 bg-gradient-to-b from-white to-gray-50">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            {{ $t('about.values.title') }}
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <!-- Value 1: Safety -->
          <div
            class="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div
              class="absolute -top-4 -right-4 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
              01
            </div>
            <div
              class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
              {{ $t('about.values.safety.title') }}
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ $t('about.values.safety.description') }}
            </p>
          </div>

          <!-- Value 2: Excellence -->
          <div
            class="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div
              class="absolute -top-4 -right-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
              02
            </div>
            <div
              class="w-16 h-16 bg-gradient-to-br from-blue-500 to-sky-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              {{ $t('about.values.excellence.title') }}
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ $t('about.values.excellence.description') }}
            </p>
          </div>

          <!-- Value 3: Passion -->
          <div
            class="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div
              class="absolute -top-4 -right-4 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
              03
            </div>
            <div
              class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
              {{ $t('about.values.passion.title') }}
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ $t('about.values.passion.description') }}
            </p>
          </div>

          <!-- Value 4: Innovation -->
          <div
            class="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div
              class="absolute -top-4 -right-4 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
              04
            </div>
            <div
              class="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
              {{ $t('about.values.innovation.title') }}
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ $t('about.values.innovation.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story & Milestones -->
    <section class="py-16 bg-gray-50">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <span class="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              {{ $t('about.story.founded') }}
            </span>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">
              {{ $t('about.story.title') }}
            </h2>
            <p class="text-lg text-gray-700 leading-relaxed">
              {{ $t('about.story.description') }}
            </p>
          </div>

          <!-- Timeline -->
          <div class="space-y-8">
            <div v-for="(year, key) in ['2010', '2015', '2020', '2024']" :key="year" class="flex items-start gap-4">
              <div
                class="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                {{ year }}
              </div>
              <div class="flex-1 bg-white rounded-lg p-6 shadow-md">
                <p class="text-gray-700">{{ $t(`about.story.milestones.${year}`) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Commitment -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">
          {{ $t('about.commitment.title') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div class="text-center">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p class="font-semibold text-gray-900">{{ $t('about.commitment.safety') }}</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <p class="font-semibold text-gray-900">{{ $t('about.commitment.quality') }}</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p class="font-semibold text-gray-900">{{ $t('about.commitment.support') }}</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="font-semibold text-gray-900">{{ $t('about.commitment.satisfaction') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Flight Process -->
    <section class="py-16 bg-gray-50">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">
            {{ $t('about.process.title') }}
          </h2>

          <div class="space-y-8">
            <div v-for="(step, index) in processSteps" :key="index" class="flex items-start">
              <div
                class="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                {{ index + 1 }}
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-900 mb-2">
                  {{ $t(`about.process.step${index + 1}.title`) }}
                </h3>
                <p class="text-gray-700 leading-relaxed">
                  {{ $t(`about.process.step${index + 1}.description`) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="pt-48 pb-20 bg-gray-50"
      style="background-image: url('/images/svg/hero-shape.svg'); background-size: cover; background-position: center; background-repeat: no-repeat;">
      <div class="container-custom">
        <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">
          {{ $t('about.whyChoose.title') }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <!-- Feature 1 -->
          <div class="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ $t('about.features.safety.title') }}</h3>
            <p class="text-gray-600">
              {{ $t('about.features.safety.description') }}
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ $t('about.features.expertTeam.title') }}</h3>
            <p class="text-gray-600">
              {{ $t('about.features.expertTeam.description') }}
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ $t('about.features.bestExperience.title') }}</h3>
            <p class="text-gray-600">
              {{ $t('about.features.bestExperience.description') }}
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ $t('about.features.professionalPhoto.title') }}</h3>
            <p class="text-gray-600">
              {{ $t('about.features.professionalPhoto.description') }}
            </p>
          </div>

          <!-- Feature 5 -->
          <div class="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ $t('about.features.bestValue.title') }}</h3>
            <p class="text-gray-600">
              {{ $t('about.features.bestValue.description') }}
            </p>
          </div>

          <!-- Feature 6 -->
          <div class="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ $t('about.features.multiLanguage.title') }}</h3>
            <p class="text-gray-600">
              {{ $t('about.features.multiLanguage.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
      <div class="container-custom text-center">
        <h2 class="text-4xl font-bold mb-6">{{ $t('about.whyChoose.cta.title') }}</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          {{ $t('about.whyChoose.cta.description') }}
        </p>
        <button @click="localizedNavigateTo('/booking')"
          class="btn-primary bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4 inline-block">
          {{ $t('buttons.book') }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const processSteps = [1, 2, 3, 4, 5]
const router = useRouter()
const { locale } = useI18n()

const localizedNavigateTo = (path: string) => {
  const currentLocale = locale.value || 'vi' // mặc định là vi
  // Nếu ngôn ngữ là vi thì không thêm prefix
  const fullPath = currentLocale === 'vi' ? path : `/${currentLocale}${path}`
  router.push(fullPath)
}

// SEO
useHead({
  title: 'About Us - Sapa Paragliding',
  meta: [
    { name: 'description', content: 'Learn about Sapa Paragliding - your trusted partner for unforgettable flying experiences in Sapa, Vietnam' }
  ]
})
</script>
