import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Button,
  KeyboardAvoidingView,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useRoute } from "@react-navigation/native";

import StartupScreen from "./StartupScreen";
import MyStorage from "../storage";
import * as MyAzureFunctions from "../azureFunctions";

let dim = Dimensions.get("window");

const coastGuardBlue = "#015289";
const coastGuardLBlue = "#B3E0FF";
const coastGuardYellow = "#f0ac1b";

const AcctScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const token = route.params;

  const {
    company,
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

  // TODO: test if this is still usefull after backend swap
  // hella scuffed even before the swap
  // could probably init variables above with {"loading"} or something
  useEffect(() => {
    const stopLoading = async () => {
      try {
        if (cadetList1c.length > 0) {
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    stopLoading();
  }, [cadetList1c]);

  const handleRefresh = async () => {
    setLoading(true);
    const [temp1c, temp2c, temp3c, temp4c] =
      await MyAzureFunctions.call_readCompanyStatus(token, company);
    await saveCadetList1c(temp1c);
    await saveCadetList2c(temp2c);
    await saveCadetList3c(temp3c);
    await saveCadetList4c(temp4c);
  };

  return (
    <SafeAreaView style={styles.containerWebpage}>
      <View style={styles.containerHeader}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Bear Necessities - OOD", token)}
        >
          <Image
            source={require("../assets/arrow-back.svg")}
            style={styles.refreshBox}
          ></Image>
        </TouchableOpacity>
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>{company} Accountability</Text>
        </View>
        <TouchableOpacity onPress={() => handleRefresh()}>
          <Image
            source={require("../assets/refresh.svg")}
            style={styles.refreshBox}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.containerContent}>
        <View style={styles.acctBox1c}>
          <View style={styles.percDisp}>
            <Text style={styles.percDispText}>0 - 0%</Text>
          </View>
          <ScrollView style={styles.acctDisp}>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              cadetList1c.map((item, index) => (
                <Text key={index} style={styles.acctDispText}>
                  {item.FullName}: {item.Status}
                </Text>
              ))
            )}
          </ScrollView>
        </View>
        <View style={styles.acctBox2c}>
          <View style={styles.percDisp}></View>
          <ScrollView style={styles.acctDisp}>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              cadetList2c.map((item, index) => (
                <Text key={index} style={styles.acctDispText}>
                  {item.FullName}: {item.Status}
                </Text>
              ))
            )}
          </ScrollView>
        </View>
        <View style={styles.acctBox3c}>
          <View style={styles.percDisp}></View>
          <ScrollView style={styles.acctDisp}>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              cadetList3c.map((item, index) => (
                <Text key={index} style={styles.acctDispText}>
                  {item.FullName}: {item.Status}
                </Text>
              ))
            )}
          </ScrollView>
        </View>
        <View style={styles.acctBox4c}>
          <View style={styles.percDisp}></View>
          <ScrollView style={styles.acctDisp}>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              cadetList4c.map((item, index) => (
                <Text key={index} style={styles.acctDispText}>
                  {item.FullName}: {item.Status}
                </Text>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerWebpage: {
    flex: 1,
    backgroundColor: "pink",
    flexWrap: "wrap",
    flexDirection: "row",
    padding: "1%",
  },

  // HEADER FORMAT
  containerHeader: {
    height: "20%",
    width: "100%",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  headerBox: {
    width: "70%",
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
  refreshBox: {},

  // CONTENT FORMAT
  containerContent: {
    height: "80%",
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  acctBox1c: {
    width: "20%",
    height: "92%",
    borderColor: "blue",
    borderWidth: 10,
  },
  acctBox2c: {
    width: "20%",
    height: "92%",
    borderColor: "black",
    borderWidth: 10,
  },
  acctBox3c: {
    width: "20%",
    height: "92%",
    borderColor: "red",
    borderWidth: 10,
  },
  acctBox4c: {
    width: "20%",
    height: "92%",
    borderColor: "green",
    borderWidth: 10,
  },
  percDisp: {
    height: 100,
    backgroundColor: "lightgrey",
  },
  percDispText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: RFPercentage(3),
  },
  acctDisp: {
    backgroundColor: "#ddd",
  },
  acctDispText: {
    width: "95%",
    alignItems: "center",
    textAlign: "justify",
    fontSize: RFPercentage(2),
  },
});

export default AcctScreen;
