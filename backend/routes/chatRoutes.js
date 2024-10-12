import express from 'express'
import {
  handleChat,
  newConversation,
  getAllConversations,
  getConversationById,
  updateTitle
} from '../controllers/chatControllers.js'

const router = express.Router()

router.post('/new-chat', newConversation)
router.post('/send-message', handleChat)
router.get('/history', getAllConversations)
router.get('/history/:conversationId', getConversationById)
router.put('/title/:conversationId', updateTitle)

export default router
