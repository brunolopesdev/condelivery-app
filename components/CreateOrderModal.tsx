import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

interface Props {
  isPedidoModalOpen: boolean;
  onPedidoModalClose: () => void;
  data: {
    users: {
      id: number;
      nome: string;
      tipo_usuario: string;
      moradores: { id: number }[];
    }[];
    collaborators: { id: number }[];
  };
}

export const CreateOrderModal = ({
  isPedidoModalOpen,
  onPedidoModalClose,
  data,
}: Props) => {
  const [orderFormData, setOrderFormData] = useState({
    moradorId: 0,
    colaboradorId: 0,
    data_entrega: new Date(),
    status: "pendente",
    codigo_confirmacao: "",
    plataforma: "",
  });

  const sendOrderNotification = async (id: number, mensagem: string) => {
    await axios.post(`https://condelivery-backend.vercel.app/notificacoes`, {
      data: new Date(),
      moradorId: id,
      mensagem: mensagem,
    });
  };

  const handleMoradorChange = (value: string) => {
    setOrderFormData((prevData) => ({
      ...prevData,
      moradorId: Number(value),
    }));
  };

  const handleColaboradorChange = (value: string) => {
    setOrderFormData((prevData) => ({
      ...prevData,
      colaboradorId: Number(value),
    }));
  };

  const handleDataEntregaChange = (value: string) => {
    setOrderFormData((prevData) => ({
      ...prevData,
      data_entrega: new Date(value),
    }));
  };

  const handlePlataformaChange = (value: string) => {
    setOrderFormData((prevData) => ({
      ...prevData,
      plataforma: value,
    }));
  };

  const handleCodigoConfirmacaoChange = () => {
    const codigo = Math.floor(1000 + Math.random() * 9000).toString();
    setOrderFormData((prevData) => ({
      ...prevData,
      codigo_confirmacao: codigo,
    }));
  };

  const handleSubmitOrder = async () => {
    try {
      await axios.post(`/api/dashboard/orders/create`, orderFormData);
      sendOrderNotification(orderFormData.moradorId, "Novo pedido criado!");
      Alert.alert("Sucesso", "Pedido criado com sucesso!");
      onPedidoModalClose(); // Fecha o modal após o envio
    } catch (error) {
      console.error("Error submitting order:", error);
      Alert.alert("Erro", "Falha ao criar o pedido.");
    }
  };

  return (
    <Modal visible={isPedidoModalOpen} animationType="slide">
      <View style={styles.modalContent}>
        <Text style={styles.header}>Criar Pedido</Text>

        <View style={styles.formControl}>
          <Text>Morador</Text>
          <Picker
            selectedValue={orderFormData.moradorId.toString()}
            onValueChange={handleMoradorChange}
            mode="dialog"
          >
            <Picker.Item label="Selecione o morador" value="" />
            {data.users.map((user) => {
              if (user.tipo_usuario === "morador" && user.moradores.length) {
                return (
                  <Picker.Item
                    key={user.id}
                    label={user.nome}
                    value={user.moradores[0].id.toString()}
                  />
                );
              }
              return null;
            })}
          </Picker>
        </View>

        <View style={styles.formControl}>
          <Text>Colaborador</Text>
          <Picker
            selectedValue={orderFormData.colaboradorId.toString()}
            onValueChange={handleColaboradorChange}
            mode="dialog"
          >
            <Picker.Item label="Selecione o colaborador" value="" />
            {data.collaborators.map((collaborator) => (
              <Picker.Item
                key={collaborator.id}
                label={`Colaborador ${collaborator.id}`}
                value={collaborator.id.toString()}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.formControl}>
          <Text>Data de Entrega</Text>
          <TextInput
            style={styles.input}
            placeholder="AAAA-MM-DD"
            onChangeText={handleDataEntregaChange}
          />
        </View>

        <View style={styles.formControl}>
          <Text>Status</Text>
          <Picker
            selectedValue={orderFormData.status}
            onValueChange={(itemValue) =>
              setOrderFormData((prevData) => ({
                ...prevData,
                status: itemValue,
              }))
            }
            mode="dialog"
          >
            <Picker.Item
              label="Aguardando retirada pelo colaborador"
              value="pendente"
            />
            <Picker.Item
              label="Retirado pelo colaborador"
              value="Entrega iniciada"
            />
            <Picker.Item label="Entregue" value="Entregue" />
            <Picker.Item label="Cancelado" value="Cancelado" />
          </Picker>
        </View>

        <View style={styles.formControl}>
          <Text>Plataforma</Text>
          <Picker
            selectedValue={orderFormData.plataforma}
            onValueChange={handlePlataformaChange}
            mode="dialog"
          >
            <Picker.Item label="IFood" value="IFood" />
            <Picker.Item label="UberEats" value="UberEats" />
            <Picker.Item label="Rappi" value="Rappi" />
            <Picker.Item label="Mercado Livre" value="Mercado Livre" />
          </Picker>
        </View>

        <View style={styles.formControl}>
          <Text>Código de Confirmação</Text>
          <TextInput
            style={styles.input}
            value={Math.floor(1000 + Math.random() * 9000).toString()}
            onFocus={handleCodigoConfirmacaoChange}
            editable={false}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Salvar" onPress={handleSubmitOrder} />
          <Button title="Cancelar" onPress={onPedidoModalClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  formControl: {
    marginBottom: 15,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
