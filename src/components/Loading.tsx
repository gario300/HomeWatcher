import React from "react";
import { View, ActivityIndicator } from "react-native";

export default function () {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* This text using ubuntu font */}
      <ActivityIndicator size="large" color={'blue'} />
    </View>
  );
}
