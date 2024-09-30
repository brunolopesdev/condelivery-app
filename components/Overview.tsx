import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Data {
  deliveries: Array<any>;
  collaborators: Array<any>;
  condos: Array<any>;
  users: Array<any>;
}

interface Props {
  data: Data;
}

export default function Overview({ data }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visão Geral</Text>
      <View style={styles.grid}>
        <View style={[styles.box, styles.green]}>
          <Text style={styles.boxTitle}>Total de Pedidos</Text>
          <Text style={styles.boxCount}>{data.deliveries.length}</Text>
        </View>
        <View style={[styles.box, styles.blue]}>
          <Text style={styles.boxTitle}>Entregas Concluídas</Text>
          <Text style={styles.boxCount}>{data.deliveries.length}</Text>
        </View>
        <View style={[styles.box, styles.yellow]}>
          <Text style={styles.boxTitle}>Colaboradores Ativos</Text>
          <Text style={styles.boxCount}>{data.collaborators.length}</Text>
        </View>
        <View style={[styles.box, styles.purple]}>
          <Text style={styles.boxTitle}>Condomínios Ativos</Text>
          <Text style={styles.boxCount}>{data.condos.length}</Text>
        </View>
        <View style={[styles.box, styles.pink]}>
          <Text style={styles.boxTitle}>Total de Moradores</Text>
          <Text style={styles.boxCount}>{data.users.length}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F7FAFC",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  box: {
    margin: 4,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  boxCount: {
    fontSize: 24,
    fontWeight: "bold",
  },
  green: {
    backgroundColor: "#B2F5E1",
  },
  blue: {
    backgroundColor: "#BEE3F8",
  },
  yellow: {
    backgroundColor: "#FEEBC8",
  },
  purple: {
    backgroundColor: "#E9D8FD",
  },
  pink: {
    backgroundColor: "#FBB6CE",
  },
});
