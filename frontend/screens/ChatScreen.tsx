import React, { useState, useEffect, useCallback, useRef } from 'react'
import { View, KeyboardAvoidingView, Alert, Button, Text } from 'react-native'
import * as FileSystem from 'expo-file-system'
import * as Permissions from 'expo-permissions'
import { Audio } from 'expo-av'
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
  const [recording, setRecording] = useState<Audio.Recording | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [textResult, setTextResult] = useState('')
  const recordingRef = useRef<Audio.Recording | null>(null)
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

  const sendAudioToBackend = async (audioFile: string) => {
    try {
      const response = await axios.post(
        '/chat/convert-speech',
        {
          audioUrl: audioFile
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      )
      const result = await response.data
      console.log('Speech-to-Text Result:', result)
      setTextResult(result)
    } catch (error) {
      console.error('Error sending audio to backend', error)
    }
  }
  const startRecording = async () => {
    try {
      // Request microphone permissions
      const { status } = await Audio.requestPermissionsAsync()
      if (status !== 'granted') {
        alert('Permission to access microphone is required.')
        return
      }

      // Prepare for recording
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      })

      const recording = new Audio.Recording()
      await recording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      )
      await recording.startAsync()

      // Set state and reference for recording
      recordingRef.current = recording
      setIsRecording(true)
    } catch (error) {
      console.error('Failed to start recording', error)
    }
  }

  const stopRecording = async () => {
    if (!recordingRef.current) {
      console.error('No active recording found')
      return
    }

    try {
      setIsRecording(false)

      // Stop and unload the recording
      await recordingRef.current.stopAndUnloadAsync()
      const uri = recordingRef.current.getURI()
      console.log('Recording stopped and stored at', uri)

      // Reset recording reference
      recordingRef.current = null

      // Send audio to the backend
      const audioFile = await FileSystem.readAsStringAsync(uri!, {
        encoding: FileSystem.EncodingType.Base64
      })
      sendAudioToBackend(audioFile)
    } catch (error) {
      console.error('Error stopping the recording', error)
    }
  }

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
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? stopRecording : startRecording}
      />
      <View>{textResult && <Text>{textResult}</Text>}</View>
    </KeyboardAvoidingView>
  )
}

export default ChatScreen
