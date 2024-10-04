import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Tag from './Tag'
import Input from './Input'

interface MessageBubbleProps {
  role: string
  content: string
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content }) => {
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
      <View
        className={`max-w-[80%] p-2 rounded-2xl ${
          role === 'user'
            ? 'bg-primary  rounded-tr-none'
            : 'bg-slate-700  rounded-tl-none'
        }`}
      >
        <Text
          className={`text-base ${
            role === 'user' ? 'text-white' : 'text-white'
          } line`}
        >
          {content}
        </Text>
      </View>
    </View>
  )
}

export default MessageBubble
