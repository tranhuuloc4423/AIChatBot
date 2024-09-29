import {
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Tag from './Tag'
import Input from './Input'

interface MessageBubbleProps {
  message: string
  isMine: boolean
  avatar: string // URL or local image path for the avatar
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isMine,
  avatar
}) => {
  return (
    <View
      className={`flex-row items-center my-2 px-3 ${
        isMine ? 'justify-end' : 'justify-start'
      }`}
    >
      {!isMine && (
        <Image
          source={{ uri: avatar }}
          className="w-10 h-10 rounded-full mr-2"
        />
      )}
      <View
        className={`max-w-3/4 flex-shrink p-3 rounded-lg ${
          isMine
            ? 'bg-primary  rounded-tr-none'
            : 'bg-slate-700  rounded-tl-none'
        }`}
      >
        <Text
          className={`text-base ${isMine ? 'text-white' : 'text-white'} line`}
        >
          {message}
        </Text>
      </View>
      {isMine && (
        <Image
          source={{ uri: avatar }}
          className="w-10 h-10 rounded-full ml-2"
        />
      )}
    </View>
  )
}

export default MessageBubble
