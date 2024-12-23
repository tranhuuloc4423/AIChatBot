import { View, Text, Image, ViewComponent, Pressable } from 'react-native'
import React from 'react'
import { RouterProps } from '../types/navigation'
import { Feather, Ionicons, Octicons } from '@expo/vector-icons'
import { useAppSelector } from '../redux/customHooks'
import langs, { Langs } from '../utils/langs'

const featuresStatic = [
  {
    name: 'Chat',
    icon: <Ionicons name="chatbubble-outline" size={32} color={'white'} />,
    desc: 'Try chat with AI',
    path: 'Chat'
  },
  {
    name: 'Image',
    icon: <Ionicons name="images-outline" size={32} color={'white'} />,
    desc: 'Generate Images',
    path: 'Image'
  },
  {
    name: 'History',
    icon: <Octicons name="history" size={32} color={'white'} />,
    desc: 'Search history',
    path: 'History'
  },
  {
    name: 'Setting',
    icon: <Ionicons name="settings-outline" size={32} color={'white'} />,
    desc: 'View our features',
    path: 'Setting'
  }
]

const HomeScreen = ({ navigation }: RouterProps) => {
  const {
    user: { language }
  } = useAppSelector((state) => state.app)
  const { features, title, button } = langs[language as keyof Langs]?.home
  return (
    <View className="w-full h-full bg-black-100 px-6">
      <View className="flex flex-col justify-between">
        <View className="mt-4">
          <Text className="text-white text-4xl font-bold text-center">
            {title}
          </Text>
        </View>

        <View className="w-full py-10">
          <View className="flex flex-row flex-wrap gap-4 items-center justify-center">
            {features.map((feature, index) => (
              <Pressable
                key={index}
                className={`flex flex-col justify-between rounded-xl w-[44%] p-4 ${
                  index === 0 || index === 3 ? 'bg-black-200' : 'bg-black-400'
                }`}
                onPress={() => {
                  if (featuresStatic[index].path === 'Image') {
                    navigation.navigate('Chat', { image: true })
                  } else {
                    navigation.navigate(featuresStatic[index].path)
                  }
                }}
              >
                <View className="flex flex-row items-center gap-2">
                  <View>{featuresStatic[index].icon}</View>
                  <View>
                    <Text className="text-white text-xl font-semibold">
                      {feature.title}
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row items-center mt-6">
                  <View className="w-[85%]">
                    <Text className="text-white text-lg font-semibold">
                      {feature.desc}
                    </Text>
                  </View>
                  <View className="w-[15%]">
                    <Feather name="chevron-right" size={32} color={'white'} />
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="bg-black-500 rounded-md p-4 flex flex-col items-center justify-center">
          <View className="p-2 bg-primary rounded-full flex items-center justify-center">
            <Image
              source={{
                uri: 'https://cdn3.iconfinder.com/data/icons/communication-555/24/message-smile-square-512.png'
              }}
              className="w-8 h-8"
            />
          </View>
          <Pressable
            onPress={() => navigation.navigate('Chat', { image: false })}
            className="flex flex-row items-center mt-4 justify-between py-2 px-6 bg-primary w-full rounded-full"
          >
            <View>
              <Feather name="chevron-right" size={28} color={'transparent'} />
            </View>
            <View className="">
              <Text className="text-xl text-white font-semibold">{button}</Text>
            </View>
            <View>
              <Feather name="chevron-right" size={28} color={'white'} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default HomeScreen
