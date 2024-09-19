import { View, Text } from "react-native";
import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const LoginScreen = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    return (
        <View
            className={`flex-1 flex flex-col w-screen h-screen px-4 justify-center gap-4`}
        >
            <Text className="w-full text-center">Login Screen</Text>
            <View>
                <Input
                    inputProps={{
                        keyboardType: "email-address",
                        autoCapitalize: "none",
                        placeholder: "Email",
                    }}
                    onChange={(e) => setEmail(e)}
                    value={email}
                    className="w-full my-4"
                />
            </View>
            <View>
                <Input
                    inputProps={{
                        secureTextEntry: true,
                        placeholder: "Password",
                    }}
                    onChange={(e) => setPassword(e)}
                    value={password}
                    className="w-full my-4"
                />
            </View>
            <View>
                <Button
                    label="Login"
                    onPress={() => console.log("submit")}
                    className="w-full"
                />
            </View>
        </View>
    );
};

export default LoginScreen;
