import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Input from './Input'
import langs, { Langs } from '../utils/langs'
import { useAppSelector } from '../redux/customHooks'
import { Chip } from 'react-native-elements'

interface MessageInputProps {
  text: string
  blocks: string[]
  setBlocks: (blocks: string[]) => void
  setText: (text: string) => void
  handleSendMessage: () => void
  onLayout: (e: any) => void
}

const MessageInput: React.FC<MessageInputProps> = ({
  text,
  blocks,
  setBlocks,
  setText,
  handleSendMessage,
  onLayout
}) => {
  const { language } = useAppSelector((state) => state.app)
  const { input } = langs[language as keyof Langs]?.chat

  const handleTextChange = (inputText: string) => {
    if (inputText.endsWith(' ')) {
      const words = inputText.trim().split(' ')
      const lastWord = words[words.length - 1] // Lấy từ cuối cùng trước dấu cách

      // Kiểm tra nếu từ đó bắt đầu bằng dấu '/'
      if (lastWord.startsWith('/')) {
        const command = lastWord.substring(1).toLowerCase()

        // Chỉ thêm block nếu chưa tồn tại
        if (['image'].includes(command) && !blocks.includes(command)) {
          setBlocks([...blocks, command])
          setText('') // Reset lại text sau khi chuyển thành block
        } else {
          setText(inputText)
        }
      } else {
        setText(inputText)
      }
    } else {
      setText(inputText)
    }
  }

  const handleKeyPress = ({ nativeEvent }: any) => {
    if (nativeEvent.key === 'Backspace' && text === '') {
      setBlocks((prevBlocks: string[]) => prevBlocks.slice(0, -1))
      // setBlocks(prevBlocks => prevBlocks.slice(0, -1));
    }
  }

  return (
    <View
      onLayout={onLayout}
      className="flex flex-row gap-2 items-center px-4 py-3 border-t-gray-200 border-t border-r border-l rounded-t-3xl"
    >
      <View className="flex-1 flex flex-row items-center border border-gray-100 rounded-lg p-4 overflow-hidden">
        {blocks.map((block, index) => (
          <Chip
            key={index}
            title={block}
            containerStyle={{ marginRight: 5 }}
            titleStyle={{ color: 'white', fontSize: 20 }}
            buttonStyle={{
              backgroundColor: '#6849ff',
              borderRadius: 8,
              padding: 4
            }}
          />
        ))}
        <TextInput
          value={text}
          onChangeText={handleTextChange}
          onKeyPress={handleKeyPress}
          placeholder={input}
          className="z-50 text-xl text-white w-[75%]"
          placeholderTextColor={'white'}
        />
      </View>
      <TouchableOpacity
        onPress={handleSendMessage}
        className="bg-primary rounded-full w-14 h-14 flex justify-center items-center"
      >
        <Ionicons name="send" size={32} color={'white'} />
      </TouchableOpacity>
    </View>
  )
}

export default MessageInput
