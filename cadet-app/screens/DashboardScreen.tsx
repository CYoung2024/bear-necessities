import React, { useEffect } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";

// Reads dimensions of screen for image/button scaling
let dim = Dimensions.get("window");

const DashboardScreen = ({ navigation }) => {


  return (
    <View style={styles.container}>

      <View style={styles.WelcomeGreetingContainer}>
        <Text style={styles.ContentLargeText}>
          Good Morning
        </Text>
      </View>
      
      <View style={ styles.scrollViewContainer}>

      <ScrollView style={styles.scrollViewContent}>

        <View style={styles.ConentAreaContainer}>

          <View style={styles.gapBetweenContentContainers} />
          <View style={styles.SmallContentContainer}>
            <Text style={styles.ContentLargeText}>TRAININGS</Text>
          </View>

          <View style={styles.gapBetweenContentContainers} />
          <View style={styles.LargeContentContainer}>
            <Text style={styles.ContentExtraLargeText}>POD</Text>
          </View>

          <View style={styles.gapBetweenContentContainers} />
          <View style={styles.SmallContentContainer}>
            <Text style={styles.ContentSmallText}>Emerency Numbers</Text>
          </View>

          <View style={styles.gapBetweenContentContainers} />
          <View style={styles.SmallContentContainer}>
            <Text style={styles.ContentExtraSmallText}>Work in progress</Text>
          </View>

          <View style={styles.gapBetweenContentContainers} />
          <View style={styles.LargeContentContainer}>
            <Text style={styles.ContentLargeText}>Upcoming Events</Text>
          </View>

          <View style={styles.gapBetweenContentContainers} />
          <View style={styles.LargeContentContainer}>
            <Text style={styles.ContentExtraLargeText}>Work in progress</Text>
          </View>

          <View style={styles.gapBetweenContentContainers} />
          <View style={styles.SmallContentContainer}>
            <Text style={styles.ContentLargeText}>Work in progress</Text>
          </View>

          <View style={styles.gapBetweenContentContainers} />
          <View style={styles.LargeContentContainer}>
            <Text style={styles.ContentSmallText}>Work in progress</Text>
          </View>

          <View style={styles.gapBetweenContentContainers} />
          <View style={styles.LargeContentContainer}>
            <Text style={styles.ContentExtraSmallText}>Work in progress</Text>
          </View>

          <View style={styles.gapBetweenContentContainers} />
        </View>

      </ScrollView>
        
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //backgroundColor: '#DDE4EA',
    flexDirection: "column",
    justifyContent: "center",
  },
  WelcomeGreetingContainer: {
    backgroundColor: "#F4D79A",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20%",
  },
  scrollViewContainer: {
    height: "80%",
    justifyContent: "center",

  },
  ConentAreaContainer: {
    alignItems: "center",
    flexDirection: "column",
    height: "70%",
    justifyContent: "center",
    width: dim.width * 0.95,
  },
  SmallContentContainer: {
    height: 100,
    backgroundColor: "#F7EACB",
    borderColor: "navy",
    borderWidth: 5,
    width: dim.width * 0.95,
    justifyContent: "center",
    alignItems: "center",
  },
  LargeContentContainer: {
    height: 200,
    backgroundColor: "#F8F8E4",
    borderColor: "navy",
    borderWidth: 5,
    width: dim.width * 0.95,
    justifyContent: "center",
    alignItems: "center",
  },
  gapBetweenContentContainers: {
    height: dim.width * 0.025,
  },
  ContentExtraSmallText: {
    fontSize: 10,
    color: "black",
  },
  ContentSmallText: {
    fontSize: 20,
    color: "black",
  },
  ContentLargeText: {
    fontSize: 40,
    color: "black",
  },
  ContentExtraLargeText: {
    fontSize: 80,
    color: "black",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    width: dim.width,
  },
  bar: {
    backgroundColor: "lightblue",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    backgroundColor: "transparent",
    color: "black",
    fontSize: 48,
  },
  scrollViewContent: {
    //marginTop: HEADER_MAX_HEIGHT,

  },
  behindMessageCountArea: {
    //height: HEADER_MAX_HEIGHT,
    alignContent: "center",
    backgroundColor: "lightblue",
  },
  scroller: {
    height: "50%"
  },
});

export default DashboardScreen;
