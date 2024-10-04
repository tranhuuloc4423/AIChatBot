import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { RouterProps } from '../types/navigation'
import Tags from '../components/Tags'

const SuggestionsScreen = ({ navigation }: RouterProps) => {
  const supportOptions = [
    {
      label: 'About us',
      path: 'About',
      icon: 'information-circle-outline',
      bgColor: 'bg-purple-500'
    },
    {
      label: 'Terms of Conditions',
      path: 'Term',
      icon: 'document-text-outline',
      bgColor: 'bg-green-500'
    },
    {
      label: 'Language',
      path: 'Language',
      icon: 'earth-outline',
      bgColor: 'bg-blue-500'
    }
  ]

  return (
    <View className="bg-black-100 pt-20 px-8 h-screen w-screen">
      <View className="flex flex-col gap-4">
        <View>
          <Text className="text-4xl font-semibold text-white">Chat AI</Text>
        </View>
        <Tags navigation={navigation} />

        <View>
          <Text className="text-2xl font-semibold text-white">Support</Text>
        </View>

        {/* Updated Container for Support Options */}
        <View className="bg-gray-800 rounded-[24px] border-[2px] border-gray-700">
          {supportOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              className={`flex-row items-center justify-between px-4 py-5 border-b border-gray-700 ${
                index === 0
                  ? 'rounded-t-[24px]'
                  : index === supportOptions.length - 1
                  ? 'rounded-b-[24px] border-b-0'
                  : ''
              }`}
              onPress={() => navigation.navigate(option.path)}
            >
              <View className="flex flex-row items-center">
                <View className={`rounded-full p-2 ${option.bgColor}`}>
                  <Ionicons
                    name={option.icon as keyof typeof Ionicons.glyphMap}
                    size={24}
                    color="white"
                  />
                </View>
                <Text className="text-white text-xl font-medium ml-4">
                  {option.label}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  )
}

export default SuggestionsScreen
