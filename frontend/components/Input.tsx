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
    iconRight?: FC;
    className?: string;
}) => {
    return (
        <View
            className={`flex bg-red-400 border border-gray-600 flex-row items-center justify-between px-4 py-2 rounded-lg ${className}`}
        >
            <TextInput
                className="w-full"
                onChangeText={onChange}
                value={value}
                {...inputProps}
            />
            {iconRight && <View>{React.createElement(iconRight)}</View>}
        </View>
    );
};

export default Input;
