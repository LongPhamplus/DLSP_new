<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
    <!-- Back to Home Button -->
    <button 
      @click="localizedNavigateTo('/')" 
      class="fixed top-4 left-4 flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-700 hover:text-green-600"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
      </svg>
      <span class="font-medium">{{ $t('buttons.backToHome') }}</span>
    </button>

    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{ $t('admin.login.title') }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          {{ $t('admin.login.subtitle') }}
        </p>
      </div>
      
      <form class="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg" @submit.prevent="handleLogin">
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {{ error }}
        </div>
        
        <div class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('admin.login.username') }}
            </label>
            <input
              id="username"
              v-model="username"
              type="text"
              required
              class="input-field"
              :placeholder="$t('admin.login.usernamePlaceholder')"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('admin.login.password') }}
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="input-field"
              :placeholder="$t('admin.login.passwordPlaceholder')"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary disabled:opacity-50"
          >
            <span v-if="!loading">{{ $t('admin.login.submit') }}</span>
            <span v-else>{{ $t('admin.login.loading') }}</span>
          </button>
        </div>
        
        <div class="text-center text-sm text-gray-500">
          <p>{{ $t('admin.login.demo') }}</p>
          <p class="mt-1 font-mono text-xs">Username: admin | Password: admin123</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { usePostsStore } from '~/stores/posts'

const { locale } = useI18n()
const router = useRouter()
const postsStore = usePostsStore()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const localizedNavigateTo = (path: string) => {
  const currentLocale = locale.value || 'vi'
  const fullPath = currentLocale === 'vi' ? path : `/${currentLocale}${path}`
  
  nextTick(() => {
    router.push(fullPath)
  })
}

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  
  try {
    // Call API to authenticate
    const response = await $fetch<any>('/api/admin/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    })

    if (response?.success && response?.token && response?.admin) {
      // Store token in localStorage
      localStorage.setItem('adminToken', response.token)
      localStorage.setItem('adminUsername', response.admin.username)
      
      // Update store
      postsStore.login(username.value, password.value)
      
      // Navigate to dashboard
      localizedNavigateTo('/admin/dashboard')
    } else {
      error.value = response?.error || 'Invalid username or password'
    }
  } catch (e) {
    error.value = 'Invalid username or password'
    console.error('Login error:', e)
  } finally {
    loading.value = false
  }
}

// Redirect if already logged in
onMounted(() => {
  if (postsStore.isAdmin) {
    localizedNavigateTo('/admin/dashboard')
  }
})
</script>
