import axios from '../../axiosInstance'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loginSuccess, logout, setLanguage } from '../slices/appSlice'
import { Alert } from 'react-native'

export const getConversation = async (id, token) => {
  try {
    const res = await axios.get(`/chat/history/${id}`, {
      headers: {
        Authorization: token
      }
    })
    return res.data?.messageIds
  } catch (error) {
    console.log(error)
  }
}

export const createNewConversation = async (data, token) => {
  try {
    const { email, title } = data
    const res = await axios.post(
      '/chat/new-chat',
      { email, title },
      {
        headers: {
          Authorization: token
        }
      }
    )
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const loginUser = async (data, dispatch, navigation, success, error) => {
  try {
    const res = await axios.post('/auth/login', data)
    await AsyncStorage.setItem('token', res?.data?.token)
    await AsyncStorage.setItem('user', JSON.stringify(res?.data?.user))
    await AsyncStorage.setItem(
      'language',
      JSON.stringify(res?.data?.user?.language)
    )
    dispatch(loginSuccess({ token: res?.data.token, user: res?.data.user }))
    navigation?.navigate('Main')
    Alert.alert(success)
  } catch (err) {
    Alert.alert(error)
    console.error(err)
  }
}

// Action logout và xóa token khỏi AsyncStorage
export const logoutUser = async (dispatch, navigation) => {
  await AsyncStorage.removeItem('token')
  await AsyncStorage.removeItem('user')
  dispatch(logout())
  navigation.navigate('Login')
}

export const setLanguageApp = async (data, dispatch) => {
  try {
    const { email, token, lang } = data
    await axios.put(
      '/auth/language',
      { email, language: lang },
      {
        headers: {
          Authorization: token
        }
      }
    )
    await AsyncStorage.setItem('language', lang)
    dispatch(setLanguage(lang))
  } catch (error) {
    console.log(error)
  }
}
