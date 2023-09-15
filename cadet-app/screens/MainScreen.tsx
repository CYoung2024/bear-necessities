import React from "react";
import {
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  View,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../firebase";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const coastGuardBlue = "#015289";
const coastGuardLBlue = "#0299ff";
const coastGuardYellow = "#f0ac1b";

const MainScreen = ({ navigation }) => {
  // Handle User Name display
  const user = auth.currentUser;
  const email = user.email;
  if (user._delegate.displayName === null) {
    user._delegate.displayName = email.slice(0, email.indexOf("."));
  }
  const displayName = user.displayName;
  const displayNameCap =
    "Welcome " + displayName.charAt(0).toUpperCase() + displayName.slice(1);

  // Handle date display
  let date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateText = date.toLocaleString("default");

  const PlanOfTheDay = `
  0615-0800: Buffet Breakfast
  0620: Reveille
  0630: Guardmount/Restricted Cadet Formation
  0700: (2024) ETS Training (Dimick)
  0700: (2025) Company Officer/Chief Time (Company Officer Rooms)
  0740: Morning Formation
  0800-1205: Morning Classes 
  1220: Afternoon Formation 
  1225: Family Style Lunch
  1300-1540: Afternoon Classes 
  1600-1815: Sports Period 
  1715-1915: Buffet Dinner 
  1800-1900: (Optional) Drill Down Social Hour (Leamy)
  1900-2000: (Optional) Drill Down (Leamy)
  1900-2000: (Optional) Ops Spotlight - CG Cyber & Cyber Community (Dimick)
  1955: Restricted Cadet Formation 
  2200: Taps/Restricted Cadet Formation 
  `;

  const commonNumbers = `
  CHDO: (860) 625-2013
  Watch Office Phone: (860) 444-8294
  CGA Emergency: (860) 444-8402
  Help Desk: (860) 444-8324 (TECH)
  SMPO: (860) 625-0530
  Duty Engineer: (860) 625-1166
  `;

  const Header = () => {
    return (
      // <View style={styles.boxContainer}>
      <View style={styles.header}>
        <View style={styles.innerTextCenter}>
          <Text style={styles.headerText}>{displayNameCap}</Text>
        </View>
      </View>
      // </View>
    );
  };

  const ScrollArea = () => {
    return (
      <ScrollView style={styles.scrollView}>
        <StatusBar
          animated={true}
          barStyle='light-content'
        />
        <View style={styles.boxContainer}>
          <View style={styles.boxDayDate}>
            <View style={styles.innerTextCenter}>
              <Text style={styles.boxText}>{dateText}</Text>
            </View>
          </View>
          <View style={styles.box2}>
            <View style={styles.innerTextTop}>
              <Text style={styles.boxBoldText}>OOD Announcements</Text>
              <Text style={styles.boxText}>OOD Push Notifs here</Text>
            </View>
          </View>
          <View style={styles.box1}>
            <View style={styles.innerTextTop}>
              <Text style={styles.boxBoldText}>Plan of the Day</Text>
              <Text style={styles.boxText}>{PlanOfTheDay}</Text>
            </View>
          </View>
          <View style={styles.box3}>
            <View style={styles.innerTextTop}>
              <Text style={styles.boxBoldText}>Common Numbers</Text>
              <Text style={styles.boxText}>{commonNumbers}</Text>
            </View>
          </View>
          <View style={styles.box2}>
            <View style={styles.innerTextTop}>
              <Text>Box 3 Default Text</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollArea />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02090D",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 5,
    gap: 5,
  },
  header: {
    width: "100%",
    height: "20%",
    backgroundColor: coastGuardYellow,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    padding: 5,
    gap: 5,
  },
  headerText: {
    fontSize: RFPercentage(5),
    fontWeight: "bold",
  },
  scrollView: {
    height: "83%",
    width: "100%",
    backgroundColor: "#02090D", //coastGuardBlue
    marginHorizontal: 5,
    overflow: "hidden",
  },
  scrollText: {
    fontSize: RFPercentage(2),
    fontVariant: ['oldstyle-nums'],
    color: "white",
  },
  boxContainer: {
    width: "100%",
    height: 2000,
    backgroundColor: coastGuardBlue,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    padding: 5,
    gap: 5,
  },
  boxDayDate: {
    width: "75%",
    height: 50,
    padding: 5,
    backgroundColor: coastGuardYellow,
    alignItems: "center",
    borderRadius: 15,
  },
  box1: {
    width: "100%",
    height: "20%",
    padding: 5,
    backgroundColor: coastGuardYellow,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  box2: {
    width: "100%",
    height: "5%",
    padding: 5,
    backgroundColor: coastGuardYellow,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    gap: 5,
  },
  box3: {
    width: "100%",
    height: "10%",
    padding: 5,
    backgroundColor: coastGuardYellow,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    gap: 5,
  },
  innerTextTop: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
  },
  innerTextCenter: {
    width: "100%",
    height: "100%",
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  boxText: {
    fontSize: RFPercentage(2),
  },
  boxBoldText: {
    fontSize: RFPercentage(4),
    fontWeight: "bold",
  },
});

export default MainScreen;

// Libo bus tracker
// Powerschool
// Link to Desire2Learn
// Virtual special request
// Mailroom Notifs
// Uniform Shop Notifs
// Laundry room tracker
