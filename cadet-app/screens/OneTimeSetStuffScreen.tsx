import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  TextInput,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MyStorage from "../storage";
import { useRoute } from "@react-navigation/native";
import * as MyAzureFunctions from "../azureFunctions";

const OneTimeSetStuffScreen = ({ navigation }) => {
  const route = useRoute();
  const token = route.params;
  const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);
  const [number, onChangeNumber] = React.useState("");

  const { cadetCode, saveCadetCode, cadetStatus, expoPushToken } = MyStorage({
    initialCadetCode: "",
    initialCadetStatus: "",
    initialExpoPushToken: "",
  });

  // this is just copy pasted from loginscreen for now
  const handleMoveToTabApp = async (code) => {
    const [initInfo] = await MyAzureFunctions.call_initCadetApp(token, code);
    const messageList = await MyAzureFunctions.call_readCompanyMessages(
      token,
      initInfo.Company
    );
    const status = initInfo.Status;
    if (
      (initInfo.NotifCode === undefined ||
        initInfo.NotifCode === null ||
        initInfo.NotifCode === "" ||
        initInfo.NotifCode === "undefined") &&
      initInfo.NotifCode !== expoPushToken // also need to check NotifCode does not contain expoPushToken
    ) {
      MyAzureFunctions.call_updatePushToken(token, code, expoPushToken);
    }
    let company = initInfo.Company;
    navigation.navigate("TabApp", {
      screen: "Home",
      params: { token, messageList, status, company },
    });
  };

  const handleCadetCodeInput = async () => {
    await saveCadetCode(number);
    handleMoveToTabApp(number);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.mainText}>Please input your 5-digit cadet code</Text>

      <View style={styles.selectContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="2XXXX"
          keyboardType="numeric"
        />
      </View>
      <Button
        title="Continue"
        onPress={() => {
          handleCadetCodeInput();
        }}
      />
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default OneTimeSetStuffScreen;
