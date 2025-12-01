import { MongoClient, ObjectId } from 'mongodb'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const { title, titleVi, excerpt, excerptVi, content, contentVi, image, author, category, date, published } = body

    // Validate ID
    if (!id || !ObjectId.isValid(id)) {
      return {
        success: false,
        error: 'Invalid post ID'
      }
    }

    // Validate required fields
    if (!title || !titleVi || !excerpt || !excerptVi || !content || !contentVi || !author || !category) {
      return {
        success: false,
        error: 'Missing required fields'
      }
    }

    const mongoUri = 'mongodb://admin:admin123@localhost:27018/sapa_paragliding?authSource=admin'
    const client = new MongoClient(mongoUri)

    try {
      await client.connect()
      const db = client.db('sapa_paragliding')
      const postsCollection = db.collection('posts')

      const updateData = {
        title,
        titleVi,
        excerpt,
        excerptVi,
        content,
        contentVi,
        image,
        author,
        category,
        date: date || new Date().toISOString().split('T')[0],
        published: published || false,
        updatedAt: new Date()
      }

      const result = await postsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      )

      if (result.matchedCount === 0) {
        return {
          success: false,
          error: 'Post not found'
        }
      }

      return {
        success: true,
        message: 'Post updated successfully',
        post: {
          id,
          ...updateData
        }
      }
    } finally {
      await client.close()
    }
  } catch (error) {
    console.error('Error updating post:', error)
    return {
      success: false,
      error: 'Failed to update post'
    }
  }
})
