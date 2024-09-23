import express from 'express'
import { apiCall } from './index.js'
const app = express()
app.use(express.json())

app.post('/apiCall', async (req, res) => {
  const { prompt, messages } = req.body
  const result = await apiCall(prompt, messages)
  res.json(result)
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
