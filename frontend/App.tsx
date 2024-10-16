import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import store from './redux/store'
import { Provider, useDispatch } from 'react-redux'
import { View } from 'react-native'
import { RouterProps } from './types/navigation'
import Tags from './components/Tags'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
import { loginSuccess } from './redux/slices/appSlice'
import { logoutUser } from './redux/api/app'
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  WelcomeScreen,
  LanguageScreen,
  TermScreen,
  AboutScreen,
  SettingScreen,
  ChatScreen,
  HistoryScreen
} from './screens'

const Stack = createNativeStackNavigator()
const Tag = createNativeStackNavigator()

const TagsScreen = ({ navigation }: RouterProps) => {
  return (
    <View className="flex-1">
      <Tags navigation={navigation} />
      <View className="flex-1">
        <View className="flex-1">
          <Tag.Navigator
            initialRouteName="Chat"
            screenOptions={{ headerShown: false }}
          >
            <Tag.Screen name="Chat" component={ChatScreen} />
            <Tag.Screen name="Setting" component={SettingScreen} />
            <Tag.Screen name="History" component={HistoryScreen} />
          </Tag.Navigator>
        </View>
      </View>
    </View>
  )
}

const AppNavigator = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<RouterProps['navigation']>()

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token')
      const user = JSON.parse((await AsyncStorage.getItem('user')) || '{}')

      if (token) {
        const decodedToken = jwtDecode(token)
        const currentTime = Date.now() / 1000

        if ((decodedToken.exp ?? 0) < currentTime) {
          logoutUser(dispatch)
          navigation.navigate('Login')
        } else {
          dispatch(loginSuccess({ token, user }))
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
      <Stack.Screen name="Main" component={TagsScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
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
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  )
}
