import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Alert
} from 'react-native'
import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { Octicons } from '@expo/vector-icons'
import { RouterProps } from '../types/navigation'
import Inputfield from '../components/Inputfield'
import axios from '../axiosInstance'
import { useSelector } from 'react-redux'
import { useAppSelector } from '../redux/customHooks'
import langs, { Langs } from '../utils/langs'

const RegisterScreen = ({ navigation }: RouterProps) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmed, setPasswordConfirmed] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [openConfirm, setOpenConfirm] = useState<boolean>(false)
  const {
    user: { language }
  } = useAppSelector((state) => state.app)
  const {
    title,
    input_email,
    input_password,
    button_register,
    button_login,
    success,
    error,
    input_passwordComfirmed,
    terms
  } = langs[language as keyof Langs]?.register

  const handleRegister = async () => {
    try {
      const register = {
        email,
        password
      }
      const res = await axios.post('/auth/register', register)
      // console.log(res.data)
      Alert.alert(success)
      navigation.navigate('Login')
    } catch (err) {
      Alert.alert(error)
      console.log(err)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      keyboardVerticalOffset={0}
      className={`bg-black-100 flex-1 px-8 pt-10`}
    >
      <ScrollView className="flex-1 flex flex-col gap-4">
        <View className="flex justify-center items-center w-full">
          <Image
            source={require('../assets/bg.png')}
            className="w-full h-[250px] bg-cover bg-center"
          />
        </View>
        <Text className="w-full text-center text-white text-2xl font-bold">
          {title}
        </Text>
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
          <Inputfield
            inputProps={{
              secureTextEntry: !openConfirm,
              placeholder: input_passwordComfirmed
            }}
            onChange={(e) => setPasswordConfirmed(e)}
            value={passwordConfirmed}
            className="w-full"
            iconRight={
              <View>
                {openConfirm ? (
                  <Pressable onPress={() => setOpenConfirm(false)}>
                    <Octicons name="eye" size={24} color={'white'} />
                  </Pressable>
                ) : (
                  <Pressable onPress={() => setOpenConfirm(true)}>
                    <Octicons name="eye-closed" size={24} color={'white'} />
                  </Pressable>
                )}
              </View>
            }
          />
        </View>
        <View>
          <Button
            label={button_register}
            onPress={handleRegister}
            className="w-full"
          />
        </View>
        <View className="flex flex-row justify-center items-center gap-2">
          <Text className="text-xl text-white font-medium">{terms}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-xl text-primary font-medium">
              {button_login}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen
