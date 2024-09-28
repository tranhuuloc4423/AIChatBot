import {
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import React, { useState, useRef, Ref, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Tag from '../components/Tag'
import Input from '../components/Input'
import PromptLib from '../components/Promt'
import { SafeAreaView } from 'react-native-safe-area-context'
import MessageBubble from '../components/MessegeBubble'

const ChatScreen = () => {
  const [tags, setTags] = useState([
    {
      name: 'Chat',
      icon: (
        <View className="rounded-full p-1 bg-white">
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={28}
            color={'black'}
          />
        </View>
      ),
      path: '',
      active: true
    },
    {
      name: 'History',
      icon: (
        <View className="rounded-full p-1 bg-white">
          <Ionicons name="time-outline" size={28} color={'black'} />
        </View>
      ),
      path: '',
      active: false
    },
    {
      name: 'Settings',
      icon: (
        <View className="rounded-full p-1 bg-white">
          <Ionicons name="settings-outline" size={28} color={'black'} />
        </View>
      ),
      path: '',
      active: false
    }
  ])

  const messages = [
    {
      id: 1,
      message: 'start conversation!',
      isMine: false,
      avatar:
        'https://staticg.sportskeeda.com/editor/2024/07/61bd4-17207290151905-1920.jpg'
    },
    {
      id: 2,
      message: 'Hi there!',
      isMine: true,
      avatar:
        'https://staticg.sportskeeda.com/editor/2024/07/61bd4-17207290151905-1920.jpg'
    },
    {
      id: 3,
      message: 'How are you?',
      isMine: false,
      avatar:
        'https://staticg.sportskeeda.com/editor/2024/07/61bd4-17207290151905-1920.jpg'
    },
    {
      id: 4,
      message: "I'm good, thanks!",
      isMine: true,
      avatar:
        'https://staticg.sportskeeda.com/editor/2024/07/61bd4-17207290151905-1920.jpg'
    },
    {
      id: 5,
      message: 'Hello!',
      isMine: false,
      avatar:
        'https://staticg.sportskeeda.com/editor/2024/07/61bd4-17207290151905-1920.jpg'
    },
    {
      id: 6,
      message: 'Hi there!',
      isMine: true,
      avatar:
        'https://staticg.sportskeeda.com/editor/2024/07/61bd4-17207290151905-1920.jpg'
    },
    {
      id: 7,
      message: 'How are you?',
      isMine: false,
      avatar:
        'https://staticg.sportskeeda.com/editor/2024/07/61bd4-17207290151905-1920.jpg'
    },
    {
      id: 8,
      message: "I'm good, thanks!",
      isMine: true,
      avatar:
        'https://staticg.sportskeeda.com/editor/2024/07/61bd4-17207290151905-1920.jpg'
    },
    {
      id: 9,
      message: 'Hello!',
      isMine: false,
      avatar:
        'https://staticg.sportskeeda.com/editor/2024/07/61bd4-17207290151905-1920.jpg'
    },
    {
      id: 10,
      message: 'Hi there!',
      isMine: true,
      avatar:
        'https://staticg.sportskeeda.com/editor/2024/07/61bd4-17207290151905-1920.jpg'
    },
    {
      id: 11,
      message: 'How are you?',
      isMine: false,
      avatar:
        'https://staticg.sportskeeda.com/editor/2024/07/61bd4-17207290151905-1920.jpg'
    },
    {
      id: 12,
      message: 'End conversation w w w w w w w w w w w w w w w w w w w wfw',
      isMine: false,
      avatar:
        'https://staticg.sportskeeda.com/editor/2024/07/61bd4-17207290151905-1920.jpg'
    }
  ]

  const handleTag = (index: number) => {
    const updatedTags = tags.map((tag, i) => ({
      ...tag,
      active: i === index
    }))
    setTags(updatedTags)
  }
  const [text, setText] = useState('')
  var footerY
  const scrollViewRef = React.useRef<ScrollView>()

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={0}
      className="bg-black-100 flex-1 justify-between pt-10 h-screen w-screen"
    >
      <View className="flex flex-col gap-4">
        <View className="flex fixed border-b border-gray-600 px-4 pb-2 flex-row justify-between">
          <Ionicons
            name="close-outline"
            className=""
            size={36}
            color={'white'}
          ></Ionicons>
          <Text className="text-4xl px-4 font-semibold text-white ">
            Chat AI
          </Text>
          <Ionicons
            name="ellipsis-horizontal"
            className=""
            size={36}
            color={'white'}
          ></Ionicons>
        </View>
      </View>
      <ScrollView
        className=" h-screen w-screen"
        showsVerticalScrollIndicator={true}
        horizontal={false}
      >
        <ScrollView>
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg.message}
              isMine={msg.isMine}
              avatar={msg.avatar}
            />
          ))}
        </ScrollView>
      </ScrollView>

      <View className="flex flex-wrap">
        <Input
          value={Text}
          onChange={setText}
          inputProps={{ placeholder: 'Ask anything...' }}
          className=" z-50 "
          iconRight={<Ionicons name="send" size={24} color={'white'} />}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default ChatScreen
