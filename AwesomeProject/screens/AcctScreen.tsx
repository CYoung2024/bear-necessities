import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DialogInput from 'react-native-dialog-input';

import DropDownPopupAB from "../functions/NativePopupDropdownAB";
import DropDownPopupOB from "../functions/NativePopupDropdownOB";
import UserInputPopup from "../functions/NativePopupUserInputEx";
import MyStorage from "../storage";

//import AccBuildSelectDialog from '../functions/isAcademicBuildingOptionSelectBox.js'

// Reads dimensions of screen for image/button scaling
let dim = Dimensions.get("window");



function MapArea() {
  return (
    <View style={styles.mapContainer} />
  )
}



function ButtonArea() {

  const { cadetStatus, saveCadetStatus } = MyStorage(
    {
      initialCadetStatus: "Not Signed In",
    }
  );


  
  const [isExcusalInputVisible, setExcusalInputVisible] = useState(false);
  const [isAcBuildSelectDialogVisible, setAcBuildSelectDialogVisible] = useState(false);
  const [isOffBaseSelectDialogVisible, setOffBaseSelectDialogVisible] = useState(false);


  
  return (
    <View style={styles.belowMapContainer}>

      <View style={styles.currentStatusContainer}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={styles.largeText}
        >
          Status: {cadetStatus}
        </Text>
      </View>

      <View style={styles.buttonContainer}>

        <View style={styles.leftButtonContainer}>

          <TouchableOpacity
            style={styles.button}
            onPress={() => { setOffBaseSelectDialogVisible(true) }}
          >
            <Text style={styles.smallText}>Liberty/Leave</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.button}
            onPress={() => { setExcusalInputVisible(true) }}
          >
            <Text style={styles.smallText}>Excusal</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.button}
            onPress={() => { setAcBuildSelectDialogVisible(true) }}
          >
            <Text style={styles.smallText}>Academic Building</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.rightButtonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              alert("Signing In For the Night"),
                saveCadetStatus("IFN")
                console.log("cadetStatus=IFN")
            }}
          >
            <Text style={styles.smallText}>Sign</Text>
            <Text style={styles.largeText}>IFN</Text>
          </TouchableOpacity>
        </View>

      </View>
{/* 
      <DialogInput
        isDialogVisible={isExcusalInputVisible}
        title={"Which Excusal?"}
        message={"Only type in the name of the club or event"}
        hintInput={"IEEE Morale Party"}
        submitInput={(inputText) => {
          saveCadetStatus(inputText)
          setExcusalInputVisible(false)
          console.log("cadetStatus=" + inputText)
        }}
        closeDialog={() => { setExcusalInputVisible(false) }}
      /> */}



      <View style={styles.centeredView}>
        <UserInputPopup
          modalVisible={isExcusalInputVisible}
          setModalVisible={setExcusalInputVisible}
          title={"Which Excusal?"}
          message={"Only type in the name of the club or event"}
          buttons={['OK', 'Cancel']}
          setCadetStatus={saveCadetStatus}
        />
      </View>



      <View style={styles.centeredView}>
        <DropDownPopupAB
          modalVisible={isAcBuildSelectDialogVisible}
          setModalVisible={setAcBuildSelectDialogVisible}
          title={'Accademic Building'}
          message={'Choose which building you will be spending all night in'}
          buttons={['OK', 'Cancel']}
        />
      </View>



      <View style={styles.centeredView}>
        <DropDownPopupOB
          modalVisible={isOffBaseSelectDialogVisible}
          setModalVisible={setOffBaseSelectDialogVisible}
          title={'Liberty Sign-Out'}
          message={'Select your status from the dropdown'}
          buttons={['OK', 'Cancel']}
          
        />
      </View>
    </View>
  )
}



function AcctScreen() {

  const { cadetStatus } = MyStorage({initialCadetStatus: "Not Signed In"});
  useEffect(() => {console.log("Acct " + cadetStatus);}, [cadetStatus]);

  return (
    <View style={styles.container}>
      <MapArea />
      <ButtonArea />
    </View>
  );
}

export default AcctScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  mapContainer: {
    backgroundColor: 'darkgreen',
    height: '75%',
    width: dim.width * 1.0,
  },
  belowMapContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    height: '25%',
    justifyContent: 'center',
    width: dim.width,
  },
  currentStatusContainer: {
    alignItems: 'center',
    backgroundColor: '#DDE4EA',
    height: '25%',
    justifyContent: 'center',
    width: dim.width * 1.0,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    height: '75%',
    justifyContent: 'center',
    padding: 5,
  },
  leftButtonContainer: {
    alignItems: 'even-spacing',
    flex: 1,
    gap: 5,
    justifyContent: 'center',
  },
  rightButtonContainer: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderColor: 'darkblue',
    borderRadius: 10,
    borderWidth: 2,
    flex: 1,
    justifyContent: 'center',
  },
  smallText: {
    fontSize: 18,
  },
  largeText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
})