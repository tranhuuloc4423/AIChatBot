import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { RouterProps } from '../../types/navigation'

const TermScreen = ({ navigation }: RouterProps) => {
  return (
    <View className="bg-gray-900 h-full w-full px-4 pt-8 pb-4">
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Ionicons name="chevron-back" size={32} color="white" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="text-white text-3xl font-semibold">
            Term & Conditions
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-4">
        <Text className="text-white text-2xl font-bold mb-6">
          Our App Terms & Conditions
        </Text>

        <Text className="text-gray-400 text-lg mb-6">
          Not everyone knows how to make a Privacy Policy agreement, especially
          with CCPA or GDPR or CalOPPA or PIPEDA or Australia's Privacy Act
          provisions. If you are not a lawyer or someone who is familiar to
          Privacy Policies, you will be clueless. Some people might even take
          advantage of you because of this. Some people may even extort money
          from you. These are some examples that we want to stop from happening
          to you.
        </Text>

        <Text className="text-gray-400 text-lg mb-6">
          We will help you protect yourself by generating a Privacy Policy.
        </Text>

        <Text className="text-gray-400 text-lg mb-6">
          Our Privacy Policy Generator can help you make sure that your business
          complies with the law. We are here to help you protect your business,
          yourself, and your customers.
        </Text>

        <Text className="text-gray-400 text-lg mb-6">
          Fill in the blank spaces below and we will create a personalized
          website Privacy Policy for your business. No account registration
          required. Simply generate & download a Privacy Policy in seconds!
        </Text>
      </ScrollView>
    </View>
  )
}

export default TermScreen
