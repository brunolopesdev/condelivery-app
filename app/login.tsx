import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RegistrationModal } from "@/components/RegistrationModal";
import { useUserContext } from "@/context/UserContext";

export default function Login() {
  const navigation = useNavigation();
  const { login } = useUserContext();
  const [error, setError] = useState({
    message: "",
    status: false,
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setError({
      message: "",
      status: false,
    });
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      await login(formData.email, formData.password);

      navigation.navigate("index" as never);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Bem-vindo ao Condelivery</Text>
        <Text style={styles.subText}>
          Simplifique a sua experiência com entregas em condomínios!
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail para começar"
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />
        <Button
          title="Cadastrar"
          color={"#4caf50"}
          onPress={() => setModalVisible(true)}
        />
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.loginHeader}>Log In</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(value) => handleInputChange("password", value)}
        />
        <Button title="Entrar" color={"#4caf50"} onPress={handleLogin} />
        {error.status && <Text style={styles.errorText}>{error.message}</Text>}
        <Button title="Esqueceu a senha" onPress={() => {}} color="#757575" />
      </View>

      <RegistrationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subText: {
    marginVertical: 8,
    textAlign: "center",
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
  loginContainer: {
    padding: 16,
  },
  loginHeader: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});
