import {
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Tag from '../components/Tag'
import Input from '../components/Input'
import PromptLib from '../components/Promt'
import Tags from '../components/Tags'
import { RouterProps } from '../types/navigation'
import { ReactReduxContextValue, useSelector } from 'react-redux'
import { useAppSelector } from '../redux/customHooks'
import { useFocusEffect } from '@react-navigation/native'

const suggestions = [
  {
    id: 0,
    text: 'Create an image for my presentation',
    icon: (
      <Ionicons
        className=""
        name="images-outline"
        size={32}
        color={'#85B6FF'}
      />
    )
  },
  {
    id: 1,
    text: 'Content calendar for tiktok',
    icon: (
      <Ionicons
        className=""
        name="calendar-outline"
        size={32}
        color={'#4ECB71'}
      />
    )
  },
  {
    id: 2,
    text: 'Create a story for my favorite game',
    icon: (
      <Ionicons className="" name="bulb-outline" size={32} color={'#FFD233'} />
    )
  },
  {
    id: 3,
    text: 'Create a story for my books, or movies',
    icon: (
      <Ionicons
        className=""
        name="airplane-outline"
        size={32}
        color={'#ff38dd'}
      />
    )
  }
]
const SuggetItem = () => {
  return (
    <ScrollView
      className="w-screen"
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      <View className="flex flex-row px-4 gap-3 items-center">
        {suggestions.map((item) => (
          <TouchableOpacity key={item.id}>
            <View className="w-28 h-28 rounded-lg border border-slate-600 p-2 mt-5  text-white ">
              {item.icon}
              <Text className=' text-white text-centerp"'>{item.text}</Text>
            </View>
          </TouchableOpacity>
        ))}
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

const SuggestionsScreen = ({ navigation }: RouterProps) => {
  const [text, setText] = useState('')
  const user = useAppSelector((state) => state.app.user)
  const token = useAppSelector((state) => state.app.token)

  console.log(user)
  console.log(token)

  useEffect(() => {
    if (!user || !token) {
      console.log('User or token is null')
    } else {
      console.log('User and token:', user, token)
    }
  }, [user, token])
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={0}
      className="bg-black-100 flex-1 justify-between pt-10 h-screen w-screen"
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
          <Tags navigation={navigation} />

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
