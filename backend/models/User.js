import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  conversations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }]
})

export const User = mongoose.model('User', userSchema)
