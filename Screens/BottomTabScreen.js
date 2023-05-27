import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpenses from "../Screens/AllExpenses";
import RecentExpenses from "../Screens/RecentExpenses";
import Renkler from "../Constants/Renkler";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../UI/IconButton";

const Tab = createBottomTabNavigator();

const BottomTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: Renkler.primary500,
        },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: Renkler.primary500,
        },
        tabBarActiveTintColor: Renkler.accent500,
        headerRight: ({ tintColor, size }) => {
          return (
            <IconButton
              color={tintColor}
              size={24}
              icon="add"
              onPress={() => navigation.navigate("ManageExpenses")}
            />
          );
        },
      })}
    >
      <Tab.Screen
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="calendar" size={size} color={color} />;
          },
        }}
        name="AllExpenses"
        component={AllExpenses}
      />
      <Tab.Screen
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent Expenses",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="hourglass" size={size} color={color} />;
          },
        }}
        name="RecentExpenses"
        component={RecentExpenses}
      />
    </Tab.Navigator>
  );
};

export default BottomTabScreen;

const styles = StyleSheet.create({});
