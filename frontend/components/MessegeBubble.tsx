import { View, Text, Image, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'
import * as Clipboard from 'expo-clipboard'
import * as MediaLibrary from 'expo-media-library'
import * as FileSystem from 'expo-file-system'
import { Feather } from '@expo/vector-icons'
import langs, { Langs } from '../utils/langs'
import { useAppSelector } from '../redux/customHooks'

interface MessageBubbleProps {
  message: {
    content: string
    role: string
    type: string
  }
  loading: boolean
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, loading }) => {
  const { language } = useAppSelector((state) => state.app)
  const { content, role, type } = message
  const { button_copy } = langs[language as keyof Langs]?.chat

  const extractUrl = (inputString: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/ // Biểu thức chính quy tìm URL
    const urlMatch = inputString.match(urlRegex)

    return urlMatch ? urlMatch[0] : null // Lấy URL nếu tìm thấy, nếu không trả về null
  }
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(content)
    Alert.alert('Copied to clipboard!', content)
  }

  const saveImage = async () => {
    try {
      const uri = content // Địa chỉ URL của ảnh
      const fileUri = FileSystem.documentDirectory + `image-${Date.now()}.jpg` // Đường dẫn tạm thời lưu ảnh

      // Tải ảnh xuống thư mục tạm thời
      const response = await FileSystem.downloadAsync(uri, fileUri)

      // Kiểm tra và cấp quyền truy cập vào thư viện ảnh
      const { status } = await MediaLibrary.requestPermissionsAsync()

      if (status === 'granted') {
        // Lưu ảnh vào thư viện ảnh
        await MediaLibrary.createAssetAsync(response.uri)
        Alert.alert(
          'Image saved!',
          'Your image has been saved to your device gallery.'
        )
      } else {
        Alert.alert(
          'Permission Denied',
          'You need to grant permission to save images to the gallery.'
        )
      }
    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'Failed to save image.')
    }
  }

  return (
    <View
      className={`flex-row items-start my-2 px-3 ${
        role === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      {role === 'assistant' && (
        <Image
          source={require('../assets/furryna.jpg')}
          className="w-10 h-10 rounded-full mr-2"
        />
      )}
      <View className="flex flex-col max-w-[75%] w-fit gap-2">
        <View
          className={`p-2 rounded-lg border border-gray-200 w-full ${
            role === 'user'
              ? 'bg-primary  rounded-tr-none'
              : 'bg-black-200  rounded-tl-none'
          }`}
        >
          {type === 'text' ? (
            <View>
              {content.includes('![Image](https://image.pollinations.ai') ? (
                <Image
                  source={{ uri: extractUrl(content) || '' }}
                  className="w-[250px] h-[250px] object-cover"
                />
              ) : (
                <Text
                  className={`text-base font-medium ${
                    role === 'user' ? 'text-white' : 'text-white'
                  } line`}
                >
                  {content}
                </Text>
              )}
            </View>
          ) : (
            <Image
              source={{ uri: content }}
              className="w-full h-[250px] object-cover"
            />
          )}
        </View>
        {role === 'assistant' && type !== 'image' && !loading && (
          <View className="items-end">
            <Pressable
              onPress={copyToClipboard}
              className="bg-black-200 p-2 rounded-lg flex flex-row items-center border border-gray-200"
            >
              <Feather
                name="copy"
                size={20}
                color="white"
                className="bg-black-200"
              />
              <Text className="text-white font-medium ml-2">{button_copy}</Text>
            </Pressable>
          </View>
        )}
        {role === 'assistant' && type === 'image' && !loading && (
          <View className="items-end">
            <Pressable
              onPress={saveImage}
              className="bg-black-200 p-2 rounded-lg flex flex-row items-center border border-gray-200"
            >
              <Feather
                name="save"
                size={20}
                color="white"
                className="bg-black-200"
              />
              <Text className="text-white font-medium ml-2">{button_copy}</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  )
}

export default MessageBubble
