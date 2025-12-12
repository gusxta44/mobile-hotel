import React, { useMemo, useState } from "react";
import { Alert, Dimensions, Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";
import { useRouter } from "expo-router";

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
} 

const RenderLogin = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState<{email?: boolean; password?: boolean }>({});

    const errors = useMemo(() => {
        const error: Record<string, string> = {};
        if (touched.email && !email) error.email = "E-mail é obrigatório";
        if (touched.password && !password) error.password = "Senha é obrigatória";
        if (touched.password && password && password.length < 6) error.password = "Senha deve ter no mínimo 6 caracteres";
        if (touched.email && email && !isValidEmail(email)) error.email = "E-mail inválido";
        return error;
        
    }, [email, password, touched]);
    const canSubmit = email && password && Object.keys(errors).length === 0 && !loading;

    const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log("[LOGIN] Tentando login com: ", {
        email: email,
        password: password
      });
      await new Promise((req) => setTimeout(req, 2000));
      if (email === "gustavo@gmail.com" && password === "123") {
        Alert.alert("Login bem-sucedido!");
        router.replace("/(tabs)/explorer");
      }
      else {
        Alert.alert("Login inválido!");
        return;
      }      
    }
    catch (erro) {
      Alert.alert("Erro", "Falha ao tentar logar!");
    }
    finally {
        setLoading(false);
    }
  };
    
    const { width, height } = Dimensions.get("window");
    return (
        <AuthContainer
            title="Bem-vindo"
            subtitle="Faça seu login para continuar!"
            icon="hotel">

            {/* children */}    
            <TextField
                label="E-mail"
                icon={{ lib: "MaterialIcons", name: "email" }}
                placeholder="user@email.com"
                value={email}
                onChangeText={(input) => setEmail(input)}
                errorText={errors.email}
                keyboardType="email-address"
            />

            <PasswordField
                label="Senha"
                icon={{ lib: "MaterialIcons", name: "lock" }}
                placeholder="*********"
                value={password}
                onChangeText={(input) => setPassword(input)}
                errorText={errors.password}
                
            />

        <TouchableOpacity
          style={[global.primaryButton]}
          onPress={() => router.push("/(tabs)/explorer")}
        >
            <Text style={global.primaryButtonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={{alignItems: "center", marginTop: height * 0.03}}>
            <TouchableOpacity onPress={() => router.push("/(auth)/resetPassword")}>
                <Text style={{color: "#0a4b70ff", fontSize: 17, fontWeight: 600}}>Esqueci minha senha</Text>
            </TouchableOpacity>
            <View style={{backgroundColor: "#7c8390ff", width: width * 0.5, height: height * 0.001,
                borderRadius: 10, marginTop: height * 0.03}}></View>
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}style={{ marginTop: height * 0.03}}>
                <Text style={{color: "#0a4b70ff", fontWeight: 500, fontSize: 16}}>Não possui uma conta?
                    Cadastre-se agora!
                </Text>
            </TouchableOpacity>
        </View>
        </AuthContainer>
    )};
export default RenderLogin;