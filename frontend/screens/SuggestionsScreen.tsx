import { View, Text, TouchableOpacity,ScrollView } from 'react-native'
import React, { useState } from 'react'
import {Ionicons} from '@expo/vector-icons'
import Tag from '../components/Tag'


const SuggetItem = () => {

    return (
        <View className='flex flex-row items-center justify-around'>
            <View className='w-28 h-28 rounded-lg border border-slate-600 p-2 mt-5  text-white '>
                <Ionicons className='' name="images-outline"  size={32} color={'#85B6FF'}></Ionicons>
                <Text className=' text-white text-centerp"'>Create an image for my presentation</Text>
            </View>
            <View className='w-28 h-28 rounded-lg border border-slate-600 p-2 mt-5  text-white '>
                <Ionicons className='' name="calendar-outline"  size={32} color={'#4ECB71'}></Ionicons>
                <Text className=' text-white text-centerp"'>Content calendar for tiktok</Text>
            </View>
            <View className='w-28 h-28 rounded-lg border border-slate-600 p-2 mt-5  text-white '>
                <Ionicons className='' name="bulb-outline"  size={32} color={'#FFD233'}></Ionicons>
                <Text className=' text-white text-centerp"'>Create a story for my favorite game</Text>

            </View>
        </View>
    )
   
}

const SuggestionsScreen = () => {
    const [tags,setTags] = useState([
        {
            name: 'Chat',
            icon: <View className='rounded-full p-1 bg-white' ><Ionicons name="chatbubble-ellipses-outline" size={28} color={'black'}/></View>,
            path: '',
            active: true
        },
        {
            name: 'History',
            icon: <View className='rounded-full p-1 bg-white'><Ionicons name="time-outline" size={28} color={'black'}/></View>,
            path: '',
            active: false
    
        },
        {
            name: 'Settings',
            icon: <View className='rounded-full p-1 bg-white'><Ionicons name="settings-outline" size={28} color={'black'}/></View>,
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
            <ScrollView className='w-screen' horizontal={true} showsHorizontalScrollIndicator={false}
                
                
            >
                <View className='flex flex-row items-center'>
                    {tags.map((tag, index) => (
                        <Tag onPress={() => handleTag(index)} label={tag.name} icon={tag.icon} active={tag.active}/>
                        
                    ))}                  

                </View>
            </ScrollView>

            <View className='flex flex-row items-center justify-between'>
                <Text className='text-3xl font-semibold text-white'>Suggestions</Text>
                <TouchableOpacity>
                <Text className='font-semibold text-primary text-xl'>View all</Text>

                </TouchableOpacity>
            </View>
            <SuggetItem/>

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
