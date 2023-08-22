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

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSendVerification = () => {
    let good = true;
    let edu = true;
    if (!emailRegex.test(email)) {
      edu = false;
      alert("Please use a valid .edu address");
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        if (error.code === "auth/weak-password" && edu) {
          good = false;
          alert("Please use a password with at least 6 characters.");
        }
      })
      .then((userCredential) => {
        if (good && edu) {
          userCredential.user.sendEmailVerification();
          auth.signOut();
          alert("Verification Email Sent");
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
          keyboardType="email-address"
          autoCorrect={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Desired Cadet App Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
          autoCorrect={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSendVerification}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Send Verification Email</Text>
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
    borderColor: "#015289",
    borderWidth: 2,
    backgroundColor: "white",
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

export default RegisterScreen;
