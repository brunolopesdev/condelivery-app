import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  const services = [
    {
      id: 1,
      title: "Agilidade",
      img: "https://images.unsplash.com/photo-1695654392283-4ea0fa0b4bb6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Entregas rápidas e seguras para o seu condomínio.",
    },
    {
      id: 2,
      title: "Plataforma completa",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Plataforma completa para gerenciar entregas em condomínios.",
    },
    {
      id: 3,
      title: "Segurança",
      img: "https://images.unsplash.com/photo-1695653422550-4615553d90c3?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Entregas seguras e confiáveis com colaboradores qualificados.",
    },
  ];

  const [ratings, setRatings] = useState([
    { id: 1, nota: 5, comentarios: "Excelente serviço! Muito rápido." },
    { id: 2, nota: 4, comentarios: "Bom, mas poderia melhorar." },
    {
      id: 3,
      nota: 3,
      comentarios: "Serviço razoável, algumas falhas na entrega.",
    },
  ]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Simplifique entregas em condomínios!</Text>
        <Text style={styles.subtitle}>
          Gerencie com eficiência os serviços de entregas em seu complexo
          residencial.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Iniciar")}
        >
          <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Serviços em destaque</Text>
        <View style={styles.grid}>
          {services.map((service) => (
            <View style={styles.card} key={service.id}>
              <Image source={{ uri: service.img }} style={styles.image} />
              <Text style={styles.cardTitle}>{service.title}</Text>
              <Text style={styles.cardDescription}>{service.description}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Avaliações de clientes</Text>
        {ratings?.map((rating, index) => (
          <View style={styles.ratingCard} key={rating.id}>
            <Text style={styles.ratingTitle}>Avaliação {index + 1}</Text>
            <Text style={styles.ratingStars}>
              {Array.from({ length: 5 }, (_, i) =>
                i < rating.nota ? "⭐" : "☆"
              )}
            </Text>
            <Text style={styles.ratingComment}>{rating.comentarios}</Text>
          </View>
        ))}
      </View>

      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Comece já!</Text>
        <TextInput style={styles.input} placeholder="Nome completo" />
        <TextInput style={styles.input} placeholder="Email" />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login" as never)}
        >
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  header: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  card: {
    width: "45%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
  },
  ratingCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  ratingTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  ratingStars: {
    fontSize: 18,
    marginBottom: 8,
  },
  ratingComment: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  form: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
