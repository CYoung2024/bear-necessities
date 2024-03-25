import React, { useEffect } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { DrawerActions } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

// Reads dimensions of screen for image/button scaling
let dim = Dimensions.get("window");

const USCGALogo = require("../assets/icon.png");
const CircleList = require("../assets/list-circle-sharp.svg");

const DashboardScreen = ({ navigation }) => {

  const PlanOfTheDay = `
  0600-0730: Buffet Breakfast
  0700: Reveille/Guardmount
  0740: Morning Formation   
  0800 - 1050: Morning Classes
  1205: Afternoon Formation   
  1210: Family Style Lunch   
  1250-1540: Afternoon Classes
  1600-1815: Sports Period     
  1700: Women's Lacrosse vs Endicott College (CMF - Optional)
  1715-1915: Buffet Dinner
  1900: Corpswide Mock Boards Evolution (Cadet Rooms)
  1900-2000: Command Open Door
  1955: Restricted Cadet Formation   
  2000-2300: Academic Study Time 
  2130-2200: Restricted Cadet Check-in w/ OODs
  2300: Taps
  `;

  const trainingsAt1100 = `
  1/c - Traits of an Honorable Officer (CO Rooms)
  2/c - Class Meeting (Dimick)
  3/c - Updated Conduct System Brief (Leamy)
  4/c - Updated Conduct System Brief (Leamy)
  `;

  const commonPeople = `  CHDO:
  SMPO:
  Duty Engineer:

  Watch Office:
  CGPD:
  IT Desk:
  `;
  
  const commonNumbers = `  (860) 625-2013
  (860) 625-0530
  (860) 625-1166

  (860) 444-8294
  (860) 444-5555
  (860) 444-8324
  `;




  return (
    <View style={styles.Container}>
          
    <LinearGradient
      colors={['rgba(256,256,256,1.3)', 'transparent']}
      style={styles.gradient}
    >

      <View style={styles.header}>
        <View style={styles.drawerButton}>
          <TouchableOpacity 
            style={styles.circleIcon}
            onPress={() => {navigation.dispatch(DrawerActions.openDrawer())}}>
            <Ionicons
              name={"list-circle-sharp"}
              size={40}
              color={"#000"}
            />

          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>
          Dashboard
        </Text>
        <View style={styles.whiteSpace}>
        </View>
      </View>

      <View style={styles.belowHeader}>

        <ScrollView style={styles.ScrollViewContainer}>

          <View style={styles.ContentAreaContainer}>

            <View style={styles.SmallContentContainer}>
              <Text style={styles.ContentLargeText}>POD - 22May2024</Text>
              <Text style={styles.ContentMicroText}>{PlanOfTheDay}</Text>
            </View>

            <View style={styles.GapBetweenContentContainers}/>
            <View style={styles.SmallContentContainer}>
              <Text style={styles.ContentLargeText}>1100 Trainings</Text>
              <Text style={styles.ContentMicroText}>{trainingsAt1100}</Text>
            </View>

            <View style={styles.GapBetweenContentContainers}/>
            <View style={styles.SmallContentContainer}>
              <Text style={styles.ContentLargeText}>Quick Contacts</Text>
              <View style={styles.InteriorContainer}>
                <Text style={styles.ContentSmallText}>{commonPeople}</Text>
                <Text style={styles.ContentSmallText}>{commonNumbers}</Text>
              </View>
            </View>

            <View style={styles.GapBetweenContentContainers}/>
            <View style={styles.SmallContentContainer}>
              <Text style={styles.ContentLargeText}>Info Card</Text>
            </View>

            <View style={styles.GapBetweenContentContainers}/>
            <View style={styles.SmallContentContainer}>
              <Text style={styles.ContentLargeText}>Info Card</Text>
            </View>

            <View style={styles.GapBetweenContentContainers}/>
            <View style={styles.SmallContentContainer}>
              <Text style={styles.ContentLargeText}>Info Card</Text>
            </View>

            <View style={styles.GapBetweenContentContainers}/>
            <View style={styles.SmallContentContainer}>
              <Text style={styles.ContentLargeText}>Info Card</Text>
            </View>

            <View style={styles.GapBetweenContentContainers}/>
            <View style={styles.SmallContentContainer}>
              <Text style={styles.ContentLargeText}>Info Card</Text>
            </View>

            <View style={styles.GapBetweenContentContainers}/>
            <View style={styles.SmallContentContainer}>
              <Text style={styles.ContentLargeText}>Info Card</Text>
            </View>

            <View style={styles.GapBetweenContentContainers}/>
            <View style={styles.SmallContentContainer}>
              <Text style={styles.ContentLargeText}>Info Card</Text>
            </View>
          </View>
        
        </ScrollView>
        </View>
        </LinearGradient>
      </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "lightblue",
  },
  header: {
    height: 50,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: "transparent",
  },
  drawerButton: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteSpace: {
    height: 50,
    width: 50,
    backgroundColor: "transparent",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  belowHeader: {
    flex: 1,
    alignItems: 'center',
  },
  gradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  ScrollViewContainer: {
    display: 'flex',
  },
  ContentAreaContainer: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  GapBetweenContentContainers: {
    height: dim.width * 0.025,
  },
  SmallContentContainer: {
    backgroundColor: '#f7f7f7',
    borderColor: "lightgrey",
    borderWidth: 5,
    borderRadius: 10,
    width: dim.width * 0.95,
    justifyContent: 'center',
    alignItems: 'center',
  },
  InteriorContainer: {
    flexDirection: 'row',
    display: 'flex',
  },
  ContentLargeText: {
    fontSize: 40,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ContentSmallText: {
    fontSize: 25,
    textAlign: 'justify',
    color: 'black',
    display: 'flex',
  },
  ContentTinyText: {
    fontSize: 15,
    color: 'black',
  },
  ContentMicroText: {
    fontSize: 15,
    color: 'black',
  },
});

export default DashboardScreen;