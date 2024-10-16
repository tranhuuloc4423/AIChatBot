import {
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import HistoryLable from '../components/HistoryLable'
import { RouterProps } from '../types/navigation'
import { useAppSelector } from '../redux/customHooks'
import axios from '../axiosInstance'
import langs, { Langs } from '../utils/langs'

const HistoryScreen = ({ navigation }: RouterProps) => {
  const { language, token, user } = useAppSelector((state) => state.app)
  const [history, setHistory] = useState([])

  const { title, desc } = langs[language as keyof Langs]?.history

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

  const handleRemove = async (id: string) => {
    try {
      const res = await axios.delete(`/chat/remove/${id}`, {
        headers: {
          Authorization: token
        }
      })
      Alert.alert('Xoá cuộc trò chuyện thành công !')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getHistory()
  }, [history])

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={0}
      className="bg-black-100 flex-1 justify-between w-full px-4"
    >
      <View>
        <Text className="text-3xl text-center font-semibold text-white pb-2">
          {desc}
        </Text>
      </View>
      <ScrollView
        className="h-screen w-full pb-10"
        showsVerticalScrollIndicator={false}
        horizontal={false}
      >
        <View className="flex flex-col items-center mx-auto w-full">
          {history?.map((item: any) => (
            <HistoryLable
              key={item._id}
              text={item.title}
              onClick={() =>
                navigation.navigate('Chat', {
                  conversationId: item._id,
                  title: item?.title
                })
              }
              onRemove={() => handleRemove(item._id)}
            />
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default HistoryScreen
