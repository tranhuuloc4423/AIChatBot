import { Conversation } from '../models/Conversation.js'
import { User } from '../models/User.js'
import { Message } from '../models/Message.js'
import {
  pollinationsImageApiCall,
  pollinationsTextApiCall
} from '../utils/api.js'

export const newConversation = async (req, res) => {
  const { email, title } = req.body

  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }

    const newConversation = new Conversation({
      user: user._id,
      title: title || 'Untitled',
      messageIds: []
    })

    await newConversation.save()

    user.conversations.push(newConversation._id)
    await user.save()

    res.json({
      success: true,
      conversationId: newConversation._id,
      title: newConversation.title
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const handleChat = async (req, res) => {
  const { conversationId, message, type } = req.body

  try {
    let result

    // kiểm trả type là text hay image
    if (type === 'image') {
      result = await pollinationsImageApiCall(message)
    } else {
      result = await pollinationsTextApiCall(message)
    }

    // thêm vào conversation
    if (result) {
      const userMessage = await Message.create({
        role: 'user',
        content: message,
        type: 'text',
        conversation: conversationId
      })

      const assistantMessage = await Message.create({
        role: 'assistant',
        content: result,
        type: type,
        conversation: conversationId
      })

      // Cập nhật ID của các tin nhắn vào cuộc hội thoại
      const conversation = await Conversation.findByIdAndUpdate(
        conversationId,
        {
          $push: {
            messageIds: {
              $each: [userMessage._id, assistantMessage._id]
            }
          }
        },
        { new: true }
      )

      if (!conversation) {
        return res
          .status(404)
          .json({ success: false, msg: 'Conversation not found' })
      }

      // Trả về các tin nhắn mới (của assistant) cùng với ID
      return res.status(200).json({
        success: true,
        assistantMessage: assistantMessage.content
      })
    } else {
      return res
        .status(500)
        .json({ success: false, msg: 'Pollinations API call failed' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const getAllConversations = async (req, res) => {
  const { email } = req.query

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }

    // Lấy tất cả các cuộc hội thoại của người dùng và populate tin nhắn
    const conversations = await Conversation.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: 'messageIds',
        select: 'role content type' // Chỉ lấy trường cần thiết
      })

    res.json(conversations)
  } catch (err) {
    console.error('Error while fetching conversations:', err)
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const getConversationById = async (req, res) => {
  const { conversationId } = req.params

  try {
    const conversation = await Conversation.findById(conversationId).populate({
      path: 'messageIds',
      select: 'role content type' // Chỉ lấy trường cần thiết
    })

    if (!conversation) {
      return res.status(404).json({ msg: 'Conversation not found' })
    }

    res.json(conversation)
  } catch (err) {
    console.error('Error while fetching conversation by ID:', err)
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const updateTitle = async (req, res) => {
  const { conversationId } = req.params
  const { title } = req.body

  try {
    const conversation = await Conversation.findByIdAndUpdate(
      conversationId,
      { title: title },
      { new: true }
    )

    if (!conversation) {
      return res.status(404).json({ msg: 'Conversation not found' })
    }

    res.json({ success: true, updatedTitle: conversation.title })
  } catch (error) {
    console.error('Error while updating conversation title:', error)
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const removeConversation = async (req, res) => {
  const { conversationId } = req.params

  try {
    const conversation = await Conversation.findByIdAndDelete(conversationId)

    if (!conversation) {
      return res.status(404).json({ msg: 'Conversation not found' })
    }

    res.json({ success: true, msg: 'remove succesfull' })
  } catch (error) {
    console.error('Error while remove conversation :', error)
    res.status(500).json({ msg: 'Internal server error' })
  }
}
