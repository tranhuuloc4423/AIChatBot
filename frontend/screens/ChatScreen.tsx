import React, { useState, useEffect, useCallback, useRef } from 'react'
import { View, KeyboardAvoidingView, Alert } from 'react-native'
import { Audio } from 'expo-av'
import * as Speech from 'expo-speech'
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
  const { conversationId, title }: any = route?.params
  const { text_started } = langs[language as keyof Langs]?.chat

  const [messages, setMessages] = useState([
    { content: text_started, role: 'assistant', type: 'text' }
  ])
  const [text, setText] = useState('')
  const [id, setId] = useState()
  const [currentTitle, setCurrentTitle] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [type, setType] = useState('text')
  const [isRecording, setIsRecording] = useState(false)
  const [recording, setRecording] = useState<Audio.Recording | null>(null)
  const [inputHeight, setInputHeight] = useState(0)

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
      Alert.alert('Cập nhật tiêu đề thành công!')
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

  // const startRecording = async () => {
  //   try {
  //     console.log('Requesting permissions..')
  //     await Audio.requestPermissionsAsync()
  //     await Audio.setAudioModeAsync({
  //       allowsRecordingIOS: true,
  //       playsInSilentModeIOS: true
  //     })
  //     console.log('Starting recording..')
  //     const { recording } = await Audio.Recording.createAsync(
  //       Audio.RecordingOptionsPresets.HIGH
  //     )
  //     setRecording(recording)
  //     setIsRecording(true)
  //     console.log('Recording started')
  //   } catch (err) {
  //     console.error('Failed to start recording', err)
  //   }
  // }

  // const stopRecording = async () => {
  //   console.log('Stopping recording..')
  //   setRecording(null)
  //   await recording?.stopAndUnloadAsync()
  //   const uri = recording?.getURI()
  //   console.log('Recording stopped and stored at', uri)
  //   setIsRecording(false)
  //   transcribeAudio(uri)
  // }

  // const transcribeAudio = async (uri: string | undefined) => {
  //   if (!uri) return
  //   try {
  //     const formData = new FormData()
  //     formData.append('file', {
  //       uri,
  //       name: 'recording.wav',
  //       type: 'audio/wav'
  //     })

  //     const res = await axios.post('/chat/voice-to-text', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: token
  //       }
  //     })

  //     setText(res.data.transcription)
  //   } catch (error) {
  //     console.log('Transcription error', error)
  //   }
  // }

  useFocusEffect(
    useCallback(() => {
      // Reset state khi vào màn hình
      setMessages([{ content: text_started, role: 'assistant', type: 'text' }])
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
        onChangeType={() => setType(type === 'text' ? 'image' : 'text')}
        type={type}
      />
      <MessageList messages={messages} loading={loading} />
      <MessageInput
        text={text}
        setText={setText}
        handleSendMessage={handleSendMessage}
        onLayout={(e: any) => onLayout(e)}
      />
      {/* <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? stopRecording : startRecording}
      /> */}
    </KeyboardAvoidingView>
  )
}

export default ChatScreen
