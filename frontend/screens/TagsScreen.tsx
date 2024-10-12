import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SettingScreen from './SettingScreen'
import HistoryScreen from './HistoryScreen'
import { Text, View } from 'react-native'
import ChatScreen from './ChatScreen'
import React from 'react'
import Tags from '../components/Tags'
import { RouterProps } from '../types/navigation'

const Tag = createNativeStackNavigator()

const TagsNavigation = () => {
  return (
    <Tag.Navigator>
      <Tag.Screen name="Chat" component={ChatScreen} />
      <Tag.Screen name="Setting" component={SettingScreen} />
      <Tag.Screen name="History" component={HistoryScreen} />
    </Tag.Navigator>
  )
}

const TagsScreen = ({ navigation }: RouterProps) => {
  <View className='flex-1'>
    <View className='flex-1'>
      <Text>test</Text>
      <Tags navigation={navigation} />
    </View>
    <View className='flex-1'>
      {/* <TagsNavigation /> */}
    </View>
  </View>
}

export default TagsScreen
