import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Button,
  Pressable
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Input from './Input'
import { useAppSelector } from '../redux/customHooks'
import { Chip } from 'react-native-elements'
import * as FileSystem from 'expo-file-system'
import * as Permissions from 'expo-permissions'
import langs, { Langs } from '../utils/langs'
import { Audio } from 'expo-av'
import axios from '../axiosInstance'
import { useNavigation } from '@react-navigation/native'

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
  const { language, token, user } = useAppSelector((state) => state.app)
  const { input, record } = langs[language as keyof Langs]?.chat
  const [lang, setLang] = useState<String>()
  const navigation = useNavigation()

  const [isTranscripting, setIsTranscripting] = useState<boolean>(false)
  const [isRecording, setIsRecording] = useState(false)
  const recordingRef = useRef<Audio.Recording | null>(null)

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
      // setBlocks((prevBlocks: string[]) => prevBlocks.slice(0, -1))
      // setBlocks(prevBlocks => prevBlocks.slice(0, -1));
      const newBlocks = blocks.slice(0, -1)
      setBlocks(newBlocks)
    }
  }

  const sendAudioToBackend = async (audioFile: string) => {
    try {
      console.log(lang)
      setIsTranscripting(true)
      setText(record.transcript)
      const response = await axios.post(
        '/chat/convert-speech',
        {
          audioUrl: `data:audio/wav;base64,${audioFile}`,
          lang: lang
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      )

      const result = await response.data
      console.log('Speech-to-Text Result:', result)
      setIsTranscripting(false)
      setText(result)
      await handleSendMessage()
    } catch (error) {
      console.error('Error sending audio to backend', error)
    }
  }
  const startRecording = async () => {
    try {
      // Request microphone permissions
      const { status } = await Audio.requestPermissionsAsync()
      if (status !== 'granted') {
        alert('Permission to access microphone is required.')
        return
      }

      // Prepare for recording
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      })
      const recordingOptions = {
        android: {
          extension: '.wav',
          outputFormat: Audio.AndroidOutputFormat.DEFAULT,
          audioEncoder: Audio.AndroidAudioEncoder.DEFAULT,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000
        },
        ios: {
          extension: '.wav',
          outputFormat: Audio.IOSOutputFormat.LINEARPCM,
          audioQuality: Audio.IOSAudioQuality.HIGH,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false
        },
        web: {
          mimeType: 'audio/wav',
          bitsPerSecond: 128000
        }
      }
      const recording = new Audio.Recording()
      await recording.prepareToRecordAsync(recordingOptions)
      await recording.startAsync()

      // Set state and reference for recording
      recordingRef.current = recording
      setIsRecording(true)
    } catch (error) {
      console.error('Failed to start recording', error)
    }
  }

  const stopRecording = async () => {
    if (!recordingRef.current) {
      console.error('No active recording found')
      return
    }

    try {
      setIsRecording(false)

      // Stop and unload the recording
      await recordingRef.current.stopAndUnloadAsync()
      const uri = recordingRef.current.getURI()
      console.log('Recording stopped and stored at', uri)

      // Reset recording reference
      recordingRef.current = null

      // Send audio to the backend
      const audioFile = await FileSystem.readAsStringAsync(uri!, {
        encoding: FileSystem.EncodingType.Base64
      })
      sendAudioToBackend(audioFile)
    } catch (error) {
      console.error('Error stopping the recording', error)
    }
  }

  useEffect(() => {
    if (language === 'vietnamese') {
      setLang('vi')
    } else {
      setLang('en')
    }
  }, [language])

  useEffect(() => {
    const handleCleanUp = () => {
      if (recordingRef.current && isRecording) {
        stopRecording() // Stops recording on unmount or navigation
      }
    }

    const unsubscribe = navigation.addListener('beforeRemove', handleCleanUp)
    return unsubscribe
  }, [isRecording])

  return (
    <View
      onLayout={onLayout}
      className="flex flex-col gap-2 items-center px-4 py-3 border-t-gray-200 border-t border-r border-l rounded-t-3xl"
    >
      <View className="flex flex-row items-center">
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
            className="z-50 text-xl text-white w-[100%]"
            placeholderTextColor={'white'}
          />
        </View>
        <TouchableOpacity
          onPress={handleSendMessage}
          className="bg-primary rounded-full w-14 h-14 ml-2 flex justify-center items-center"
        >
          <Ionicons name={'send'} size={28} color={'white'} />
        </TouchableOpacity>
      </View>
      <View className="mt-2">
        <Pressable onPress={isRecording ? stopRecording : startRecording}>
          <Text className="text-blue-600 text-lg">
            {isTranscripting
              ? record.transcript
              : isRecording
              ? record.stop
              : record.start}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default MessageInput
