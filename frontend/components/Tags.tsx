import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { View, ScrollView, Pressable } from 'react-native'
import Tag from './Tag'
import { RouterProps } from '../types/navigation'
import axios from '../axiosInstance'
import { setNewConversation, setToken } from '../redux/slices/appSlice'
import { useAppDispatch, useAppSelector } from '../redux/customHooks'
const Tags = ({ navigation }: RouterProps) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.app.user)
  const token = useAppSelector((state) => state.app.token)
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
      path: 'Chat',
      active: false
    },
    {
      name: 'History',
      icon: (
        <View className="rounded-full p-1 bg-white">
          <Ionicons name="time-outline" size={28} color={'black'} />
        </View>
      ),
      path: 'History',
      active: false
    },
    {
      name: 'Setting',
      icon: (
        <View className="rounded-full p-1 bg-white">
          <Ionicons name="settings-outline" size={28} color={'black'} />
        </View>
      ),
      path: 'Setting',
      active: true
    }
  ])

  const handleTag = (index: number) => {
    const updatedTags = tags.map((tag, i) => ({
      ...tag,
      active: i === index
    }))
    setTags(updatedTags)
  }
  return (
    <ScrollView
      className="w-full"
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      <View className="flex flex-row items-center p-4">
        {tags.map((tag, index) => (
          <Tag
            key={index}
            onPress={() => {
              handleTag(index)
              navigation.navigate(tag.path)
            }}
            label={tag.name}
            icon={tag.icon}
            active={tag.active}
          />
        ))}
      </View>
    </ScrollView>
  )
}

export default Tags
