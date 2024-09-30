import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

interface Condo {
  id: number;
  nome: string;
  endereco: string;
  numero_moradores: number;
  taxa_condominio: number;
}

interface Props {
  condos: Condo[];
}

export default function Condominios({ condos }: Props) {
  const renderItem = ({ item }: { item: Condo }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.nome}</Text>
      <Text style={styles.cell}>{item.endereco}</Text>
      <Text style={styles.cell}>{item.numero_moradores}</Text>
      <Text style={styles.cell}>R${item.taxa_condominio}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Condomínios Ativos</Text>
      <View style={styles.table}>
        <View style={styles.header}>
          <Text style={styles.cellHeader}>ID</Text>
          <Text style={styles.cellHeader}>Nome</Text>
          <Text style={styles.cellHeader}>Endereço</Text>
          <Text style={styles.cellHeader}>Moradores</Text>
          <Text style={styles.cellHeader}>Taxa</Text>
        </View>
        <FlatList
          data={condos}
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
