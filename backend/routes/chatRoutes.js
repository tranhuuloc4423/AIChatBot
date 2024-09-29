import express from 'express'
import {
  handleChat,
  newConversation,
  getAllConversations,
  getConversationById
} from '../controllers/chatControllers.js'

const router = express.Router()

router.post('/new-chat', newConversation)
router.post('/send-message', handleChat)
router.get('/history/all', getAllConversations)
router.get('/history/:conversationId', getConversationById)

export default router
