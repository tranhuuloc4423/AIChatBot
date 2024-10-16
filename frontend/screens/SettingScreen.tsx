import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { RouterProps } from '../types/navigation'
import { useAppSelector } from '../redux/customHooks'
import langs, { Langs } from '../utils/langs'

const SettingScreen = ({ navigation }: RouterProps) => {
  const { language } = useAppSelector((state) => state.app)
  const {
    title,
    buttonText: { about, term, languge }
  } = langs[language as keyof Langs]?.setting
  const supportOptions = [
    {
      label: about,
      path: 'About',
      icon: 'information-circle-outline',
      bgColor: 'bg-purple-500'
    },
    {
      label: term,
      path: 'Term',
      icon: 'document-text-outline',
      bgColor: 'bg-green-500'
    },
    {
      label: languge,
      path: 'Language',
      icon: 'earth-outline',
      bgColor: 'bg-blue-500'
    }
  ]

  useEffect(() => {}, [language])
  return (
    <View className="bg-black-100 px-8 h-screen w-screen">
      <View className="flex flex-col gap-4">
        <View>
          <Text className="text-3xl text-center font-semibold text-white">
            {title}
          </Text>
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

export default SettingScreen
