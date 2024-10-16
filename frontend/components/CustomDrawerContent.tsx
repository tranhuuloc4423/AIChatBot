import React from 'react'
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import { RouterProps } from '../types/navigation'
import { useAppDispatch, useAppSelector } from '../redux/customHooks'
import Button from './Button'
import { Ionicons } from '@expo/vector-icons'
import { logoutUser } from '../redux/api/app'
import langs, { Langs } from '../utils/langs'

const CustomDrawerContent = (props: any) => {
  const navigation = useNavigation<RouterProps['navigation']>()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.app)
  const { language } = useAppSelector((state) => state.app)
  const { title, cancel, desc } = langs[language as keyof Langs]?.other.logout
  const handleLogout = () => {
    Alert.alert(title, desc, [
      {
        text: cancel,
        style: 'cancel'
      },
      {
        text: title,
        onPress: () => {
          logoutUser(dispatch, navigation)
        }
      }
    ])
  }
  return (
    <DrawerContentScrollView
      {...props}
      className="bg-dark flex flex-col justify-between h-full"
    >
      <View className="px-4 py-4 ">
        {/* User Avatar and Email */}
        <View className="flex-row items-center mb-4">
          <Image
            source={require('../assets/furryna.jpg')}
            className="w-12 h-12 rounded-full mr-3"
          />
          <View>
            <Text className="text-white font-semibold text-2xl">
              {user?.email}
            </Text>
          </View>
        </View>

        {/* Drawer Menu Items */}
        <DrawerItemList {...props} />
      </View>

      {/* Footer */}
      <View className="border-t border-gray-700 mt-4 justify-end">
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center gap-3 mt-4 mx-6 py-2"
        >
          <Ionicons name="log-out-outline" size={24} color={'#ccc'} />
          <Text className="text-gray-400 text-xl">{title}</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  )
}

export default CustomDrawerContent
