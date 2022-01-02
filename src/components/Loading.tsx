import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Button, TextInput, Layout, useTheme } from 'react-native-rapi-ui';

export default function () {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
        height: '100%',
        position: 'absolute'
      }}
    >
      {/* This text using ubuntu font */}
      <ActivityIndicator size="large" color={'blue'} />
    </View>
  );
}
