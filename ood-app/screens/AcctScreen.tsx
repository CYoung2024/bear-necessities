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
  TouchableWithoutFeedback,
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
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const [whichList, setWhichList] = useState(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "IFN", value: "1" },
    { label: "Academic building", value: "2" },
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
  }, [cadetList1c, cadetList2c, cadetList3c, cadetList4c]);

  useEffect(() => {
    if (category === "IFN") {
      setUpdateContent("IFN");
    } else if (category === "Liberty") {
      setUpdateContent("Liberty");
    } else if (category === "Liberty - Short") {
      setUpdateContent("Liberty - Short");
    } else if (category === "Liberty - Long") {
      setUpdateContent("Liberty - Long");
    }
  }, [category]);

  const handleRefresh = async () => {
    setLoading(true);
    const [temp1c, temp2c, temp3c, temp4c] =
      await MyAzureFunctions.call_readCompanyStatus(token, company);
    await saveCadetList1c(temp1c);
    await saveCadetList2c(temp2c);
    await saveCadetList3c(temp3c);
    await saveCadetList4c(temp4c);
  };

  const startCadetUpdate = async (
    fullName: string,
    status: string,
    code: string
  ) => {
    await setCadet(fullName);
    await setCode(code);
    setModalVisible(true);
  };

  const handleCategoryChange = async (item: string) => {
    await setCategory(item);
  };

  const dismissModal = async () => {
    await setUpdateContent("");
    await setCategory("");
    await setCadet("");
    await setCode("");
    await setValue(null);
    setModalVisible(false);
  };

  const handleUpdateButton = async () => {
    const data = await MyAzureFunctions.call_writeCadetStatus(
      token,
      code,
      updateContent
    );
    if (data.Status === updateContent) {
      // nice
      if (whichList === 1) {
        const tempList = cadetList1c;
        const index = await cadetList1c.findIndex(
          (that) => that.FullName === cadet
        );
        tempList[index].Status = updateContent;
        saveCadetList1c(tempList);
      } else if (whichList === 2) {
        const tempList = cadetList2c;
        const index = await cadetList2c.findIndex(
          (that) => that.FullName === cadet
        );
        tempList[index].Status = updateContent;
        saveCadetList2c(tempList);
      } else if (whichList === 3) {
        const tempList = cadetList3c;
        const index = await cadetList3c.findIndex(
          (that) => that.FullName === cadet
        );
        tempList[index].Status = updateContent;
        saveCadetList3c(tempList);
      } else if (whichList === 4) {
        const tempList = cadetList4c;
        const index = await cadetList4c.findIndex(
          (that) => that.FullName === cadet
        );
        tempList[index].Status = updateContent;
        saveCadetList4c(tempList);
      }
      await setUpdateContent("");
      await setCategory("");
      await setCadet("");
      await setCode("");
      setModalVisible(false);
    } else {
      console.log("it didn't update or something");
    }
  };

  // what you're about to witness may cause you great mental pain
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
      {/* major fuckshit begins here */}
      <View style={styles.containerContent}>
        <Modal
          transparent={true}
          visible={modalVisible}
          //onDismiss={() => dismissModal()}
          onRequestClose={() => dismissModal()}
        >
          <TouchableWithoutFeedback onPress={() => dismissModal()}>
            <View style={styles.modalViewOuter}>
              <TouchableWithoutFeedback>
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
                      handleCategoryChange(item.label);
                    }}
                  />
                  {category === "Excusal" ? (
                    <TextInput
                      style={styles.textInputStyle}
                      onChangeText={(text) => setUpdateContent(text)}
                      //value={updateContent}
                      placeholder="Enter excusal name here"
                      keyboardType="default"
                    />
                  ) : null}
                  {category === "Academic building" ? (
                    <TextInput
                      style={styles.textInputStyle}
                      onChangeText={(text) => setUpdateContent(text)}
                      //value={updateContent}
                      placeholder="Enter building name here"
                      keyboardType="default"
                    />
                  ) : null}
                  {updateContent ||
                  category === "IFN" ||
                  category === "Liberty" ||
                  category === "Liberty - Short" ||
                  category === "Liberty - Long" ? (
                    <Pressable
                      style={styles.updateButton}
                      onPress={() => handleUpdateButton()}
                    >
                      <Text style={styles.updateButtonText}>Update</Text>
                    </Pressable>
                  ) : null}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
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
                  onPress={() => {
                    startCadetUpdate(item.FullName, item.Status, item.Code);
                    setWhichList(1);
                  }}
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
                  onPress={() => {
                    startCadetUpdate(item.FullName, item.Status, item.Code);
                    setWhichList(2);
                  }}
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
                  onPress={() => {
                    startCadetUpdate(item.FullName, item.Status, item.Code);
                    setWhichList(3);
                  }}
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
                  onPress={() => {
                    startCadetUpdate(item.FullName, item.Status, item.Code);
                    setWhichList(4);
                  }}
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
    borderRadius: 10,
  },
  modalText: {
    fontSize: RFPercentage(2),
    paddingBottom: 10,
  },
  textInputStyle: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    borderRadius: 8,
  },
});

export default AcctScreen;
