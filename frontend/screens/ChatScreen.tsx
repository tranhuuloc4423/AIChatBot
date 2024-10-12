import {
  View,
  KeyboardAvoidingView,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  TextInput
} from 'react-native'
import React, { useState, useRef, Ref, useEffect } from 'react'
import { Ionicons, Feather } from '@expo/vector-icons'
import Input from '../components/Input'
import MessageBubble from '../components/MessegeBubble'
import { RouterProps } from '../types/navigation'
import { useAppSelector } from '../redux/customHooks'
import axios from '../axiosInstance'
import { createNewConversation, getConversation } from '../redux/api/app'

const ChatScreen = ({ navigation, route }: RouterProps) => {
  const token = useAppSelector((state) => state.app.token)
  const user = useAppSelector((state) => state.app.user)
  const conversationId = route?.params?.conversationId || null
  const title = route?.params?.title || null
  const [messages, setMessages] = useState([
    { content: 'start conversation!', role: 'assistant' }
  ])
  const [text, setText] = useState('')
  const [id, setId] = useState()
  const [currentTitle, setCurrentTitle] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [loadingDots, setLoadingDots] = useState('.')
  const [isEditing, setIsEditing] = useState(false)
  const scrollViewRef = useRef<ScrollView>(null)

  const getConversationById = async () => {
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
      console.log(res)
      setId(res?.conversationId)
      setCurrentTitle(res?.title)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (conversationId) {
      getConversationById()
      setCurrentTitle(title)
    } else {
      createConversation()
    }
  }, [])

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true })
    }
  }, [messages])

  const updateTitle = async () => {
    try {
      const res = await axios.put(
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
    if (text.trim() === '') return // Không gửi tin nhắn rỗng
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

      // message from API
      const assistantMessage = {
        content: res.data.assistantMessage,
        role: 'assistant'
      }

      // update message
      setMessages((prevMessages) => {
        return prevMessages?.map((msg) =>
          msg.role === 'assistant' && msg.content === 'is typing'
            ? assistantMessage
            : msg
        )
      })
    } catch (error) {
      console.log('API error:', error)
      setMessages((prevMessages) =>
        prevMessages?.map((msg) =>
          msg.role === 'assistant' && msg.content === loadingDots
            ? { ...msg, content: 'Error in response from API' }
            : msg
        )
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={0}
      className="bg-black-100 flex-1 justify-between pt-10 h-screen w-screen"
    >
      <View className="flex flex-col gap-4">
        <View className="flex fixed border-b border-gray-200 px-4 pb-2 flex-row justify-between items-center">
          <Pressable onPress={() => navigation.navigate('Suggestions')}>
            <Ionicons name="close-outline" size={36} color={'white'} />
          </Pressable>
          {isEditing ? (
            <View className="max-w-[50%]">
              <TextInput
                value={currentTitle}
                onChangeText={setCurrentTitle}
                className="text-2xl px-4 font-semibold text-white"
                autoFocus={true}
                onSubmitEditing={handleSaveTitle}
              />
            </View>
          ) : (
            // Khi không ở chế độ chỉnh sửa, hiển thị Text
            <Text className="text-2xl text-center px-4 font-semibold text-white">
              {currentTitle}
            </Text>
          )}

          {isEditing ? (
            <Pressable onPress={handleSaveTitle}>
              <Feather name="check" size={28} color={'white'} />
            </Pressable>
          ) : (
            <Pressable onPress={() => setIsEditing(true)}>
              <Feather name="edit" size={28} color={'white'} />
            </Pressable>
          )}
        </View>
      </View>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
        className="h-screen w-screen mb-2"
        showsVerticalScrollIndicator={true}
        horizontal={false}
      >
        {messages?.map((msg, index) => (
          <MessageBubble key={index} content={msg.content} role={msg.role} />
        ))}
      </ScrollView>

      <View className="flex flex-row gap-2 items-center px-4 py-6 border-t-gray-200 border-t border-r border-l rounded-t-3xl">
        <View className="flex-1">
          <Input
            value={text}
            onChange={setText}
            inputProps={{ placeholder: 'Ask anything...' }}
            className="z-50 w-full"
          />
        </View>
        <TouchableOpacity
          onPress={handleSendMessage}
          className="bg-primary rounded-full w-10 h-10 flex justify-center items-center"
        >
          <Ionicons name="send" size={24} color={'white'} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default ChatScreen
