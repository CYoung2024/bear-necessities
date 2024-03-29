import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import StartupScreen from "./screens/StartupScreen";
import MainScreen from "./screens/MainScreen";
import AcctScreen from "./screens/AcctScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Bear Necessities - Startup"
          component={StartupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Bear Necessities - OOD"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Company Accountability"
          component={AcctScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
