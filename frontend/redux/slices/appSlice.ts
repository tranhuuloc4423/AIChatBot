import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState, Conversation, User } from '../../types/app'

const initialState: AppState = {
  user: {
    email: null,
    password: null,
    conversations: [],
    language: 'english'
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
    },
    loginSuccess: (state, action) => {
      // console.log(action.payload)
      state.token = action.payload.token
      state.user = action.payload.user
    },
    logout: (state) => {
      state.token = null
      state.user = {
        conversations: [],
        email: null,
        password: null,
        language: 'english'
      }
    },
    setLanguage: (state, action) => {
      state.user.language = action.payload
    }
  }
})

export const {
  setUser,
  setToken,
  setNewConversation,
  loginSuccess,
  logout,
  setLanguage
} = appSlice.actions

export default appSlice.reducer
