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
      className={`flex bg-black-200 border border-gray-600 justify-between items-center flex-row p-4 pr-10 rounded-lg ${className}`}
    >
      <TextInput
        className="w-full text-white text-base font-medium"
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
