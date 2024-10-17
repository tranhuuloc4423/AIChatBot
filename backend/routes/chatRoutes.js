import express from 'express'
import {
  newConversation,
  getAllConversations,
  getConversationById,
  updateTitle,
  removeConversation,
  handleChat
} from '../controllers/chatControllers.js'

const router = express.Router()

router.post('/new-chat', newConversation)
router.post('/send-message', handleChat)
router.get('/history', getAllConversations)
router.get('/history/:conversationId', getConversationById)
router.put('/title/:conversationId', updateTitle)
router.delete('/remove/:conversationId', removeConversation)

export default router
