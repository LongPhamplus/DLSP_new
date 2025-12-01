// Get all published posts
import { getAllPosts } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const posts = await getAllPosts({ published: true })
    console.log('All published posts:', posts.map((p: any) => ({ id: p.id, title: p.title })))
    
    return {
      success: true,
      data: posts,
      total: posts.length
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch posts'
    })
  }
})
