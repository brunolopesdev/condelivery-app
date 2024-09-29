import { Header } from "@/components/Header";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { Avatar } from "react-native-paper";

const Suporte = () => {
  const [problemDescription, setProblemDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleReportProblem = () => {
    const supportRequest = {
      tipo_problema: "Suporte",
      status: "Pendente",
      colaboradorId: 1,
      descricao: problemDescription,
      data_solicitacao: new Date(),
    };

    console.log("Support Request:", supportRequest);

    Alert.alert(
      "Solicitação enviada",
      "Seu problema foi relatado com sucesso."
    );

    setProblemDescription("");
    setName("");
    setEmail("");
  };

  return (
    <ScrollView style={styles.container}>
      <Header title="Suporte" />

      <View style={styles.header}>
        <Text style={styles.heading}>Bem-vindo ao Suporte Condelivery</Text>
        <Text style={styles.subHeading}>
          Nossa equipe está aqui para te ajudar!
        </Text>
      </View>

      <View style={styles.teamInfo}>
        <Avatar.Text size={64} label="C" />
        <View style={styles.teamDetails}>
          <Text style={styles.teamTitle}>Equipe Condelivery</Text>
          <Text style={styles.teamSubtitle}>
            Suporte Técnico - Atendimento ao Cliente
          </Text>
          <Text>Estamos disponíveis 24/7 para te auxiliar</Text>
        </View>
      </View>

      <View style={styles.contactForm}>
        <Text style={styles.sectionTitle}>Entre em Contato</Text>
        <Text style={styles.instructions}>
          Envie sua mensagem que responderemos rapidamente
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.textArea}
          placeholder="Digite sua mensagem aqui"
          multiline
          numberOfLines={5}
          value={problemDescription}
          onChangeText={setProblemDescription}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Limpar"
            onPress={() => {
              setProblemDescription("");
              setName("");
              setEmail("");
            }}
          />
          <Button title="Enviar" onPress={handleReportProblem} />
        </View>
      </View>

      <View style={styles.interactions}>
        <Text style={styles.sectionTitle}>Últimas Interações</Text>
        <Text style={styles.instructions}>
          Veja o que nossos clientes estão falando sobre nosso suporte
        </Text>
        <View style={styles.interactionCard}>
          <Text style={styles.interactionClient}>Cliente123</Text>
          <Text style={styles.interactionDate}>12/09/2024 - São Paulo</Text>
          <Text style={styles.interactionFeedback}>
            "Atendimento excelente, resolveram minha dúvida rapidamente."
          </Text>
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subHeading: {
    marginVertical: 8,
    fontSize: 16,
  },
  teamInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  teamDetails: {
    marginLeft: 16,
  },
  teamTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  teamSubtitle: {
    color: "#555",
  },
  contactForm: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  instructions: {
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginVertical: 4,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginVertical: 4,
    height: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  interactions: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    marginTop: 16,
  },
  interactionCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    borderColor: "#ccc",
  },
  interactionClient: {
    fontWeight: "bold",
  },
  interactionDate: {
    color: "#555",
    fontSize: 12,
  },
  interactionFeedback: {
    marginTop: 8,
  },
});

export default Suporte;
