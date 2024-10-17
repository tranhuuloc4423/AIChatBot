import { View, Text } from 'react-native'
import React from 'react'
import { RouterProps } from '../types/navigation'

const HomeScreen = ({ navigation }: RouterProps) => {
  return (
    <View className="w-full h-full bg-black-100">
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen
