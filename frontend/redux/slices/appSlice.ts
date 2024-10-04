import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState, Conversation, User } from '../../types/app'

const initialState: AppState = {
  user: {
    email: null,
    password: null,
    conversations: []
  },
  token: null
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload
    },
    setNewConversation: (state, action: PayloadAction<string>) => {
      state.user.conversations.push(action.payload)
    }
  }
})

export const { setUser, setToken, setNewConversation } = appSlice.actions

export default appSlice.reducer
