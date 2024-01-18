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

import StartupScreen from "./StartupScreen";
import MyStorage from "../storage";

let dim = Dimensions.get("window");

const coastGuardBlue = "#015289";
const coastGuardLBlue = "#B3E0FF";
const coastGuardYellow = "#f0ac1b";

// const Header = () => {
//   const { company } = MyStorage({ initialCompany: "" });
//   return (
//     <View style={styles.containerHeader}>
//       <View style={styles.headerBox}>
//         <Text style={styles.headerText}>{company} Accountability</Text>
//       </View>
//     </View>
//   );
// };

// const Content = () => {
//   const { cadetList1c } = MyStorage({ initialCadetList1c: "" });

//   return (
//     <View style={styles.containerContent}>
//       <View style={styles.acctBox1c}>
//         <View style={styles.percDisp}>
//           <Text style={styles.percDispText}>0 - 0%</Text>
//         </View>
//         <ScrollView style={styles.acctDisp}>
//           <Text style={styles.acctDispText}>
//             Arnold:       IFN
//             DeCoste:      IFN
//             Duffin:       Mac
//             Fulton:         Lib
//             Kim:          IFN
//             McMahon:      Mac
//             Norman:       IFN
//             Rehauser:       IFN
//             Taha:           Lib
//             Tran:         IFN
//             Young:        Exc
//           </Text>
//         </ScrollView>
//       </View>
//       <View style={styles.acctBox2c}>
//         <View style={styles.percDisp}></View>
//         <ScrollView style={styles.acctDisp}>
//           <Text style={styles.acctDispText}>
//             Cadet 1        .
//             Cadet 2        .
//             Cadet 3        .
//             Cadet 4        .
//             Cadet 5        .
//             Cadet 6        .
//             Cadet 7        .
//             Cadet 8        .
//             Cadet 9        .
//             Cadet 10        .
//             Cadet 11        .
//             Cadet 12        .
//             Cadet 13        .
//             Cadet 14        .
//             Cadet 15        .
//             Cadet 16        .
//             Cadet 17        .
//             Cadet 18        .
//             Cadet 19        .
//             Cadet 20        .
//             Cadet 21        .
//             Cadet 22        .
//             Cadet 23        .
//             Cadet 24        .
//             Cadet 25        .
//             Cadet 26        .
//             Cadet 27        .
//             Cadet 28        .
//             Cadet 29        .
//             Cadet 30        .
//           </Text>
//         </ScrollView>
//       </View>
//       <View style={styles.acctBox3c}>
//         <View style={styles.percDisp}></View>
//         <ScrollView style={styles.acctDisp}>
//           <Text style={styles.acctDispText}>
//             Cadet 1        .
//             Cadet 2        .
//             Cadet 3        .
//             Cadet 4        .
//             Cadet 5        .
//             Cadet 6        .
//             Cadet 7        .
//             Cadet 8        .
//             Cadet 9        .
//             Cadet 10        .
//             Cadet 11        .
//             Cadet 12        .
//             Cadet 13        .
//             Cadet 14        .
//             Cadet 15        .
//             Cadet 16        .
//             Cadet 17        .
//             Cadet 18        .
//             Cadet 19        .
//             Cadet 20        .
//             Cadet 21        .
//             Cadet 22        .
//             Cadet 23        .
//             Cadet 24        .
//             Cadet 25        .
//             Cadet 26        .
//             Cadet 27        .
//             Cadet 28        .
//             Cadet 29        .
//             Cadet 30        .
//           </Text>
//         </ScrollView>
//       </View>
//       <View style={styles.acctBox4c}>
//         <View style={styles.percDisp}></View>
//         <ScrollView style={styles.acctDisp}>
//           <Text style={styles.acctDispText}>
//             Cadet 1        .
//             Cadet 2        .
//             Cadet 3        .
//             Cadet 4        .
//             Cadet 5        .
//             Cadet 6        .
//             Cadet 7        .
//             Cadet 8        .
//             Cadet 9        .
//             Cadet 10        .
//             Cadet 11        .
//             Cadet 12        .
//             Cadet 13        .
//             Cadet 14        .
//             Cadet 15        .
//             Cadet 16        .
//             Cadet 17        .
//             Cadet 18        .
//             Cadet 19        .
//             Cadet 20        .
//             Cadet 21        .
//             Cadet 22        .
//             Cadet 23        .
//             Cadet 24        .
//             Cadet 25        .
//             Cadet 26        .
//             Cadet 27        .
//             Cadet 28        .
//             Cadet 29        .
//             Cadet 30        .
//           </Text>
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

const AcctScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

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

  return (
    <SafeAreaView style={styles.containerWebpage}>
      <View style={styles.containerHeader}>
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>{company} Accountability</Text>
        </View>
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
                  {item.FullName} : {item.Status}
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
                  {item.FullName} : {item.Status}
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
                  {item.FullName} : {item.Status}
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
                  {item.FullName} : {item.Status}
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
