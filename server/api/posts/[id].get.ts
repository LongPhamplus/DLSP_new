// Get a single post by ID
import { getPostById } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Post ID is required'
    })
  }

  try {
    const post = await getPostById(id)
    console.log(`Looking for post with id: ${id}`)
    console.log('Found post:', post)

    if (!post) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Post not found'
      })
    }

    return {
      success: true,
      data: post
    }
  } catch (error: any) {
    if (error.statusCode === 404) {
      throw error
    }
    console.error('Error fetching post:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch post'
    })
  }
})
