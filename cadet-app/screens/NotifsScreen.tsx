import React, { useEffect, useState } from "react";
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
import { TokenContext } from "../tokenContext";
import { MessageListContext } from "../messageListContext";

// Reads dimensions of screen for image/button scaling
let dim = Dimensions.get("window");

const HEADER_MAX_HEIGHT = dim.height * 0.6;
const HEADER_MIN_HEIGHT = 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const NotifsScreen = (navigation) => {
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
    <View style={styles.fill}>
      <ScrollView style={styles.fill} scrollEventThrottle={16}>
        <ScrollView style={styles.scrollViewer}>
          {loading ? (
            <Text>No current messages :/</Text>
          ) : (
            messageList.map((item, index) => (
              <View key={index} style={styles.touchName}>
                <Text key={index} style={styles.acctDispText}>
                  {item.MessageContent} {item.TimeSent}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  MessageCountAreaContainer: {
    height: "100%",
  },
  behindMessageCountArea: {
    height: HEADER_MAX_HEIGHT,
  },
  ConversationAreaContainer: {
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "wrap",
    height: "100%",
    justifyContent: "center",
  },
  ConversationContainer: {
    height: 75,
    backgroundColor: "white",
    borderTopColor: "lightgrey",
    borderTopWidth: 1,
    width: dim.width,
  },
  ConversationCoverText: {
    fontSize: 32,
    color: "black",
  },
  BottomConversationArea: {
    height: dim.height,
    backgroundColor: "white",
    borderTopColor: "lightgrey",
    borderTopWidth: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  bar: {
    backgroundColor: "white",
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
    marginTop: HEADER_MAX_HEIGHT,
  },
});

export default NotifsScreen;
