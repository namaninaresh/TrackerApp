import React from "react";
import { View, Text, SafeAreaView } from "react-native";

const SettingsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Settings Screen</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
