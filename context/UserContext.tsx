import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface UserProps {
    id: number;
    nome: string;
    email: string;
    type: string;
    telefone: number;
    moradores: {
      id: number;
    };
    moradorId: number;
    colaborador: {
      id: number;
      numero_entregas: number;
      avaliacao_media: number;
    };
}

interface UserContextType {
  user: UserProps | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getUser: () => Promise<void>;
  updateUser: (user: {
    id: number;
    nome: string;
    email: string;
    type: string;
    telefone: number;
  }) => Promise<void>;
  getUserOrders: (id: number, type: string) => Promise<any[]>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);

  const getUserOrders = async (id: number, type: string) => {
    try {
      const { data } = await axios.get(
        `https://condelivery-backend.vercel.app/${type}/${id}/entregas`
      );
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const updateUser = async (user: {
    id: number;
    nome: string;
    email: string;
    type: string;
    telefone: number;
  }) => {
    await axios.put(
      `https://condelivery-backend.vercel.app/usuarios/${user.id}`,
      user
    );
  };

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post(
        "https://condelivery-backend.vercel.app/login",
        { email, password }
      );

      await AsyncStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error("Falha ao autenticar.");
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  const getUser = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      try {
        const { data } = await axios.get(
          "https://condelivery-backend.vercel.app/verify-token",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(data.user);
      } catch (error) {
        console.error("Erro ao obter usuário:", error);
        logout();
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, login, logout, getUser, updateUser, getUserOrders }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
