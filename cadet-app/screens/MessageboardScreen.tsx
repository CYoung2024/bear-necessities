import React, { useState, useEffect } from "react";
import { SafeAreaView, View, StyleSheet, Text, Pressable, ScrollView, TextInput } from "react-native";
import { auth } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { TouchableWithoutFeedback } from "react-native";
import { TouchableOpacity } from "react-native";

const db = firebase.firestore();

const MessageBoardScreen = () => {
  
  const [currentTab, setCurrentTab] = useState("Threads");
  const [currentThread, setCurrentThread] = useState(null);
  const [threads, setThreads] = useState([]);
  const [threadInput, setThreadInput] = useState("");
  const [threadMessages, setThreadMessages] = useState([]);
  
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
     
    });
  
    const unsubscribeSnapshot = db
      .collection("threads")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setThreads(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
  
    return () => {
      unsubscribeAuth();
      unsubscribeSnapshot();
    };
  }, []);
  
  const addThread = () => {
    const threadName = prompt("Enter the name of the thread");
    if (threadName && threadName !== "") {
      const threadId = threadName.toLowerCase().replace(/\s/g, "-");
      db.collection("threads")
        .doc(threadId)
        .set({
          name: threadName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          console.log(`Thread "${threadName}" created with ID "${threadId}".`);
        })
        .catch((error) => {
          console.error(`Error creating thread "${threadName}": ${error}`);
        });
    }
  };

  const addThreadMessage = () => {
    if (threadInput.trim()) {
      db.collection("threads")
        .doc(currentThread)
        .collection("messages")
        .add({
          sender: auth.currentUser.displayName,
          text: threadInput,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
      setThreadInput("");
    }
  };

  const renderThreads = () => {
    const selectThread = (threadId) => {
      setCurrentThread(threadId);
      db.collection("threads")
        .doc(threadId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setThreadMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        });
    };

    return (
      <ScrollView>
        {threads.map((thread) => (
          <Pressable
            key={thread.id}
            style={[
              styles.chatListItem,
              currentThread === thread.id && styles.activeChatListItem
            ]}
            onPress={() => selectThread(thread.id)}
          >
            <Text
              style={[
                styles.chatListItemText,
                currentThread === thread.id && styles.activeChatListItemText
              ]}
            >
              {thread.name}
            </Text>
            <Text style={styles.threadTimestamp}>
              {new Date(thread.timestamp?.toDate()).toLocaleString()}
            </Text>
          </Pressable>
        ))}
        <Pressable style={styles.newThreadButton} onPress={addThread}>
          <View style={styles.gradient}>
            <View style={styles.blue} />
            <View style={styles.orange} />
          </View>
          <Text style={styles.newThreadButtonText}>New        Thread</Text>
        </Pressable>
      </ScrollView>
    );
  };

  const renderCurrentThread = () => {
    if (currentThread) {
      return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {threadMessages.map((message) => (
            <View key={message.id} style={styles.messageContainer}>
              <View
                style={[
                  styles.messageBubble,
                  message.sender === auth.currentUser.displayName &&
                  styles.currentUserMessageBubble
                ]}
              >
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
              <Text style={styles.messageSender}>{message.sender}</Text>
            </View>
          ))
          }
          <View style={styles.messageInputContainer}>
            <TextInput
              style={styles.messageInput}
              placeholder="Type a message..."
              value={threadInput}
              onChangeText={(text) => setThreadInput(text)}
              onSubmitEditing={addThreadMessage}
              blurOnSubmit={false}
            />
            <TouchableOpacity onPress={addThreadMessage}>
              <Text style={styles.sendMessageButton}>Send</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.noThreadSelectedContainer}>
          <Text style={styles.noThreadSelectedText}>
            No thread selected. Please select a thread to view messages.
          </Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableWithoutFeedback onPress={() => setCurrentTab("Threads")}>
          <View
            style={[
              styles.tabItem,
              currentTab === "Threads" && styles.activeTabItem
            ]}
          >
            <Text
              style={[
                styles.tabItemText,
                currentTab === "Threads" && styles.activeTabItemText
              ]}
            >
              Threads
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setCurrentTab("Contacts")}>
          <View
            style={[
              styles.tabItem,
              currentTab === "Contacts" && styles.activeTabItem
            ]}
          >
            <Text
              style={[
                styles.tabItemText,
                currentTab === "Contacts" && styles.activeTabItemText
              ]}
            >
              Contacts
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {currentTab === "Threads" ? renderThreads() : null}
      {currentTab === "Contacts" ? <Text>Contacts Screen</Text> : null}
      {renderCurrentThread()}
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15
  },
  activeTabItem: {
    borderBottomColor: "#1a73e8",
    borderBottomWidth: 2
  },
  tabItemText: {
    color: "#ccc"
  },
  activeTabItemText: {
    color: "#1a73e8"
  },
  chatListItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff"
  },
  activeChatListItem: {
    backgroundColor: "#f0f0f0"
  },
  chatListItemText: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
    color: "#333"
  },
  activeChatListItemText: {
    color: "#1a73e8"
  },
  threadTimestamp: {
    fontSize: 12,
    color: "#666"
  },
  newThreadButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 30,
    marginBottom: 20,
    overflow: "hidden",
    width: "100%",
  },

  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  blue: {
    backgroundColor: "#1a73e8",
    height: "100%",
    width: "50%",
  },

  orange: {
    backgroundColor: "#FFA500",
    height: "100%",
    width: "50%",
  },

  newThreadButtonText: {
    color: "#2F4F4F",
    fontSize: 32,
    fontWeight: "bold",
    zIndex: 1,
  },

  messageContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  messageBubble: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    marginRight: 10
  },
  currentUserMessageBubble: {
    backgroundColor: "#1a73e8"
  },
  messageText: {
    fontSize: 16,
    color: "#333"
  },
  messageSender: {
    fontSize: 12,
    color: "#666",
    marginTop: 5
  },
  messageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderTopColor: "#ccc",
    borderTopWidth: StyleSheet.hairlineWidth
  },
  messageInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 20,
    marginRight: 10
  },
  sendMessageButton: {
    color: "#1a73e8",
    fontWeight: "bold"
  },
  noThreadSelectedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  noThreadSelectedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333"
  },
  scrollContent: {},
});

export default MessageBoardScreen;

