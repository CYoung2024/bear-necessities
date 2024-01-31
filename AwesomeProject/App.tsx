import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// App Screen function references 
import LoginScreen from "./screens/LoginScreen";
import OneTimeSetStuffScreen from "./screens/OneTimeSetStuffScreen";
import DashboardScreen from "./screens/DashboardScreen";
import AcctScreen from "./screens/AcctScreen";
import MessagesScreen from "./screens/NotifsScreen";
import RouteScreen from "./screens/RoutingScreen";
import SettingsScreen from "./screens/SettingsScreen";

// Libraries used to Navigate through the app
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';



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
  animation: 'spring',
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
          headerShown: true
          //headerStatusBarHeight: 0,
          // transitionSpec: {
          //   open: config,
          //   close: config,
          }
        }
      />
    </Stack.Navigator>
  );
}



// Creates the action buttons in the side panel
// These are added after the screen navigation buttons
// "Report a Bug" : Opens app link to submit bugs found
function SidePanelButtons(props) {
  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Settings"
        onPress={() => { 
          props.navigation.closeDrawer(),
          props.navigation.navigate('Settings')
        }}
      />
      <DrawerItem
        label="Report a Bug"
        onPress={() => alert('Bug Report Link')}
      />
      <DrawerItem
        label="Logout"
        onPress={() => props.navigation.navigate('Login')}
      />
    </DrawerContentScrollView>
  );
}



// Defines second app navigation layer
// The side drawer allows users to navigate between the tab screen
// and the settings screen
function DrawerApp() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <SidePanelButtons {...props} />}
      screenOptions={{ 
        drawerStyle: { width: "60%" },
      }}
    >


      <Drawer.Screen
        name="Home"
        component={TabApp}
        options={{
          title: 'Home',
          headerStatusBarHeight: 0,
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="md-home"
              size={focused ? 40 : 30 }
              color={focused ? '#015289' : '#ccc'}
            />
          )
        }}
      />
      
    </Drawer.Navigator>
  )
}



// Creates the tab-bar on the bottom and set order of app screens
// Uses the functions defined in the ./screens folder
function TabApp() {
  return (
    <BottomTab.Navigator 
    tabBarPosition='bottom' 
    initialRouteName="Dashboard"
    screenOptions={{'tabBarShowLabel': false}}
    >

      <BottomTab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          //headerShown: false,
          tabBarIcon: (tabInfo) => (
            <Ionicons
              name='md-home'
              size={tabInfo.focused ? 24 : 20}
              color={tabInfo.focused ? '#015289' : '#ccc'}
            />
          )
        }} />


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
              color={tabInfo.focused ? '#015289' : '#ccc'}
            />
          )
        }}  />


      <BottomTab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          //headerShown: false,
          //tabBarLabelPosition: "below-icon",
          tabBarIcon: (tabInfo) => (
            <Ionicons
              name="mail"
              size={tabInfo.focused ? 24 : 20}
              color={tabInfo.focused ? '#015289' : '#ccc'}
            />
          )
        }}  />


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
              color={tabInfo.focused ? '#015289' : '#ccc'}
            />
          )
        }}  

      />
    </BottomTab.Navigator>
  )
}



export default function App() {
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