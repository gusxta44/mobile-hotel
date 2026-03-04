/*Função: definir o fluxo de navegação entre as telas de autenticação: Login, Register, ResetPassword
Sobreposição de telas: Stack Navigator, 3 funções para manipular o empilhamento:
push(): empilha a tela atual sobre a anterior
back(): remove a tela atual e retorna à tela anterior empilhada
replace(): subtitui a tela atual pela próxima */

import { useAuth } from "@/contexts/AuthContext";
import { Redirect, Stack } from "expo-router";


const AuthLayout = () => {
        const { token, isLoading } = useAuth();
    // adicionar um componente de carregamento aqui, depois
    if (isLoading) return null; // Ou um componente de carregamento
    
    if (token) {
        // Se o usuário já estiver autenticado, redireciona para a tela principal
        return <Redirect href="/(tabs)/explorer" />;
        
    }
    
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" options={{ title: "Login" }}/>
        { <Stack.Screen name="register" options={{ title: "Register" }}/>}
        {<Stack.Screen name="resetPassword" options={{ title: "Esqueci minha senha" }}/>}
        </Stack>
    )
}

export default AuthLayout;