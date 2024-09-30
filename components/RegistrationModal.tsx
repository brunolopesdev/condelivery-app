import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker"

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const RegistrationModal = ({ visible, onClose }: Props) => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    condominioId: 0,
    password: "",
    tipo_usuario: "morador",
    complemento: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setError("");
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        `https://condelivery-backend.vercel.app/usuarios`,
        {
          ...formData,
          data_registro: new Date(),
        }
      );

      if (data.id) {
        await axios.post(`https://condelivery-backend.vercel.app/moradores`, {
          usuarioId: data.id,
          condominioId: formData.condominioId,
          complemento: formData.complemento,
          preferencias_notificacoes: true,
        });

        setSuccess(true);
        Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      }
    } catch (error) {
      console.error(error);
      setSuccess(false);
      setError("Erro ao cadastrar usuário.");
    }

    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cadastrar Novo Usuário</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={formData.nome}
              onChangeText={(value) => handleInputChange("nome", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              keyboardType="phone-pad"
              value={formData.telefone}
              onChangeText={(value) => handleInputChange("telefone", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={formData.password}
              onChangeText={(value) => handleInputChange("password", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Complemento"
              value={formData.complemento}
              onChangeText={(value) => handleInputChange("complemento", value)}
            />

            <Text style={styles.label}>Condomínio</Text>
            <Picker
              selectedValue={formData.condominioId}
              onValueChange={(itemValue: any) =>
                handleInputChange("condominioId", itemValue)
              }
              style={styles.picker}
            >
              <Picker.Item label="Selecione o seu condomínio" value={0} />
              <Picker.Item label="Condomínio 1" value={1} />
            </Picker>

            <View style={styles.buttonContainer}>
              <Button
                title="Cadastrar"
                onPress={handleSubmit}
                color="#4CAF50"
              />
              <Button title="Cancelar" onPress={onClose} color="#757575" />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 8,
    width: "100%",
  },
  label: {
    marginVertical: 8,
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});
