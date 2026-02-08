import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import TextField from "../ui/TextField";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { global } from "../ui/styles";
import { MaterialIcons } from "@expo/vector-icons";

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
} 
function isValidCPF(cpf: string) {
    return /^\d{11}$/.test(cpf);
}

const maskCpf = (value: string) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .slice(0, 14);    
    }

const maskPhone = (value: string) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15);
    };

const RenderRegister = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cpf, setCpf] = useState("");
    const [nomeCompleto, setNomeCompleto] = useState("");
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState<{email?: boolean; password?: boolean; telefone?: boolean; nomeCompleto?: boolean; cpf?: boolean; confirmPassword?: boolean}>({});

    const errors = useMemo(() => {
        const error: Record<string, string> = {};
        if (touched.email && !email) error.email = "E-mail é obrigatório";
        if (touched.password && !password) error.password = "Senha é obrigatória";
        if (touched.password && password && password.length < 6) error.password = "Senha deve ter no mínimo 6 caracteres";
        if (touched.email && email && !isValidEmail(email)) error.email = "E-mail inválido";
        if (touched.confirmPassword && confirmPassword !== password) error.confirmPassword = "As senhas não estão iguais";
        if (touched.telefone && !telefone) error.telefone = "Telefone é obrigatório";
        if (touched.nomeCompleto && !nomeCompleto) error.nomeCompleto = "Nome completo é obrigatório";
        if (touched.cpf) {
        if (!cpf) {error.cpf = "CPF é obrigatório";} else if (!isValidCPF(cpf)) {error.cpf = "CPF inválido";}
        }

        return error;
        
    }, [email, password, cpf, nomeCompleto, telefone, confirmPassword, touched]);
    const canSubmit = nomeCompleto && cpf && telefone && email && password && confirmPassword && Object.keys(errors).length === 0 && !loading;

    const router = useRouter();
    const { width, height } = Dimensions.get("window");

    return (
        <AuthContainer
            title="Bem-vindo"
            subtitle="Crie sua conta!"
            icon="hotel">

            <TextField
                label="Nome completo"
                placeholder="Digite seu nome completo"
                value={nomeCompleto}
                onChangeText={(input) => setNomeCompleto(input)}
                errorText={errors.nomeCompleto}
            />

            <TextField
                label="CPF"
                placeholder="Digite seu CPF"
                value={maskCpf(cpf)}
                onChangeText={(input) => setCpf(input)}
                errorText={errors.cpf}
            />
            
            <TextField
                label="Telefone"
                placeholder="Digite seu telefone com DDD!"
                value={maskPhone(telefone)}
                onChangeText={(input) => setTelefone(input)}
                errorText={errors.telefone}
            />  

            <TextField
                label="E-mail"
                placeholder="user@email.com"
                keyboardType="email-address"
                value={email}
                onChangeText={(input) => setEmail(input)}
                errorText={errors.email}
            />

            <PasswordField
                label="Senha"
                placeholder="*********"
                value={password}
                onChangeText={(input) => setPassword(input)}
                errorText={errors.password}
            />

            <PasswordField
                label="Confirme sua senha"
                placeholder="*********"
                value={confirmPassword}
                onChangeText={(input) => setConfirmPassword(input)}
                errorText={errors.confirmPassword}
            />

        <TouchableOpacity style={[global.primaryButton]}>
            <Text style={global.primaryButtonText}>Criar conta</Text>
        </TouchableOpacity>
        <View style={{alignItems: "center", marginTop: height * 0.03}}>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}style={{}}>
                <Text style={{color: "#0a4b70ff", fontWeight: 500, fontSize: 17}}>Já possui uma conta?
                    Faça login agora!
                </Text>
            </TouchableOpacity>
        </View>
        </AuthContainer>
    )};
export default RenderRegister;