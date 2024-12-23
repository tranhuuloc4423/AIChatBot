import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import store from './redux/store'
import { Provider, useDispatch } from 'react-redux'
import { RouterProps } from './types/navigation'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
import { loginSuccess } from './redux/slices/appSlice'
import { logoutUser, setLanguageApp } from './redux/api/app'
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  WelcomeScreen,
  LanguageScreen,
  TermScreen,
  AboutScreen,
  Drawer
} from './screens'
import { MenuProvider } from 'react-native-popup-menu'

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<RouterProps['navigation']>()

  useEffect(() => {
    const checkToken = async () => {
      const token = (await AsyncStorage.getItem('token')) || undefined
      const user = JSON.parse((await AsyncStorage.getItem('user')) || '{}')
      const lang = JSON.parse((await AsyncStorage.getItem('language')) || '{}')
      if (token) {
        const decodedToken = jwtDecode(token)
        const currentTime = Date.now() / 1000
        if ((decodedToken.exp ?? 0) < currentTime) {
          logoutUser(dispatch, navigation)
          navigation.navigate('Login')
        } else {
          dispatch(loginSuccess({ token, user }))
          setLanguageApp(lang, dispatch)
          navigation.navigate('Main')
        }
      }
    }
    checkToken()
  }, [dispatch, navigation])

  return (
    <Stack.Navigator
      initialRouteName={'Welcome'}
      screenOptions={{ headerShown: false, animation: 'fade' }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Main" component={Drawer} />
      {/* Correctly used as a Screen */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="Term" component={TermScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <MenuProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </MenuProvider>
    </Provider>
  )
}
