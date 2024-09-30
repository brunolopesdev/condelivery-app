import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

interface Collaborator {
  id: number;
  avaliacao_media: number;
  numero_entregas: number;
  data_contratacao: string;
}

interface Props {
  collaborators: Collaborator[];
}

export default function Colaboradores({ collaborators }: Props) {
  const renderItem = ({ item }: { item: Collaborator }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.avaliacao_media}</Text>
      <Text style={styles.cell}>{item.numero_entregas}</Text>
      <Text style={styles.cell}>
        {new Date(item.data_contratacao).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Colaboradores Ativos</Text>
      <View style={styles.table}>
        <View style={styles.header}>
          <Text style={styles.cellHeader}>ID</Text>
          <Text style={styles.cellHeader}>Avaliação Média</Text>
          <Text style={styles.cellHeader}>Número de Entregas</Text>
          <Text style={styles.cellHeader}>Data de Contratação</Text>
        </View>
        <FlatList
          data={collaborators}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F7FAFC",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#E2E8F0",
    padding: 8,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 8,
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  cellHeader: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
});
