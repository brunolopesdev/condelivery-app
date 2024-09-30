import { View, StyleSheet } from "react-native";
import React from "react";
import TabBarButton from "./TabBarButton";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { User } from "@/typings/User";

interface TabBarProps extends BottomTabBarProps {
  user: User | null;
}

const TabBar = ({ state, descriptors, navigation, user }: TabBarProps) => {
  const primaryColor = "#0891b2";
  const greyColor = "#737373";

  const routes = user
    ? [
        { name: "index", title: "Início", key: "index" },
        { name: "profile", title: "Perfil", key: "profile" },
        { name: "settings", title: "Minha área", key: "settings" },
      ]
    : [{ name: "login", title: "Login", key: "login" }];

  return (
    <View style={styles.tabbar}>
      {routes.map((route) => {
        const descriptor = descriptors[route.name];

        const label =
          descriptor?.options.tabBarLabel !== undefined
            ? descriptor.options.tabBarLabel
            : descriptor?.options.title !== undefined
            ? descriptor.options.title
            : route.title;

        const index = state.routes.findIndex((r) => r.name === route.name);
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            style={styles.tabbarItem}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? primaryColor : greyColor}
            label={label}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbarItem: {},
  tabbar: {
    position: "absolute",
    bottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 25,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    borderWidth: 1,
    borderColor: "#f5f5f5",
  },
});

export default TabBar;
