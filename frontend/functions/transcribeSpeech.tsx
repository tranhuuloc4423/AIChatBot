import { Audio } from 'expo-av'
import { MutableRefObject } from 'react'
import * as FileSystem from 'expo-file-system'
import { Platform } from 'react-native'
import * as Device from 'expo-device'
import { readBlobAsBase64 } from './readBlobAsBase64'
import axios from '../axiosInstance'
import { useAppSelector } from '../redux/customHooks'
import { AxiosResponse } from 'axios'

export const transcribeSpeech = async (
  audioRecordingRef: MutableRefObject<Audio.Recording>
) => {
  const { token } = useAppSelector((state) => state.app)
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: false
    })
    const isPrepared = audioRecordingRef?.current?._canRecord
    if (isPrepared) {
      await audioRecordingRef?.current?.stopAndUnloadAsync()

      const recordingUri = audioRecordingRef?.current?.getURI() || ''
      let base64Uri = ''

      base64Uri = await FileSystem.readAsStringAsync(recordingUri, {
        encoding: FileSystem.EncodingType.Base64
      })

      const dataUrl = base64Uri

      audioRecordingRef.current = new Audio.Recording()

      const audioConfig = {
        encoding:
          Platform.OS === 'android'
            ? 'AMR_WB'
            : Platform.OS === 'web'
            ? 'WEBM_OPUS'
            : 'LINEAR16',
        sampleRateHertz:
          Platform.OS === 'android'
            ? 16000
            : Platform.OS === 'web'
            ? 48000
            : 41000,
        languageCode: 'en-US'
      }

      if (recordingUri && dataUrl) {
        const res = (await axios.post(`/chat/convert-speech`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          },
          body: JSON.stringify({ audioUrl: dataUrl, config: audioConfig })
        })) as AxiosResponse<{ results: any }>

        const results = res?.results
        if (results) {
          const transcript = results?.[0].alternatives?.[0].transcript
          if (!transcript) return undefined
          return transcript
        } else {
          console.error('No transcript found')
          return undefined
        }
      }
    } else {
      console.error('Recording must be prepared prior to unloading')
      return undefined
    }
  } catch (e) {
    console.error('Failed to transcribe speech!', e)
    return undefined
  }
}
