import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Alert, Dimensions, Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import { global } from "../ui/styles";
import TextField from "../ui/TextField";

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidCPF(cpf: string) {
    const clean = cpf.replace(/\D/g, "");
    return /^\d{11}$/.test(clean);
}

const maskCpf = (value: string) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        .slice(0, 14);
};

const maskPhone = (value: string) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 15);
};

const RenderRegister = () => {

    const { signUp } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cpf, setCpf] = useState("");
    const [nomeCompleto, setNomeCompleto] = useState("");

    const [loading, setLoading] = useState(false);

    const [touched, setTouched] = useState<{
        email?: boolean;
        password?: boolean;
        telefone?: boolean;
        nomeCompleto?: boolean;
        cpf?: boolean;
        confirmPassword?: boolean;
    }>({});

    const errors = useMemo(() => {

        const error: Record<string, string> = {};
        if (touched.nomeCompleto && !nomeCompleto)error.nomeCompleto = "Nome completo é obrigatório";
        if (touched.email && !email)error.email = "E-mail é obrigatório";
        if (touched.email && email && !isValidEmail(email))error.email = "E-mail inválido";
        if (touched.password && !password)error.password = "Senha é obrigatória";
        if (touched.password && password && password.length < 6)error.password = "Senha deve ter no mínimo 6 caracteres";
        if (touched.confirmPassword && confirmPassword && confirmPassword !== password)error.confirmPassword = "As senhas não estão iguais";
        if (touched.telefone && !telefone)error.telefone = "Telefone é obrigatório";
        if (touched.cpf) {if (!cpf) error.cpf = "CPF é obrigatório";else if (!isValidCPF(cpf)) error.cpf = "CPF inválido";}
        return error;

    }, [email, password, cpf, nomeCompleto, telefone, confirmPassword, touched]);

    const canSubmit =
        nomeCompleto &&
        cpf &&
        telefone &&
        email &&
        password &&
        confirmPassword &&
        Object.keys(errors).length === 0 &&
        !loading;

    const router = useRouter();
    const { height } = Dimensions.get("window");

    const handleSubmit = async () => {

        try {
            setLoading(true);
            console.log("[REGISTER]", {
                email,
                password,
                nome: nomeCompleto,
                cpf: cpf.replace(/\D/g, ""),
                telefone: telefone.replace(/\D/g, "")
            });
        
            await signUp({
            nome: nomeCompleto.trim(),
            email: email.trim(),
            senha: password,
            cpf: cpf.replace(/\D/g, ""),
            telefone: telefone.replace(/\D/g, ""),
            });

            Alert.alert("Cadastro realizado com sucesso!");
            router.replace("/(auth)/login");

        } catch (err: any) {
            Alert.alert("Erro", err?.message || "Falha ao tentar cadastrar!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContainer
            title="Bem-vindo"
            subtitle="Crie sua conta!"
            icon="hotel"
        >

            <TextField
                label="Nome completo"
                placeholder="Digite seu nome completo"
                value={nomeCompleto}
                onChangeText={(input) => {
                    setNomeCompleto(input);
                    setTouched(prev => ({ ...prev, nomeCompleto: true }));
                }}
                errorText={errors.nomeCompleto}
            />

            <TextField
                label="CPF"
                placeholder="Digite seu CPF"
                value={maskCpf(cpf)}
                onChangeText={(input) => {
                    const clean = input.replace(/\D/g, "");
                    setCpf(clean);
                    setTouched(prev => ({ ...prev, cpf: true }));
                }}
                errorText={errors.cpf}
            />

            <TextField
                label="Telefone"
                placeholder="Digite seu telefone com DDD"
                value={maskPhone(telefone)}
                onChangeText={(input) => {
                    const clean = input.replace(/\D/g, "");
                    setTelefone(clean);
                    setTouched(prev => ({ ...prev, telefone: true }));
                }}
                errorText={errors.telefone}
            />

            <TextField
                label="E-mail"
                placeholder="user@email.com"
                keyboardType="email-address"
                value={email}
                onChangeText={(input) => {
                    setEmail(input);
                    setTouched(prev => ({ ...prev, email: true }));
                }}
                errorText={errors.email}
            />

            <PasswordField
                label="Senha"
                placeholder="*********"
                value={password}
                onChangeText={(input) => {
                    setPassword(input);
                    setTouched(prev => ({ ...prev, password: true }));
                }}
                errorText={errors.password}
            />

            <PasswordField
                label="Confirme sua senha"
                placeholder="*********"
                value={confirmPassword}
                onChangeText={(input) => {
                    setConfirmPassword(input);
                    setTouched(prev => ({ ...prev, confirmPassword: true }));
                }}
                errorText={errors.confirmPassword}
            />

            <TouchableOpacity
                style={global.primaryButton}
                onPress={handleSubmit}
                disabled={!canSubmit}
            >
                <Text style={global.primaryButtonText}>
                    Criar conta
                </Text>
            </TouchableOpacity>

            <View style={{ alignItems: "center", marginTop: height * 0.03 }}>
                <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                    <Text style={{ color: "#0a4b70ff", fontWeight: "500", fontSize: 17 }}>
                        Já possui uma conta? Faça login agora!
                    </Text>
                </TouchableOpacity>
            </View>

        </AuthContainer>
    );
};

export default RenderRegister;