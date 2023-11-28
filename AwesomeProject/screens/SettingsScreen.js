import * as React from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Reads dimensions of screen for image/button scaling
let dim = Dimensions.get("window");
const USCGALogo = require("../assets/icon.png");

function ChangeClass(ClassPicked) {

}

function ChangeCompany(CompanyPicked) {

}



function ClassOptions() {
  // Container for Class Section
  // Boxes for each class
  // TouchableOpacity for each box pointing to ChangeClass Function

  return (
    <View style={styles.classContainer}>

      <View style={styles.classBoxes}>
        <TouchableOpacity style={styles.imageBackground} onPress={() => ChangeClass(FirstClass)}>
          <Text>1/c</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.classBoxes}>
        <TouchableOpacity style={styles.imageBackground} onPress={() => ChangeClass(SecondClass)}>
          <Text>2/c</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.classBoxes}>
        <TouchableOpacity style={styles.imageBackground} onPress={() => ChangeClass(ThirdClass)}>
          <Text>3/c</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.classBoxes}>
        <TouchableOpacity style={styles.imageBackground} onPress={() => ChangeClass(FourthClass)}>
          <Text>4/c</Text>
        </TouchableOpacity>
      </View>


    </View>
  )

}



function CompanyOptions() {
  return (
    <View style={styles.companyContainer}>

      <View style={styles.classBoxes}>
        <TouchableOpacity style={styles.imageBackground} onPress={() => ChangeCompany(FirstClass)}>
          <Text>A</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.classBoxes}>
        <TouchableOpacity style={styles.imageBackground} onPress={() => ChangeCompany(SecondClass)}>
          <Text>B</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.classBoxes}>
        <TouchableOpacity style={styles.imageBackground} onPress={() => ChangeCompany(ThirdClass)}>
          <Text>C</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.classBoxes}>
        <TouchableOpacity style={styles.imageBackground} onPress={() => ChangeCompany(FourthClass)}>
          <Text>D</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.classBoxes}>
        <TouchableOpacity style={styles.imageBackground} onPress={() => ChangeCompany(FirstClass)}>
          <Text>E</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.classBoxes}>
        <TouchableOpacity style={styles.imageBackground} onPress={() => ChangeCompany(SecondClass)}>
          <Text>F</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.classBoxes}>
        <TouchableOpacity style={styles.imageBackground} onPress={() => ChangeCompany(ThirdClass)}>
          <Text>G</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.classBoxes}>
        <TouchableOpacity style={styles.imageBackground} onPress={() => ChangeCompany(FourthClass)}>
          <Text>H</Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}



function AppThemeOptions() {

}



function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ClassOptions />
      <CompanyOptions />
      <AppThemeOptions />
    </SafeAreaView>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    width: dim.width,
  },
  classContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: dim.height * 0.20,
    width: dim.width,
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  classBoxes: {
    width: dim.width * 0.20,
    height: dim.width * 0.20,
    backgroundColor: 'green',
    justifyContent: 'center'

  },
  imageBackground: {
    backgroundColor: 'yellow',
    justifyContent: 'center',
  },
  companyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: dim.width * 0.5,
    width: dim.width,
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  companyBoxes: {
    width: dim.width * 0.20,
    height: dim.width * 0.20,
    backgroundColor: 'green',
    justifyContent: 'center'

  },
})