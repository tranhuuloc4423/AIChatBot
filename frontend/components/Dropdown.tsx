import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu'
import { RouterProps } from '../types/navigation'

const Dropdown = () => {
  const navigation = useNavigation<RouterProps['navigation']>()
  return (
    <Menu>
      <MenuTrigger>
        <Feather name="plus-circle" size={30} color="white" />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            width: 'auto',
            backgroundColor: '#1f222b',
            borderRadius: 8,
            padding: 8,
            marginTop: 40
          }
        }}
      >
        <MenuOption
          onSelect={() => {
            navigation.navigate('Chat', { title: null, conversationId: null })
            alert(`Conversation created!`)
          }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5
          }}
        >
          <Ionicons name="chatbubbles-outline" size={24} color={'white'} />
          <Text className="text-white">New chat</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  )
}

export default Dropdown
