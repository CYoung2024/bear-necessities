import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DialogInput from "react-native-dialog-input";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import * as MyAzureFunctions from "../azureFunctions";
import DropDownPopupAB from "../functions/NativePopupDropdownAB";
import DropDownPopupOB from "../functions/NativePopupDropdownOB";
import UserInputPopup from "../functions/NativePopupUserInputEx";
import MyStorage from "../storage";
import { TokenContext } from "../tokenContext";
import { StatusContext } from "../StatusContext";

//import AccBuildSelectDialog from '../functions/isAcademicBuildingOptionSelectBox.js'

// Reads dimensions of screen for image/button scaling
let dim = Dimensions.get("window");

function AcctScreen() {
  const token = useContext(TokenContext);

  const { cadetCode, saveCadetCode } = MyStorage({
    initialCadetCode: "",
    initialCadetStatus: "",
    initialExpoPushToken: "",
  });

  
  const mapRef = useRef(null);
  const [deviceLLA, setDeviceLLA] = useState(null);
  const [userLocation, setuserLocation] = useState(null);
  const [markerLocation, setMarkerLocation] = useState({
    latitude: 0,
    longitude: 0,
    altitude: 0,
  });

   
  const handleGetLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("I can't tell where you are...");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    let { latitude, longitude, altitude } = location.coords;
    setDeviceLLA({ latitude, longitude, altitude });
    setMarkerLocation({ latitude, longitude, altitude });
    mapRef.current.animateCamera(
      {
        center: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        heading: 270,
        pitch: 60,
        zoom: 18.5,
      },
      { duration: 2000 }
    );
  };


  const [loading, setLoading] = useState(false);
  const tempStatus = useContext(StatusContext);
  useEffect(() => {
    setCadetStatus(tempStatus);
  }, [tempStatus]);



  const [cadetStatus, setCadetStatus] = useState("");
  const [isExcusalInputVisible, setExcusalInputVisible] = useState(false);
  const [isAcBuildSelectDialogVisible, setAcBuildSelectDialogVisible] =
    useState(false);
  const [isOffBaseSelectDialogVisible, setOffBaseSelectDialogVisible] =
    useState(false);




  useEffect(() => {
    const stopLoading = async () => {
      await setLoading(false);
      console.log("setloading = " + loading);
      console.log(cadetStatus);
    };
    stopLoading();
  }, [cadetStatus]);



  return (
    <View style={styles.container}>




      {/* <MapArea /> */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          pitchEnabled={true}
          mapType={"satellite"}
          showsBuildings={true}
          style={{
            alignSelf: "stretch",
            height: "100%",
          }}
          initialRegion={{
            latitude: 41.37354686499106,
            longitude: -72.10071999095653,
            latitudeDelta: 0.007,
            longitudeDelta: 0.01,
          }}
        >
        <Marker title="My Location" coordinate={markerLocation} />
        </MapView>
      </View>





      {/* <ButtonArea /> */}
      <View style={styles.belowMapContainer}>
        <View style={styles.currentStatusContainer}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.largeText}>
            Status: {loading ? "loading..." : cadetStatus}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.leftButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setOffBaseSelectDialogVisible(true);
                setLoading(true);
                setMarkerLocation({
                  latitude: 0,
                  longitude: 0,
                  altitude: 0,
                });
                console.log("setloading = " + loading);
              }}
            >
              <Text style={styles.smallText}>Liberty/Leave</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setExcusalInputVisible(true);
                setLoading(true);
                setMarkerLocation({
                  latitude: 0,
                  longitude: 0,
                  altitude: 0,
                });
                console.log("setloading = " + loading);
              }}
            >
              <Text style={styles.smallText}>Excusal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setAcBuildSelectDialogVisible(true);
                setLoading(true);
                setMarkerLocation({
                  latitude: 0,
                  longitude: 0,
                  altitude: 0,
                });
              }}
            >
              <Text style={styles.smallText}>Academic Building</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rightButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                alert("Signing In For the Night");
                setCadetStatus("IFN");
                MyAzureFunctions.call_writeCadetStatus(
                  token,
                  cadetCode,
                  cadetStatus
                );
                handleGetLocation();
                console.log("cadetStatus=IFN");
              }}
            >
              <Text style={styles.smallText}>Sign</Text>
              <Text style={styles.largeText}>IFN</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <UserInputPopup
            modalVisible={isExcusalInputVisible}
            setModalVisible={setExcusalInputVisible}
            title={"Which Excusal?"}
            message={"Only type in the name of the club or event"}
            buttons={["OK", "Cancel"]}
            saveCadetStatus={setCadetStatus}
            tokenForFunc={token}
            cadetCodeForFunc={cadetCode}
          />
        </View>

        <View>
          <TokenContext.Provider value={token}>
            <DropDownPopupAB
              modalVisible={isAcBuildSelectDialogVisible}
              setModalVisible={setAcBuildSelectDialogVisible}
              title={"Accademic Building"}
              message={
                "Choose which building you will be spending all night in"
              }
              buttons={["OK", "Cancel"]}
              saveCadetStatus={setCadetStatus}
              //tokenForFunc={token}
              cadetCodeForFunc={cadetCode}
            />
          </TokenContext.Provider>
        </View>

        <View>
          <DropDownPopupOB
            modalVisible={isOffBaseSelectDialogVisible}
            setModalVisible={setOffBaseSelectDialogVisible}
            title={"Liberty Sign-Out"}
            message={"Select your status from the dropdown"}
            buttons={["OK", "Cancel"]}
            saveCadetStatus={setCadetStatus}
            tokenForFunc={token}
            cadetCodeForFunc={cadetCode}
          />
        </View>
      </View>
    </View>
  );
}

export default AcctScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  mapContainer: {
    backgroundColor: "darkgreen",
    height: "75%",
    width: dim.width * 1.0,
  },
  belowMapContainer: {
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "wrap",
    height: "25%",
    justifyContent: "center",
    width: dim.width,
  },
  currentStatusContainer: {
    alignItems: "center",
    backgroundColor: "#DDE4EA",
    height: "25%",
    justifyContent: "center",
    width: dim.width * 1.0,
  },
  buttonContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    height: "75%",
    justifyContent: "center",
    padding: 5,
  },
  leftButtonContainer: {
    //alignItems: 'even-spacing',
    flex: 1,
    gap: 5,
    justifyContent: "center",
  },
  rightButtonContainer: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "lightblue",
    borderColor: "darkblue",
    borderRadius: 10,
    borderWidth: 2,
    flex: 1,
    justifyContent: "center",
  },
  smallText: {
    fontSize: 18,
  },
  largeText: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
