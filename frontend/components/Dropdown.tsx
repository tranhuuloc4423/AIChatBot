import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Text } from 'react-native'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu'

const Dropdown = () => {
  return (
    <Menu>
      <MenuTrigger>
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={30}
          color="white"
        />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            width: 'auto',
            backgroundColor: '#1f222b',
            borderRadius: 4,
            padding: 4,
            marginTop: 40
          }
        }}
      >
        <MenuOption
          onSelect={() => alert(`1`)}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5
          }}
        >
          <Ionicons name="document-text-outline" size={24} color={'white'} />
          <Text className="text-white">Text</Text>
        </MenuOption>
        <MenuOption
          onSelect={() => alert(`pressed2`)}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5
          }}
        >
          <Ionicons name="image-outline" size={24} color={'white'} />
          <Text className="text-white">Image</Text>
        </MenuOption>
        <MenuOption
          onSelect={() => alert(`pressed3`)}
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
