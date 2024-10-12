import {
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button'
import { Octicons } from '@expo/vector-icons'
import Inputfield from '../components/Inputfield'
import { RouterProps } from '../types/navigation'
import axios from '../axiosInstance'
import { setToken, setUser } from '../redux/slices/appSlice'
import { User } from '../types/app'
import { useAppDispatch } from '../redux/customHooks'

const LoginScreen = ({ navigation }: RouterProps) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const handleLogin = async () => {
    try {
      const login = {
        email,
        password
      }
      const res = await axios.post('/auth/login', login)
      dispatch(setToken(res.data?.token))
      dispatch(setUser({ ...login, conversations: [] } as User))
      navigation.navigate('Main')
    } catch (error) {
      console.log(error)
      Alert.alert('Lỗi đăng nhập')
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      keyboardVerticalOffset={0}
      className={`bg-black-100 flex-1  w-screen h-screen px-8 pt-10`}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        className="flex-1 flex flex-col gap-4"
      >
        <View className="flex justify-center items-center w-full">
          <Image
            source={require('../assets/bg.png')}
            className="w-full h-[250px] bg-cover bg-center"
          />
        </View>
        <View className="py-4">
          <Text className="w-full text-center text-white text-2xl font-bold">
            Welcome to Ai chat bot
          </Text>
        </View>
        <View>
          <Inputfield
            inputProps={{
              keyboardType: 'email-address',
              autoCapitalize: 'none',
              placeholder: 'Email'
            }}
            onChange={(e) => setEmail(e)}
            value={email}
            className="w-full"
          />
        </View>
        <View>
          <Inputfield
            inputProps={{
              secureTextEntry: !open,
              placeholder: 'Password'
            }}
            onChange={(e) => setPassword(e)}
            value={password}
            className="w-full"
            iconRight={
              <View>
                {open ? (
                  <Pressable onPress={() => setOpen(false)}>
                    <Octicons name="eye" size={24} color={'white'} />
                  </Pressable>
                ) : (
                  <Pressable onPress={() => setOpen(true)}>
                    <Octicons name="eye-closed" size={24} color={'white'} />
                  </Pressable>
                )}
              </View>
            }
          />
        </View>
        <View>
          <Button label="Login" onPress={handleLogin} className="w-full" />
        </View>
        <View className="flex flex-row justify-center items-center gap-2">
          <Text className="text-xl text-white font-medium">
            Already have an account?
          </Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text className="text-xl text-primary font-medium">register</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
