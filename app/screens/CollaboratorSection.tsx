import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import { Orders } from "@/typings/Orders";
import { Rating } from "@/typings/Ratings";

const CollaboratorsPage = () => {
  const { user, getUserOrders } = useUserContext();
  const [collaboratorOrders, setCollaboratorOrders] = useState<Orders[]>([]);
  const [finishedOrders, setFinishedOrders] = useState<Orders[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [problemDescription, setProblemDescription] = useState("");
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [activeTab, setActiveTab] = useState("active"); // Estado para controlar qual aba está ativa

  const sendOrderNotification = async (id: number, mensagem: string) => {
    await axios.post(`https://condelivery-backend.vercel.app/notificacoes`, {
      data: new Date(),
      moradorId: id,
      mensagem: mensagem,
    });
  };

  const handleReportProblem = async () => {
    if (selectedOrderId) {
      try {
        await axios.post(`https://condelivery-backend.vercel.app/suportes`, {
          tipo_problema: "Entrega",
          status: "Pendente",
          colaboradorId: user?.colaborador?.id,
          descricao: problemDescription,
          data_solicitacao: new Date(),
        });

        Alert.alert(
          "Solicitação enviada",
          "Seu problema foi relatado com sucesso."
        );
        setProblemDescription("");
        setSelectedOrderId(null);
        setModalVisible(false);
      } catch (error) {
        console.error("Erro ao enviar solicitação:", error);
        Alert.alert(
          "Erro ao enviar solicitação",
          "Ocorreu um erro ao relatar o problema. Tente novamente mais tarde."
        );
      }
    }
  };

  const fetchRatings = async (id: number) => {
    const { data } = await axios.get(
      `https://condelivery-backend.vercel.app/colaboradores/${5}/avaliacoes`
    );

    console.log("data", data);

    setRatings(data);
  };

  const fetchCollaboratorOrders = async (id: number, type: string) => {
    setLoading(true);
    try {
      const response = await getUserOrders(id, type);
      const finishedOrders = response.filter(
        (order) => order.status.toLowerCase() === "entregue"
      );
      setFinishedOrders(finishedOrders);
      setCollaboratorOrders(response);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      Alert.alert(
        "Erro ao buscar pedidos",
        "Ocorreu um erro ao buscar os pedidos. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: any, status: string) => {
    await axios.put(`https://condelivery-backend.vercel.app/entregas/${id}`, {
      status,
    });
    setCollaboratorOrders((prevOrders) => {
      return prevOrders.map((order) =>
        order.id === id ? { ...order, status } : order
      );
    });
  };

  useEffect(() => {
    if (user?.colaborador) {
      fetchRatings(5);
      fetchCollaboratorOrders(5, "colaboradores");
    }
  }, [user]);

  const renderOrderItem = ({
    item,
    index,
  }: {
    item: Orders;
    index: number;
  }) => {
    if (activeTab === "ratings") {
      return (
        <View style={styles.orderContainer}>
          <Text style={styles.orderTitle}>Avaliação {index + 1}</Text>
          <Text style={styles.platformBadge}>{item.plataforma}</Text>
          <Text style={styles.orderCode}>
            Código: {item.codigo_confirmacao}
          </Text>
          <Text style={styles.orderDate}>
            Data: {new Date(item.data_entrega).toLocaleDateString()}
          </Text>
          <Text style={styles.orderLocation}>
            Local de entrega: {item.complemento}
          </Text>
        </View>
      );
    }

    // Para as outras abas, verifique o status antes de chamar toLowerCase
    if (activeTab === "active" && item.status?.toLowerCase() === "entregue")
      return null;
    if (activeTab === "finished" && item.status?.toLowerCase() !== "entregue")
      return null;

    return (
      <View style={styles.orderContainer}>
        <Text style={styles.orderTitle}>Pedido {index + 1}</Text>
        <Text style={styles.platformBadge}>{item.plataforma}</Text>
        <Text style={styles.orderCode}>Código: {item.codigo_confirmacao}</Text>
        <Text style={styles.orderDate}>
          Data: {new Date(item.data_entrega).toLocaleDateString()}
        </Text>
        <Text style={styles.orderLocation}>
          Local de entrega: {item.complemento}
        </Text>
        <Text
          style={[
            styles.orderStatus,
            {
              color:
                item.status?.toLowerCase() === "entregue" ? "green" : "grey",
            },
          ]}
        >
          Status: {item.status}
        </Text>
        <View style={styles.buttonContainer}>
          {item.status?.toLowerCase() === "pendente" && (
            <Button
              title="Iniciar entrega"
              color={"#3182ce"}
              onPress={() => {
                updateOrderStatus(item.id, "entrega iniciada");
                sendOrderNotification(
                  item.morador?.id,
                  `A entrega do pedido ${item.codigo_confirmacao} foi iniciada.`
                );
              }}
            />
          )}
          {item.status?.toLowerCase() === "entrega iniciada" && (
            <Button
              title="Concluir entrega"
              onPress={() => {
                updateOrderStatus(item.id, "entregue");
                sendOrderNotification(
                  item.morador?.id,
                  `A entrega do pedido ${item.codigo_confirmacao} foi concluída.`
                );
              }}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              setSelectedOrderId(item.id);
              setModalVisible(true);
            }}
          >
            <Text style={styles.reportText}>Relatar problema</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderTabButtons = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === "active" && styles.activeTab]}
        onPress={() => setActiveTab("active")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "active" && styles.activeTabText,
          ]}
        >
          Pedidos Ativos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === "finished" && styles.activeTab]}
        onPress={() => setActiveTab("finished")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "finished" && styles.activeTabText,
          ]}
        >
          Pedidos Finalizados
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === "ratings" && styles.activeTab]}
        onPress={() => setActiveTab("ratings")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "ratings" && styles.activeTabText,
          ]}
        >
          Avaliações
        </Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Bem-vindo, Colaborador!</Text>
        <Text>
          Aqui você pode visualizar e entregar os pedidos dos moradores.
        </Text>
      </View>

      {renderTabButtons()}

      <Text style={styles.activeOrdersTitle}>
        {activeTab === "active"
          ? "Pedidos Ativos"
          : activeTab === "finished"
          ? "Pedidos Finalizados"
          : "Avaliações"}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : activeTab === "ratings" ? (
        <FlatList
          data={ratings}
          renderItem={({ item, index }) => (
            <View style={styles.orderContainer}>
              <Text style={styles.orderTitle}>Avaliação {index + 1}</Text>
              <Text style={styles.orderLocation}>
                Comentário: {item.comentarios}
              </Text>
              <Text style={styles.orderStatus}>
                Nota: {item.nota}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.orderList}
        />
      ) : (
        <FlatList
          data={activeTab === "active" ? collaboratorOrders : finishedOrders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.orderList}
        />
      )}

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Relatar Problema</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Descreva o problema..."
              value={problemDescription}
              onChangeText={setProblemDescription}
              multiline
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Enviar" onPress={handleReportProblem} />
              <Button
                title="Cancelar"
                onPress={() => setModalVisible(false)}
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    paddingBottom: 100,
  },
  header: {
    backgroundColor: "#EDF2F7",
    padding: 20,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  orderList: {},
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tabButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#3182ce",
    borderRadius: 4,
    backgroundColor: "transparent",
  },
  activeTab: {
    backgroundColor: "#3182ce",
    color: "white",
  },
  tabText: {
    color: "#3182ce",
  },
  activeTabText: {
    color: "white",
  },
  orderContainer: {
    backgroundColor: "#F7FAFC",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  platformBadge: {
    backgroundColor: "#BEE3F8",
    padding: 4,
    borderRadius: 4,
    marginTop: 4,
  },
  orderCode: {
    marginTop: 8,
  },
  orderDate: {
    marginTop: 4,
  },
  orderLocation: {
    marginTop: 4,
  },
  orderStatus: {
    marginTop: 4,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  reportText: {
    color: "#3182ce",
    marginTop: 10,
  },
  activeOrdersTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    height: 80,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CollaboratorsPage;
