import { View, Text, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { RouterProps } from '../types/navigation'
import Button from '../components/Button'

const WelcomeScreen = ({ navigation }: RouterProps) => {
  return (
    <View className=" bg-black-100 pt-20 px-8 h-screen w-screen">
      <View className='flex flex-col gap-4'>
      <View className='flex justify-center items-center w-full'>
        <Image source={require('../assets/bg.png')} className="w-full h-2/3 bg-cover bg-center" />
      </View>
      <View className="gap-2 flex flex-col items-center">
        <Text className="text-2xl font-semibold text-white">Welcome to Ai chat bot</Text>
        <Text className="text-xl text-white">
          Lorem ispum is simply dummy text of the printing and
        </Text>
      </View>
      <View>
        <Button
          className=""
          onPress={() => navigation.navigate('Login')}
          label="Get started"
        />
      </View>
      <View>
        <Text className="text-xl font-bold text-center w-full text-white">
            Terms & Conditions
        </Text>
      </View>
      </View>
    </View>
  )
}

export default WelcomeScreen
