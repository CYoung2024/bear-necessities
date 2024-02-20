import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";

import MyStorage from "../../storage";
// import * as MyAzureFunctions from "../azureFunctions";

const CompanyOODScreen = ({ navigation }) => {
  //   const {
  //     company,
  //     saveCompany,
  //     cadetList1c,
  //     saveCadetList1c,
  //     cadetList2c,
  //     saveCadetList2c,
  //     cadetList3c,
  //     saveCadetList3c,
  //     cadetList4c,
  //     saveCadetList4c,
  //     messageList,
  //     saveMessageList,
  //   } = MyStorage({
  //     initialCompany: "",
  //     initialCadetList1c: "",
  //     initialCadetList2c: "",
  //     initialCadetList3c: "",
  //     initialCadetList4c: "",
  //     initialMessageList: "",
  //   });

  const route = useRoute();
  const token = route.params;
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     const stopLoading = async () => {
  //       if (messageList.length > 0) {
  //         setLoading(false);
  //       }
  //     };
  //     stopLoading();
  //   }, [messageList]);

  return (
    <SafeAreaView style={styles.containerWebpage}>
      <View style={styles.messagesBox}>
        <Text style={styles.infoBoxText}>Company Messages</Text>
        <ScrollView style={styles.scrollView}>
          {/* {loading ? (
            <Text>No current messages :/</Text>
          ) : (
            messageList.map((item, index) => (
              <View key={index} style={styles.touchName}>
                <Text key={index} style={styles.acctDispText}>
                  {item.MessageContent} {item.TimeSent}
                </Text>
              </View>
            ))
          )} */}
        </ScrollView>
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
  containerBoxes: {
    width: "100%",
    height: "74%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    flexDirection: "row",
    padding: "2%",
  },
  accountabilityBox: {
    flex: 1,
    height: "100%",
    backgroundColor: "#EEF0BB",
    alignItems: "center",
    borderColor: "blue",
    borderWidth: 5,
    margin: "1%",
  },
  messagesBox: {
    flex: 2,
    height: "100%",
    backgroundColor: "#EEF0BB",
    alignItems: "center",
    borderColor: "blue",
    borderWidth: 5,
    margin: "1%",
  },
  infoBoxText: {
    //fontSize: RFPercentage(4),
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
    //fontSize: RFPercentage(1),
    rowGap: 5,
  },
  NotifText: {
    //fontSize: RFPercentage(2),
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
  input: {
    height: "4%",
    width: "70%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});

export default CompanyOODScreen;
