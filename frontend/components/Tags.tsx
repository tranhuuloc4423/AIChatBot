import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { View, ScrollView, Pressable } from 'react-native'
import Tag from './Tag'
import { RouterProps } from '../types/navigation'
const Tags = ({ navigation }: RouterProps) => {
  const [tags, setTags] = useState([
    {
      name: 'Chat',
      icon: (
        <View className="rounded-full p-1 bg-white">
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
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
          <Ionicons name="time-outline" size={24} color={'black'} />
        </View>
      ),
      path: 'History',
      active: false
    },
    {
      name: 'Setting',
      icon: (
        <View className="rounded-full p-1 bg-white">
          <Ionicons name="settings-outline" size={24} color={'black'} />
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
    <View
      className="w-full bg-black-100 flex mx-auto items-center justify-center"
    >
      <View className="flex flex-row items-center px-2 pt-10 pb-4">
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
    </View>
  )
}

export default Tags
