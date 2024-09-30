import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

import { RadioButton } from "react-native-paper";
import { useUserContext } from "@/context/UserContext";

interface Integrations {
  id: number;
  plataforma: string;
  moradorId: number;
  data_integracao: string;
  status: string;
}

const UserSettings = () => {
  const { user } = useUserContext();
  const [selectedApp, setSelectedApp] = useState("iFood");
  const [integrations, setIntegrations] = useState<Integrations[]>([]);

  const fetchIntegrations = async (id: number) => {
    try {
      const { data } = await axios.get(
        `https://condelivery-backend.vercel.app/moradores/${id}/integracoes`
      );

      setIntegrations(data);
      Alert.alert(
        "Integrações encontradas.",
        "Integrações carregadas com sucesso."
      );
    } catch (error) {
      console.error("Erro ao buscar integrações:", error);
      Alert.alert(
        "Erro ao buscar integrações.",
        "Ocorreu um erro. Tente novamente mais tarde."
      );
    }
  };

  const handleDeleteIntegration = async (id: number) => {
    try {
      await axios.delete(
        `https://condelivery-backend.vercel.app/integracoes/${id}`
      );
      if (user?.moradorId !== undefined) {
        fetchIntegrations(user.moradorId);
      }
      Alert.alert("Integração deletada.", "Integração removida com sucesso.");
    } catch (error) {
      console.error("Erro ao deletar integração:", error);
      Alert.alert(
        "Erro ao deletar integração.",
        "Ocorreu um erro. Tente novamente mais tarde."
      );
    }
  };

  const handleIntegrations = async () => {
    if (user?.moradorId) {
      try {
        await axios.post("https://condelivery-backend.vercel.app/integracoes", {
          plataforma: selectedApp,
          moradorId: user?.moradorId,
          data_integracao: new Date(),
          status: "Ativado",
        });
        Alert.alert(
          "Integração criada.",
          `A integração com ${selectedApp} foi ativada com sucesso.`
        );
        fetchIntegrations(user?.moradorId);
      } catch (error) {
        console.error("Erro ao criar integração:", error);
        Alert.alert(
          "Erro ao criar integração.",
          "Ocorreu um erro. Tente novamente mais tarde."
        );
      }
    } else {
      Alert.alert(
        "Morador não encontrado.",
        "Por favor, verifique suas informações de usuário."
      );
    }
  };

  useEffect(() => {
    if (user?.moradorId) {
      fetchIntegrations(user?.moradorId);
    }
  }, [user]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configurações do Aplicativo</Text>
        <Text style={styles.headerText}>Personalize suas preferências</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Integrações com Aplicativos</Text>
        <Text style={styles.sectionSubtitle}>
          Selecione os aplicativos para integração
        </Text>

        <RadioButton.Group onValueChange={setSelectedApp} value={selectedApp}>
          <View style={styles.radioGroup}>
            <RadioButton.Item label="iFood" value="ifood" />
            <RadioButton.Item label="Rappi" value="rappi" />
            <RadioButton.Item label="Uber Eats" value="uber eats" />
            <RadioButton.Item label="Mercado Livre" value="mercado livre" />
          </View>
        </RadioButton.Group>
        <Button title="Salvar" onPress={handleIntegrations} color="#4CAF50" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Notificações de Aplicativos Terceiros
        </Text>

        <View style={styles.integrationsGrid}>
          {integrations && integrations.length > 0 ? (
            integrations.map((integration) => (
              <View key={integration.id} style={styles.integrationCard}>
                <Text style={styles.integrationTitle}>
                  {integration.plataforma}
                </Text>
                <Text style={styles.integrationSubtitle}>
                  Receber notificações de entregas
                </Text>
                <Text style={styles.integrationStatus}>
                  {integration.status}
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handleDeleteIntegration(integration.id);
                  }}
                >
                  <Text style={styles.buttonText}>Desativar</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>Nenhuma integração ativa</Text>
          )}
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
    paddingBottom: 100,
  },
  header: {
    backgroundColor: "#EDF2F7",
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerText: {
    color: "gray",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionSubtitle: {
    marginBottom: 16,
  },
  radioGroup: {
    marginBottom: 16,
  },
  integrationsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  integrationCard: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    marginBottom: 16,
    width: "48%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
  },
  integrationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  integrationSubtitle: {
    color: "gray",
    marginBottom: 4,
  },
  integrationStatus: {
    fontWeight: "bold",
  },
});

export default UserSettings;
