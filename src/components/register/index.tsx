import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
const RenderRegister = () => {
    const router = useRouter();
    const { width, height } = Dimensions.get("window");

    return (
        <AuthContainer
            title="Bem-vindo"
            subtitle="Crie sua conta!"
            icon="hotel">

            <TextField
                label="Nome completo"
                icon="person"
                placeholder="Digite seu nome completo"
            />

            <TextField
                label="CPF"
                icon="badge"
                placeholder="Digite seu CPF"
            />
            
            <TextField
                label="Telefone"
                icon="phone"
                placeholder="Digite seu telefone com DDD!"
            />  

            <TextField
                label="E-mail"
                icon="email"
                placeholder="user@email.com"
                keyboardType="email-address"
            />

            <PasswordField
                label="Senha"
                icon="lock"
                placeholder="*********"
            />

            <PasswordField
                label="Confirme sua senha"
                icon="lock"
                placeholder="*********"
            />

        <TouchableOpacity style={[global.primaryButton]}>
            <Text style={global.primaryButtonText}>Criar conta</Text>
        </TouchableOpacity>
        <View style={{alignItems: "center", marginTop: height * 0.03}}>
            <TouchableOpacity onPress={() => router.push("/(auth)")}style={{}}>
                <Text style={{color: "#0a4b70ff", fontWeight: 500, fontSize: 17}}>Já possui uma conta?
                    Faça login agora!
                </Text>
            </TouchableOpacity>
        </View>
        </AuthContainer>
    )};
export default RenderRegister;