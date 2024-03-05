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

// Reads dimensions of screen for image/button scaling
let dim = Dimensions.get("window");

const USCGALogo = require("../assets/icon.png");

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

  const commonNumbers = `  CHDO: \t\t\t\t\t\t\t\t\t\t\t(860) 625-2013
  SMPO: \t\t\t\t\t\t\t\t\t\t\t(860) 625-0530
  Duty Engineer: \t(860) 625-1166

  Watch Office: \t\t\t(860) 444-8294
  CGPD: \t\t\t\t\t\t\t\t\t\t\t\t(860) 444-5555
  IT Desk: \t\t\t\t\t\t\t\t\t\t(860) 444-8324
  `;

  return (
    <View style={styles.Container}>
          
    <LinearGradient
      colors={['rgba(256,256,256,1.3)', 'transparent']}
      style={styles.gradient}
    >

      <View style={styles.header}>
        <View style={styles.drawerButton}>
          <Image source={USCGALogo}/>
        </View>
        <Text style={styles.headerText}>
          Dashboard
        </Text>
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
              <Text style={styles.ContentLargeText}>1100 Trainingss</Text>
              <Text style={styles.ContentMicroText}>{trainingsAt1100}</Text>
            </View>

            <View style={styles.GapBetweenContentContainers}/>
            <View style={styles.SmallContentContainer}>
              <Text style={styles.ContentLargeText}>Quick Contacts</Text>
              <Text style={styles.ContentSmallText}>{commonNumbers}</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  drawerButton: {
    height: 50,
    width: 50,
    backgroundColor: "green",
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
    //backgroundColor: "white",
  },
  GapBetweenContentContainers: {
    height: dim.width * 0.025,
  },
  SmallContentContainer: {
    //flex: 1,
    //height: 200,
    backgroundColor: '#f7f7f7',
    borderColor: "lightgrey",
    borderWidth: 5,
    borderRadius: 10,
    width: dim.width * 0.95,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ContentLargeText: {
    fontSize: 40,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ContentSmallText: {
    fontSize: 25,
    color: 'black',
  },
  ContentMicroText: {
    fontSize: 15,
    color: 'black',
  },
});

export default DashboardScreen;