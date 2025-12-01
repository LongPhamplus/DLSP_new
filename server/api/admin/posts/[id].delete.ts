import { MongoClient, ObjectId } from 'mongodb'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    // Validate ID
    if (!id || !ObjectId.isValid(id)) {
      return {
        success: false,
        error: 'Invalid post ID'
      }
    }

    const mongoUri = 'mongodb://admin:admin123@localhost:27018/sapa_paragliding?authSource=admin'
    const client = new MongoClient(mongoUri)

    try {
      await client.connect()
      const db = client.db('sapa_paragliding')
      const postsCollection = db.collection('posts')

      const result = await postsCollection.deleteOne({ _id: new ObjectId(id) })

      if (result.deletedCount === 0) {
        return {
          success: false,
          error: 'Post not found'
        }
      }

      return {
        success: true,
        message: 'Post deleted successfully'
      }
    } finally {
      await client.close()
    }
  } catch (error) {
    console.error('Error deleting post:', error)
    return {
      success: false,
      error: 'Failed to delete post'
    }
  }
})
