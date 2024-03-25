import React, { useEffect, useState, useRef } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment-timezone";
import { useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { TokenContext } from "../contextToken";
import { MessageListContext } from "../contextMessageList";
import * as MyAzureFunctions from "../azureFunctions";

// Reads dimensions of screen for image/button scaling
let dim = Dimensions.get("window");

function convertTime(original: string): string {
  const est = moment(original).tz("America/New_York"); // maybe pull time zone from device
  const newTime = est.format("Do HH:mm");
  return newTime;
}

const NotifsScreen = (navigation) => {
  const messageList = useContext(MessageListContext);
  const token = useContext(TokenContext);

  const scrollViewRef = useRef();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [newMessages, setNewMessages] = useState(messageList);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const messageListUpdated = await MyAzureFunctions.call_readCompanyMessages(
      token,
      "Alfa"
    );

    setNewMessages(messageListUpdated);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const stopLoading = async () => {
      if (messageList.length > 0) {
        setLoading(false);
      }
    };
    stopLoading();
  }, [messageList]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>OOD Notifications</Text>
      </View>
      <View style={styles.belowHeader}>
        <LinearGradient
          colors={["rgba(256,256,256,0.9)", "transparent"]}
          style={styles.gradient}
        >
          <ScrollView
            style={styles.scrollView}
            ref={scrollViewRef}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
          >
            {loading ? (
              <Text>No current messages :/</Text>
            ) : (
              newMessages.map((item, index) => (
                <View key={index} style={styles.spacer}>
                  <View key={index} style={styles.textbox}>
                    <Text key={`content-${index}`} style={styles.acctDispText}>
                      {item.MessageContent}
                    </Text>
                    <Text key={`time-${index}`} style={styles.acctDispText2}>
                      {convertTime(item.TimeSent)}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </LinearGradient>
      </View>
    </View>
  );
};

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
    backgroundColor: "lightgrey",
    alignItems: "center",
  },
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  scrollView: {
    width: "95%",
  },
  spacer: {
    borderBottomWidth: 10,
    borderBottomColor: "transparent",
  },
  textbox: {
    flexDirection: "row",
    backgroundColor: "lightblue",
    borderRadius: 25,
    flexWrap: "wrap",
    padding: 11,
    justifyContent: "flex-end",
  },
  acctDispText: {
    fontSize: 17,
    alignContent: "flex-start",
    width: "100%",
  },
  acctDispText2: {
    fontSize: 12,
    alignContent: "flex-end",
    textAlign: "right",
  },
});

export default NotifsScreen;
