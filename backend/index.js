import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import authRoutes from './routes/authRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import { verifyToken } from './controllers/authControllers.js'

dotenv.config()

const app = express()
app.use(express.json({ limit: '100mb' }))

app.use('/auth', authRoutes)
app.use('/chat', verifyToken, chatRoutes)

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
