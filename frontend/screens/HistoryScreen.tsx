import {
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Tag from '../components/Tag'
import Input from '../components/Input'
import HistoryLable from '../components/HistoryLable'

const TopicsTags = () => {
  return <View></View>
}

const HistoryScreen = () => {
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

  const handleTag = (index: number) => {
    const updatedTags = tags.map((tag, i) => ({
      ...tag,
      active: i === index
    }))
    setTags(updatedTags)
  }
  const [text, setText] = useState('')

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={0}
      className="bg-black-100 flex-1 justify-between pt-20 h-screen w-screen"
    >
      <ScrollView
        className=" h-screen w-screen"
        showsVerticalScrollIndicator={true}
        horizontal={false}
      >
        <View className="flex flex-col gap-4">
          <View>
            <Text className="text-4xl px-4 font-semibold text-white ">
              Chat AI
            </Text>
          </View>
          <ScrollView
            className="w-screen "
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View className="flex flex-row pl-4 items-center">
              {tags.map((tag, index) => (
                <Tag
                  onPress={() => handleTag(index)}
                  label={tag.name}
                  icon={tag.icon}
                  active={tag.active}
                />
              ))}
            </View>
          </ScrollView>
          <View className="flex flex-row items-center justify-between">
            <Text className="text-3xl pl-4  font-semibold text-white">
              Topics
            </Text>
          </View>
          <View className="">
            <HistoryLable text="Test" />
            <HistoryLable text="Test" />

            <HistoryLable text="Test" />
            <HistoryLable text="Test" />
            <HistoryLable text="Test" />
            <HistoryLable text="Test" />
            <HistoryLable text="Test" />
            <HistoryLable text="Test" />
            <HistoryLable text="Test" />
            <HistoryLable text="Test" />
            <HistoryLable text="Test" />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default HistoryScreen
