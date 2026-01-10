<template>
  <div class="min-h-screen bg-gray-50 font-sans">

    <main class="py-12 md:py-20 px-4 sm:px-6">
      <article v-if="post" class="container-custom max-w-4xl mx-auto">

        <!-- Navigation -->
        <nav class="flex justify-between items-center mb-12">
          <button @click="goBack"
            class="group inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300">
            <svg class="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {{ $t('buttons.back') }}
          </button>
        </nav>

        <!-- Post Header -->
        <header class="max-w-3xl mx-auto text-center mb-16">
          <div class="inline-flex items-center justify-center mb-6">
            <span
              class="px-3 py-1 text-xs font-bold tracking-wide text-gray-900 bg-white border border-gray-200 rounded-full shadow-sm uppercase">
              {{ post.category }}
            </span>
          </div>

          <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
            {{ currentLocale === 'vi' ? post.titleVi : post.title }}
          </h1>

          <div class="flex items-center justify-center space-x-2">
            <div class="flex items-center p-1 pr-4 bg-white rounded-full border border-gray-200 shadow-sm">
              <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Admin&background=000000&color=fff" alt="Author"
                  class="w-full h-full object-cover" />
              </div>
              <div class="flex flex-col text-left">
                <span class="text-xs font-bold text-gray-900 leading-none">{{ post.author }}</span>
                <span class="text-[10px] text-gray-500 font-medium pt-0.5">Author</span>
              </div>
            </div>

            <div
              class="hidden sm:flex items-center px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm text-xs font-medium text-gray-500">
              <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ formatDate(post.date) }}
            </div>
          </div>
        </header>

        <!-- Featured Image -->
        <div class="mb-16 relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-200 border border-gray-100">
          <div class="aspect-video w-full bg-gray-100">
            <img :src="post.image" :alt="currentLocale === 'vi' ? post.titleVi : post.title"
              class="w-full h-full object-cover" />
          </div>
        </div>

        <!-- Post Content -->
        <div
          class="prose prose-lg prose-slate max-w-prose mx-auto prose-headings:font-bold prose-headings:tracking-tight prose-a:text-red-600 hover:prose-a:text-red-700 prose-img:rounded-2xl prose-img:shadow-lg">
          <div v-html="currentLocale === 'vi' ? post.contentVi : post.content"></div>
        </div>

        <hr class="my-16 border-gray-200 max-w-3xl mx-auto" />

        <!-- Related Posts -->
        <section v-if="relatedPosts.length > 0" class="max-w-5xl mx-auto">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-2xl font-bold text-gray-900 tracking-tight">{{ $t('posts.relatedPosts') }}</h2>
            <button @click="localizedNavigateTo('/posts')"
              class="text-sm font-semibold text-red-600 hover:text-red-700">
              {{ currentLocale === 'vi' ? 'Xem tất cả' : 'View all' }} &rarr;
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="relatedPost in relatedPosts" :key="relatedPost.id" @click="navigateToPost(relatedPost.id)"
              class="group cursor-pointer">
              <!-- Simple Card for Related -->
              <div
                class="relative aspect-[16/10] bg-gray-100 rounded-xl overflow-hidden mb-4 border border-gray-200 group-hover:shadow-lg transition-all duration-300">
                <img :src="relatedPost.image" :alt="currentLocale === 'vi' ? relatedPost.titleVi : relatedPost.title"
                  class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                {{ currentLocale === 'vi' ? relatedPost.titleVi : relatedPost.title }}
              </h3>
              <p class="text-sm text-gray-500 line-clamp-2">
                {{ currentLocale === 'vi' ? relatedPost.excerptVi : relatedPost.excerpt }}
              </p>
            </div>
          </div>
        </section>
      </article>

      <!-- Post Not Found -->
      <div v-else class="flex flex-col items-center justify-center py-32 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ $t('posts.notFound') }}</h2>
        <button @click="goBack"
          class="px-6 py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20">
          {{ $t('buttons.back') }}
        </button>
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts'
import type { Post } from '~/stores/posts'

const { locale } = useI18n()
const route = useRoute()
const router = useRouter()
const postsStore = usePostsStore()

const currentLocale = computed(() => locale.value || 'vi')
const postId = route.params.id as string
const post = ref<Post | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

// Fetch single post by ID on mount
onMounted(async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await $fetch<{ success: boolean; data: Post }>(`/api/posts/${postId}`)
    post.value = response.data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load post'
    console.error('Error fetching post:', err)
  } finally {
    isLoading.value = false
  }
})

// Fetch related posts from store
onMounted(async () => {
  if (postsStore.posts.length === 0) {
    await postsStore.fetchPosts()
  }
})

const relatedPosts = computed(() => {
  if (!post.value) return []
  return postsStore.publishedPosts
    .filter(p => p.id !== post.value?.id && p.category === post.value?.category)
    .slice(0, 3)
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(currentLocale.value === 'vi' ? 'vi-VN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const localizedNavigateTo = (path: string) => {
  const fullPath = currentLocale.value === 'vi' ? path : `/${currentLocale.value}${path}`
  router.push(fullPath)
}

const goBack = () => {
  router.back()
}

const navigateToPost = (id: string) => {
  localizedNavigateTo(`/posts/${id}`)
}

// Set page title
useHead({
  title: computed(() => post.value ? (currentLocale.value === 'vi' ? post.value.titleVi : post.value.title) : 'Post Not Found')
})
</script>

<style scoped>
/* Customize typography plugin defaults if needed */
.prose {
  --tw-prose-body: #4b5563;
  --tw-prose-headings: #111827;
  --tw-prose-links: #dc2626;
  --tw-prose-bold: #111827;
}
</style>
