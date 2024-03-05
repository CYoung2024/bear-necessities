import * as React from 'react';
import { Image, SafeAreaView, StyleSheet } from 'react-native';

// Reads dimensions of screen for image/button scaling
const USCGALogo = require("../assets/iconSpinning.gif");

function LoadingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
        <Image source={USCGALogo}/>
    </SafeAreaView>
  );
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
}})