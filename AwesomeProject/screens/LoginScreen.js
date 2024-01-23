import * as React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as AuthSession from "expo-auth-session";
import * as Crypto from "expo-crypto";

// Reads dimensions of screen for image/button scaling
let dim = Dimensions.get("window");
// Reads in Icon picture from Assests folder
const USCGALogo = require("../assets/icon.png");



// Microsoft Login Function
const MicrosoftLogin = () => {






  alert("Logging in with Microsoft");






};



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
   const domain = `https://login.microsoftonline.com/${ADConfig.directoryTenantID}/v2.0`;
   const redirectUrl = AuthSession.makeRedirectUri();
  
  
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

  // useEffect(() => {
  //   getSession();
  //   if (token.accessToken === undefined) {
  //     $access(false);
  //   } else {
  //     // When the access token is received, move on and let the user into the app
  //     $access(true);
  //   }
  // }, [token]);
  
  
  
  
  
  
  return (
    <SafeAreaView style={styles.container}>


      <View style={styles.bypassContainer}>
        <TouchableOpacity
          style={styles.imageBackground}
          onPress={() => navigation.navigate('TabApp')}
        >
          <Image style={styles.image} source={USCGALogo} />
        </TouchableOpacity>
      </View>


      <View style={styles.buttonContainer}>
        <TouchableOpacity 
        style={styles.button}
        onPress={async () => {
          const authorizeResult = await authRequest.promptAsync(discovery);
          await $authorizeResult(authorizeResult);
        }}>
          <Text style={styles.buttonText}>Sign in with Microsoft</Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  )
}



// Exports the Login Screen to App.ts
export default LoginScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  bypassContainer: {
    height: '66%',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    width: dim.height * 0.8,
    height: dim.height * 0.5,
    resizeMode: 'contain',
  },
  buttonContainer: {
    width: "60%",
    alignItems: 'center',
    justifyContent: 'flex-start',
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