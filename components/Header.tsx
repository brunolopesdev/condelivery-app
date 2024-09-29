import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import { Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export const Header = ({ title }: any) => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#1E3A8A", // Blue color
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  linksContainer: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  linkText: {
    color: "white",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfo: {
    marginLeft: 8,
  },
  userName: {
    color: "white",
    fontWeight: "bold",
  },
  logoutText: {
    color: "white",
    fontSize: 12,
  },
  notificationButton: {
    position: "relative",
    marginLeft: 16,
  },
  badge: {
    position: "absolute",
    right: 0,
    top: -4,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 6,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
  modalContent: {
    padding: 16,
    flex: 1,
    justifyContent: "center",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  notificationItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  notificationDate: {
    color: "#555",
    fontSize: 12,
  },
  closeButton: {
    color: "#1E3A8A",
    textAlign: "center",
    marginTop: 12,
  },
});
