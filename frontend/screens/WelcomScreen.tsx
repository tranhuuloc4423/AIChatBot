import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { RouterProps } from '../types/navigation'
import Button from '../components/Button'
import langs, { Langs } from '../utils/langs'
import { useAppSelector } from '../redux/customHooks'
const WelcomeScreen = ({ navigation }: RouterProps) => {
  const { language } = useAppSelector((state) => state.app)
  const { title, desc, button, terms } = langs[language as keyof Langs]?.welcome
  return (
    <View className=" bg-black-100 pt-20 px-8 h-full w-full">
      <View className="flex flex-col gap-8">
        <View className="flex justify-center items-center">
          <Image
            source={require('../assets/bg.png')}
            className="w-full h-[250px] bg-cover bg-center"
          />
        </View>
        <View className="gap-2 flex flex-col items-center">
          <Text className="text-2xl font-semibold text-white text-center">
            {title}
          </Text>
          <Text className="text-xl text-white text-center">{desc}</Text>
        </View>
        <View>
          <Button
            className=""
            onPress={() => navigation.navigate('Login')}
            label={button}
          />
        </View>
        <View className="flex flex-row justify-center items-center gap-2">
          <Pressable onPress={() => navigation.navigate('Term')}>
            <Text className="text-xl text-white font-medium">{terms}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default WelcomeScreen
