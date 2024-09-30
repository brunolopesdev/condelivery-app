import { useState, useEffect, SetStateAction } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import axios from "axios";

import Pedidos from "@/components/Orders";
import Entregas from "@/components/Deliveries";
import Colaboradores from "@/components/Collaborators";
import Condominios from "@/components/Condos";
import Moradores from "@/components/Residents";
import Overview from "@/components/Overview";
import { CreateOrderModal } from "@/components/CreateOrderModal";
import { RegistrationModal } from "@/components/RegistrationModal";

export interface Users {
  id: number;
  nome: string;
  email: string;
  tipo_usuario: string;
  moradores: {
    id: number;
  }[];
}
export interface Collaborators {
  avaliacao_media: number;
  data_contratacao: string;
  id: number;
  numero_entregas: number;
}

export interface Deliveries {
  id: number;
  data_entrega: string;
  status: string;
  plataforma: string;
  complemento: string;
  codigo_confirmacao: string;
}

export interface Condos {
  data_registro: string;
  endereco: string;
  id: number;
  nome: string;
  numero_moradores: number;
  taxa_condominio: number;
}

interface DashboardData {
  users: Users[];
  deliveries: Deliveries[];
  orders: any[];
  condos: Condos[];
  collaborators: Collaborators[];
}

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("Overview");
  const [data, setData] = useState({
    users: [],
    deliveries: [],
    orders: [],
    condos: [],
    collaborators: [],
  });

  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [pedidoModalVisible, setPedidoModalVisible] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case "Pedidos":
        return <Pedidos deliveries={data.deliveries} />;
      case "Entregas":
        return <Entregas deliveries={data.deliveries} />;
      case "Colaboradores":
        return <Colaboradores collaborators={data.collaborators} />;
      case "Condomínios":
        return <Condominios condos={data.condos} />;
      case "Moradores":
        return <Moradores residents={data.users} />;
      default:
        return <Overview data={data} />;
    }
  };

  const fetchUsers = async () => {
    const response = await axios.get(
      "https://condelivery-backend.vercel.app/usuarios"
    );
    return response.data;
  };

  const fetchDeliveries = async () => {
    const response = await axios.get(
      "https://condelivery-backend.vercel.app/entregas"
    );
    return response.data;
  };

  const fetchCollaborators = async () => {
    const response = await axios.get(
      "https://condelivery-backend.vercel.app/colaboradores"
    );
    return response.data;
  };

  const fetchCondos = async () => {
    const response = await axios.get(
      "https://condelivery-backend.vercel.app/condominios"
    );
    return response.data;
  };

  const fetchAllData = async () => {
    try {
      const [users, deliveries, collaborators, condos] = await Promise.all([
        fetchUsers(),
        fetchDeliveries(),
        fetchCollaborators(),
        fetchCondos(),
      ]);
      setData({ users, deliveries, collaborators, condos, orders: [] });
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleMenuSelect = (section: SetStateAction<string>) => {
    setActiveSection(section);
    setSidebarVisible(false); // Fecha a barra lateral ao selecionar uma opção
  };

  return (
    <View style={styles.container}>
      {sidebarVisible && (
        <View style={styles.sidebar}>
          <Text style={styles.heading}>Condelivery Admin</Text>
          <View style={styles.nav}>
            <Button
              title="Visão Geral"
              color={"grey"}
              onPress={() => handleMenuSelect("Overview")}
            />
            <Button
              title="Pedidos"
              color={"grey"}
              onPress={() => handleMenuSelect("Pedidos")}
            />
            <Button
              title="Entregas"
              color={"grey"}
              onPress={() => handleMenuSelect("Entregas")}
            />
            <Button
              title="Colaboradores"
              color={"grey"}
              onPress={() => handleMenuSelect("Colaboradores")}
            />
            <Button
              title="Condomínios"
              color={"grey"}
              onPress={() => handleMenuSelect("Condomínios")}
            />
            <Button
              title="Moradores"
              color={"grey"}
              onPress={() => handleMenuSelect("Moradores")}
            />
          </View>
          <Pressable
            style={styles.closeButton}
            onPress={() => setSidebarVisible(false)}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </Pressable>
        </View>
      )}

      {!sidebarVisible && (
        <Pressable
          style={styles.overlay}
          onPress={() => setSidebarVisible(true)}
        />
      )}

      <View style={styles.content}>
        <View style={styles.header}>
          <Button
            title={sidebarVisible ? "Fechar Menu" : "Abrir Menu"}
            onPress={() => setSidebarVisible(!sidebarVisible)}
          />
          <Text style={styles.title}>
            {activeSection === "Overview" ? "Visão Geral" : activeSection}
          </Text>
          <Button title="Ações rápidas" onPress={() => setModalVisible(true)} />
        </View>

        {renderSection()}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Selecione uma ação</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setPedidoModalVisible(true);
                setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Criar Pedido</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setUserModalVisible(true);
                setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Cadastrar Usuário</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </Modal>
      </View>

      <CreateOrderModal isPedidoModalOpen={pedidoModalVisible} onPedidoModalClose={() => setPedidoModalVisible(false)} data={data} />
        <RegistrationModal visible={userModalVisible} onClose={() => setUserModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sidebar: {
    backgroundColor: "#2B6CB0",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    zIndex: 1,
    paddingBottom: 100,
  },
  modalText: {},
  heading: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 16,
  },
  nav: {
    flex: 1,
    justifyContent: "space-around",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 0,
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F7FAFC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginVertical: 5,
    width: "100%",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#FBB6CE",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
  },
  textStyle: {
    color: "white",
    textAlign: "center",
  },
});
