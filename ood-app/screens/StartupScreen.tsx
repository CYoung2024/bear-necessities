import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import MyStorage from "../storage";
import { ADConfig } from "../secret-config";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import axios from "axios";
import * as Crypto from "expo-crypto";

WebBrowser.maybeCompleteAuthSession();
let dim = Dimensions.get("window");

function base64URLEncode(str) {
  return str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

const StartupScreen = ({ navigation }) => {
  const [discovery, $discovery]: any = useState({});
  const [authRequest, $authRequest]: any = useState({});
  const [authorizeResult, $authorizeResult]: any = useState({});
  const [codeChallenge, $codeChallenge]: any = useState({});
  const scopes = ["openid", "profile", "email", "offline_access"];
  const domain = `https://login.microsoftonline.com/${ADConfig.directoryTenantID}/v2.0`;
  const redirectUrl = AuthSession.makeRedirectUri();

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
      clientId: ADConfig.applicationClientID,
      //clientSecret: ADConfig.secretValue,
      redirectUri: __DEV__ ? redirectUrl : redirectUrl + "example",
      state: ADConfig.state,
      codeChallenge,
      codeChallengeMethod: AuthSession.CodeChallengeMethod.S256,
    };
    const authRequest = new AuthSession.AuthRequest(authRequestOptions);
    $authRequest(authRequest);
    $discovery(d);
    $codeChallenge(cc);
  };

  const getCodeExchange = async () => {
    const tokenResult = await AuthSession.exchangeCodeAsync(
      {
        code: authorizeResult.params.code,
        clientId: ADConfig.applicationClientID,
        redirectUri: __DEV__ ? redirectUrl : redirectUrl + "example",

        extraParams: {
          code_verifier: authRequest.codeVerifier,
          grant_type: "authorization_code",
          //client_secret: ADConfig.secretValue,
        },
      },
      discovery
    );
    const { accessToken, refreshToken, issuedAt, expiresIn } = tokenResult;

    console.log(accessToken);
    console.log(refreshToken);
    console.log(issuedAt);
    console.log(expiresIn);
  };

  // const exchangeCodeForAccessToken = async () => {
  //   try {
  //     const tokenEndpoint = `https://login.microsoftonline.com/${ADConfig.directoryTenantID}/oauth2/v2.0/token`;
  //     const tokenRequestBody = {
  //       grant_type: "authorization_code",
  //       code: authorizeResult.params.code,
  //       client_id: ADConfig.applicationClientID,
  //       redirect_uri: __DEV__ ? redirectUrl : redirectUrl + "example",
  //       client_secret: ADConfig.secretValue,
  //       // Add other necessary parameters here
  //     };

  //     const response = await axios.post(
  //       tokenEndpoint,
  //       new URLSearchParams(tokenRequestBody),
  //       {
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //       }
  //     );

  //     const accessToken = response.data.access_token;
  //     console.log("Access Token:", accessToken);

  // // Use the access token to access Azure SQL Database or other APIs
  // const databaseEndpoint = 'https://your-database-endpoint.database.windows.net'; // Replace with your Azure SQL Database endpoint
  // const databaseHeaders = {
  //   Authorization: `Bearer ${accessToken}`,
  //   'Content-Type': 'application/json',
  // };

  // // Make requests to your Azure SQL Database using axios or another HTTP library

  // // Example: Fetch data from the database
  // const fetchDataResponse = await axios.get(`${databaseEndpoint}/api/data`, {
  //   headers: databaseHeaders,
  // });

  // // Handle the response and perform read/write operations as needed

  // console.log("Fetched Data:", fetchDataResponse.data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  useEffect(() => {
    getSession();
    if (authorizeResult && authorizeResult.type == "error") {
      // Mr. Gold may have broken this
    }
    if (
      authorizeResult &&
      authorizeResult.type == "success" //&& // here too
      //authRequest &&
      //authRequest.codeVerifier
    ) {
      console.log("yay");
      console.log(discovery);
      getCodeExchange();
    }
  }, [authorizeResult]); //, authRequest]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.buttonContainer}>
        {authRequest && discovery ? (
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              const authorizeResult = await authRequest.promptAsync(discovery);
              await $authorizeResult(authorizeResult);
              console.log(authorizeResult);
              console.log(authRequest);
              console.log(authorizeResult.params.code);
              console.log(redirectUrl);
            }}
          >
            <Text style={styles.buttonText}>Sign In With Microsoft</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
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

export default StartupScreen;
