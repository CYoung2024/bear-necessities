import React, { useEffect } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Reads dimensions of screen for image/button scaling
let dim = Dimensions.get("window");

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

  const commonNumbers = `
  CHDO: (860) 625-2013
  Watch Office Phone: (860) 444-8294
  CGA Emergency: (860) 444-8402
  Help Desk: (860) 444-8324 (TECH)
  SMPO: (860) 625-0530
  Duty Engineer: (860) 625-1166
  `;

  const trainingsAt1100 = `
  1/c - Traits of an Honorable Officer (CO Rooms)
  2/c - Class Meeting (Dimick)
  3/c - Updated Conduct System Brief (Leamy)
  4/c - Updated Conduct System Brief (Leamy)
  `;

  return (
    <View style={styles.Container}>

    <View style={styles.header}/>

    <View style={styles.belowHeader}>

        <ScrollView style={styles.ScrollViewContainer}>

          <View style={styles.ContentAreaContainer}>

            <View style={styles.GapBetweenContentContainers}/>
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
              <Text style={styles.ContentLargeText}>Quick Access Contacts</Text>
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
      </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "white",
  },
  header: {
    height: 40,
    backgroundColor: "white",
  },
  belowHeader: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
  },
  ScrollViewContainer: {
    display: 'flex',
    backgroundColor: "white",
  },
  ContentAreaContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: "white",
  },
  GapBetweenContentContainers: {
    height: dim.width * 0.025,
  },
  SmallContentContainer: {
    //flex: 1,
    //height: 200,
    backgroundColor: 'lightgrey',
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