import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String },
    messageIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
  },
  { timestamps: true }
)

export const Conversation = mongoose.model('Conversation', conversationSchema)
