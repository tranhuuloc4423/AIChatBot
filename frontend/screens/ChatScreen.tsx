// screens/ChatScreen.tsx
import { View, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { RouterProps } from '../types/navigation'
import { useAppSelector } from '../redux/customHooks'
import { createNewConversation, getConversation } from '../redux/api/app'
import ChatHeader from '../components/ChatHeader'
import MessageList from '../components/MessageList'
import MessageInput from '../components/MessageInput'
import axios from '../axiosInstance'
import langs, { Langs } from '../utils/langs'

const ChatScreen = ({ navigation, route }: RouterProps) => {
  const { language, token, user } = useAppSelector((state) => state.app)
  const conversationId = route?.params?.conversationId || null
  const title = route?.params?.title || null
  const { text_started } = langs[language as keyof Langs]?.chat

  const [messages, setMessages] = useState([
    { content: text_started, role: 'assistant' }
  ])
  const [text, setText] = useState('')
  const [id, setId] = useState()
  const [currentTitle, setCurrentTitle] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const getConversationById = async (conversationId: any) => {
    try {
      const result = await getConversation(conversationId, token)
      setMessages(result?.messageIds)
    } catch (error) {
      console.log(error)
    }
  }

  const createConversation = async () => {
    try {
      const data = {
        email: user.email
      }
      const res = await createNewConversation(data, token)
      setId(res?.conversationId)
      setCurrentTitle(res?.title)
    } catch (error) {
      console.log(error)
    }
  }

  const updateTitle = async () => {
    try {
      await axios.put(
        `/chat/title/${id}`,
        { title: currentTitle },
        {
          headers: {
            Authorization: token
          }
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleSaveTitle = () => {
    updateTitle()
    setIsEditing(false)
  }

  const handleSendMessage = async () => {
    if (text.trim() === '') return
    const userMessage = { content: text, role: 'user' }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setText('')

    const assistantLoadingMessage = {
      content: 'is typing',
      role: 'assistant'
    }
    setMessages((prevMessages) => [...prevMessages, assistantLoadingMessage])
    setLoading(true)

    try {
      const res = await axios.post(
        '/chat/send-message',
        { conversationId: id, message: text },
        {
          headers: {
            Authorization: token
          }
        }
      )

      const assistantMessage = {
        content: res.data.assistantMessage,
        role: 'assistant'
      }

      setMessages((prevMessages) =>
        prevMessages?.map((msg) =>
          msg.role === 'assistant' && msg.content === 'is typing'
            ? assistantMessage
            : msg
        )
      )
    } catch (error) {
      console.log('API error:', error)
      setMessages((prevMessages) =>
        prevMessages?.map((msg) =>
          msg.role === 'assistant' && msg.content === 'is typing'
            ? { ...msg, content: 'Error in response from API' }
            : msg
        )
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (conversationId && title) {
      getConversationById(conversationId)
      setId(conversationId)
      setCurrentTitle(title)
    }
    if (conversationId == null || title == null) {
      createConversation()
      setCurrentTitle('Untitled')
    }
  }, [conversationId])

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={0}
      className="bg-black-100 flex-1 justify-between h-screen w-screen pt-8"
    >
      <ChatHeader
        currentTitle={currentTitle}
        setCurrentTitle={setCurrentTitle}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleSaveTitle={handleSaveTitle}
        goBack={() => navigation.goBack()}
      />
      <MessageList messages={messages} loading={loading} />
      <MessageInput
        text={text}
        setText={setText}
        handleSendMessage={handleSendMessage}
      />
    </KeyboardAvoidingView>
  )
}

export default ChatScreen
