import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'
import ChatScreen from './ChatScreen'
import SettingScreen from './SettingScreen'
import HistoryScreen from './HistoryScreen'
import HomeScreen from './HomeScreen'
import CustomDrawerContent from '../components/CustomDrawerContent'
import { useAppSelector } from '../redux/customHooks'
import langs, { Langs } from '../utils/langs'

const Drawer = createDrawerNavigator()

const MainDrawer = () => {
  const { language } = useAppSelector((state) => state.app)
  const { chat, history, home, setting } =
    langs[language as keyof Langs]?.buttonScreen
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: 'slide',
        drawerStyle: {
          backgroundColor: '#1A1A1A', // Dark background
          height: '100%'
        },
        drawerActiveTintColor: '#ffffff',
        drawerInactiveTintColor: '#888888',
        drawerLabelStyle: {
          fontSize: 20
        },
        headerStyle: {
          backgroundColor: '#191A1F',
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 80
        },
        headerTintColor: '#ffffff', // Text color in the header
        headerTitleStyle: {
          fontSize: 24, // Font size for the header title
          fontWeight: 'bold' // Make the header title bold
        },
        headerLeftContainerStyle: {
          paddingLeft: 20
        },
        headerRightContainerStyle: {
          paddingRight: 20
        }
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: home,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          )
        }}
      />
      <Drawer.Screen
        name="Chat"
        component={ChatScreen}
        initialParams={{ conversationId: null, title: null }}
        options={{
          title: chat,

          drawerIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" color={color} size={size} />
          )
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          title: setting,

          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          )
        }}
      />
      <Drawer.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: history,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="time-outline" color={color} size={size} />
          )
        }}
      />
    </Drawer.Navigator>
  )
}

export default MainDrawer
