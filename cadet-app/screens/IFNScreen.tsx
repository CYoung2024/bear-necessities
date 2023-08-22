import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import { doc, setDoc } from "firebase/firestore";
import { auth, app } from "../firebase";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";

import MyStorage from "../storage";
import MyFirebaseFunctions from "../firebaseFunctions";
import { updateCurrentUser } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IFNScreen = ({ navigation }) => {
  const { company, year, cadetStatus, saveCadetStatus, loadValues } = MyStorage(
    {
      initialCompany: "",
      initialYear: "",
      initialCadetStatus: "",
    }
  );
  const { updateAccountabilityFirestore } = MyFirebaseFunctions();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const asyncWrap = async () => {
        loadValues();
      };
      asyncWrap();
    });
    return unsubscribe;
  }, [navigation]);

  // BuildingName = [Northest, Eastest, Southest, Westest];
  const mapRef = useRef(null);
  const ChaseHall = [41.37466, -72.100014, 41.372763, -72.101809]; //Verified
  const SmithHall = [41.376184, -72.100204, 41.375654, -72.100783]; //Verified
  const SattHall = [41.371822, -72.100802, 41.370985, -72.101824]; //Verified
  const MacHall = [41.372731, -72.09956, 41.37173, -72.100392]; //Verified
  const [userAcct, setuserAcct] = useState("Not Acct For");
  const [markerLocation, setMarkerLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [deviceLLA, setDeviceLLA] = useState(null);
  const [userLocation, setuserLocation] = useState(null);
  const handleGetLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("I can't tell where you are...");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    let { latitude, longitude, altitude } = location.coords;
    setDeviceLLA({ latitude, longitude, altitude });
    // setMarkerLocation({ latitude, longitude, altitude });
    // mapRef.current.animateCamera(
    //   {
    //     center: {
    //       latitude: location.coords.latitude,
    //       longitude: location.coords.longitude,
    //     },
    //     heading: 0,
    //     pitch: 60,
    //     zoom: 18.5,
    //   },
    //   { duration: 2000 }
    // );
  };
  const handleWhereAmI = () => {
    if (deviceLLA === null) {
      alert("Get your location first!");
    } else if (
      deviceLLA.latitude < ChaseHall[0] &&
      deviceLLA.latitude > ChaseHall[2] &&
      deviceLLA.longitude < ChaseHall[1] &&
      deviceLLA.longitude > ChaseHall[3]
    ) {
      setuserLocation("Chase");
      // setuserAcct("IFN");
    } else if (
      deviceLLA.latitude < MacHall[0] &&
      deviceLLA.latitude > MacHall[2] &&
      deviceLLA.longitude < MacHall[1] &&
      deviceLLA.longitude > MacHall[3]
    ) {
      setuserLocation("Mac");
      // setuserAcct("AcBu");
    } else if (
      deviceLLA.latitude < SmithHall[0] &&
      deviceLLA.latitude > SmithHall[2] &&
      deviceLLA.longitude < SmithHall[1] &&
      deviceLLA.longitude > SmithHall[3]
    ) {
      setuserLocation("Smith");
      // setuserAcct("AcBu");
    } else if (
      deviceLLA.latitude < SattHall[0] &&
      deviceLLA.latitude > SattHall[2] &&
      deviceLLA.longitude < SattHall[1] &&
      deviceLLA.longitude > SattHall[3]
    ) {
      setuserLocation("Satterlee");
      // setuserAcct("AcBu");
    } else {
      alert("Looks like you aren't in any Academic Buildings");
    }
  };

  const handleSignAccountability = async () => {
    if (userLocation !== null) {
      saveCadetStatus(userLocation);
      const email = auth.currentUser._delegate.email;
      updateAccountabilityFirestore(email, cadetStatus, year, company);
    } else {
      console.log("where r u");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapBin}>
        {/* <MapView
          ref={mapRef}
          pitchEnabled={true}
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
        </MapView> */}
      </View>
      <View style={styles.buttonBin}>
        <View style={styles.insideButtonBin}>
          <View style={styles.leftSideButtons}>
            <Button title="Get Location" onPress={handleGetLocation} />
            {deviceLLA && (
              <Text>
                {deviceLLA.latitude}, {deviceLLA.longitude}
              </Text>
            )}
          </View>
          <View style={styles.leftSideButtons}>
            <Button title="Where Am I?" onPress={handleWhereAmI} />
            {userLocation && <Text>{userLocation}</Text>}
          </View>
          <View style={styles.leftSideButtons}></View>
        </View>
        <View style={styles.insideButtonBin}>
          <View style={styles.rightSideButtonBin}>
            <Button
              title="SIGN ACCOUNTABILITY"
              style={styles.rightSideButton}
              // https://docs.expo.dev/ui-programming/react-native-styling-buttons/
              onPress={handleSignAccountability}
            />
            {<Text>Database: {cadetStatus}</Text>}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#015289",
    justifyContent: "center",
    alignItems: "center",
  },
  mapBin: {
    width: "100%",
    height: "75%",
  },
  buttonBin: {
    width: "100%",
    height: "25%",
    flexDirection: "row",
    backgroundColor: "black",
  },
  insideButtonBin: {
    width: "50%",
    height: "100%",
    backgroundColor: "#015289",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  leftSideButtons: {
    width: "98%",
    height: "29%",
    borderRadius: 10,
    backgroundColor: "#f0ac1b",
    justifyContent: "center",
    alignItems: "center",
  },
  rightSideButtonBin: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#f0ac1b",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
    padding: 10,
  },
  rightSideButton: {
    width: "100%",
    height: "100%",
  },
});

export default IFNScreen;
