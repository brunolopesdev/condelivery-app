import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";

const condominios = [
  {
    id: 1,
    nome: "Condomínio Tropicalia",
    admin: "Admin Nome",
    atividades: [
      {
        nome: "Atividade 1",
        descricao: "Notificação de recebimento de entrega",
        data: "12/09/2024",
      },
      {
        nome: "Atividade 2",
        descricao: "Entrega finalizada",
        data: "11/09/2024",
      },
    ],
  },
  { id: 2, nome: "Solar Residencial Sol", admin: "Admin Nome", atividades: [] },
  { id: 3, nome: "Condomínio Primavera", admin: "Admin Nome", atividades: [] },
];

export default function Condominios() {
  const [selectedCondo, setSelectedCondo] = useState(condominios[0]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bem-vindo ao Condelivery</Text>
        <Text style={styles.subHeaderText}>
          Simplifique a administração de entregas no seu condomínio!
        </Text>
        <View style={styles.buttonContainer}>
          <Button title="Cadastrar" color="#ccc" />
          <Button title="Entrar" color="#4CAF50" />
        </View>
      </View>

      <View style={styles.condominosSection}>
        <Text style={styles.sectionTitle}>Condomínios Disponíveis</Text>
        {condominios.map((condo) => (
          <View key={condo.id} style={styles.condoCard}>
            {/* <Avatar size="xl" /> */}
            <Text style={styles.condoName}>{condo.nome}</Text>
            <Button
              title="Selecionar"
              onPress={() => setSelectedCondo(condo)}
            />
          </View>
        ))}
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Detalhes do Condomínio</Text>
        <TextInput style={styles.input} placeholder="Nome do Administrador" />
        <TextInput style={styles.input} placeholder="Contato" />
        <Button title="Salvar" color="#4CAF50" />
      </View>

      <View style={styles.adminSection}>
        <Text style={styles.sectionTitle}>
          Administração do {selectedCondo.nome}
        </Text>
        <View style={styles.adminCard}>
          {/* <Avatar size="lg" /> */}
          <View>
            <Text style={styles.adminName}>{selectedCondo.admin}</Text>
            <Text style={styles.adminRole}>
              Administrador do {selectedCondo.nome}
            </Text>
          </View>
          <Button title="Adicionar Entrega" color="#4CAF50" />
        </View>
      </View>

      <View style={styles.activitiesSection}>
        <Text style={styles.sectionTitle}>Atividades</Text>
        {selectedCondo.atividades.map((atividade, index) => (
          <View key={index} style={styles.activityCard}>
            <Text style={styles.activityName}>{atividade.nome}</Text>
            <Text style={styles.activityDescription}>
              {atividade.descricao}
            </Text>
            <Text>Data: {atividade.data}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subHeaderText: {
    marginVertical: 10,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  condominosSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  condoCard: {
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  condoName: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  detailsSection: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  adminSection: {
    marginBottom: 20,
  },
  adminCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  adminName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  adminRole: {
    color: "#666",
  },
  activitiesSection: {
    marginBottom: 20,
  },
  activityCard: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
  },
  activityName: {
    fontWeight: "bold",
  },
  activityDescription: {
    color: "#666",
  },
});
