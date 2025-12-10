import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
} 

const RenderPasswordreset = () => {
    const [email, setEmail] = useState("");
    const [touched, setTouched] = useState<{email?: boolean}>({});

    const errors = useMemo(() => {
        const error: Record<string, string> = {};
        if (touched.email && email && !isValidEmail(email)) error.email = "E-mail inválido";
        return error;
    }, [email, touched]);


    const router = useRouter();
    const { width, height } = Dimensions.get("window");

    return (
        <View style={{ flex: 1}}>
    <TouchableOpacity
        style={{ position: 'absolute', top: 50, left: 10, zIndex: 10 }}
        onPress={() => router.back()}>
        <MaterialIcons name="arrow-back" size={28} color="#000000ff" />
    </TouchableOpacity>

    <AuthContainer
    title="Redefina sua senha"
    subtitle="Insira seu e-mail para a redefinição de senha"
    icon=""
>
    <TextField
        label="E-mail"
        icon={{ lib: "MaterialIcons", name: "email" }}
        placeholder="user@email.com"
        keyboardType="email-address"
        value={email}
        onChangeText={(input) => setEmail(input)}
        errorText={errors.email}
        onBlur={() => setTouched({ email: true })}
    />

    <TouchableOpacity style={[global.primaryButton]}>
        <Text style={global.primaryButtonText}>Redefinir senha</Text>
    </TouchableOpacity>
</AuthContainer>

</View>

    )};
export default RenderPasswordreset;