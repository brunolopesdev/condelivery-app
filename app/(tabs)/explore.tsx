import { StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";

export default function TabTwoScreen() {
  const router = useRouter();

  const navigateTo = (page: string) => {
    router.push(page as any);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Menu</ThemedText>
      </ThemedView>

      <ThemedView style={styles.linksContainer}>
        <TouchableOpacity onPress={() => navigateTo("/colaboradores")}>
          <ThemedText type="link">Colaboradores</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo("/perfil")}>
          <ThemedText type="link">Perfil</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo("/dashboard")}>
          <ThemedText type="link">Dashboard</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo("/suporte")}>
          <ThemedText type="link">Suporte</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo("/condominio")}>
          <ThemedText type="link">Condomínio</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo("/settings")}>
          <ThemedText type="link">Configurações</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  titleContainer: {
    marginBottom: 20,
  },
  linksContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
});
