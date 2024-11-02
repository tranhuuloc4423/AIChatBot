import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://ai-chat-bot-8o57.vercel.app',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default instance
