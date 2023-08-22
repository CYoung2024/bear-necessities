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
          name="Select Company"
          component={StartupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OOD Bear Essentials"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Company Accountability" component={AcctScreen} />
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
