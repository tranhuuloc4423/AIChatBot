import {
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import HistoryLable from '../components/HistoryLable'
import { RouterProps } from '../types/navigation'
import { useAppSelector } from '../redux/customHooks'
import axios from '../axiosInstance'

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
      className="bg-black-100 flex-1 justify-between w-screen px-4 pt-10"
    >
      <View>
        <Text className="text-3xl text-center font-semibold text-white pb-2">
          Topics
        </Text>
      </View>
      <ScrollView
        className="h-screen w-full pb-10"
        showsVerticalScrollIndicator={false}
        horizontal={false}
      >
        <View className="flex flex-col gap-4 w-full mx-auto">
          <View className="">
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
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default HistoryScreen
