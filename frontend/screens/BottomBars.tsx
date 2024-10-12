import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SuggestionsScreen from './SuggestionsScreen'
import SettingScreen from './SettingScreen'
import HistoryScreen from './HistoryScreen'
import { Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import ChatScreen from './ChatScreen'
const BottomTab = createBottomTabNavigator()

const CustomTabBarIcon = ({
  name,
  focused
}: {
  name: string
  focused: boolean
}) => {
  return (
    <View className="flex items-center justify-center">
      <Text
        className={`text-base ${focused ? 'text-blue-500' : 'text-gray-500'}`}
      >
        {name}
      </Text>
    </View>
  )
}

const BottomBars = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Setting"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: '#fff',
        tabBarActiveBackgroundColor: '#6849ff',
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          backgroundColor: '#191A1F',
          elevation: 10,
          height: '10%',
          borderTopColor: '#1f222b',
          borderTopWidth: 1
        },
        tabBarLabelStyle: {
          fontSize: 20,
          fontWeight: 'bold'
        },
        tabBarItemStyle: {
          borderRadius: 4,
          margin: 2
        },
        tabBarIcon: ({ color }) => {
          let iconName
          if (route.name === 'Suggestions') {
            iconName = 'chatbubble-ellipses-outline'
          } else if (route.name === 'Setting') {
            iconName = 'settings-outline'
          } else if (route.name === 'History') {
            iconName = 'time-outline'
          }

          return (
            <Ionicons
              name={iconName}
              size={36}
              color={color}
              // style={{ marginBottom: -12 }}
            />
          )
        }
      })}
    >
      <BottomTab.Screen name="Chat" component={ChatScreen} />
      <BottomTab.Screen name="Setting" component={SettingScreen} />
      <BottomTab.Screen name="History" component={HistoryScreen} />
    </BottomTab.Navigator>
  )
}

export default BottomBars
