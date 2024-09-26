import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Tag = ({
  onPress,
  label,
  icon,
  className,
  active
}: {
  onPress: () => void
  label: string
  icon?: any
  className?: string
  active?: boolean
}) => {
  return (
    <View>
      <TouchableOpacity
        className={`px-4 mr-3 py-2 flex flex-row items-center rounded-lg ${
          active ? 'bg-primary' : 'bg-black-300'
        } ${className}`}
        onPress={onPress}
      >
        {icon}
        <Text className="text-white text-3xl ml-2">{label}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Tag
