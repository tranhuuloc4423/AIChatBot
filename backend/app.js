import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from './models/User.js'
import { Conversation } from './models/Conversation.js'

dotenv.config()

const app = express()
app.use(express.json())

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]
  if (!token) return res.status(401).json({ msg: 'Access denied' })

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (err) {
    res.status(400).json({ msg: 'Invalid token' })
  }
}

app.post('/register', async (req, res) => {
  const { username, password } = req.body
  try {
    const existingUser = await User.findOne(username)
    if (existingUser)
      return res.status(400).json({ msg: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = await User.create(username, hashedPassword)

    res.status(201).json({ msg: 'User registered successfully', userId })
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error' })
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne(username)
    if (!user) return res.status(404).json({ msg: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    res.json({ token })
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error' })
  }
})

app.post('/apiCall', authenticateToken, async (req, res) => {
  const { prompt, messages } = req.body
  const userId = req.user.userId

  const result = await apiCall(prompt, messages)

  if (result.success) {
    await Conversation.findOneAndUpdate(
      userId,
      { messages: { role: 'user', content: prompt } },
      { upsert: true }
    )

    res.json(result)
  } else {
    res.status(500).json({ success: false, msg: 'API call failed' })
  }
})

app.get('/history', authenticateToken, async (req, res) => {
  const userId = req.user.userId

  try {
    const conversations = await Conversation.find({ userId })
    res.json(conversations)
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error' })
  }
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
