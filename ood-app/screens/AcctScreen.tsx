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
  Modal,
  Pressable,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useRoute } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";

import StartupScreen from "./StartupScreen";
import MyStorage from "../storage";
import * as MyAzureFunctions from "../azureFunctions";

let dim = Dimensions.get("window");

const coastGuardBlue = "#015289";
const coastGuardLBlue = "#B3E0FF";
const coastGuardYellow = "#f0ac1b";

const AcctScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [cadet, setCadet] = useState("");
  const [what2update, setWhat2update] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "IFN", value: "1" },
    { label: "In academic building", value: "2" },
    { label: "Excusal", value: "3" },
    { label: "Liberty", value: "4" },
    { label: "Liberty - Short", value: "5" },
    { label: "Liberty - Long", value: "6" },
  ]);

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

  const updateSingleCadet = async (fullName: string, status: string) => {
    await setCadet(fullName);
    setModalVisible(true);
    console.log(cadet);
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
        <Modal transparent={true} visible={modalVisible}>
          <View style={styles.modalViewOuter}>
            <View style={styles.modalViewInner}>
              <Text style={styles.modalText}>
                Select a new status for {cadet}
              </Text>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select status here"
                onSelectItem={(item) => {
                  setWhat2update(item.label);
                }}
              />
              <Pressable
                style={styles.updateButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.updateButtonText}>Update</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* TODO: there has to be a better way to write all this 4 times */}
        <View style={styles.acctBox1c}>
          <View style={styles.percDisp}>
            <Text style={styles.percDispText}>0 - 0%</Text>
          </View>
          <ScrollView style={styles.acctDisp}>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              cadetList1c.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.touchName}
                  onPress={() => updateSingleCadet(item.FullName, item.Status)}
                >
                  <Text key={index} style={styles.acctDispText}>
                    {item.FullName}: {item.Status}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
        <View style={styles.acctBox2c}>
          <View style={styles.percDisp}>
            <Text style={styles.percDispText}>0 - 0%</Text>
          </View>
          <ScrollView style={styles.acctDisp}>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              cadetList2c.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.touchName}
                  onPress={() => updateSingleCadet(item.FullName, item.Status)}
                >
                  <Text key={index} style={styles.acctDispText}>
                    {item.FullName}: {item.Status}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
        <View style={styles.acctBox3c}>
          <View style={styles.percDisp}>
            <Text style={styles.percDispText}>0 - 0%</Text>
          </View>
          <ScrollView style={styles.acctDisp}>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              cadetList3c.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.touchName}
                  onPress={() => updateSingleCadet(item.FullName, item.Status)}
                >
                  <Text key={index} style={styles.acctDispText}>
                    {item.FullName}: {item.Status}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
        <View style={styles.acctBox4c}>
          <View style={styles.percDisp}>
            <Text style={styles.percDispText}>0 - 0%</Text>
          </View>
          <ScrollView style={styles.acctDisp}>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              cadetList4c.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.touchName}
                  onPress={() => updateSingleCadet(item.FullName, item.Status)}
                >
                  <Text key={index} style={styles.acctDispText}>
                    {item.FullName}: {item.Status}
                  </Text>
                </TouchableOpacity>
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
    backgroundColor: "#aab5c5",
    borderWidth: 2,
    borderRadius: 10,
  },
  acctBox2c: {
    width: "20%",
    height: "92%",
    borderColor: "black",
    backgroundColor: "#eae9ea",
    borderWidth: 2,
    borderRadius: 10,
  },
  acctBox3c: {
    width: "20%",
    height: "92%",
    borderColor: "red",
    backgroundColor: "#ffd4d4",
    borderWidth: 2,
    borderRadius: 10,
  },
  acctBox4c: {
    width: "20%",
    height: "92%",
    borderColor: "green",
    backgroundColor: "#bbccb4",
    borderWidth: 2,
    borderRadius: 10,
  },
  percDisp: {
    height: "8%",
    //borderBottomColor: "grey",
    //borderBottomWidth: 2,
  },
  percDispText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: RFPercentage(2),
  },
  acctDisp: {
    //backgroundColor: "#ddd",
  },
  acctDispText: {
    width: "95%",
    alignItems: "center",
    textAlign: "justify",
    fontSize: RFPercentage(1.5),
    paddingLeft: "1.5%",
  },
  touchName: {
    borderTopColor: "grey",
    borderTopWidth: 2,
  },
  updateButton: {
    backgroundColor: "#015289",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  updateButtonText: {
    color: "white",
    fontSize: 16,
  },

  // modal
  modalViewOuter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#00000080",
  },
  modalViewInner: {
    backgroundColor: "#fff",
    padding: 20,
  },
  modalText: {
    fontSize: RFPercentage(2),
    paddingBottom: 10,
  },
});

export default AcctScreen;
