export interface Message {
  role: 'user' | 'assistant'
  content: string
  conversationId: string
}
export interface Conversation {
  id: string
  message: Message[]
}

export interface User {
  email: string | null
  password: string | null
  conversations: string[]
}

export interface AppState {
  user: User
  token: string | null
}
