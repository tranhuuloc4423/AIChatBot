import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {Ionicons} from '@expo/vector-icons'
import Tag from '../components/Tag'

const SuggestionsScreen = () => {
    const [tags,setTags] = useState([
        {
            name: 'Chat',
            icon: <View className='rounded-full p-2 bg-white'><Ionicons name="chatbubble-ellipses-outline" size={32} color={'black'}/></View>,
            path: '',
            active: true
        },
        {
            name: 'History',
            icon: <View className='rounded-full p-2 bg-white'><Ionicons name="time-outline" size={32} color={'black'}/></View>,
            path: '',
            active: false
    
        },
        {
            name: 'Settings',
            icon: <View className='rounded-full p-2 bg-white'><Ionicons name="settings-outline" size={32} color={'black'}/></View>,
            path: '',
            active: false
        },
    ])

    const handleTag = (index: number) => {
        const updatedTags = tags.map((tag, i) => ({
            ...tag,
            active: i === index, 
          }));
          setTags(updatedTags);
    }
  return (
    <View className='bg-black-100 pt-20 px-8 h-screen w-screen'>
        <View className='flex flex-col gap-4'>
            <View>
                <Text className='text-4xl font-semibold text-white'>Chat AI</Text>
            </View>

            <View className='flex flex-row items-center w-full justify-between'>
                   {tags.map((tag, index) => (
                    <Tag onPress={() => handleTag(index)} label={tag.name} icon={tag.icon} active={tag.active}/>
                   ))} 
            </View>

            <View className='flex flex-row items-center justify-between'>
                <Text className='text-3xl font-semibold text-white'>Suggestions test</Text>
                <TouchableOpacity>
                <Text className='font-semibold text-primary text-xl'>View all</Text>

                </TouchableOpacity>
            </View>

            <View className='flex flex-row items-center justify-between'>
                <Text className='text-3xl font-semibold text-white'>Prompt library</Text>
                <TouchableOpacity>
                <Text className='font-semibold text-primary text-xl'>View all</Text>

                </TouchableOpacity>
            </View>
            
            
        </View>
    </View>
  )
}

export default SuggestionsScreen