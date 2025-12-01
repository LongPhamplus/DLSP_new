<template>
  <div class="min-h-screen bg-gray-50">
    
    <main class="py-12">
      <article v-if="post" class="container-custom max-w-4xl">
        <!-- Back Button -->
        <button @click="goBack" class="mb-6 text-green-600 hover:text-green-700 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          {{ $t('buttons.back') }}
        </button>

        <!-- Post Header -->
        <header class="mb-8">
          <div class="mb-4">
            <span class="inline-block px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
              {{ post.category }}
            </span>
          </div>
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            {{ currentLocale === 'vi' ? post.titleVi : post.title }}
          </h1>
          <div class="flex items-center text-gray-600 text-sm space-x-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              {{ post.author }}
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              {{ formatDate(post.date) }}
            </div>
          </div>
        </header>

        <!-- Featured Image -->
        <div class="mb-8 rounded-xl overflow-hidden shadow-lg">
          <img :src="post.image" :alt="currentLocale === 'vi' ? post.titleVi : post.title" class="w-full h-96 object-cover" />
        </div>

        <!-- Post Content -->
        <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div class="prose prose-lg max-w-none" v-html="currentLocale === 'vi' ? post.contentVi : post.content"></div>
        </div>

        <!-- Related Posts -->
        <section v-if="relatedPosts.length > 0" class="mt-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ $t('posts.relatedPosts') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="relatedPost in relatedPosts"
              :key="relatedPost.id"
              @click="navigateToPost(relatedPost.id)"
              class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
            >
              <img :src="relatedPost.image" :alt="currentLocale === 'vi' ? relatedPost.titleVi : relatedPost.title" class="w-full h-48 object-cover" />
              <div class="p-4">
                <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {{ currentLocale === 'vi' ? relatedPost.titleVi : relatedPost.title }}
                </h3>
                <p class="text-sm text-gray-600 line-clamp-2">
                  {{ currentLocale === 'vi' ? relatedPost.excerptVi : relatedPost.excerpt }}
                </p>
              </div>
            </div>
          </div>
        </section>
      </article>

      <!-- Post Not Found -->
      <div v-else class="container-custom text-center py-20">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ $t('posts.notFound') }}</h2>
        <button @click="goBack" class="btn-primary">
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
.prose {
  color: #374151;
}

.prose h2 {
  font-size: 1.875rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #111827;
}

.prose h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #1f2937;
}

.prose p {
  margin-bottom: 1rem;
  line-height: 1.75;
}

.prose ul {
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
</style>
