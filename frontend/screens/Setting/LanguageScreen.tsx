import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LanguageScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');

  const languages = [
    {
      label: 'Tiếng Việt',
      flag: { uri: 'https://emojigraph.org/media/joypixels/flag-vietnam_1f1fb-1f1f3.png' },
      value: 'Vietnamese',
    },
    {
      label: 'English',
      flag: { uri: 'https://emojigraph.org/media/joypixels/flag-united-kingdom_1f1ec-1f1e7.png' },
      value: 'English',
    },
  ];

  const handleLanguageSelection = (value: string) => {
    setSelectedLanguage(value);
  };

  return (
    <View className="bg-gray-900 h-full w-full p-4">
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => console.log('Back Pressed')}>
          <Ionicons name="chevron-back" size={32} color="white" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="text-white text-2xl font-semibold">Language</Text>
        </View>
      </View>
      <View className="bg-gray-800 rounded-3xl border-2 border-gray-700">
        {languages.map((language, index) => (
          <TouchableOpacity
            key={index}
            className={`flex-row items-center justify-between px-4 py-5 border-b border-gray-700 ${
              index === 0 ? 'rounded-t-3xl' : index === languages.length - 1 ? 'rounded-b-3xl border-b-0' : ''
            }`}
            onPress={() => handleLanguageSelection(language.value)}
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full overflow-hidden items-center justify-center mr-8">
                <Image
                  source={language.flag}
                  style={{
                    width: 56, 
                    height: 56, 
                    borderRadius: 28, 
                  }}
                  resizeMode="cover"
                />
              </View>
              <Text className="text-white text-xl font-medium">{language.label}</Text>
            </View>

            {selectedLanguage === language.value ? (
              <Ionicons name="checkmark-circle" size={32} color="#6A5ACD" />
            ) : (
              <Ionicons name="ellipse-outline" size={32} color="gray" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default LanguageScreen;
