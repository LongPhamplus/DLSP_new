import { MongoClient, ObjectId } from 'mongodb'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { title, titleVi, excerpt, excerptVi, content, contentVi, image, author, category, date, published } = body

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

      const newPost = {
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
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const result = await postsCollection.insertOne(newPost)

      return {
        success: true,
        message: 'Post created successfully',
        post: {
          id: result.insertedId.toString(),
          ...newPost
        }
      }
    } finally {
      await client.close()
    }
  } catch (error) {
    console.error('Error creating post:', error)
    return {
      success: false,
      error: 'Failed to create post'
    }
  }
})
