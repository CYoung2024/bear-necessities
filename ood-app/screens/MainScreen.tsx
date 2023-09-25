import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import StartupScreen from "./StartupScreen";
import MyStorage from "../storage";

let dim = Dimensions.get("window");

const coastGuardBlue = "#015289";
const coastGuardLBlue = "#B3E0FF";
const coastGuardYellow = "#f0ac1b";

const MainScreen = ({ navigation }) => {
  const {
    company,
    saveCompany,
    cadetList1c,
    saveCadetList1c,
    cadetList2c,
    saveCadetList2c,
    cadetList3c,
    saveCadetList3c,
    cadetList4c,
    saveCadetList4c,
  } = MyStorage({
    initialCompany: "",
    initialCadetList1c: "",
    initialCadetList2c: "",
    initialCadetList3c: "",
    initialCadetList4c: "",
  });

  const Header = () => {
    const [timePhrase, setTimePhrase] = useState("TimePhrase");
    const { company } = MyStorage({
      initialCompany: "",
      initialCadetList1c: "",
      initialCadetList2c: "",
      initialCadetList3c: "",
      initialCadetList4c: "",
    });

    let today = new Date();
    let curHr = today.getHours();

    // if (curHr < 12) {
    //   setTimePhrase("Good Morning ");
    // } else if (curHr < 18) {
    //   setTimePhrase("Good Afternoon ");
    // } else {
    //   setTimePhrase("Good Evening ");
    // }

    return (
      <View style={styles.headerBox}>
        <Text style={styles.headerText}>Good Morning {company} OOD</Text>
      </View>
    );
  };

  const AccountabilityBox = () => {
    const handleMoreInfoPress = () => {
      navigation.navigate("Company Accountability");
      console.log(cadetList1c);
    };

    return (
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>Accountability</Text>
        <View style={styles.AcctContentContainer}>
          <Text style={styles.NotifText}>Next Notif @ 2000</Text>
          <View style={styles.percentageBox1c}>
            <Text>1/c</Text>
          </View>
          <View style={styles.percentageBox2c}>
            <Text>2/c</Text>
          </View>
          <View style={styles.percentageBox3c}>
            <Text>3/c</Text>
          </View>
          <View style={styles.percentageBox4c}>
            <Text>4/c</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={"More Info"}
            onPress={handleMoreInfoPress}
            //style={styles.button}
          />
        </View>
      </View>
    );
  };

  const CompMessagesBox = () => {
    return (
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>Company Messages</Text>
        <View style={styles.AcctContentContainer}>
          <Text style={styles.NotifText}>Next Notif @ 2000</Text>
        </View>
      </View>
    );
  };

  const SettingsBox = () => {
    return (
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>Settings</Text>
        <View style={styles.AcctContentContainer}>
          <Text style={styles.NotifText}>Settings Go Here</Text>
        </View>
      </View>
    );
  };

  const Body = () => {
    return (
      <View style={styles.containerBoxes}>
        <AccountabilityBox />
        <CompMessagesBox />
        <SettingsBox />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.containerWebpage}>
      <Header />
      <Body />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  containerWebpage: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    padding: "1%",
    gap: 10,
  },
  headerBox: {
    width: "70%",
    height: "20%",
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 5,
    borderRadius: 20,
  },
  headerText: {
    fontSize: RFPercentage(5),
  },
  containerBoxes: {
    width: "100%",
    height: "74%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  infoBox: {
    width: "30%",
    height: "100%",
    backgroundColor: "#EEF0BB",
    alignItems: "center",
    borderColor: "blue",
    borderWidth: 5,
  },
  infoBoxText: {
    fontSize: RFPercentage(4),
    alignItems: "center",
    backgroundColor: "#EEF0BB",
    textAlign: "center",
  },

  // ACCOUNTABILITY BOX
  AcctContentContainer: {
    width: "90%",
    height: "70%",
    alignItems: "center",
    backgroundColor: "#EEF0BB",
    fontSize: RFPercentage(1),
    rowGap: 5,
  },
  NotifText: {
    fontSize: RFPercentage(2),
    backgroundColor: "#EEF0BB",
  },
  percentageBox1c: {
    height: 45,
    width: "100%",
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  percentageBox2c: {
    height: 45,
    width: "100%",
    backgroundColor: "lightgrey",
    alignItems: "center",
    justifyContent: "center",
  },
  percentageBox3c: {
    height: 45,
    width: "100%",
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  percentageBox4c: {
    height: 45,
    width: "100%",
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    width: 300,
    height: "5%",
    backgroundColor: "#EEF0BB",
    margin: 30,
  },
  button: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "yellow",
    alignItems: "center",
    elevation: 3,
  },
});

export default MainScreen;
