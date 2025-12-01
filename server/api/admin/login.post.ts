import { MongoClient } from 'mongodb'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { username, password } = body

    // Validate input
    if (!username || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Username and password are required'
      })
    }

    // MongoDB connection
    const mongoUri = 'mongodb://admin:admin123@localhost:27018/sapa_paragliding?authSource=admin'
    const client = new MongoClient(mongoUri)

    try {
      await client.connect()
      const db = client.db('sapa_paragliding')
      const adminsCollection = db.collection('admins')

      // Find admin user
      const admin = await adminsCollection.findOne({ username })

      if (!admin) {
        return {
          success: false,
          error: 'Invalid username or password'
        }
      }

      // Verify password (in production, use bcrypt for hashing)
      if (admin.password !== password) {
        return {
          success: false,
          error: 'Invalid username or password'
        }
      }

      // Generate token
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64')

      return {
        success: true,
        message: 'Login successful',
        token,
        admin: {
          username: admin.username,
          role: admin.role || 'admin'
        }
      }
    } finally {
      await client.close()
    }
  } catch (error) {
    console.error('Admin login error:', error)
    
    return {
      success: false,
      error: 'Login failed. Please try again.'
    }
  }
})
