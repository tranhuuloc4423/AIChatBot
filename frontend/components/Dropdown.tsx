import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Alert, Text } from 'react-native'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu'
import { RouterProps } from '../types/navigation'
import langs, { Langs } from '../utils/langs'
import { useAppSelector } from '../redux/customHooks'

const Dropdown = () => {
  const navigation = useNavigation<RouterProps['navigation']>()
  const { language, token, user } = useAppSelector((state) => state.app)

  const { create_chat, create_chat_success } =
    langs[language as keyof Langs]?.chat
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
            Alert.alert(create_chat_success)
          }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5
          }}
        >
          <Ionicons name="chatbubbles-outline" size={24} color={'white'} />
          <Text className="text-white">{create_chat}</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  )
}

export default Dropdown
