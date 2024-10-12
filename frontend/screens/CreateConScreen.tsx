import { Text, Pressable, View } from 'react-native'
import React from 'react'
import Inputfield from '../components/Inputfield'
import { RouterProps } from '../types/navigation'
import { useState } from 'react'
import Button from '../components/Button'
import { createNewConversation } from '../redux/api/app'
import { useAppSelector } from '../redux/customHooks'
import { Ionicons } from '@expo/vector-icons'

const CreateConScreen = ({ navigation }: RouterProps) => {
  const [title, setTitle] = useState('')
  const [conversationId, setConversationId] = useState()
  const { user, token } = useAppSelector((state) => state.app)
  const inputProps = {
    placeholder: 'enter title'
  }

  const handleSubmit = async () => {
    try {
      if (title === '') {
        return
      }
      const data = {
        email: user.email,
        title
      }
      const res = await createNewConversation(data, token)
      setConversationId(res?.conversationId)
      if (res) {
        navigation.navigate('Chat', { title, conversationId })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View className="bg-black-100 flex-1 w-screen h-screen px-8 pt-10">
      <View
        className="flex flex-col items-center justify-start gap-4 h-screen
      "
      >
        <View className="flex-row items-center justify-between mt-4">
          <Pressable onPress={() => navigation.navigate('Suggestions')}>
            <Ionicons name="chevron-back" size={32} color="white" />
          </Pressable>
          <View className="flex-1 flex items-center justify-center">
            <Text className="text-white text-2xl font-semibold">New Chat</Text>
          </View>
          <View className="w-8"></View>
        </View>
        <View className="w-full">
          <Inputfield
            onChange={setTitle}
            value={title}
            inputProps={inputProps}
          />
        </View>
        <View className="w-full">
          <Button label={`Create`} onPress={handleSubmit} className="w-full" />
        </View>
      </View>
    </View>
  )
}

export default CreateConScreen
