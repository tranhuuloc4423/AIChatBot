import { Text, Pressable, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const HistoryLable = ({
  text,
  onClick,
  onRemove
}: {
  text: string
  onClick: () => void
  onRemove: () => void
}) => {
  return (
    <View className="w-[90%] mx-auto my-1 border bg-black-200 border-gray-200 rounded-lg p-3 flex flex-row items-center justify-between">
      <Pressable onPress={onClick} className="flex-1">
        <Text className="text-2xl text-white">{text}</Text>
      </Pressable>
      <Pressable onPress={onRemove}>
        <Ionicons name="close" size={32} color="white" />
      </Pressable>
    </View>
  )
}

export default HistoryLable
