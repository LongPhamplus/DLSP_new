import { MongoClient } from 'mongodb'

export default defineEventHandler(async (event) => {
  try {
    const mongoUri = 'mongodb://admin:admin123@localhost:27018/sapa_paragliding?authSource=admin'
    const client = new MongoClient(mongoUri)

    try {
      await client.connect()
      const db = client.db('sapa_paragliding')
      const postsCollection = db.collection('posts')

      // Get all posts sorted by date (newest first)
      const posts = await postsCollection
        .find({})
        .sort({ date: -1 })
        .toArray()

      return {
        success: true,
        posts: posts.map(post => ({
          id: post._id.toString(),
          title: post.title,
          titleVi: post.titleVi,
          excerpt: post.excerpt,
          excerptVi: post.excerptVi,
          content: post.content,
          contentVi: post.contentVi,
          image: post.image,
          author: post.author,
          category: post.category,
          date: post.date,
          published: post.published
        }))
      }
    } finally {
      await client.close()
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return {
      success: false,
      error: 'Failed to fetch posts'
    }
  }
})
