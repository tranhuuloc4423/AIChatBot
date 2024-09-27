import { View, Text } from 'react-native'
import React from 'react'
interface Lable {
  text: string // Define the type for the text prop
}

const HistoryLable: React.FC<Lable> = ({ text }) => {
  return (
    <View className="w-5/6  ml-auto mb-2 mr-auto border border-gray-500 rounded-lg p-3 bg-neutral-900 ">
      <Text className="text-2xl text-white">{text}</Text>
    </View>
  )
}

export default HistoryLable
