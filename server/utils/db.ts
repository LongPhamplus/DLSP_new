import { MongoClient, Db, Collection, ObjectId } from 'mongodb'

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const dbName = process.env.MONGODB_DB || 'sapa_paragliding'

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  try {
    const client = new MongoClient(mongoUrl)
    await client.connect()
    const db = client.db(dbName)
    
    cachedClient = client
    cachedDb = db
    
    console.log('Connected to MongoDB')
    return { client, db }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
}

export async function getPostsCollection(): Promise<Collection> {
  const { db } = await connectToDatabase()
  return db.collection('posts')
}

export async function getAllPosts(filter: any = {}) {
  const collection = await getPostsCollection()
  const posts = await collection.find(filter).sort({ date: -1 }).toArray()
  
  // Ensure all posts have an id field (use _id as fallback)
  return posts.map(post => ({
    ...post,
    id: post.id || post._id?.toString()
  }))
}

export async function getPostById(id: string) {
  const collection = await getPostsCollection()
  let post = await collection.findOne({ id })
  
  // If not found by id field, try by _id (for posts created without id field)
  if (!post) {
    try {
      post = await collection.findOne({ _id: new ObjectId(id) })
      // If found by _id, ensure it has an id field
      if (post) {
        post.id = post.id || post._id?.toString()
      }
    } catch (e) {
      // Not a valid ObjectId, return null
      return null
    }
  }
  
  return post
}

export async function createPost(postData: any) {
  const collection = await getPostsCollection()
  const newPost = {
    ...postData,
    id: postData.id || Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
  await collection.insertOne(newPost)
  return newPost
}

export async function updatePost(id: string, updateData: any) {
  const collection = await getPostsCollection()
  const result = await collection.findOneAndUpdate(
    { id },
    {
      $set: {
        ...updateData,
        updatedAt: new Date()
      }
    },
    { returnDocument: 'after' }
  )
  return result?.value || null
}

export async function deletePost(id: string) {
  const collection = await getPostsCollection()
  const result = await collection.deleteOne({ id })
  return result.deletedCount > 0
}

export async function getPostsByCategory(category: string) {
  const collection = await getPostsCollection()
  return collection.find({ category, published: true }).sort({ date: -1 }).toArray()
}
