import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { RadioButton } from "react-native-paper";

interface Integration {
  id: number;
  plataforma: string;
  moradorId: number;
  data_integracao: string;
  status: string;
}

const mockIntegrations: Integration[] = [
  {
    id: 1,
    plataforma: "iFood",
    moradorId: 1,
    data_integracao: "2024-01-01",
    status: "Ativado",
  },
  {
    id: 2,
    plataforma: "Rappi",
    moradorId: 1,
    data_integracao: "2024-01-02",
    status: "Desativado",
  },
];

export default function Settings() {
  const [selectedApp, setSelectedApp] = useState("iFood");
  const [integrations, setIntegrations] =
    useState<Integration[]>(mockIntegrations);

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Configurações do Aplicativo</Text>
        <Text>Personalize suas preferências</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Integrações com Aplicativos</Text>
        <Text style={styles.sectionSubtitle}>
          Selecione os aplicativos para integração
        </Text>

        <View>
          <RadioButton.Group onValueChange={setSelectedApp} value={selectedApp}>
            <RadioButton.Item label="iFood" value="iFood" />
            <RadioButton.Item label="Rappi" value="Rappi" />
            <RadioButton.Item label="Uber Eats" value="Uber Eats" />
            <RadioButton.Item label="Mercado Livre" value="Mercado Livre" />
          </RadioButton.Group>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Notificações de Aplicativos Terceiros
        </Text>
        {integrations.length > 0 ? (
          integrations.map((integration) => (
            <View key={integration.id} style={styles.integrationBox}>
              <Text style={styles.integrationTitle}>
                {integration.plataforma}
              </Text>
              <Text style={styles.integrationSubtitle}>
                Receber notificações de entregas
              </Text>
              <Text style={styles.integrationStatus}>{integration.status}</Text>
            </View>
          ))
        ) : (
          <Text>Nenhuma integração ativa</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff"
  },
  header: {
    backgroundColor: "#0000001A",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionSubtitle: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  integrationBox: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    alignItems: "center",
    marginBottom: 16,
  },
  integrationTitle: {
    fontSize: 20,
    marginBottom: 4,
  },
  integrationSubtitle: {
    color: "gray",
    marginBottom: 4,
  },
  integrationStatus: {
    fontWeight: "bold",
  },
});
