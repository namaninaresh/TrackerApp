import React from "react";
import { View, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import metrics from "../../theme/metrics";

function HeaderLeft({ navigation }) {
  return (
    <View style={{ backgroundColor: "red" }}>
      <Icon name="angle-left" size={30} color="#1841c7" />
    </View>
  );
}

export default function PageHeader({ navigation, props, name }) {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 5,

          width: metrics.screenWidth / 1.5,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "800" }}>{name}</Text>
      </View>
    </View>
  );
}
//Unused function
function HeaderRight({ navigation }) {
  return (
    <View style={{ marginHorizontal: 10 }}>
      <MaterialCommunityIcons name="cart" size={30} color="#1841c7" />
    </View>
  );
}
