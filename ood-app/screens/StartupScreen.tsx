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
import * as MyAzureFunctions from "../azureFunctions";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import * as Crypto from "expo-crypto";
import DropDownPicker from "react-native-dropdown-picker";
import { auth } from "../firebase";

WebBrowser.maybeCompleteAuthSession(); // I have no clue how this actually works
let dim = Dimensions.get("window");

function base64URLEncode(str) {
  return str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

const StartupScreen = ({ navigation }) => {
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
  const domain = `https://login.microsoftonline.com/${ADConfig.directoryTenantID}/v2.0`;
  const redirectUrl = AuthSession.makeRedirectUri();
  // for dropdown company picker
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Alfa", value: "a" },
    { label: "Bravo", value: "b" },
    { label: "Charlie", value: "c" },
    { label: "Delta", value: "d" },
    { label: "Echo", value: "e" },
    { label: "Foxtrot", value: "f" },
    { label: "Golf", value: "g" },
    { label: "Hotel", value: "h" },
  ]);
  const {
    company,
    saveCompany,
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

  // second half of auth
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
      $access(true);
    }
  }, [token]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.buttonContainer}>
        {!access ? ( //authRequest && discovery ? (
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
          <View>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Select a Company to View"
              onSelectItem={(item) => {
                saveCompany(item.label);
              }}
            />
            <TouchableOpacity
              onPress={async () => {
                // TODO: don't continue if no company is selected
                // TODO: loading animation and don't let them spam click while awaiting
                const [temp1c, temp2c, temp3c, temp4c] =
                  await MyAzureFunctions.call_readCompanyStatus(token, company);
                await saveCadetList1c(temp1c);
                await saveCadetList2c(temp2c);
                await saveCadetList3c(temp3c);
                await saveCadetList4c(temp4c);
                await navigation.navigate("Bear Necessities - OOD", token);
                // write example for cadet app
                // await MyAzureFunctions.call_writeCadetStatus(
                //   token,
                //   24813,
                //   "status here"
                // );
                // console.log("done");
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Go</Text>
            </TouchableOpacity>
          </View>
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
  temp: {
    fontSize: 20,
  },
});

export default StartupScreen;
