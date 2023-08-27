import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import MyStorage from "../storage";
import { firebase, firebaseConfig } from "../firebase";
import "firebase/compat/firestore";
import MyFirebaseFunctions from "../firebaseFunctions";
import { colors } from "../colors";

let dim = Dimensions.get("window");
const logo = require("../assets/logo.png");

const LoadScreen = ({ navigation }) => {
  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
  }, []);

  const db = firebase.firestore();
  const [disabled, setDisabled] = useState(false);
  const [selected, setSelected] = useState("");
  const [temp1c, setTemp1c] = useState([]);
  const [temp2c, setTemp2c] = useState([]);
  const [temp3c, setTemp3c] = useState([]);
  const [temp4c, setTemp4c] = useState([]);

  const {
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
  const { fetchAccountabilityOfCompany } = MyFirebaseFunctions();

  const data = [
    { key: "1", value: "Alfa" },
    { key: "2", value: "Bravo" },
    { key: "3", value: "Charlie" },
    { key: "4", value: "Delta" },
    { key: "5", value: "Echo" },
    { key: "6", value: "Foxtrot" },
    { key: "7", value: "Golf" },
    { key: "8", value: "Hotel" },
  ];

  useEffect(() => {
    saveCadetList1c(JSON.stringify(temp1c));
  }, [temp1c]);
  useEffect(() => {
    saveCadetList2c(JSON.stringify(temp2c));
  }, [temp2c]);
  useEffect(() => {
    saveCadetList3c(JSON.stringify(temp3c));
  }, [temp3c]);
  useEffect(() => {
    saveCadetList4c(JSON.stringify(temp4c));
  }, [temp4c]);

  const parseCadetList = async (fullList) => {
    let DumbArray1 = [];
    let DumbArray2 = [];
    let DumbArray3 = [];
    let DumbArray4 = [];
    await fullList.forEach(async (cadet) => {
      const [status, year] = cadet[1].split("/");
      const email_ = cadet[0];
      const email = email_.replace(/_/g, ".");
      if (year === "2024") {
        await DumbArray1.push({ email: email, status: status });
      } else if (year === "2025") {
        await setTemp2c([...temp2c, [email, status]]);
      } else if (year === "2026") {
        await setTemp3c([...temp3c, [email, status]]);
      } else if (year === "2027") {
        await setTemp4c([...temp4c, [email, status]]);
      }
    });
    await setTemp1c(DumbArray1);
    await setTemp2c(DumbArray2);
    await setTemp3c(DumbArray3);
    await setTemp4c(DumbArray4);
  };

  const handleButtonPress = async (company) => {
    saveCompany(company);
    let data = await fetchAccountabilityOfCompany(company);
    await parseCadetList(data);
    navigation.navigate("OOD Bear Essentials");
  };

  const companies1 = ["Alfa", "Bravo", "Charlie", "Delta"];
  const companies2 = ["Echo", "Foxtrot", "Golf", "Hotel"];

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.gridContainer}>
        {companies1.map((company) => (
          <TouchableOpacity
            key={company}
            onPress={() => handleButtonPress(company)}
            style={styles.button}
          >
            <Text style={styles.buttonLabel}>{company}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.gridContainer}>
        {companies2.map((company) => (
          <TouchableOpacity
            key={company}
            //onPress={() => }
            style={styles.button}
          >
            <Text style={styles.buttonLabel}>{company}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    //justifyContent: "flex-end",
  },
  logoContainer: {
    flex: 4,
    paddingVertical: "2%",
  },
  logo: {
    width: dim.height * 0.7,
    height: dim.height * 0.4,
    resizeMode: "contain",
  },
  gridContainer: {
    //alignContent: "center",
    flexDirection: "row",
    //flexWrap: "wrap",
    flex: 3,
    alignItems: "center",
    //alignSelf: "center",
    //justifySelf: "center",
    justifyContent: "space-around",
  },
  button: {
    //paddingHorizontal: "50%",
    //paddingVertical: "1%",
    borderRadius: 15,
    backgroundColor: colors.blue0,
    justifyContent: "center", // moves text to vertical center of button
    //alignSelf: "center",
    marginHorizontal: "20%",
    marginBottom: 6,
    //minWidth: "5%",
    //textAlign: "center",
    //flexDirection: "row",
    //alignSelf: "center",
    //alignItems: "center",
    width: dim.width * 0.08,
    height: dim.height * 0.08,
  },
  buttonLabel: {
    textAlign: "center", // moves text to horizontal center of button
    color: "white",
    //marginBottom: 10,
    fontSize: 24,
    //paddingHorizontal: "2%",
    //flexDirection: "row",
    //alignSelf: "center",
  },
});

export default LoadScreen;
