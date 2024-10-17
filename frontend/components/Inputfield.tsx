import { View, TextInput, TextInputProps } from 'react-native'
import React, { FC } from 'react'

const Inputfield = ({
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
    <View
      className={`flex bg-black-200 border border-gray-200 justify-between items-center flex-row pr-12 rounded-lg ${className}`}
    >
      <TextInput
        className="w-full text-white text-xl font-medium py-4 px-6"
        onChangeText={onChange}
        value={value}
        {...inputProps}
        placeholderTextColor={'white'}
      />
      {iconRight}
    </View>
  )
}

export default Inputfield
