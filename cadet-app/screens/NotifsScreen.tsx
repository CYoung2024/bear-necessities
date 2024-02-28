import React, { useEffect, useState, useRef } from "react";
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
import { useContext } from "react";
import { TokenContext } from "../contextToken";
import { MessageListContext } from "../contextMessageList";

// Reads dimensions of screen for image/button scaling
let dim = Dimensions.get("window");

const NotifsScreen = (navigation) => {
  const scrollViewRef = useRef();
  const [loading, setLoading] = useState(true);
  const token = useContext(TokenContext);
  const messageList = useContext(MessageListContext);

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
        <ScrollView 
        style={styles.scrollView}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}>
          {loading ? (
            <Text>No current messages :/</Text>
          ) : (
            messageList.map((item, index) => (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    backgroundColor: "white",
  },
  scrollView: {
    marginTop: 20,
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