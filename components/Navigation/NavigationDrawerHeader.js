import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
const NavigationDrawerHeader = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Icon name={"menu"} size={24} style={{ paddingLeft: 20 }} />
      </TouchableOpacity>
    </View>
  );
};
const NavigationStackHeader = (props) => {
  const navigateBack = () => {
    props.navigationProps.goBack();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={navigateBack}>
        <Icon name={"chevron-left"} size={30} style={{ paddingLeft: 20 }} />
      </TouchableOpacity>
    </View>
  );
};
export { NavigationDrawerHeader, NavigationStackHeader };
