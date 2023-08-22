import React, { useEffect, useState } from "react";
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
  Platform,
} from "react-native";
import { auth } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import MyStorage from "../storage";
import MyFirebaseFunctions from "../firebaseFunctions";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

const db = firebase.firestore();
const tenetID = "f8cdef31-a31e-4b4a-93e4-5f571e91255a";
const clientID = "944a6fa6-dfec-4ad4-bb70-4784f6fc3a9e";
WebBrowser.maybeCompleteAuthSession();

const emailRegex = /^[A-Za-z0-9._%+-]+@uscga\.edu$/;
const logo = require("../assets/logo.png");
let dim = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const { saveCadetStatus, saveCompany, saveYear } = MyStorage({
    initialCadetStatus: "",
    initialCompany: "",
    initialYear: "",
  });
  const { fetchAccountabilityFirestore } = MyFirebaseFunctions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForgotTextPress = () => {
    navigation.navigate("Forgot Password");
  };

  const handleRegisterPress = () => {
    navigation.navigate("Register");
  };

  const handleSuccesfulLogin = async () => {
    const statusList = await fetchAccountabilityFirestore(email.toLowerCase());
    saveCadetStatus(statusList.split("/")[0]);
    saveYear(statusList.split("/")[1]);
    saveCompany(statusList.split("/")[2]);
    setEmail(""); // clears email field
    setPassword(""); // clears password field
    if (statusList === "") {
      navigation.navigate("Set Values");
    } else {
      navigation.navigate("Home", { screen: "Main" });
    }
  };

  const handleLogin = () => {
    //let email = "charles.r.young@uscga.edu"; // delete for actual use
    //let password = "summer"; // delete for actual use
    //let email = "noah.j.mcmahon@uscga.edu"; // delete for actual use
    //let password = "Winter"; // delete for actual use
    let good = true;
    let edu = true;
    if (!emailRegex.test(email)) {
      edu = false;
      good = false;
      alert("Please use a valid .edu address");
    }
    auth
      .signInWithEmailAndPassword(email.toLowerCase(), password)
      .catch(function (error) {
        good = false;
        if (error.code === "auth/invalid-email" && edu === true) {
          alert("Invalid email format\nUse first.m.last@uscga.edu");
        } else if (error.code === "auth/user-not-found") {
          alert("User not found in database.");
        } else if (error.code === "auth/wrong-password") {
          alert("Wrong Password");
        }
      })
      .then(() => {
        let authFlag = true;
        auth.onAuthStateChanged(function (currentUser) {
          if (currentUser && authFlag) {
            const token = currentUser.getIdToken();
            authFlag = false;
            if (currentUser.emailVerified === false && good) {
              good = false;
              alert(
                "Email not verified\nCheck your email!\nIt's in your Quarantine Inbox..."
              );
            }
            if (currentUser.emailVerified && good) {
              handleSuccesfulLogin();
            }
          }
        });
      });
  };

  const [discovery, $discovery]: any = useState({});
  const [authRequest, $authRequest]: any = useState({});
  const [authorizeResult, $authorizeResult]: any = useState({});

  const scopes = ["openid", "profile", "email", "offline_access"]; //Default scope, we are authenticated to grab this data from GraphQL with our access token
  const domain = `https://login.microsoftonline.com/${tenetID}/v2.0`;
  const redirectUrl = AuthSession.makeRedirectUri(
    __DEV__ ? { scheme: "myapp" } : {}
  );

  useEffect(() => {
    const getSession = async () => {
      const d = await AuthSession.fetchDiscoveryAsync(domain);

      const authRequestOptions: AuthSession.AuthRequestConfig = {
        prompt: AuthSession.Prompt.Login,
        responseType: AuthSession.ResponseType.Code,
        scopes: scopes,
        usePKCE: true,
        clientId: clientID,
        redirectUri: __DEV__ ? redirectUrl : redirectUrl + "example",
      };
      const authRequest = new AuthSession.AuthRequest(authRequestOptions);
      $authRequest(authRequest);
      $discovery(d);
    };
    getSession();
  }, []);

  useEffect(() => {
    const getCodeExchange = async () => {
      const tokenResult = await AuthSession.exchangeCodeAsync(
        {
          code: authorizeResult.params.code,
          clientId: clientID,
          redirectUri: __DEV__ ? redirectUrl : redirectUrl + "example",
          extraParams: {
            code_verifier: authRequest.codeVerifier || "",
          },
        },
        discovery
      );
      const { accessToken, refreshToken, issuedAt, expiresIn } = tokenResult;

      console.log(accessToken, refreshToken, issuedAt, expiresIn);
    };

    if (authorizeResult && authorizeResult.type == "error") {
      //Handle error
    }

    if (
      authorizeResult &&
      authorizeResult.type == "success" &&
      authRequest &&
      authRequest.codeVerifier
    ) {
      getCodeExchange();
    }
  }, [authorizeResult, authRequest]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Image source={logo} style={styles.image} />
      </View>
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
          placeholder="Cadet App Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
          autoCorrect={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        {authRequest && discovery ? (
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              const authorizeResult = await authRequest.promptAsync(discovery);
              $authorizeResult(authorizeResult);
            }}
          >
            <Text style={styles.buttonText}>Sign In With Microsoft</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      <TouchableOpacity onPress={handleForgotTextPress}>
        <Text style={styles.forgotPassText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegisterPress}>
        <Text style={styles.registerText}>First time? Sign Up</Text>
      </TouchableOpacity>
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
    borderColor: "lightblue",
    borderWidth: 2,
    backgroundColor: "white",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "lightblue",
    fontWeight: "700",
    fontSize: 16,
  },
  forgotPassText: {
    padding: 20,
    color: "#00E",
  },
  registerText: {
    color: "#FFA500",
  },
  image: {
    width: dim.height * 0.8,
    height: dim.height * 0.5,
    resizeMode: "contain",
  },
});

export default LoginScreen;
