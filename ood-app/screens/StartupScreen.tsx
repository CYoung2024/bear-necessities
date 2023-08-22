import React, { useState, useEffect } from "react";
import { Button } from "react-native";
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import MyStorage from "../storage";
import { auth, firebase, firebaseConfig } from "../firebase";
//import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import MyFirebaseFunctions from "../firebaseFunctions";



let dim = Dimensions.get("window");

const StartupScreen = ({ navigation }) => {
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

  const handleContinuePress = async () => {
    saveCompany(selected);
    let data = await fetchAccountabilityOfCompany(selected);
    await parseCadetList(data);
    navigation.navigate("OOD Bear Essentials");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Select Company</Text>
        <SelectList
          setSelected={(val) => setSelected(val)}
          data={data}
          save="value"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleContinuePress}
          style={styles.button}
          disabled={disabled}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: "black",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#015289",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    marginTop: 15,
    borderColor: "lightblue",
    borderWidth: 2,
    backgroundColor: "white",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "lightblue",
    fontWeight: "700",
    fontSize: 16,
  },
  forgotPassText: {
    padding: 20,
    color: "#00E",
  },
  registerText: {
    color: "#FFA500",
  },
  image: {
    width: dim.height * 0.8,
    height: dim.height * 0.5,
    resizeMode: "contain",
  },
});

export default StartupScreen;
