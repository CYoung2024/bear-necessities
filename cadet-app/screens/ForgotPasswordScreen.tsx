import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth } from "../firebase";

const emailRegex = /^[A-Za-z0-9._%+-]+@uscga\.edu$/;

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleForgotPass = () => {
    let edu = true;
    let good = true;
    if (!emailRegex.test(email)) {
      edu = false;
      alert("Please use a valid .edu address");
    }
    auth
      .sendPasswordResetEmail(email)
      .catch(function (error) {
        if (error.code === "auth/user-not-found" && edu) {
          good = false;
          alert("This email has not been registered.");
        }
      })
      .then(() => {
        if (good && edu) {
          auth.signOut();
          alert(
            "Password reset email sent.\nIt may be in your quarantine inbox."
          );
          navigation.navigate("Login");
        }
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder=".edu Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleForgotPass} style={[styles.button]}>
          <Text style={styles.buttonText}>Send Password Reset Email</Text>
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
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#015289",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#015289",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
