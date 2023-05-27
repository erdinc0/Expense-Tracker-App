import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabScreen from "./Screens/BottomTabScreen";
import ManageExpenses from "./Screens/ManageExpenses";
import { NavigationContainer } from "@react-navigation/native";
import Renkler from "./Constants/Renkler";
import { Provider } from "react-redux";
import store from "./store/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: Renkler.primary500,
              },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              options={{ headerShown: false }}
              name="BottomTabScreen"
              component={BottomTabScreen}
            />
            <Stack.Screen
              name="ManageExpenses"
              component={ManageExpenses}
              options={{
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});
