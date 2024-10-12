import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import WelcomeScreen from './screens/WelcomScreen'
import LanguageScreen from './screens/Setting/LanguageScreen'
import TermScreen from './screens/Setting/TermScreen'
import AboutScreen from './screens/Setting/AboutScreen'
import SettingScreen from './screens/SettingScreen'

import ChatScreen from './screens/ChatScreen'
import store from './redux/store'
import { Provider } from 'react-redux'
import HistoryScreen from './screens/HistoryScreen'
import { Text, View } from 'react-native'
import { RouterProps } from './types/navigation'
import Tags from './components/Tags'

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

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
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
      </NavigationContainer>
    </Provider>
  )
}
