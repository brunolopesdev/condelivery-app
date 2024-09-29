import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  Modal,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import { Badge } from "react-native-paper";

const mockOrders = [
  {
    id: 1,
    plataforma: "iFood",
    codigo_confirmacao: "12345",
    data_entrega: new Date(),
    complemento: "Apartamento 101",
    status: "pendente",
  },
  {
    id: 2,
    plataforma: "UberEats",
    codigo_confirmacao: "54321",
    data_entrega: new Date(),
    complemento: "Apartamento 202",
    status: "entrega iniciada",
  },
];

const mockRatings = [
  {
    id: 1,
    nota: 4,
    comentarios: "Entrega rápida e eficiente.",
  },
  {
    id: 2,
    nota: 5,
    comentarios: "Muito bom o serviço.",
  },
];

const CollaboratorsPage = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [ratings, setRatings] = useState(mockRatings);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [problemDescription, setProblemDescription] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleUpdateOrderStatus = (id: number, status: string) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status } : order
    );
    setOrders(updatedOrders);
  };

  const handleReportProblem = () => {
    if (selectedOrderId) {
      Alert.alert(
        "Problema relatado",
        "Seu problema foi relatado com sucesso."
      );
      setProblemDescription("");
      setSelectedOrderId(null);
      setModalVisible(false);
    } else {
      Alert.alert("Erro", "Selecione um pedido para relatar o problema.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Bem-vindo, Colaborador!</Text>
      <Text style={styles.subHeading}>
        Aqui você pode visualizar e entregar os pedidos dos moradores.
      </Text>

      <Text style={styles.sectionHeading}>Pedidos Ativos</Text>
      {orders.length === 0 ? (
        <Text>Nenhum pedido ativo no momento.</Text>
      ) : (
        orders.map((order, index) => (
          <View style={styles.card} key={order.id}>
            <Text style={styles.cardHeading}>Pedido {index + 1}</Text>
            <Text>
              <Badge>{order.plataforma}</Badge>
            </Text>
            <Text>
              Código: <Badge>{order.codigo_confirmacao}</Badge>
            </Text>
            <Text>Data: {order.data_entrega.toLocaleDateString()}</Text>
            <Text>Local de entrega: {order.complemento}</Text>
            <Text>
              Status:{" "}
              <Badge
                style={{
                  color:
                    order.status === "entregue" ? "green" : "orange",
                }}
              >
                {order.status}
              </Badge>
            </Text>
            <View style={styles.actionButtons}>
              {order.status === "pendente" && (
                <Button
                  title="Iniciar entrega"
                  onPress={() =>
                    handleUpdateOrderStatus(order.id, "entrega iniciada")
                  }
                />
              )}
              {order.status === "entrega iniciada" && (
                <Button
                  title="Concluir entrega"
                  onPress={() => handleUpdateOrderStatus(order.id, "entregue")}
                />
              )}
              {order.status === "entregue" && (
                <Button title="Entrega finalizada" disabled />
              )}
            </View>
            <Button
              title="Relatar problema"
              onPress={() => {
                setSelectedOrderId(order.id);
                setModalVisible(true);
              }}
              color="grey"
            />
          </View>
        ))
      )}

      <Text style={styles.sectionHeading}>Avaliações dos Pedidos</Text>
      {ratings.length > 0 &&
        ratings.map((rating, index) => (
          <View style={styles.card} key={rating.id}>
            <Text style={styles.cardHeading}>Avaliação {index + 1}</Text>
            <Text>
              {Array.from({ length: 5 }, (_, i) =>
                i < rating.nota ? "⭐" : "☆"
              )}
            </Text>
            <Text>{rating.comentarios}</Text>
          </View>
        ))}

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Relatar Problema</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Descreva o problema..."
            value={problemDescription}
            onChangeText={setProblemDescription}
          />
          <View style={styles.modalButtons}>
            <Button title="Enviar" onPress={handleReportProblem} />
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="grey"
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subHeading: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default CollaboratorsPage;
