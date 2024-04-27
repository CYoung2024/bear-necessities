import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import DialogInput from "react-native-dialog-input";
import { useRoute } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";

import * as MyAzureFunctions from "../azureFunctions";
import DropDownPopupAB from "../functions/NativePopupDropdownAB";
import DropDownPopupOB from "../functions/NativePopupDropdownOB";
import UserInputPopup from "../functions/NativePopupUserInputEx";
import UserInputPopupVerifyLocation from "../functions/NativePopupUserInputVerLLA";
import MyStorage from "../storage";
import { TokenContext } from "../contextToken";
import { StatusContext } from "../contextStatus";

//import AccBuildSelectDialog from '../functions/isAcademicBuildingOptionSelectBox.js'

// Reads dimensions of screen for image/button scaling
let dim = Dimensions.get("window");

const noMapOnWeb = require("../assets/noMap.png");

function AcctScreen() {
  const token = useContext(TokenContext);
  var useMap = Platform.OS !== "web";

  const { cadetCode, saveCadetCode } = MyStorage({
    initialCadetCode: "",
    initialCadetStatus: "",
    initialExpoPushToken: "",
  });

  const mapRef = useRef(null);
  const ChaseHall = [41.37466, -72.100014, 41.372763, -72.101809]; //Verified
  const [deviceLLA, setDeviceLLA] = useState(null);
  const [userInitials, setUserInitials] = useState(null);
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
    console.log("Setting Current Position");
    let location = await Location.getCurrentPositionAsync({});
    console.log("Current Position Set");
    let { latitude, longitude, altitude } = location.coords;
    console.log("Setting DeviceLLA");
    await setDeviceLLA({ latitude, longitude, altitude });
    console.log("DeviceLLA set - setting marker location");
    await setMarkerLocation({ latitude, longitude, altitude });
    console.log("Marker location set");
    if (Platform.OS === "android") {
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
    } else if (Platform.OS === "ios") {
      mapRef.current.animateCamera(
        {
          center: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          heading: 270,
          pitch: 50,
          altitude: 250,
        },
        { duration: 2000 }
      );
    }
    return { latitude, longitude };
  };

  const handlePressIFN = async () => {
    console.log("Getting Location");
    // TODO: loading animation and don't let them spam click while awaiting
    setIFNLoading(true);
    const { latitude, longitude } = await handleGetLocation();
    setIFNLoading(false);
    console.log("Got Location");
    if (
      latitude < ChaseHall[0] &&
      latitude > ChaseHall[2] &&
      longitude < ChaseHall[1] &&
      longitude > ChaseHall[3]
    ) {
      console.log("Location Verified w GPS - setting IFN");
      await setCadetStatus("IFN");
      console.log("IFN Set");
      setLoading(false);
      MyAzureFunctions.call_writeCadetStatus(token, cadetCode, "IFN");
    } else {
      console.log("Request User Verification");
      setVerifyLocationInputVisible(true);
    }
  };

  const [loading, setLoading] = useState(false);
  const [IFNloading, setIFNLoading] = useState(false);
  const tempStatus = useContext(StatusContext);
  useEffect(() => {
    setCadetStatus(tempStatus);
  }, [tempStatus]);

  const [cadetStatus, setCadetStatus] = useState("");
  const [isExcusalInputVisible, setExcusalInputVisible] = useState(false);
  const [isVerifyLocationInputVisible, setVerifyLocationInputVisible] =
    useState(false);
  const [isAcBuildSelectDialogVisible, setAcBuildSelectDialogVisible] =
    useState(false);
  const [isOffBaseSelectDialogVisible, setOffBaseSelectDialogVisible] =
    useState(false);

  useEffect(() => {
    const stopLoading = async () => {
      await setLoading(false);
    };
    stopLoading();
  }, [cadetStatus]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Accountability</Text>
      </View>

      <View style={styles.belowHeader}>
        <View style={styles.mapContainer}>
          {useMap ? (
            <MapView
              //provider={PROVIDER_GOOGLE}
              ref={mapRef}
              pitchEnabled={true}
              mapType={"standard"}
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
          ) : (
            <Image
              style={styles.noMapImage}
              source={noMapOnWeb}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={styles.belowMapContainer}>
          <View style={styles.currentStatusContainer}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.largeText}
            >
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
                }}
              >
                <Text style={styles.smallText}>Barracks Sign-out</Text>
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
                  handlePressIFN();
                }}
              >
                {!IFNloading ? (
                  <Text style={styles.largeText}>IFN</Text>
                ) : (
                  <ActivityIndicator size="large" color="#000000" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <UserInputPopup
              modalVisible={isExcusalInputVisible}
              setModalVisible={setExcusalInputVisible}
              title={"Where Ya Headed?"}
              message={
                "Type in the box below if you are on an excusal, have a CS event, or are just going on an offbase run"
              }
              buttons={[
                {
                  text: "Cancel",
                  func: () => {
                    setLoading(false);
                  },
                },
                {
                  text: "OK",
                },
              ]}
              saveCadetStatus={setCadetStatus}
              tokenForFunc={token}
              cadetCodeForFunc={cadetCode}
            />
          </View>

          <View>
            <UserInputPopupVerifyLocation
              modalVisible={isVerifyLocationInputVisible}
              setModalVisible={setVerifyLocationInputVisible}
              title={"Something's not right!"}
              message={
                "Your location is not within Chase Hall. Please type your initials in the box below to override and confirm you are IFN."
              }
              buttons={[
                {
                  text: "Cancel",
                  func: () => {
                    setLoading(false);
                  },
                },
                {
                  text: "OK",
                },
              ]}
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
                message={"Choose which building you will be hanging out in"}
                buttons={[
                  {
                    text: "Cancel",
                    func: () => {
                      setLoading(false);
                    },
                  },
                  {
                    text: "OK",
                  },
                ]}
                saveCadetStatus={setCadetStatus}
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
              buttons={[
                {
                  text: "Cancel",
                  func: () => {
                    setLoading(false);
                  },
                },
                {
                  text: "OK",
                },
              ]}
              saveCadetStatus={setCadetStatus}
              tokenForFunc={token}
              cadetCodeForFunc={cadetCode}
            />
          </View>
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
  header: {
    height: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  belowHeader: {
    flex: 1,
    flexDirection: "column",
  },
  mapContainer: {
    flex: 12,
    width: dim.width * 1.0,
    borderRadius: 20,
  },
  belowMapContainer: {
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "wrap",
    flex: 5,
    justifyContent: "center",
    width: "100%",
  },
  currentStatusContainer: {
    alignItems: "center",
    backgroundColor: "#F0F1F5",
    flex: 1,
    justifyContent: "center",
    width: "100%",
    borderTopColor: "grey",
    borderTopWidth: 2,
  },
  buttonContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    flex: 3,
    justifyContent: "center",
    padding: 5,
    backgroundColor: "#F0F1F5",
    width: "100%",
  },
  leftButtonContainer: {
    flex: 1,
    gap: 5,
    justifyContent: "center",
    height: "100%",
  },
  rightButtonContainer: {
    flex: 1,
    height: "100%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#C1C5D5",
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
    fontSize: 35,
    fontWeight: "bold",
  },
  noMapImage: {
    height: "100%",
    width: "100%",
  },
});
