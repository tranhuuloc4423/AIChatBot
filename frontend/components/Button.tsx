import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Button = ({
    onPress,
    label,
    className,
}: {
    onPress: () => void;
    label: string;
    className?: string;
}) => {
    return (
        <TouchableOpacity className={`bg-white rounded-lg py-4 ${className}`}>
            <Text className="text-black text-center">{label}</Text>
        </TouchableOpacity>
    );
};

export default Button;
