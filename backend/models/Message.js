import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true
    }
  },
  { timestamps: true }
)

export const Message = mongoose.model('Message', messageSchema)
