import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TextInputProps
} from 'react-native'
import React, { FC } from 'react'

const Input = ({
  inputProps,
  onChange,
  value,
  className,
  iconRight
}: {
  inputProps?: TextInputProps
  onChange: (e: string) => void
  value: any
  iconRight?: any
  className?: string
}) => {
  return (
    <View className=" border-black-200 z-50 right-0 border-2 flex flex-row justify-around rounded-t-3xl p-4 pb-4">
      <View
        className={`flex bg-black-200 border w-4/5  border-gray-600 flex-row items-center justify-between  py-4 rounded-lg ${className}`}
      >
        <TextInput
          className="flex-1 pl-3 py-0 text-white"
          onChangeText={onChange}
          value={value}
          {...inputProps}
          placeholderTextColor={'white'}
        />
      </View>
      <View className="rounded-full  w-12 h-12 bg-primary flex items-center justify-center">
        {iconRight}
      </View>
    </View>
  )
}

export default Input
