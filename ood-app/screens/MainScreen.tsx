import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  Dimensions,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useRoute } from "@react-navigation/native";
import moment from "moment-timezone";
import Ionicons from "@expo/vector-icons/Ionicons";
import StartupScreen from "./StartupScreen";
import MyStorage from "../storage";
import * as MyAzureFunctions from "../azureFunctions";

let dim = Dimensions.get("window");

const coastGuardBlue = "#015289";
const coastGuardLBlue = "#B3E0FF";
const coastGuardYellow = "#f0ac1b";

const MainScreen = ({ navigation }) => {
  const { company, saveCompany, messageList, saveMessageList } = MyStorage({
    initialCompany: "",
    initialCadetList1c: "",
    initialCadetList2c: "",
    initialCadetList3c: "",
    initialCadetList4c: "",
    initialMessageList: "",
  });

  const [input, setInput] = useState("");
  const route = useRoute();
  const token = route.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stopLoading = async () => {
      if (messageList.length > 0) {
        setLoading(false);
      }
    };
    stopLoading();
  }, [messageList]);

  const handleMoreInfoPress = () => {
    navigation.navigate("Company Accountability", token);
  };

  function convertTime(original: string): string {
    const dateInUTC = moment.utc(original);
    const dateInEST = dateInUTC.tz("America/New_York"); //TODO: pull time zone from device
    const newTime = dateInEST.format("Do HH:mm");
    return newTime;
  }

  async function sendMessage(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "New OOD Message",
      body: input,
      data: { someData: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      mode: "no-cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  const handleSendMessage = async () => {
    const notifTokens = await MyAzureFunctions.call_readCompanyNotifTokens(
      token,
      company
    );
    for (let i = 0; i < notifTokens.length; i++) {
      sendMessage(notifTokens[i]);
    }
    const message = await MyAzureFunctions.call_writeMessage(
      token,
      company,
      input
    );
    setLoading(true);
    await saveMessageList([...messageList, message]);
    setInput("");
  };

  const handleDeleteMessage = async (timeSent) => {
    await MyAzureFunctions.call_deleteMessage(token, timeSent);
    const newMessageList = await messageList.filter(
      (message) => message.TimeSent !== timeSent
    );
    setLoading(true);
    await saveMessageList(newMessageList);
  };

  //let count1c = cadetList1c.filter((cadet) => cadet.status === null).length;

  return (
    <SafeAreaView style={styles.containerWebpage}>
      <View style={styles.headerBox}>
        <Text style={styles.headerText}>{company} OOD</Text>
      </View>
      <View style={styles.containerBoxes}>
        <View style={styles.accountabilityBox}>
          <Text style={styles.infoBoxText}>Accountability</Text>
          <View style={styles.AcctContentContainer}>
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
        <View style={styles.messagesBox}>
          <Text style={styles.infoBoxText}>Company Messages</Text>
          <View style={styles.scrollViewer}>
            <ScrollView style={styles.scroll}>
              {loading ? (
                <Text>No current messages :/</Text>
              ) : (
                messageList.map((item, index) => (
                  <View key={index} style={styles.individualMessage}>
                    <Text key={`content-${index}`} style={styles.messageText}>
                      {item.MessageContent}
                    </Text>
                    <View style={styles.rightSide}>
                      <Text key={`time-${index}`} style={styles.messageTime}>
                        {convertTime(item.TimeSent)}
                      </Text>
                      <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={() => {
                          handleDeleteMessage(item.TimeSent);
                        }}
                      >
                        <Ionicons
                          name={"close-circle-outline"}
                          size={15}
                          color={"#000"}
                          //style={styles.closeIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setInput}
              value={input}
              placeholder="Type a message to send the company"
              keyboardType="default"
              onSubmitEditing={handleSendMessage}
            />
            <Button title={"Send Message"} onPress={handleSendMessage} />
          </View>
        </View>
      </View>
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
    backgroundColor: "#DCDCDC",
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
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderRadius: 20,
  },
  headerText: {
    fontSize: RFPercentage(5),
  },
  containerBoxes: {
    width: "100%",
    height: "74%",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    flexDirection: "row",
    padding: "2%",
  },
  accountabilityBox: {
    flex: 1,
    height: "100%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    margin: "1%",
    borderRadius: 20,
  },
  messagesBox: {
    flex: 2,
    height: "100%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    margin: "1%",
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  infoBoxText: {
    fontSize: RFPercentage(4),
    alignItems: "center",
    textAlign: "center",
  },

  // ACCOUNTABILITY BOX
  AcctContentContainer: {
    width: "90%",
    height: "70%",
    alignItems: "center",
    fontSize: RFPercentage(1),
    rowGap: 5,
  },
  NotifText: {
    fontSize: RFPercentage(2),
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
    margin: 30,
  },
  button: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "yellow",
    alignItems: "center",
    elevation: 3,
  },
  input: {
    height: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
    flex: 3,
    marginRight: 10,
    paddingLeft: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "flex-end",
    width: "95%",
    marginTop: "1%",
    marginBottom: "2%",
  },
  scrollViewer: {
    width: "95%",
    borderWidth: 2,
    borderColor: "#DCDCDC",
    borderRadius: 5,
    alignContent: "flex-start",
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  individualMessage: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#DCDCDC",
  },
  messageText: {
    fontSize: 17,
    alignContent: "flex-start",
  },
  rightSide: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignContent: "flex-end",
  },
  messageTime: {
    fontSize: 12,
    alignContent: "flex-end",
  },
  closeIcon: {
    alignContent: "flex-end",
    paddingLeft: 5,
  },
});

export default MainScreen;
