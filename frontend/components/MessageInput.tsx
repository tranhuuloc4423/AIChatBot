// components/MessageInput.tsx
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Input from './Input'
import langs, { Langs } from '../utils/langs'
import { useAppSelector } from '../redux/customHooks'

interface MessageInputProps {
  text: string
  setText: (text: string) => void
  handleSendMessage: () => void
}

const MessageInput: React.FC<MessageInputProps> = ({
  text,
  setText,
  handleSendMessage
}) => {
  const { language } = useAppSelector((state) => state.app)
  const { input } = langs[language as keyof Langs]?.chat
  return (
    <View className="flex flex-row gap-2 items-center px-4 py-6 border-t-gray-200 border-t border-r border-l rounded-t-3xl">
      <View className="flex-1">
        <Input
          value={text}
          onChange={setText}
          inputProps={{ placeholder: input }}
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
  )
}

export default MessageInput
