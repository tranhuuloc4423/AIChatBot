import { View, Text,TouchableOpacity } from 'react-native'
import React, { FC } from 'react'

const Promt = ({ onPress, className, icon} : {
    onPress: () => void,
    className?: string,
    icon?: FC
}) => {
  return (
    <TouchableOpacity onPress={onPress} className={`flex flex-row gap-1 p-1 ${className}`}>
      {icon && <View>{React.createElement(icon)}</View>}
      <Text className='text-xl'>Promt</Text>
    </TouchableOpacity>
  )
}

export default Promt