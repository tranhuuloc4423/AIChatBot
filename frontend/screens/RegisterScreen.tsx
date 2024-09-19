import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { Octicons } from '@expo/vector-icons'
import { RouterProps } from '../types/navigation'

const LoginScreen = ({ navigation} : RouterProps) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmed, setPasswordConfirmed] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [openConfirm, setOpenConfirm] = useState<boolean>(false)
  return (
    <View className={`bg-black-100  w-screen h-screen px-8 pt-20`}>
      <View className="flex-1 flex flex-col gap-4">
      {/* <View className='flex justify-center items-center w-full'>
        <Image source={require('../assets/bg.png')} className="w-full h-2/3 bg-cover bg-center" />
      </View> */}
        <Text className="w-full text-center text-white text-2xl font-bold">Welcome to Ai chat bot</Text>
        <View>
          <Input
            inputProps={{
              keyboardType: 'email-address',
              autoCapitalize: 'none',
              placeholder: 'Email'
            }}
            onChange={(e) => setEmail(e)}
            value={email}
            className="w-full my-4"
          />
        </View>
        <View>
          <Input
            inputProps={{
              secureTextEntry: !open,
              placeholder: 'Password'
            }}
            onChange={(e) => setPassword(e)}
            value={password}
            className="w-full my-4"
            iconRight={
              <TouchableOpacity onPress={() => setOpen(!open)}>
                {open ? (
                  <Octicons name="eye" size={24} color={'white'} />
                ) : (
                  <Octicons name="eye-closed" size={24} color={'white'} />
                )}
              </TouchableOpacity>
            }
          />
        </View>
        <View>
          <Input
            inputProps={{
              secureTextEntry: !openConfirm,
              placeholder: 'Password Confirmed'
            }}
            onChange={(e) => setPasswordConfirmed(e)}
            value={password}
            className="w-full my-4"
            iconRight={
              <TouchableOpacity onPress={() => setOpenConfirm(!openConfirm)}>
                {open ? (
                  <Octicons name="eye" size={24} color={'white'} />
                ) : (
                  <Octicons name="eye-closed" size={24} color={'white'} />
                )}
              </TouchableOpacity>
            }
          />
        </View>
        <View>
          <Button
            label="Register"
            onPress={() => console.log('submit')}
            className="w-full"
          />
        </View>
        <View className='flex flex-row justify-center items-center gap-2'>
            <Text className='text-xl text-white font-medium'>Already have an account?</Text>
            <TouchableOpacity  onPress={() => navigation.navigate("Login")}>
                <Text className='text-xl text-primary font-medium'>Login</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  ) 
}

export default LoginScreen
