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
import PromptLib from '../components/Promt'
const SuggetItem = () => {
  return (
    <ScrollView
      className="w-screen"
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      <View className="flex flex-row pl-4 gap-3 items-center">
        <TouchableOpacity>
          <View className="w-28 h-28 rounded-lg border border-slate-600 p-2 mt-5  text-white ">
            <Ionicons
              className=""
              name="images-outline"
              size={32}
              color={'#85B6FF'}
            ></Ionicons>
            <Text className=' text-white text-centerp"'>
              Create an image for my presentation
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="w-28 h-28 rounded-lg border border-slate-600 p-2 mt-5  text-white ">
            <Ionicons
              className=""
              name="calendar-outline"
              size={32}
              color={'#4ECB71'}
            ></Ionicons>
            <Text className=' text-white text-centerp"'>
              Content calendar for tiktok
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View className="w-28 h-28 rounded-lg border border-slate-600 p-2 mt-5  text-white ">
            <Ionicons
              className=""
              name="bulb-outline"
              size={32}
              color={'#FFD233'}
            ></Ionicons>
            <Text className=' text-white text-centerp"'>
              Create a story for my favorite game
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View className="w-28 h-28 rounded-lg border border-slate-600 p-2 mt-5  text-white ">
            <Ionicons
              className=""
              name="airplane-outline"
              size={32}
              color={'#ff38dd'}
            ></Ionicons>
            <Text className=' text-white text-centerp"'>
              Create a story for my books, or movies
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const Promtlibs = () => {
  return (
    <ScrollView
      className="flex pt-4 flex-row pl-8 gap-1 z-10 "
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      <View className="flex flex-col gap-2">
        <View className=" py-4 px-3   rounded-lg flex flex-row  bg-slate-700">
          <Ionicons
            name="sunny-sharp"
            className=""
            size={32}
            color={'#FCEA2B'}
          />
          <Text className="text-2xl text-white ml-2">3D Artist Artist</Text>
        </View>
        <View className=" py-4 px-3  rounded-lg flex flex-row  bg-slate-700">
          <Ionicons name="apps" className="" size={32} color={'#FCEA2B'} />
          <Text className="text-2xl text-white ml-2">3D Artist</Text>
        </View>
      </View>
      <View className="flex flex-col gap-2">
        <View className=" py-4 px-3   rounded-lg flex flex-row  bg-slate-700">
          <Ionicons
            name="american-football"
            className=""
            size={32}
            color={'#FCEA2B'}
          />
          <Text className="text-2xl text-white ml-2">3D Artist</Text>
        </View>
        <View className=" py-4 px-3  rounded-lg flex flex-row  bg-slate-700">
          <Ionicons
            name="basketball"
            className=""
            size={32}
            color={'#FCEA2B'}
          />
          <Text className="text-2xl text-white ml-2">3D Artist</Text>
        </View>
      </View>
      <View className="flex flex-col gap-2">
        <View className=" py-4 px-3  rounded-lg flex flex-row  bg-slate-700">
          <Ionicons name="boat" className="" size={32} color={'#FCEA2B'} />
          <Text className="text-2xl text-white ml-2">3D Artist</Text>
        </View>
        <View className=" py-4 px-3   rounded-lg flex flex-row  bg-slate-700">
          <Ionicons name="cash" className="" size={32} color={'#FCEA2B'} />
          <Text className="text-2xl text-white ml-2">3D Artist</Text>
        </View>
      </View>
      <View className="flex flex-col gap-2">
        <View className=" py-4 px-3   rounded-lg flex flex-row  bg-slate-700">
          <Ionicons name="cut" className="" size={32} color={'#FCEA2B'} />
          <Text className="text-2xl text-white ml-2">3D Artist</Text>
        </View>
        <View className=" py-4 px-3  rounded-lg flex flex-row  bg-slate-700">
          <Ionicons
            name="game-controller"
            className=""
            size={32}
            color={'#FCEA2B'}
          />
          <Text className="text-2xl text-white ml-2">
            3D Artist Artist Artist
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

const SuggestionsScreen = () => {
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
              Suggestions
            </Text>
            <TouchableOpacity>
              <Text className="font-semibold pr-4 text-primary text-xl">
                View all
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <SuggetItem />
          </View>

          <View className="flex flex-row items-center justify-between">
            <Text className="text-3xl pl-4 font-semibold text-white">
              Prompt library
            </Text>
            <TouchableOpacity>
              <Text className="font-semibold pr-4 text-primary text-xl">
                View all
              </Text>
            </TouchableOpacity>
          </View>
          <Promtlibs />
        </View>
        <View className="flex ">
          <Input
            value={Text}
            onChange={setText}
            inputProps={{ placeholder: 'Ask anything...' }}
            className=" z-50 "
            iconRight={<Ionicons name="send" size={24} color="white" />}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SuggestionsScreen
