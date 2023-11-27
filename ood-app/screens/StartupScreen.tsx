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
  const [token, $token]: any = useState({});
  const [testResponse1, $testResponse1]: any = useState("");
  const scopes = [
    "openid",
    "profile",
    "email",
    "offline_access",
    "api://35ccd7e7-b807-4ac3-93ed-a1f82e0b0ef5/user_impersonation",
  ];
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
        },
      },
      discovery
    );
    const { accessToken, refreshToken, issuedAt, expiresIn } = tokenResult;
    $token(tokenResult);
    console.log(accessToken);
    console.log(refreshToken);
    console.log(issuedAt);
    console.log(expiresIn);
  };

  const callAzureFunction1 = async () => {
    const functionUrl =
      "https://bearnecessititesfunctionapp.azurewebsites.net/api/HelloWorld?code=0vBFa7gasepknwj5ZxfqcRF6PbfhEdbqilKFg7JSfyReAzFuFkV35A==";
    try {
      const response = await fetch(functionUrl, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token.accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response from Azure Function:", data);
        $testResponse1(data);
        // Process the data received from the Azure Function
      } else {
        console.error("Error calling Azure Function:", response.status);
        // Handle error responses
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle any network errors or exceptions
    }
  };

  const callAzureFunction2 = async () => {
    const functionUrl =
      "https://bearnecessititesfunctionapp.azurewebsites.net/api/getCadetInfo?code=vBTg1TJl5BurRdwZl47VLAUPPhAryNrcG1dWicfXk2jvAzFuYuZmRA==";

    try {
      const response = await fetch(functionUrl, {
        method: "GET", // Or 'GET', 'PUT', etc., depending on your Azure Function configuration
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response from Azure Function:", data);
        // Process the data received from the Azure Function
      } else {
        console.error("Error calling Azure Function:", response.status);
        // Handle error responses
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle any network errors or exceptions
    }
  };

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
            }}
          >
            <Text style={styles.buttonText}>Sign In With Microsoft</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await callAzureFunction1();
          }}
        >
          <Text style={styles.buttonText}>call api</Text>
        </TouchableOpacity>
        <Text>{testResponse1}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await callAzureFunction2();
          }}
        >
          <Text style={styles.buttonText}>call api 2</Text>
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
