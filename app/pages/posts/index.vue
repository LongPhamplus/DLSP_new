<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ $t('posts.latestPosts') }}</h1>
        <p class="text-lg text-green-100">{{ $t('posts.latestPostsDescription') }}</p>
      </div>
    </section>

    <!-- Main Content -->
    <main class="py-16">
      <div class="container-custom">
        <!-- Filters -->
        <div class="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div class="flex gap-2 flex-wrap">
            <button
              @click="selectedCategory = null"
              :class="[
                'px-4 py-2 rounded-lg font-semibold transition-all',
                selectedCategory === null
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-green-600'
              ]"
            >
              {{ currentLocale === 'vi' ? 'Tất cả' : 'All' }}
            </button>
            <button
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = category"
              :class="[
                'px-4 py-2 rounded-lg font-semibold transition-all',
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-green-600'
              ]"
            >
              {{ category }}
            </button>
          </div>

          <!-- Sort Dropdown -->
          <select
            v-model="sortBy"
            class="px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 bg-white hover:border-green-600 transition-all"
          >
            <option value="newest">{{ currentLocale === 'vi' ? 'Mới nhất' : 'Newest' }}</option>
            <option value="oldest">{{ currentLocale === 'vi' ? 'Cũ nhất' : 'Oldest' }}</option>
          </select>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-12">
          <div class="inline-block">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
          <p class="mt-4 text-gray-600">{{ currentLocale === 'vi' ? 'Đang tải...' : 'Loading...' }}</p>
        </div>

        <!-- Posts Grid -->
        <div v-else-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="post in filteredPosts"
            :key="post.id"
            @click="navigateToPost(post.id)"
            class="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
          >
            <!-- Image Container -->
            <div class="relative h-56 overflow-hidden bg-gradient-to-br from-green-400 to-green-600">
              <img
                :src="post.image"
                :alt="currentLocale === 'vi' ? post.titleVi : post.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <!-- Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <!-- Category Badge -->
              <div class="absolute top-4 right-4">
                <span class="px-3 py-1 text-xs font-bold text-white bg-green-600 rounded-full shadow-lg">
                  {{ post.category }}
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 flex flex-col h-full">
              <!-- Date -->
              <div class="flex items-center text-sm text-gray-500 mb-3">
                <svg class="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(post.date) }}
              </div>

              <!-- Title -->
              <h2 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                {{ currentLocale === 'vi' ? post.titleVi : post.title }}
              </h2>

              <!-- Excerpt -->
              <p class="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                {{ currentLocale === 'vi' ? post.excerptVi : post.excerpt }}
              </p>

              <!-- Author -->
              <div class="flex items-center text-sm text-gray-500 pt-4 border-t border-gray-200">
                <svg class="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {{ post.author }}
              </div>

              <!-- Read More Button -->
              <div class="mt-4">
                <span class="text-green-600 font-semibold text-sm hover:text-green-700">
                  {{ currentLocale === 'vi' ? 'Đọc thêm →' : 'Read More →' }}
                </span>
              </div>
            </div>
          </article>
        </div>

        <!-- No Posts Found -->
        <div v-else class="text-center py-20">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            {{ currentLocale === 'vi' ? 'Không có bài viết' : 'No Posts Found' }}
          </h2>
          <p class="text-gray-600">
            {{ currentLocale === 'vi' ? 'Không tìm thấy bài viết nào phù hợp với bộ lọc của bạn.' : 'No posts match your filters.' }}
          </p>
        </div>

        <!-- Pagination Info -->
        <div v-if="filteredPosts.length > 0" class="mt-12 text-center text-gray-600">
          <p>
            {{ currentLocale === 'vi' ? `Hiển thị ${filteredPosts.length} bài viết` : `Showing ${filteredPosts.length} posts` }}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts'
import type { Post } from '~/stores/posts'

const { locale, t } = useI18n()
const router = useRouter()
const postsStore = usePostsStore()

const currentLocale = computed(() => locale.value || 'vi')
const isLoading = ref(false)
const selectedCategory = ref<string | null>(null)
const sortBy = ref<'newest' | 'oldest'>('newest')

// Fetch posts on mount
onMounted(async () => {
  isLoading.value = true
  try {
    if (postsStore.posts.length === 0) {
      await postsStore.fetchPosts()
    }
  } catch (err) {
    console.error('Error fetching posts:', err)
  } finally {
    isLoading.value = false
  }
})

// Get unique categories
const categories = computed(() => {
  const cats = new Set<string>()
  postsStore.publishedPosts.forEach(post => {
    if (post.category) {
      cats.add(post.category)
    }
  })
  return Array.from(cats).sort()
})

// Filter and sort posts
const filteredPosts = computed(() => {
  let posts = [...postsStore.publishedPosts]

  // Filter by category
  if (selectedCategory.value) {
    posts = posts.filter(p => p.category === selectedCategory.value)
  }

  // Sort
  if (sortBy.value === 'newest') {
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } else {
    posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  return posts
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

const navigateToPost = (id: string) => {
  localizedNavigateTo(`/posts/${id}`)
}

// Set page title
useHead({
  title: computed(() => t('posts.latestPosts'))
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 3;
}
</style>
