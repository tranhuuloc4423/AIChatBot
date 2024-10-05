import { Text, Pressable } from 'react-native'
import React from 'react'
interface Lable {
  text: string // Define the type for the text prop
}

const HistoryLable = ({ text, onClick }: {text: string, onClick: () => void}) => {
  return (
    <Pressable onPress={onClick} className="w-full  ml-auto mb-2 mr-auto border bg-black-200 border-gray-500 rounded-lg p-3">
      <Text className="text-2xl text-white">{text}</Text>
    </Pressable>
  )
}

export default HistoryLable
