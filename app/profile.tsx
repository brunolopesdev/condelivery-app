import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { Avatar, Badge, ProgressBar } from "react-native-paper"; // Importando ProgressBar
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import { Rating } from "react-native-ratings";
import { useNavigation } from "expo-router";

interface User {
  id: number;
  nome: string;
  email: string;
  type: string;
  telefone: string;
}

export interface Orders {
  codigo_confirmacao: string;
  data_entrega: string;
  id: number;
  plataforma: string;
  status: string;
  complemento: string;
  colaborador?: {
    id: number;
  };
  morador: {
    id: number;
  };
}

const ProfilePage = () => {
  const navigation = useNavigation();
  const { user, updateUser, getUserOrders, logout } = useUserContext();
  const [userOrders, setUserOrders] = useState<Orders[]>([]);
  const [updatedUser, setUpdatedUser] = useState<User>({
    id: user?.id || 0,
    nome: user?.nome || "",
    email: user?.email || "",
    type: user?.type || "",
    telefone: user?.telefone?.toString() || "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Orders | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comments, setComments] = useState<string>("");

  const handleInputChange = (field: keyof User) => (value: string) => {
    if (user) {
      setUpdatedUser((prev) => ({
        ...prev,
        id: user?.id,
        [field]: value,
      }));
    }
  };

  const handleSave = async () => {
    if (!updatedUser.nome || !updatedUser.email || !updatedUser.telefone) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }

    if (updatedUser.id) {
      try {
        await updateUser({
          ...updatedUser,
          telefone: Number(updatedUser.telefone),
        });
        Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    }
  };

  const handleDeleteProfile = async () => {
    if (user) {
      try {
        await axios.delete(
          `https://condelivery-backend.vercel.app/usuarios/${user.id}`
        );
        Alert.alert("Perfil excluído", "Seu perfil foi excluído com sucesso.");

        logout();

        navigation.navigate("login" as never);
      } catch (error) {
        console.error("Failed to delete profile:", error);
      }
    }
  };

  const fetchOrders = async (id: number) => {
    if (id) {
      const response = await getUserOrders(3, "moradores");
      setUserOrders(response);
    }
  };

  const handleRatingSubmit = async () => {
    if (!selectedOrder) return;

    try {
      await axios.post(`/api/profile/rating`, {
        nota: rating,
        comentarios: comments,
        moradorId: 3,
        colaboradorId: selectedOrder.colaborador?.id,
        data_avaliacao: new Date().toISOString(),
      });

      Alert.alert("Avaliação enviada!", "Sua avaliação foi registrada.");
      setRating(0);
      setComments("");
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Erro", "Erro ao enviar avaliação.");
    }
  };

  useEffect(() => {
    if (user?.moradorId) {
      fetchOrders(3);
    }
  }, [user]);

  // Render user profile information
  const renderProfileInfo = () => (
    <View style={styles.profileCard}>
      <Avatar.Text size={64} label={user?.nome ? user.nome : ""} />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{user?.nome}</Text>
        <Text>Detalhes do Perfil</Text>
      </View>
      <View style={styles.buttons}>
        <Button
          title="Excluir Perfil"
          color="red"
          onPress={() => {
            handleDeleteProfile;
          }}
        />
        <Button title="Editar Perfil" color={"#3182ce"} onPress={() => {}} />
      </View>
    </View>
  );

  // Render order item
  const renderOrderItem = ({ item: order }: { item: Orders }) => {
    const progress =
      order.status === "Entregue"
        ? 1
        : order.status === "Entrega iniciada"
        ? 0.5
        : order.status === "Pendente"
        ? 0.25
        : 0;

    return (
      <View style={styles.orderCard}>
        <Text>
          <Badge style={styles.badge}>{order.plataforma}</Badge>
        </Text>
        <Text>Data: {new Date(order.data_entrega).toLocaleDateString()}</Text>
        <Text>Código: {order.codigo_confirmacao}</Text>
        <Text>Status: {order.status}</Text>
        <ProgressBar
          progress={progress}
          color={"#4caf50"}
          style={styles.progressBar}
        />
        <TouchableOpacity
          onPress={() => {
            if (order.status === "Entregue") {
              setSelectedOrder(order);
              setModalVisible(true);
            }
          }}
        >
          <Text style={styles.rateButton}>Avaliar Entrega</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render profile edit inputs
  const renderProfileEdit = () => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Digite seu novo e-mail"
        value={updatedUser.email}
        onChangeText={handleInputChange("email")}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={updatedUser.nome}
        onChangeText={handleInputChange("nome")}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={updatedUser.telefone}
        onChangeText={handleInputChange("telefone")}
      />
      <Button
        title="Salvar alterações"
        color={"#3182ce"}
        onPress={handleSave}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { key: "profileInfo" },
          { key: "profileEdit" },
          { key: "orders" },
        ]}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          switch (item.key) {
            case "profileInfo":
              return renderProfileInfo();
            case "profileEdit":
              return renderProfileEdit();
            case "orders":
              return (
                <View style={styles.ordersSection}>
                  <Text style={styles.sectionTitle}>Últimos Pedidos</Text>
                  {userOrders && userOrders.length === 0 ? (
                    <Text>Você ainda não fez nenhum pedido.</Text>
                  ) : (
                    <FlatList
                      data={userOrders}
                      keyExtractor={(order) => order.id.toString()}
                      renderItem={renderOrderItem}
                    />
                  )}
                </View>
              );
            default:
              return null;
          }
        }}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Avalie sua entrega</Text>
          <Rating showRating onFinishRating={setRating} style={styles.rating} />
          <TextInput
            style={styles.input}
            placeholder="Comentários sobre a entrega"
            value={comments}
            onChangeText={setComments}
          />
          <Button title="Enviar Avaliação" onPress={handleRatingSubmit} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingBottom: 100,
  },
  profileCard: {
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
    justifyContent: "center",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
    alignItems: "center",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  ordersSection: {
    marginBottom: 16,
  },
  orderCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  badge: {
    backgroundColor: "#3b82f6",
    marginBottom: 8,
    fontSize: 16,
  },
  progressBar: {
    height: 8,
    marginVertical: 8,
    backgroundColor: "#4caf50",
  },
  rateButton: {
    color: "#3182ce",
    fontWeight: "bold",
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  rating: {
    marginVertical: 16,
  },
});

export default ProfilePage;
