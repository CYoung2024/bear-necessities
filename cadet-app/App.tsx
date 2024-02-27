import "react-native-gesture-handler";
import React, { useState, useEffect, useRef, useContext } from "react";
import { Platform } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { useRoute } from "@react-navigation/native";
import { TokenContext } from "./tokenContext";
import { StatusContext } from "./StatusContext";
import { MessageListContext } from "./messageListContext";
import MyStorage from "./storage";

// App Screen function references
import LoginScreen from "./screens/LoginScreen";
import OneTimeSetStuffScreen from "./screens/OneTimeSetStuffScreen";
import DashboardScreen from "./screens/DashboardScreen";
import AcctScreen from "./screens/AcctScreen";
import MessagesScreen from "./screens/NotifsScreen";
import RouteScreen from "./screens/RoutingScreen";
import SettingsScreen from "./screens/SettingsScreen";

// Libraries used to Navigate through the app
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import CompanyOODScreen from "./screens/NotificationHistoryScreens/CompanyOODScreen";
import NotifsScreen from "./screens/NotifsScreen";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
  } else {
    alert("Must use physical device for Push Notifications");
  }
  return token.data;
}

// Creates instances of the different navigation tools used in the app
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createMaterialTopTabNavigator();

// Defines first app navigation layer
// Once the Login screen is bypassed, it should not be returned to,
// nor should the user see it again unless they leave base or log out
function StackApp() {
  // Configure settings transition animation
  const config = {
    animation: "spring",
    config: {
      stiffness: 10,
    },
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SetValues"
        component={OneTimeSetStuffScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabApp"
        component={DrawerApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          //headerStatusBarHeight: 0,
          // transitionSpec: {
          //   open: config,
          //   close: config,
        }}
      />
    </Stack.Navigator>
  );
}

// Defines second app navigation layer
// The side drawer allows users to navigate between the tab screen
// and the settings screen
function DrawerApp() {
  const route = useRoute();
  const token = route.params;

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContentScrollView>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Settings"
            onPress={() => {
              props.navigation.closeDrawer(),
                props.navigation.navigate("Settings", token);
            }}
          />
          <DrawerItem
            label="Report a Bug"
            onPress={() => alert("Bug Report Link")}
          />
          <DrawerItem
            label="Logout"
            onPress={() => props.navigation.navigate("Login")}
          />
        </DrawerContentScrollView>
      )}
      screenOptions={{
        drawerStyle: { width: "60%" },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={TabApp}
        options={{
          title: "Home",
          headerStatusBarHeight: 0,
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="md-home"
              size={focused ? 40 : 30}
              color={focused ? "#015289" : "#ccc"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// Creates the tab-bar on the bottom and set order of app screens
// Uses the functions defined in the ./screens folder
const TabApp = ({ navigation }) => {
  const route = useRoute();
  const { token, messageList, status } = route.params;

  return (
    <TokenContext.Provider value={token}>
      <MessageListContext.Provider value={messageList}>
        <StatusContext.Provider value={status}>
          <BottomTab.Navigator
            tabBarPosition="bottom"
            initialRouteName="Dashboard"
            screenOptions={{ tabBarShowLabel: false }}
          >
            <BottomTab.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{
                //headerShown: false,
                tabBarIcon: (tabInfo) => (
                  <Ionicons
                    name="md-home"
                    size={tabInfo.focused ? 24 : 20}
                    color={tabInfo.focused ? "#015289" : "#ccc"}
                  />
                ),
              }}
            />

            <BottomTab.Screen
              name="IFN"
              component={AcctScreen}
              options={{
                //headerShown: false,
                //showLabel: false,
                tabBarIcon: (tabInfo) => (
                  <Ionicons
                    name="location-sharp"
                    size={tabInfo.focused ? 24 : 20}
                    color={tabInfo.focused ? "#015289" : "#ccc"}
                  />
                ),
              }}
            />

            <BottomTab.Screen
              name="Messages"
              component={NotifsScreen}
              options={{
                //headerShown: false,
                //tabBarLabelPosition: "below-icon",
                tabBarIcon: (tabInfo) => (
                  <Ionicons
                    name="mail"
                    size={tabInfo.focused ? 24 : 20}
                    color={tabInfo.focused ? "#015289" : "#ccc"}
                  />
                ),
              }}
            />

            <BottomTab.Screen
              name="Routing"
              component={RouteScreen}
              options={{
                //headerShown: false,
                //tabBarLabelPosition: "below-icon",
                tabBarIcon: (tabInfo) => (
                  <Ionicons
                    name="md-newspaper"
                    size={tabInfo.focused ? 24 : 20}
                    color={tabInfo.focused ? "#015289" : "#ccc"}
                  />
                ),
              }}
            />
          </BottomTab.Navigator>
        </StatusContext.Provider>
      </MessageListContext.Provider>
    </TokenContext.Provider>
  );
};

export default function App() {
  const [notification, setNotification] = useState(false);
  const { expoPushToken, saveExpoPushToken } = MyStorage({
    initialCadetCode: "",
    initialCadetStatus: "",
    initialExpoPushToken: "",
  });
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((notifToken) =>
      saveExpoPushToken(notifToken)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <StackApp />
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
