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

WebBrowser.maybeCompleteAuthSession();
let dim = Dimensions.get("window");

const StartupScreen = ({ navigation }) => {
  const [discovery, $discovery]: any = useState({});
  const [authRequest, $authRequest]: any = useState({});
  const [authorizeResult, $authorizeResult]: any = useState({});
  const scopes = ["openid", "profile", "email", "offline_access"]; //Default scope, we are authenticated to grab this data from GraphQL with our access token
  const domain = `https://login.microsoftonline.com/${ADConfig.directoryTenantID}/v2.0`;
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
        clientId: ADConfig.applicationClientID,
        redirectUri: __DEV__ ? redirectUrl : redirectUrl + "example",
      };
      const authRequest = new AuthSession.AuthRequest(authRequestOptions);
      $authRequest(authRequest);
      $discovery(d);
    };
    const getCodeExchange = async () => {
      const tokenResult = await AuthSession.exchangeCodeAsync(
        {
          code: authorizeResult.params.code,
          clientId: ADConfig.applicationClientID,
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

    getSession();
    if (authorizeResult && authorizeResult.type == "error") {
      // this triggers infinitely on error. idk why
    }
    if (
      authorizeResult &&
      authorizeResult.type == "success" &&
      authRequest &&
      authRequest.codeVerifier
    ) {
      console.log("yay");
      getCodeExchange();
    }
  }, [authorizeResult, authRequest]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.buttonContainer}>
        {authRequest && discovery ? (
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              const authorizeResult = await authRequest.promptAsync(discovery);
              $authorizeResult(authorizeResult);
              console.log(authorizeResult);
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
