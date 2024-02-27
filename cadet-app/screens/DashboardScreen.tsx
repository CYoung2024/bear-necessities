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

// Reads dimensions of screen for image/button scaling
let dim = Dimensions.get("window");

const DashboardScreen = ({ navigation }) => {


  return (
    <View style={styles.Container}>

        <ScrollView style={styles.ScrollViewContainer}>

          <View style={styles.ContentAreaContainer}>

            <View style={styles.GapBetweenContentContainers}/>
            <View style={styles.SmallContentContainer}>
              <Text style={styles.ContentLargeText}>Info Card</Text>
            </View>

            <View style={styles.GapBetweenContentContainers}/>
            <View style={styles.SmallContentContainer}>
              <Text style={styles.ContentLargeText}>Info Card</Text>
            </View>

            <View style={styles.GapBetweenContentContainers}/>
            <View style={styles.SmallContentContainer}>
              <Text style={styles.ContentLargeText}>Info Card</Text>
            </View>

            <View style={styles.GapBetweenContentContainers}/>
            <View style={styles.SmallContentContainer}>
              <Text style={styles.ContentLargeText}>Info Card</Text>
            </View>

            <View style={styles.GapBetweenContentContainers}/>
            <View style={styles.SmallContentContainer}>
              <Text style={styles.ContentLargeText}>Info Card</Text>
            </View>

            <View style={styles.GapBetweenContentContainers}/>
            <View style={styles.SmallContentContainer}>
              <Text style={styles.ContentLargeText}>Info Card</Text>
            </View>

            <View style={styles.GapBetweenContentContainers}/>
            <View style={styles.SmallContentContainer}>
              <Text style={styles.ContentLargeText}>Info Card</Text>
            </View>

            <View style={styles.GapBetweenContentContainers}/>
            <View style={styles.SmallContentContainer}>
              <Text style={styles.ContentLargeText}>Info Card</Text>
            </View>

            <View style={styles.GapBetweenContentContainers}/>
            <View style={styles.SmallContentContainer}>
              <Text style={styles.ContentLargeText}>Info Card</Text>
            </View>
          </View>
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "white",
  },
  ScrollViewContainer: {
    display: 'flex',
    backgroundColor: "white",
  },
  ContentAreaContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: "white",
  },
  GapBetweenContentContainers: {
    height: dim.width * 0.025,
  },
  SmallContentContainer: {
    height: 200,
    backgroundColor: 'lightgrey',
    borderColor: "lightgrey",
    borderWidth: 5,
    borderRadius: 10,
    width: dim.width * 0.95,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ContentLargeText: {
    fontSize: 40,
    color: 'black',
  },
});

export default DashboardScreen;
