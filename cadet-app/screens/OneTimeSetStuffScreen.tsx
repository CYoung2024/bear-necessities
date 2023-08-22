import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { auth } from "../firebase";
import { SelectList } from "react-native-dropdown-select-list";
import MyStorage from "../storage";
import MyFirebaseFunctions from "../firebaseFunctions";

const OneTimeSetStuffScreen = ({ navigation }) => {
  const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);

  const { company, saveCompany, year, saveYear, cadetStatus } = MyStorage({
    initialCompany: "",
    initialYear: "",
    initialCadetStatus: "",
  });

  const { updateAccountabilityFirestore } = MyFirebaseFunctions();

  const companyPickerData = [
    { key: "1", value: "Alfa" },
    { key: "2", value: "Bravo" },
    { key: "3", value: "Charlie" },
    { key: "4", value: "Delta" },
    { key: "5", value: "Echo" },
    { key: "6", value: "Foxtrot" },
    { key: "7", value: "Golf" },
    { key: "8", value: "Hotel" },
  ];

  const yearPickerData = [
    { key: "1", value: "2024" },
    { key: "2", value: "2025" },
    { key: "3", value: "2026" },
    { key: "4", value: "2027" },
  ];

  useEffect(() => {
    if (
      company === undefined ||
      company === null ||
      company === "" ||
      company === "undefined" ||
      year === undefined ||
      year === null ||
      year === "" ||
      year === "undefined"
    ) {
    } else {
      setShow(true);
    }
  }, [company, year]);

  const handleCompanyChange = async () => {
    const email = auth.currentUser.email;
    await saveCompany(selected);
    await updateAccountabilityFirestore(email, cadetStatus, year, selected);
  };

  const handleYearChange = async () => {
    await saveYear(selected);
    const email = auth.currentUser.email;
    await updateAccountabilityFirestore(email, cadetStatus, selected, company);
  };

  const handleContinue = () => {
    navigation.navigate("Home", { screen: "Main" });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.mainText}>Please Select your company and class</Text>
      <View style={styles.selectContainer}>
        <SelectList
          onSelect={() => handleCompanyChange()}
          setSelected={setSelected}
          data={companyPickerData}
          save="value"
          placeholder="Change your company here"
        />
        <View style={styles.separator} />
        <SelectList
          onSelect={() => handleYearChange()}
          setSelected={setSelected}
          data={yearPickerData}
          save="value"
          placeholder="Change your class year here"
        />
      </View>
      {show && <Button title="Continue" onPress={handleContinue} />}
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
  mainText: {
    fontSize: 14,
  },
  selectContainer: {
    padding: 10,
  },
  separator: {
    padding: 10,
  },
});

export default OneTimeSetStuffScreen;
