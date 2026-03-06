import { API_URL } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type RegisterData = {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone: string;
};

type AuthContextType = {
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, senha: string) => Promise<void>;        
  signUp: (data: RegisterData) => Promise<void>;                  
  signOut: () => Promise<void>;                                   
  consulta: (inicio: string, fim: string, quantidade: number) => Promise<any[]>; 
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega token do AsyncStorage ao iniciar
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("token");
      if (stored) setToken(stored);
      setIsLoading(false);
    })();
  }, []);


  //login
  async function signIn(email: string, senha: string) {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.message || "Credenciais inválidas");
    }

    const tokenAPI: string = await res.json();
    await AsyncStorage.setItem("token", tokenAPI);
    setToken(tokenAPI);
  }


  //register
  async function signUp(data: RegisterData) {
    const res = await fetch(`${API_URL}/login/cadastro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.message || "Erro ao cadastrar");
    }

    const tokenAPI: string | null = await res.json().catch(() => null);
    if (tokenAPI) {
      await AsyncStorage.setItem("token", tokenAPI);
      setToken(tokenAPI);
    }
  }

  //CONSULTA
  async function consulta(inicio: string, fim: string, quantidade: number) {
    const payload = {
      data_inicio: inicio.replace(/\//g, "-"),
      data_fim: fim.replace(/\//g, "-"),
      quantidade,
    };

    const res = await fetch(`${API_URL}/quartosDisponiveis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(payload),
    });

    const responseText = await res.text();

    if (!res.ok) {
      try {
        const err = JSON.parse(responseText);
        throw new Error(err?.message || err?.error || `Erro ${res.status}`);
      } catch {
        throw new Error(responseText || `Erro ${res.status}`);
      }
    }

    const json = JSON.parse(responseText);

    const roomsArray =
      Array.isArray(json) ? json :
      Array.isArray(json.data) ? json.data :
      Array.isArray(json.quartos) ? json.quartos :
      Array.isArray(json.rooms) ? json.rooms :
      [];

    return roomsArray.map((room: any) => ({
      id: room.id || room.quarto_id || room.quartoId,
      nome: room.nome || room.name || room.tipo || "Quarto",
      preco: parseFloat(room.preco || room.price || room.valor || 0),
      descricao: room.descricao,
      imagem: room.imagem || room.image || room.foto || null,
    }));
  }

  //logout
  async function signOut() {
    await AsyncStorage.removeItem("token");
    setToken(null);
  }

  const value = useMemo(() => ({
    token,
    isLoading,
    signIn,
    signUp,
    signOut,
    consulta,
  }), [token, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return ctx;
};

export default AuthProvider;