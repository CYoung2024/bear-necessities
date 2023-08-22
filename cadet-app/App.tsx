import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "./screens/LoginScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import RegisterScreen from "./screens/RegisterScreen";

import MainScreen from "./screens/MainScreen";
import IFNScreen from "./screens/IFNScreen";
import MessageboardScreen from "./screens/MessageboardScreen";
import SettingsScreen from "./screens/SettingsScreen";

import ChangePasswordScreen from "./screens/MoreSettings/ChangePassowordScreen";
import OneTimeSetStuffScreen from "./screens/OneTimeSetStuffScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings "
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerShown: false,
          tabBarLabelPosition: "below-icon",
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="md-home"
                size={24}
                color={tabInfo.focused ? "#015289" : "#8e8e93"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="IFN"
        component={IFNScreen}
        options={{
          headerShown: false,
          tabBarLabelPosition: "below-icon",
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="location-sharp"
                size={24}
                color={tabInfo.focused ? "#015289" : "#8e8e93"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Messageboard"
        component={MessageboardScreen}
        options={{
          headerShown: false,
          tabBarLabelPosition: "below-icon",
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="md-chatbubble-outline"
                size={24}
                color={tabInfo.focused ? "#015289" : "#8e8e93"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          headerShown: false,
          tabBarLabelPosition: "below-icon",
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="md-settings"
                size={24}
                color={tabInfo.focused ? "#015289" : "#8e8e93"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginHolder"
          component={LoginStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Set Values"
          component={OneTimeSetStuffScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
