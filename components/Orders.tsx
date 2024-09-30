import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

interface Delivery {
  id: number;
  plataforma: string;
  data_entrega: string;
  codigo_confirmacao: string;
}

interface Props {
  deliveries: Delivery[];
}

export default function Pedidos({ deliveries }: Props) {
  const renderItem = ({ item }: { item: Delivery }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.plataforma}</Text>
      <Text style={styles.cell}>
        {new Date(item.data_entrega).toLocaleDateString()}
      </Text>
      <Text style={styles.cell}>{item.codigo_confirmacao}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.header}>
          <Text style={styles.cellHeader}>ID</Text>
          <Text style={styles.cellHeader}>Plataforma</Text>
          <Text style={styles.cellHeader}>Data</Text>
          <Text style={styles.cellHeader}>Código</Text>
        </View>
        <FlatList
          data={deliveries}
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
