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
import React, { useCallback, useEffect, useState } from 'react'
import Button from '../components/Button'
import { Octicons } from '@expo/vector-icons'
import Inputfield from '../components/Inputfield'
import { RouterProps } from '../types/navigation'
import { useAppDispatch, useAppSelector } from '../redux/customHooks'
import { loginUser } from '../redux/api/app'
import langs, { Langs } from '../utils/langs'
import { useFocusEffect } from '@react-navigation/native'
const LoginScreen = ({ navigation, route }: RouterProps) => {
  const username = route?.params?.username
  const pass = route?.params?.pass
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const {
    user: { language }
  } = useAppSelector((state) => state.app)
  const {
    title,
    input_email,
    input_password,
    button_login,
    error,
    success,
    terms,
    button_register
  } = langs[language as keyof Langs]?.login

  const handleLogin = async () => {
    const data = {
      email,
      password
    }
    loginUser(data, dispatch, navigation, success, error)
  }

  useFocusEffect(
    useCallback(() => {
      if (username && pass) {
        setEmail(username)
        setPassword(pass)
      }
    }, [username, pass])
  )

  return (
    <View className="flex-1 w-full h-full bg-black-100">
      <KeyboardAvoidingView
        behavior={'padding'}
        keyboardVerticalOffset={30}
        className={`flex-1 bg-transparent w-full h-full px-8 pt-10`}
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
              {title}
            </Text>
          </View>
          <View>
            <Inputfield
              inputProps={{
                keyboardType: 'email-address',
                autoCapitalize: 'none',
                placeholder: input_email
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
                placeholder: input_password
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
            <Button
              label={button_login}
              onPress={handleLogin}
              className="w-full"
            />
          </View>
          <View className="flex flex-row justify-center items-center gap-2">
            <Text className="text-xl text-white font-medium">{terms}</Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text className="text-xl text-primary font-medium">
                {button_register}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default LoginScreen
