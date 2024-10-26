import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { RouterProps } from '../../types/navigation'
import { useAppSelector } from '../../redux/customHooks'
import langs, { Langs } from '../../utils/langs'

const teamMembers = [
  {
    name: 'Lê Văn Tuấn',
    mssv: '121001332',
    email: 'vantuancutevaytaz@gmail.com',
    image: require('../../assets/Tuan.jpg')
  },
  {
    name: 'Trần Hữu Lộc',
    mssv: '121001198',
    email: 'tranhuuloc4423@gmail.com',
    image: require('../../assets/Loc.jpg')
  },
  {
    name: 'Nguyễn Minh Quân',
    mssv: '121001113',
    email: 'minkuan1704@gmail.com',
    image: require('../../assets/Quan.jpg')
  },
  {
    name: 'Nguyễn Thiện Nhân',
    mssv: '121001126',
    email: 'nguyenthiennhan08052003@gmail.com',
    image: require('../../assets/Nhan.jpg')
  }
]

const TermScreen = ({ navigation }: RouterProps) => {
  const {
    user: { language }
  } = useAppSelector((state) => state.app)
  const { title } = langs[language as keyof Langs]?.about
  return (
    <View className="bg-black-100 h-full w-full px-4 pb-4 pt-8">
      <View className="flex flex-col gap-4">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <Ionicons name="chevron-back" size={32} color="white" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-white text-2xl font-semibold">{title}</Text>
          </View>
          <View className="w-8"></View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} className="px-4">
          {teamMembers.map((member, index) => (
            <View key={index} className="flex-row mb-10 items-center">
              <Image
                source={member.image}
                className="w-32 h-32 rounded-lg mr-4"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text className="text-white text-2xl font-bold mb-2">
                  {member.name}
                </Text>
                <Text className="text-gray-400 text-lg mb-1">
                  MSSV: {member.mssv}
                </Text>
                <Text className="text-gray-400 text-lg mb-2">
                  Email: {member.email}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

export default TermScreen
