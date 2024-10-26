import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { RouterProps } from '../../types/navigation'
import langs, { Langs } from '../../utils/langs'
import { useAppSelector } from '../../redux/customHooks'

const TermScreen = ({ navigation }: RouterProps) => {
  const {
    user: { language }
  } = useAppSelector((state) => state.app)
  const { title, desc, terms } = langs[language as keyof Langs]?.term
  return (
    <View className="bg-black-100 h-full w-full px-4 pt-8 pb-4">
      <View className="flex-row items-center justify-between mb-4 border border-b-gray-200 border-t-0 border-l-0 border-r-0 pb-4">
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Ionicons name="chevron-back" size={32} color="white" />
        </TouchableOpacity>
        <View className="text-center">
          <Text className="text-white text-2xl font-semibold">{title}</Text>
        </View>
        <View></View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-4">
        <Text className="text-white text-2xl font-bold mb-6">{desc}</Text>

        <Text className="text-gray-400 text-lg mb-6">{terms}</Text>
      </ScrollView>
    </View>
  )
}

export default TermScreen
