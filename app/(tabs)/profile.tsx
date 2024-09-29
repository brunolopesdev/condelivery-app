import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  Modal,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { Avatar } from "react-native-paper";
import { Rating } from "react-native-ratings";

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
  plataforma: string[];
  status: string;
}

const mockUser: User = {
  id: 1,
  nome: "João Silva",
  email: "joao.silva@example.com",
  type: "morador",
  telefone: "123456789",
};

const mockOrders: Orders[] = [
  {
    codigo_confirmacao: "1234",
    data_entrega: "2024-09-30T14:00:00Z",
    id: 1,
    plataforma: ["iFood"],
    status: "Entregue",
  },
  {
    codigo_confirmacao: "5678",
    data_entrega: "2024-09-29T14:00:00Z",
    id: 2,
    plataforma: ["Rappi"],
    status: "Pendente",
  },
  {
    codigo_confirmacao: "91011",
    data_entrega: "2024-09-28T14:00:00Z",
    id: 3,
    plataforma: ["Uber Eats"],
    status: "Cancelado",
  },
];

const ProfilePage = () => {
  const [userOrders, setUserOrders] = useState<Orders[]>(mockOrders);
  const [updatedUser, setUpdatedUser] = useState<User>(mockUser);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Orders | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comments, setComments] = useState<string>("");

  const handleInputChange = (field: keyof User, value: string) => {
    setUpdatedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!updatedUser.nome || !updatedUser.email || !updatedUser.telefone) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }

    Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
  };

  const handleRatingSubmit = () => {
    if (!selectedOrder) return;

    Alert.alert(
      "Avaliação enviada!",
      `Nota: ${rating}, Comentários: ${comments}`
    );
    setRating(0);
    setComments("");
    setModalVisible(false);
  };

  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Avatar.Text size={64} label={updatedUser.nome[0]} />
        <Text style={styles.profileName}>{updatedUser.nome}</Text>
        <Text style={styles.profileDetails}>Detalhes do Perfil</Text>
      </View>

      <Text style={styles.sectionTitle}>Informações Pessoais</Text>
      <Text style={styles.instructionText}>Atualize suas informações</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={updatedUser.email}
        onChangeText={(value) => handleInputChange("email", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={updatedUser.nome}
        onChangeText={(value) => handleInputChange("nome", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={updatedUser.telefone}
        onChangeText={(value) => handleInputChange("telefone", value)}
      />
      <Button title="Salvar alterações" onPress={handleSave} />

      <Text style={styles.sectionTitle}>Últimos Pedidos</Text>
      {userOrders.length === 0 ? (
        <Text>Você ainda não fez nenhum pedido.</Text>
      ) : (
        <FlatList
          data={userOrders}
          keyExtractor={(order) => order.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.orderContainer}>
              <Text>{item.plataforma.join(", ")}</Text>
              <Text>
                Data: {new Date(item.data_entrega).toLocaleDateString()}
              </Text>
              <Text>Código: {item.codigo_confirmacao}</Text>
              <Text>Status: {item.status}</Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedOrder(item);
                  setModalVisible(true);
                }}
              >
                <Text style={styles.rateButton}>Avaliar Entrega</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Avalie sua entrega</Text>
          <Rating
            showRating
            onFinishRating={(value: number) => setRating(value)}
            style={styles.rating}
          />
          <TextInput
            style={styles.input}
            placeholder="Comentários sobre a entrega"
            value={comments}
            onChangeText={setComments}
          />
          <Button title="Enviar Avaliação" onPress={handleRatingSubmit} />
          <Button
            title="Cancelar"
            onPress={() => setModalVisible(false)}
            color="red"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff"
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileDetails: {
    color: "gray",
  },
  sectionTitle: {
    fontSize: 18,
    marginVertical: 16,
  },
  instructionText: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 16,
    padding: 8,
  },
  orderContainer: {
    padding: 8,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 8,
  },
  rateButton: {
    color: "blue",
  },
  modalContainer: {
    flex: 1,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
  },
  rating: {
    paddingVertical: 10,
  },
});

export default ProfilePage;
