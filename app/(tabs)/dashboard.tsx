// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   ScrollView,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createDrawerNavigator } from "@react-navigation/drawer";

// const mockData = {
//   users: [
//     {
//       id: 1,
//       nome: "Morador A",
//       email: "moradorA@example.com",
//       tipo_usuario: "morador",
//     },
//     {
//       id: 2,
//       nome: "Morador B",
//       email: "moradorB@example.com",
//       tipo_usuario: "morador",
//     },
//   ],
//   deliveries: [
//     {
//       id: 1,
//       data_entrega: "2024-09-30",
//       status: "Entregue",
//       plataforma: "iFood",
//       complemento: "Complemento A",
//       codigo_confirmacao: "1234",
//     },
//     {
//       id: 2,
//       data_entrega: "2024-09-29",
//       status: "Pendente",
//       plataforma: "Rappi",
//       complemento: "Complemento B",
//       codigo_confirmacao: "5678",
//     },
//   ],
//   orders: [],
//   condos: [
//     {
//       id: 1,
//       nome: "Condomínio A",
//       endereco: "Rua A, 123",
//       numero_moradores: 50,
//       taxa_condominio: 200,
//     },
//     {
//       id: 2,
//       nome: "Condomínio B",
//       endereco: "Rua B, 456",
//       numero_moradores: 30,
//       taxa_condominio: 150,
//     },
//   ],
//   collaborators: [
//     {
//       id: 1,
//       avaliacao_media: 4.5,
//       data_contratacao: "2022-01-01",
//       numero_entregas: 10,
//     },
//     {
//       id: 2,
//       avaliacao_media: 4.0,
//       data_contratacao: "2023-01-01",
//       numero_entregas: 20,
//     },
//   ],
// };

// const Drawer = createDrawerNavigator();

// const Overview: React.FC<{ data: typeof mockData }> = ({ data }) => (
//   <View style={styles.container}>
//     <Text style={styles.sectionTitle}>Visão Geral</Text>
//     <Text>Total de Moradores: {data.users.length}</Text>
//     <Text>Total de Entregas: {data.deliveries.length}</Text>
//     <Text>Total de Condomínios: {data.condos.length}</Text>
//     <Text>Total de Colaboradores: {data.collaborators.length}</Text>
//   </View>
// );

// interface DashboardSectionProps {
//   section: string;
//   data: typeof mockData;
// }

// const DashboardSection: React.FC<DashboardSectionProps> = ({
//   section,
//   data,
// }) => {
//   switch (section) {
//     case "Pedidos":
//       return <Text>Pedidos: {JSON.stringify(data.orders)}</Text>;
//     case "Entregas":
//       return <Text>Entregas: {JSON.stringify(data.deliveries)}</Text>;
//     case "Colaboradores":
//       return <Text>Colaboradores: {JSON.stringify(data.collaborators)}</Text>;
//     case "Condomínios":
//       return <Text>Condomínios: {JSON.stringify(data.condos)}</Text>;
//     case "Moradores":
//       return <Text>Moradores: {JSON.stringify(data.users)}</Text>;
//     default:
//       return <Overview data={data} />;
//   }
// };

// export default function App() {
//   const [activeSection, setActiveSection] = useState("Overview");
//   const [loading, setLoading] = useState(false); // Não estamos mais carregando dados

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Overview">
//         <Drawer.Screen
//           name="Overview"
//           options={{ title: "Visão Geral" }}
//           children={() => <Overview data={mockData} />}
//         />
//         <Drawer.Screen
//           name="Pedidos"
//           options={{ title: "Pedidos" }}
//           children={() => (
//             <DashboardSection section="Pedidos" data={mockData} />
//           )}
//         />
//         <Drawer.Screen
//           name="Entregas"
//           options={{ title: "Entregas" }}
//           children={() => (
//             <DashboardSection section="Entregas" data={mockData} />
//           )}
//         />
//         <Drawer.Screen
//           name="Colaboradores"
//           options={{ title: "Colaboradores" }}
//           children={() => (
//             <DashboardSection section="Colaboradores" data={mockData} />
//           )}
//         />
//         <Drawer.Screen
//           name="Condomínios"
//           options={{ title: "Condomínios" }}
//           children={() => (
//             <DashboardSection section="Condomínios" data={mockData} />
//           )}
//         />
//         <Drawer.Screen
//           name="Moradores"
//           options={{ title: "Moradores" }}
//           children={() => (
//             <DashboardSection section="Moradores" data={mockData} />
//           )}
//         />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "center",
//     alignItems: "flex-start",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginVertical: 16,
//   },
// });
