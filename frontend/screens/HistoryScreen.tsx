import {
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Tag from '../components/Tag'
import Input from '../components/Input'
import HistoryLable from '../components/HistoryLable'
import Tags from '../components/Tags'
import { RouterProps } from '../types/navigation'
import { useAppSelector } from '../redux/customHooks'
import axios from '../axiosInstance'
import { useFocusEffect } from '@react-navigation/native'
const TopicsTags = () => {
  return <View></View>
}

const HistoryScreen = ({ navigation }: RouterProps) => {
  const user = useAppSelector((state) => state.app.user)
  const token = useAppSelector((state) => state.app.token)
  const [history, setHistory] = useState([])

  const getHistory = async () => {
    try {
      const res = await axios.get('/chat/history', {
        headers: {
          Authorization: token
        },
        params: {
          email: user.email
        }
      })
      setHistory(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getHistory()
  }, [])

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={0}
      className="bg-black-100 flex-1 justify-between pt-20 h-screen w-screen"
    >
      <ScrollView
        className=" h-screen w-screen"
        showsVerticalScrollIndicator={true}
        horizontal={false}
      >
        <View className="flex flex-col gap-4">
          <View>
            <Text className="text-4xl px-4 font-semibold text-white ">
              Chat AI
            </Text>
          </View>
          <ScrollView
            className="w-screen "
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <Tags navigation={navigation} />
          </ScrollView>
          <View className="flex flex-row items-center justify-between">
            <Text className="text-3xl pl-4  font-semibold text-white">
              Topics
            </Text>
          </View>
          <View className="">
            {history?.map((item: any) => (
              <HistoryLable key={item._id} text={item.title} />
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default HistoryScreen
