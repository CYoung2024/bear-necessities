import React, { useEffect, useState, useRef } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { TokenContext } from "../contextToken";
import { MessageListContext } from "../contextMessageList";
import * as MyAzureFunctions from "../azureFunctions";

// Reads dimensions of screen for image/button scaling
let dim = Dimensions.get("window");

const NotifsScreen = (navigation) => {
  const messageList = useContext(MessageListContext);
  const token = useContext(TokenContext);

  const scrollViewRef = useRef();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [newMessages, setNewMessages] = useState(messageList)

  const onRefresh = React.useCallback( async () => {
    setRefreshing(true);
    console.log("Refreshing Messages");

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

    <View style={styles.header}/>

    <View style={styles.belowHeader}>
        <ScrollView 
          style={styles.scrollView}
          ref={scrollViewRef}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onContentSizeChange={
            () => scrollViewRef.current.scrollToEnd({animated: true})
          }
        >
          {loading ? (
            <Text>No current messages :/</Text>
          ) : (
            newMessages.map((item, index) => (
              <View key={index} style={styles.spacer}>
                <View key={index} style={styles.textbox}>
                  <Text key={index} style={styles.acctDispText}>
                    {item.MessageContent}
                    {item.TimeSent}
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    //alignItems: 'center',
  },
  header: {
    height: 40,
    backgroundColor: "white",
  },
  belowHeader: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
  },
  scrollView: {
    //marginTop: 20,
    width: '95%',
  },
  spacer: {
    borderBottomWidth: 10,
    borderBottomColor: "white",
  },
  textbox: {
    display: "flex",
    justifyContent: 'center',
    backgroundColor: "lightblue",
    borderRadius: 18,
    height: 40,
  },
  acctDispText: {
    fontSize: 17,
    padding: 10,
    alignContent: 'stretch',
  },
});

export default NotifsScreen;