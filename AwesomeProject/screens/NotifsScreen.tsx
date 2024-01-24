import React, { Component } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Reads dimensions of screen for image/button scaling
let dim = Dimensions.get("window");


const HEADER_MAX_HEIGHT = dim.height * .6;
const HEADER_MIN_HEIGHT = 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class MessageCountArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.fill}>

        <ScrollView
          style={styles.fill}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              { nativeEvent: { contentOffset: { y: this.state.scrollY } } }, 
            ],
            {useNativeDriver: false}
            )
          }
        > 

          <View style={styles.behindMessageCountArea} />
          <ConversationArea />

        </ScrollView>


        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <View style={styles.bar}>
            <Text
              style={styles.title}
              adjustsFontSizeToFit
              allowFontScaling
              numberOfLines={1}
            >4 Unread Messages</Text>
          </View>
        </Animated.View>


      </View>
    );
  }
}



function ConversationArea() {
  return (
    <View style={styles.ConversationAreaContainer}>
      <ScrollView>


        <TouchableOpacity style={styles.ConversationContainer}>
          <Text style={styles.ConversationCoverText}>*USER COMPANY* OOD</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ConversationContainer}>
          <Text style={styles.ConversationCoverText}>RCDO</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ConversationContainer}>
          <Text style={styles.ConversationCoverText}>Mailroom</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ConversationContainer}>
          <Text style={styles.ConversationCoverText}>Uniform Shop</Text>
        </TouchableOpacity>

        <View style={styles.BottomConversationArea} />


      </ScrollView>
    </View>
  )
}




function MessagesScreen() {
  return (
    <View style={styles.container}>
      <MessageCountArea />
    </View>
  );
}

export default MessageCountArea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  MessageCountAreaContainer: {
    height: '100%',
  },
  behindMessageCountArea: {
    height: HEADER_MAX_HEIGHT,
  },
  ConversationAreaContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    height: '100%',
    justifyContent: 'center',
  },
  ConversationContainer: {
    height: 75,
    backgroundColor: 'white',
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
    width: dim.width,
  },
  ConversationCoverText: {
    fontSize: 32,
    color: 'black',
  },
  BottomConversationArea: {
    height: dim.height,
    backgroundColor: 'white',
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'black',
    fontSize: 48,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
});