import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Tag from '../components/Tag';

const SuggestionsScreen = () => {
  const [tags, setTags] = useState([
    {
      name: 'Chat',
      icon: (
        <View className="rounded-full p-1 bg-white">
          <Ionicons name="chatbubble-ellipses-outline" size={28} color={'black'} />
        </View>
      ),
      path: '',
      active: false,
    },
    {
      name: 'History',
      icon: (
        <View className="rounded-full p-1 bg-white">
          <Ionicons name="time-outline" size={28} color={'black'} />
        </View>
      ),
      path: '',
      active: false,
    },
    {
      name: 'Settings',
      icon: (
        <View className="rounded-full p-1 bg-white">
          <Ionicons name="settings-outline" size={28} color={'black'} />
        </View>
      ),
      path: '',
      active: true,
    },
  ]);

  const handleTag = (index: number) => {
    const updatedTags = tags.map((tag, i) => ({
      ...tag,
      active: i === index,
    }));
    setTags(updatedTags);
  };

  const supportOptions = [
    { label: 'About us', path: '', icon: 'information-circle-outline', bgColor: 'bg-purple-500' },
    { label: 'Terms of Conditions', path: '', icon: 'document-text-outline', bgColor: 'bg-green-500' },
    { label: 'Language', path: '', icon: 'earth-outline', bgColor: 'bg-blue-500' },
  ];

  return (
    <View className="bg-black-100 pt-20 px-8 h-screen w-screen">
      <View className="flex flex-col gap-4">
        <View>
          <Text className="text-4xl font-semibold text-white">Chat AI</Text>
        </View>
        <ScrollView className="w-screen" horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="flex flex-row items-center">
            {tags.map((tag, index) => (
              <Tag key={index} onPress={() => handleTag(index)} label={tag.name} icon={tag.icon} active={tag.active} />
            ))}
          </View>
        </ScrollView>
        
        <View>
          <Text className="text-2xl font-semibold text-white">Support</Text>
        </View>

        {/* Updated Container for Support Options */}
        <View className="bg-gray-800 rounded-[24px] border-[2px] border-gray-700">
          {supportOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              className={`flex-row items-center justify-between px-4 py-5 border-b border-gray-700 ${
                index === 0 ? 'rounded-t-[24px]' : index === supportOptions.length - 1 ? 'rounded-b-[24px] border-b-0' : ''
              }`}
              onPress={() => console.log(option.label)}
            >
              <View className="flex flex-row items-center">
                <View className={`rounded-full p-2 ${option.bgColor}`}>
                  <Ionicons name={option.icon as keyof typeof Ionicons.glyphMap} size={24} color="white" />
                </View>
                <Text className="text-white text-xl font-medium ml-4">{option.label}</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={24} color="white" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default SuggestionsScreen;
