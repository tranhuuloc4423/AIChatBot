import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Tag from '../../components/Tag'



const LanguageScreen = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('English');

    const languages = [
        {
            label: 'Tiếng Việt',
            flag: 'vietnam',
            value: 'Vietnamese',
        },
        {
            label: 'English',
            flag: 'united-kingdom',
            value: 'English',
        },
    ];

    const handleLanguageSelection = (value) => {
        setSelectedLanguage(value);
    };

    return (
        <View className="bg-[#1F222B] h-screen w-screen p-4">
            <View className="flex flex-row items-center mb-6">
                <TouchableOpacity onPress={() => console.log('Back Pressed')}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-semibold ml-4">Language</Text>
            </View>
            <View className="bg-[#292D36] rounded-lg border-2 border-[#3E424D]">
                {languages.map((language, index) => (
                    <TouchableOpacity
                        key={index}
                        className={`flex flex-row items-center justify-between px-4 py-4 ${index === 0 ? 'rounded-t-lg' : index === languages.length - 1 ? 'rounded-b-lg' : ''
                            } border-b border-[#3E424D]`}
                        onPress={() => handleLanguageSelection(language.value)}
                    >
                        <View className="flex flex-row items-center">
                            <Ionicons
                                name={language.flag}
                                size={24}
                                color="white"
                                className="mr-4"
                            />
                            <Text className="text-white text-lg">{language.label}</Text>
                        </View>

                        {selectedLanguage === language.value && (
                            <Ionicons
                                name="checkmark-circle"
                                size={24}
                                color="#6A5ACD"
                            />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default LanguageScreen;