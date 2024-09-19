import { View, Text, TextInput, TextInputProps } from "react-native";
import React, { FC } from "react";

const Input = ({
    inputProps,
    onChange,
    value,
    className,
    iconRight,
}: {
    inputProps?: TextInputProps;
    onChange: (e: string) => void;
    value: any;
    iconRight?: any;
    className?: string;
}) => {
    return (
        <View
            className={`flex bg-black-200 border border-gray-600 flex-row items-center justify-between px-4 py-2 rounded-lg ${className}`}
        >
            <TextInput
                className="flex-1 text-white"
                onChangeText={onChange}
                value={value}
                {...inputProps}
                placeholderTextColor={'white'}
            />
            <View >
                {iconRight}
            </View>
        </View>
    );
};

export default Input;
