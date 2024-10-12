import { View, Text, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import * as Clipboard from 'expo-clipboard'
import { Feather } from '@expo/vector-icons'

interface MessageBubbleProps {
  role: string
  content: string
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content }) => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(content)
    Alert.alert('Copied to clipboard!', content)
  }

  return (
    <View
      className={`flex-row items-start my-2 px-3 ${
        role === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      {role === 'assistant' && (
        <Image
          source={require('../assets/furryna.jpg')}
          className="w-10 h-10 rounded-full mr-2"
        />
      )}
      <View className="flex flex-col max-w-[75%] gap-2">
        <View
          className={`p-2 rounded-lg border border-gray-200 ${
            role === 'user'
              ? 'bg-primary  rounded-tr-none'
              : 'bg-black-200  rounded-tl-none'
          }`}
        >
          <Text
            className={`text-base font-medium ${
              role === 'user' ? 'text-white' : 'text-white'
            } line`}
          >
            {content}
          </Text>
        </View>
        {role === 'assistant' && (
          <View className="items-end ">
            <View className="bg-black-200 p-2 rounded-lg flex flex-row items-center border border-gray-200">
              <Feather
                name="copy"
                size={24}
                color="white"
                onPress={copyToClipboard}
                className="bg-black-200"
              />
              <Text className="text-white font-medium ml-2">Copy text</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

export default MessageBubble
