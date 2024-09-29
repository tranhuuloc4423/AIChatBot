import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { CohereClientV2 } from 'cohere-ai'
import authRoutes from './routes/authRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import { verifyToken } from './controllers/authControllers.js'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/chat', verifyToken, chatRoutes)

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY
})

mongoose
  .connect(
    process.env.MONGODB_URI ||
      'mongodb+srv://admin:123@cluster111.spvzwma.mongodb.net/',
    {}
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

export const cohereApiCall = async (message) => {
  try {
    const response = await cohere.chat({
      model: 'command-r-plus',
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    })
    // console.log('Cohere API response:', response.message.content)
    return response
  } catch (err) {
    return { success: false, msg: 'Cohere API call failed' }
  }
}
