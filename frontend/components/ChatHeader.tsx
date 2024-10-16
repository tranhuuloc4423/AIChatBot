// components/ChatHeader.tsx
import React from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons'

interface ChatHeaderProps {
  currentTitle: string
  setCurrentTitle: (title: string) => void
  isEditing: boolean
  setIsEditing: (editing: boolean) => void
  handleSaveTitle: () => void
  goBack: () => void
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  currentTitle,
  setCurrentTitle,
  isEditing,
  setIsEditing,
  handleSaveTitle,
  goBack
}) => {
  return (
    <View className="flex fixed border-b border-gray-200 px-4 pb-2 flex-row justify-between items-center">
      <Pressable onPress={goBack}>
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
  )
}

export default ChatHeader
