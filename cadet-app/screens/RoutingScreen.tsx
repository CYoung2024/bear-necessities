import * as React from 'react';
import { Text, View } from 'react-native';

function RouteScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: '95%', height: '95%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'purple' }}>
        <Text style={{ fontSize: 48, color: 'white', }}>WEB INTERFACE</Text>
      </View>
    </View>
  );
}

export default RouteScreen;