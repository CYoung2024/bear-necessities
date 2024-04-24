import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { DrawerActions } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, Card, Button, Icon } from "@rneui/themed";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

// Reads dimensions of screen for image/button scaling
let dim = Dimensions.get("window");

const USCGALogo = require("../assets/icon.png");
const CircleList = require("../assets/list-circle-sharp.svg");

const DashboardScreen = ({ navigation }) => {
  var useMap = Platform.OS !== "web";
  const mapRef = useRef(null);
  const [markerLocation, setMarkerLocation] = useState({
    latitude: 0,
    longitude: 0,
    altitude: 0,
  });

  const PlanOfTheDay = `
  RESEARCH AND SYMPOSIUM DAY

  0600-0730: Buffet Breakfast
  0740: Morning Formation
  0750: Welcome and Intro
  0800: ML/Deep Learning for Cyber Wargaming
  0830: Embedded Systems Security
  0900: Break
  0915: Passive Accoustic Tracking and Classification
  0945: Intelligent Hybrid Power Plant
  1015: Break
  1030: Cadet Accountability
  1205: Afternoon Formation   
  1210: Family Style Lunch   
  1250-1540: Afternoon Classes
  2300: Taps
  `;

  const commonPeople = `  Command:
  Medical:
  Facilities:

  Front Office:
  Base Police:
  IT Help Desk:
  `;

  const commonNumbers = `  (734) 366-2633
  (354) 633-4225
  (763) 322-4548

  (432) 123-4567
  (987) 314-1592
  (656) 271-8281
  `;

  type CardsComponentsProps = {};

  return (
    <View style={styles.Container}>
      <LinearGradient
        colors={["rgba(256,256,256,1.3)", "transparent"]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={styles.drawerButton}>
            <TouchableOpacity
              style={styles.circleIcon}
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}
            >
              <Ionicons name={"list-circle-sharp"} size={40} color={"#000"} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerText}>Dashboard</Text>
          <View style={styles.whiteSpace}></View>
        </View>

        <View style={styles.belowHeader}>
          <ScrollView style={styles.ScrollViewContainer}>
            <View style={styles.container}>
              <Card>
                <Card.Title h2>POD - 22May2024</Card.Title>
                <Card.Divider />
                <Text style={styles.ContentMicroText}>{PlanOfTheDay}</Text>
                <Text h4>
                  This isn't a real POD, but this feature could be added in the
                  future!
                </Text>
              </Card>
              <Card>
                <Card.Title h3>1100 Trainings</Card.Title>
                <Card.Divider />
                <Text style={styles.ContentMicroText}>
                  1/c - Trainings could be listed here {"\n"}
                  2/c - With locations included (Dimick) {"\n"}
                  3/c - Or Pressable links to
                  <Text
                    onPress={() => {
                      alert("Online Trainings");
                    }}
                    style={{ color: "#00F" }}
                  >
                    {" "}
                    Online Trainings
                  </Text>{" "}
                  {"\n"}
                  4/c - Updated Conduct System Brief (Leamy)
                </Text>
              </Card>
              <Card>
                <Card.Title>Quick Contacts</Card.Title>
                <Card.Divider />
                <View style={styles.InteriorContainer}>
                  <Text style={styles.ContentSmallTextRight}>
                    {commonPeople}
                  </Text>
                  <Text style={styles.ContentSmallTextLeft}>
                    {commonNumbers}
                  </Text>
                </View>
              </Card>

              {/* <Card containerStyle={{ marginTop: 15 }}>
                <Card.Title>FONTS</Card.Title>
                <Card.Divider />
                <Text style={styles.fonts} h1>
                  h1 Heading
                </Text>
                <Text style={styles.fonts} h2>
                  h2 Heading
                </Text>
                <Text style={styles.fonts} h3>
                  h3 Heading
                </Text>
                <Text style={styles.fonts} h4>
                  h4 Heading
                </Text>
                <Text style={styles.fonts}>Normal Text</Text>
              </Card> */}

              <Card>
                <Card.Title>Libo Bus Tracker</Card.Title>
                <Card.Divider />
                <View style={{ height: 150 }}>
                  {useMap ? (
                    <MapView
                      provider={PROVIDER_GOOGLE}
                      ref={mapRef}
                      pitchEnabled={true}
                      mapType={"standard"}
                      showsBuildings={true}
                      style={{
                        alignSelf: "stretch",
                        height: "100%",
                      }}
                      initialRegion={{
                        latitude: 41.371309,
                        longitude: -72.102227,
                        latitudeDelta: 0.007,
                        longitudeDelta: 0.01,
                      }}
                    >
                      <Marker title="My Location" coordinate={markerLocation} />
                    </MapView>
                  ) : (
                    <View></View>
                  )}
                </View>
                <Card.Divider />

                <Text style={{ marginBottom: 10 }}>
                  With future development, this tile could be used to find the
                  libo bus for underclass on the weekends using a little GPS
                  module and microcontroller.
                </Text>
                <Button
                  icon={
                    <Icon
                      name="code"
                      color="#ffffff"
                      iconStyle={{ marginRight: 10 }}
                    />
                  }
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    backgroundColor: "#051657",
                  }}
                  title="Find Libo Bus"
                  onPress={() => {
                    setMarkerLocation({
                      latitude: 41.377243,
                      longitude: -72.15001,
                      altitude: 0,
                    });
                    if (Platform.OS === "android") {
                      mapRef.current.animateCamera(
                        {
                          center: {
                            latitude: 41.377243,
                            longitude: -72.15001,
                          },
                          heading: 210,
                          pitch: 60,
                          zoom: 18,
                        },
                        { duration: 2000 }
                      );
                    } else if (Platform.OS === "ios") {
                      mapRef.current.animateCamera(
                        {
                          center: {
                            latitude: 41.377243,
                            longitude: -72.15001,
                          },
                          heading: 214,
                          pitch: 50,
                          altitude: 250,
                        },
                        { duration: 2000 }
                      );
                    }
                  }}
                />
              </Card>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#051657",
  },
  header: {
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  drawerButton: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  circleIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  whiteSpace: {
    height: 50,
    width: 50,
    backgroundColor: "transparent",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  belowHeader: {
    flex: 1,
    alignItems: "center",
  },
  gradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  ScrollViewContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  ContentAreaContainer: {
    alignItems: "center",
    flexDirection: "column",
    //backgroundColor: "white",
  },
  GapBetweenContentContainers: {
    height: dim.width * 0.025,
  },
  SmallContentContainer: {
    backgroundColor: "#f7f7f7",
    borderColor: "lightgrey",
    borderWidth: 5,
    borderRadius: 10,
    width: dim.width * 0.95,
    justifyContent: "center",
    alignItems: "center",
  },
  InteriorContainer: {
    flexDirection: "row",
    display: "flex",
  },
  ContentLargeText: {
    fontSize: 40,
    color: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  ContentSmallTextRight: {
    fontSize: 25,
    textAlign: "right",
    color: "black",
    display: "flex",
  },
  ContentSmallTextLeft: {
    fontSize: 25,
    textAlign: "left",
    color: "black",
    display: "flex",
  },
  ContentTinyText: {
    fontSize: 15,
    color: "black",
  },
  ContentMicroText: {
    fontSize: 15,
    color: "black",
  },

  container: {
    flex: 1,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default DashboardScreen;
