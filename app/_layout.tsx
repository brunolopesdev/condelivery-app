import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import TabBar from "../components/TabBar";
import { UserProvider, useUserContext } from "@/context/UserContext";
import { User } from "@/typings/User";

const _layout = () => {
  return (
    <UserProvider>
      <MainTabs />
    </UserProvider>
  );
};

const MainTabs = () => {
  const { user } = useUserContext();

  return (
    <Tabs tabBar={(props) => <TabBar {...props} user={user as unknown as User} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
        }}
      />
    </Tabs>
  );
};

export default _layout;
