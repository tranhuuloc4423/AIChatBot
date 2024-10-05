import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import WelcomeScreen from './screens/WelcomScreen'
import SuggestionsScreen from './screens/SuggestionsScreen'
import SettingScreen from './screens/SettingScreen'
import LanguageScreen from './screens/Setting/LanguageScreen'
import TermScreen from './screens/Setting/TermScreen'
import AboutScreen from './screens/Setting/AboutScreen'
import HistoryScreen from './screens/HistoryScreen'
import ChatScreen from './screens/ChatScreen'
import CreateConScreen from './screens/CreateConScreen'
import store from './redux/store'
import { Provider } from 'react-redux'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Suggestions" component={SuggestionsScreen} />
          <Stack.Screen name="Setting" component={SettingScreen} />
          <Stack.Screen name="Language" component={LanguageScreen} />
          <Stack.Screen name="Term" component={TermScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="CreateCons" component={CreateConScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
