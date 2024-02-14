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
import { NavigationContainer } from '@react-navigation/native';
import MyStorage from "../storage";



const OneTimeSetStuffScreen = ({ navigation }) => {
    const [selected, setSelected] = useState("");
    const [show, setShow] = useState(false);
    const [number, onChangeNumber] = React.useState('');
  
    const {  cadetCode, saveCadetCode, cadetStatus } = MyStorage({
      initialCadetCode: "",
      initialCadetStatus: "",
    });


    useEffect(() => {
      if (
        cadetCode === undefined ||
        cadetCode === null ||
        cadetCode === "" ||
        cadetCode === "undefined"
      ) {
      } else {
        navigation.navigate("TabApp");
      }
    }, [cadetCode]);
  


    const handleCadetCodeInput = async () => {
      await saveCadetCode(number);
      console.log(cadetCode)
    };
  



    const handleContinue = () => {
        navigation.navigate("TabApp");
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
                handleContinue()
                handleCadetCodeInput()
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