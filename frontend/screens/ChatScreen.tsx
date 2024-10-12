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
// import Voice from '@react-native-voice/voice';
import Input from '../components/Input'
import MessageBubble from '../components/MessegeBubble'
import { RouterProps } from '../types/navigation'
import { useAppSelector } from '../redux/customHooks'
import axios from '../axiosInstance'
import { createNewConversation, getConversation } from '../redux/api/app'
import Button from '../components/Button';

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
  const [isListening, setIslistening] = useState(false)
  const [loadingDots, setLoadingDots] = useState('.')
  const [isEditing, setIsEditing] = useState(false)
  const scrollViewRef = useRef<ScrollView>(null)

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
      console.log(res)
      setId(res?.conversationId)
      setCurrentTitle(res?.title)
    } catch (error) {
      console.log(error)
    }
  }

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
      console.log(res.data)
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

  // useEffect(() => {
  //   if (conversationId && title) {
  //     getConversationById();
  //     setCurrentTitle(title);
  //   }
  //   if (conversationId == null || title == null) {
  //     createConversation();
  //   }

  //   // Đăng ký sự kiện cho Voice
  //   Voice.onSpeechResults = onSpeechResults;
  //   return () => {
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   };
  // }, []);

  // const onSpeechResults = (e: any) => {
  //   // Cập nhật text với kết quả nhận diện
  //   if (e.value && e.value.length > 0) {
  //     setText(e.value[0]);
  //   }
  // };

  // const startListening = async () => {
  //   try {
  //     await Voice.start('en-US'); // hoặc ngôn ngữ khác
  //     setIslistening(true)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const stopListening = async () => {
  //   try {
  //     await Voice.stop();
  //     setIslistening(false)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const toggleListening = () => {
  //   if (isListening) {
  //     stopListening(); // Dừng nghe nếu đang nghe
  //   } else {
  //     startListening(); // Bắt đầu nghe nếu không nghe
  //   }
  // };

  useEffect(() => {
    if (conversationId && title) {
      getConversationById(conversationId)
      setId(conversationId)
      setCurrentTitle(title)
      console.log(conversationId)
    }
    if (conversationId == null || title == null) {
      createConversation()
      setCurrentTitle('Untitled')
    }
  }, [conversationId])

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true })
    }
  }, [messages])

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={0}
      className="bg-black-100 flex-1 justify-between h-screen w-screen pt-8"
    >
      <View className="flex flex-col gap-4">
        <View className="flex fixed border-b border-gray-200 px-4 pb-2 flex-row justify-between items-center">
          <Pressable onPress={() => navigation.goBack()}>
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
        {/* <Pressable onPress={toggleListening}>
          <Feather name='mic' size={24}/>
        </Pressable> */}
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
