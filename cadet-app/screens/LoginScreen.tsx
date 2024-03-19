import React, { useState, useEffect } from "react";
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import * as Crypto from "expo-crypto";
//import { ADConfig } from "../secret-config";
import MyStorage from "../storage";
import { MessageListContext } from "../contextMessageList";

import * as MyAzureFunctions from "../azureFunctions";

WebBrowser.maybeCompleteAuthSession();

// Reads dimensions of screen for image/button scaling
let dim = Dimensions.get("window");
// Reads in Icon picture from Assests folder
const USCGALogo = require("../assets/icon.png");

function base64URLEncode(str) {
  return str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

// Creates login screen display
// First part creates picture, can also bypass login screen
// Second part creates login button
function LoginScreen({ navigation }) {
  //for auth
  const [discovery, $discovery]: any = useState({});
  const [authRequest, $authRequest]: any = useState({});
  const [authorizeResult, $authorizeResult]: any = useState({});
  const [codeChallenge, $codeChallenge]: any = useState({});
  const [token, $token]: any = useState({});
  const [access, $access]: any = useState(false);
  const scopes = [
    "openid",
    "profile",
    "email",
    "offline_access",
    "api://35ccd7e7-b807-4ac3-93ed-a1f82e0b0ef5/user_impersonation",
  ];
  const domain = `https://login.microsoftonline.com/${process.env.EXPO_PUBLIC_directoryTenantID}/v2.0`;
  const redirectUrl = AuthSession.makeRedirectUri({
    scheme: "com.cyoung2024.cadetapp",
    path: "auth",
  });

  const {
    cadetCode,
    saveCadetCode,
    cadetStatus,
    saveCadetStatus,
    expoPushToken,
  } = MyStorage({
    initialCadetCode: "",
    initialCadetStatus: "",
    initialExpoPushToken: "",
  });

  // first half of auth
  const getSession = async () => {
    const cv = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      Math.random().toString(36).substr(2) + Date.now().toString(36)
    );
    const d = await AuthSession.fetchDiscoveryAsync(domain);
    const cc = await base64URLEncode(cv);

    const authRequestOptions: AuthSession.AuthRequestConfig = {
      prompt: AuthSession.Prompt.Login,
      responseType: AuthSession.ResponseType.Code,
      scopes: scopes,
      usePKCE: true,
      clientId: process.env.EXPO_PUBLIC_applicationClientID,
      redirectUri: __DEV__ ? redirectUrl : redirectUrl + "example",
      state: process.env.EXPO_PUBLIC_state,
      codeChallenge,
      codeChallengeMethod: AuthSession.CodeChallengeMethod.S256,
    };
    const authRequest = new AuthSession.AuthRequest(authRequestOptions);
    $authRequest(authRequest);
    $discovery(d);
    $codeChallenge(cc);
  };

  // second half of auth
  const getCodeExchange = async () => {
    const tokenResult = await AuthSession.exchangeCodeAsync(
      {
        code: authorizeResult.params.code,
        clientId: process.env.EXPO_PUBLIC_applicationClientID,
        redirectUri: __DEV__ ? redirectUrl : redirectUrl + "example",

        extraParams: {
          code_verifier: authRequest.codeVerifier,
          grant_type: "authorization_code",
        },
      },
      discovery
    );
    const { accessToken, refreshToken, issuedAt, expiresIn } = tokenResult;
    $token(tokenResult);
  };

  useEffect(() => {
    getSession();
    if (authorizeResult && authorizeResult.type == "error") {
      console.log("some kinda auth error");
    }
    if (authorizeResult && authorizeResult.type == "success") {
      // auth session is to good to continue to the second half
      getCodeExchange();
    }
  }, [authorizeResult]);

  useEffect(() => {
    getSession();
    if (token.accessToken === undefined) {
      $access(false);
    } else {
      // When the access token is received, move on and let the user into the app
      if (
        cadetCode === undefined ||
        cadetCode === null ||
        cadetCode === "" ||
        cadetCode === "undefined"
      ) {
        navigation.navigate("SetValues", token);
      } else {
        handleMoveToTabApp();
      }
    }
  }, [token]);

  const handleMoveToTabApp = async () => {
    // TODO: show loading animation and don't let them spam the login button
    const [initInfo] = await MyAzureFunctions.call_initCadetApp(
      token,
      cadetCode
    );
    const messageList = await MyAzureFunctions.call_readCompanyMessages(
      token,
      "Alfa"
    );
    // console.log(initInfo.FullName);
    // console.log(initInfo.Year);
    // console.log(initInfo.Company);
    // console.log(initInfo.Status);
    // console.log(initInfo.NotifCode);
    const status = initInfo.Status;
    if (
      (initInfo.NotifCode === undefined ||
        initInfo.NotifCode === null ||
        initInfo.NotifCode === "" ||
        initInfo.NotifCode === "undefined") &&
      initInfo.NotifCode !== expoPushToken // also need to check NotifCode does not contain expoPushToken
    ) {
      MyAzureFunctions.call_updatePushToken(token, cadetCode, expoPushToken);
    }
    navigation.navigate("TabApp", {
      screen: "Home",
      params: { token, messageList, status },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bypassContainer}>
        <Image style={styles.image} source={USCGALogo} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            navigation.navigate("Loading");
            const authorizeResult = await authRequest.promptAsync(discovery);
            await $authorizeResult(authorizeResult);
          }}
        >
          <Text style={styles.buttonText}>Sign in with Microsoft</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Exports the Login Screen to App.ts
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  bypassContainer: {
    height: "66%",
    //backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    flex: 1,
  },
  image: {
    width: dim.height * 0.8,
    height: dim.height * 0.5,
    resizeMode: "contain",
  },
  buttonContainer: {
    height: "11%",
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#015289",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
