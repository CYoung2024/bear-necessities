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
        onPress={MicrosoftLogin}>
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