import React, { useState, useEffect, useCallback, useRef } from 'react'
import { View, KeyboardAvoidingView, Alert, Button, Text } from 'react-native'

import { RouterProps } from '../types/navigation'
import { useAppSelector } from '../redux/customHooks'
import { createNewConversation, getConversation } from '../redux/api/app'
import ChatHeader from '../components/ChatHeader'
import MessageInput from '../components/MessageInput'
import axios from '../axiosInstance'
import langs, { Langs } from '../utils/langs'
import { useFocusEffect } from '@react-navigation/native'
import MessageList from '../components/MessageList'

const ChatScreen = ({ navigation, route }: RouterProps) => {
  const { language, token, user } = useAppSelector((state) => state.app)
  const { conversationId, title, image }: any = route?.params
  const { update_title } = langs[language as keyof Langs]?.chat
  const [messages, setMessages] = useState<
    Array<{ content: string; role: string; type: string }>
  >([])

  // input
  const [text, setText] = useState('')
  const [blocks, setBlocks] = useState<string[]>([])

  const [id, setId] = useState()
  const [currentTitle, setCurrentTitle] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [type, setType] = useState('text')
  const [inputHeight, setInputHeight] = useState(0)

  // record

  // const webAudioPermissionsRef = useRef<MediaStream | null>(null)

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout
    setInputHeight(height)
  }

  const getConversationById = async () => {
    try {
      const result = await getConversation(conversationId, token)
      console.log(result)
      setMessages(result)
    } catch (error) {
      console.log(error)
    }
  }

  const createConversation = async () => {
    try {
      const data = { email: user.email }
      const res = await createNewConversation(data, token)
      setId(res?.conversationId)
      setCurrentTitle(res?.title)
    } catch (error: string | any) {
      console.log(error?.message)
    }
  }

  const updateTitle = async () => {
    try {
      await axios.put(
        `/chat/title/${id}`,
        { title: currentTitle },
        { headers: { Authorization: token } }
      )
      Alert.alert(update_title)
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
    const userMessage = { content: text, role: 'user', type: 'text' }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setText('')

    const assistantLoadingMessage = {
      content: 'is typing',
      role: 'assistant',
      type: 'text'
    }
    setMessages((prevMessages) => [...prevMessages, assistantLoadingMessage])
    setLoading(true)

    try {
      const res = await axios.post(
        '/chat/send-message',
        { conversationId: id, message: text, type: type },
        { headers: { Authorization: token } }
      )

      const assistantMessage = {
        content: res.data.assistantMessage,
        role: 'assistant',
        type: type
      }

      setMessages((prevMessages) =>
        prevMessages?.map((msg) =>
          msg.role === 'assistant' && msg.content === 'is typing'
            ? { ...assistantMessage, type: type }
            : msg
        )
      )
    } catch (error) {
      console.log('API error:', error)
      setMessages((prevMessages) =>
        prevMessages?.map((msg) =>
          msg.role === 'assistant' && msg.content === 'is typing'
            ? { ...msg, content: 'Error in response from API', type: 'text' }
            : msg
        )
      )
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      // Reset state khi vào màn hình
      setMessages([])
      setText('')
      setId(undefined)
      setCurrentTitle('')

      if (conversationId || title) {
        setId(conversationId)
        setCurrentTitle(title)
        getConversationById()
      } else {
        createConversation()
      }
      console.log('Conversation ID:', id)
      console.log('title :', currentTitle)
      console.log('message:', messages)

      // Clean-up function
      return () => {}
    }, [conversationId, title])
  )

  useEffect(() => {
    if (blocks.includes('image')) {
      setType('image')
    } else {
      setType('text')
    }
  }, [blocks])

  useEffect(() => {
    if (image) {
      setBlocks(['image'])
      setType('image')
    } else {
      setBlocks([])
      setType('text')
    }
  }, [image])

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={inputHeight}
      className="bg-black-100 flex-1 justify-between h-screen w-screen"
    >
      <ChatHeader
        currentTitle={currentTitle}
        setCurrentTitle={setCurrentTitle}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleSaveTitle={handleSaveTitle}
      />
      <MessageList messages={messages} loading={loading} />
      <MessageInput
        text={text}
        setText={setText}
        handleSendMessage={handleSendMessage}
        onLayout={(e: any) => onLayout(e)}
        blocks={blocks}
        setBlocks={setBlocks}
      />
    </KeyboardAvoidingView>
  )
}

export default ChatScreen
