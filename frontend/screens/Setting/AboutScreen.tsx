import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const teamMembers = [
  {
    name: 'Lê Văn Tuấn',
    mssv: '121001332',
    email: 'vantuancutevaytaz@gmail.com',
    image: require('../../assets/Tuan.jpg'),
  },
  {
    name: 'Trần Hữu Lộc',
    mssv: '121001198',
    email: 'tranhuuloc4423@gmail.com',
    image: require('../../assets/Loc.jpg'),
  },
  {
    name: 'Nguyễn Minh Quân',
    mssv: '121001113',
    email: 'minkuan1704@gmail.com',
    image: require('../../assets/Quan.jpg'),
  },
  {
    name: 'Nguyễn Thiện Nhân',
    mssv: '121001126',
    email: 'nguyenthiennhan08052003@gmail.com',
    image: require('../../assets/Nhan.jpg'),
  },
];

const TermScreen = () => {
  return (
    <View className="bg-gray-900 h-full w-full p-4">
    <View className="flex-row items-center mb-6">
      <TouchableOpacity onPress={() => console.log('Back Pressed')}>
        <Ionicons name="chevron-back" size={32} color="white" />
      </TouchableOpacity>
      <View className="flex-1 items-center">
        <Text className="text-white text-3xl font-semibold">About Us</Text>
      </View>
    </View>
    <ScrollView showsVerticalScrollIndicator={false} className="px-4">
      {teamMembers.map((member, index) => (
        <View key={index} className="flex-row mb-10 items-center">
          <Image
            source={member.image}
            className="w-32 h-32 rounded-lg mr-4" 
            resizeMode="cover"
          />
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold mb-2">{member.name}</Text>
            <Text className="text-gray-400 text-lg mb-1">MSSV: {member.mssv}</Text>
            <Text className="text-gray-400 text-lg mb-2">Email: {member.email}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  </View>
  );
};

export default TermScreen;
