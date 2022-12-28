import React from "react";
import { View, Text, Alert, StyleSheet } from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import colors from "../../theme/colors";
import Icon from "@expo/vector-icons/FontAwesome5";
import { TouchableOpacity } from "react-native-gesture-handler";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
const CustomSidebarMenu = (props) => {
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{ fontSize: 25, color: "#307ecc" }}>
            {"Aaresh Namanis".charAt(0)}
          </Text>
        </View>
        <Text style={stylesSidebar.profileHeaderText}>Naresh Namani</Text>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={({ color }) => (
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="sign-out-alt"
                size={20}
                color={color}
                style={{ paddingRight: 25 }}
              />
              <Text style={{ color: colors.ash6, paddingLeft: 10 }}>
                Logout
              </Text>
            </View>
          )}
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              "Logout",
              "Are you sure? You want to logout?",
              [
                {
                  text: "Cancel",
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: "Confirm",
                  onPress: () => {
                    // AsyncStorage.clear();
                    signOut(auth)
                      .then(() => {
                        props.navigation.replace("Auth");
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  },
                },
              ],
              { cancelable: false }
            );
          }}
        />
      </DrawerContentScrollView>

      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 40,
          paddingHorizontal: 20,
        }}
      >
        <Icon
          name="question-circle"
          size={20}
          color={colors.ash8}
          style={{ paddingRight: 25 }}
        />
        <Text style={{ color: colors.ash6, paddingLeft: 10 }}>Help</Text>
      </View>
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.ash1,
    color: "white",
  },
  profileHeader: {
    flexDirection: "row",
    backgroundColor: "#307ecc",
    padding: 15,
    paddingTop: 40,
    textAlign: "center",
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: "white",
    backgroundColor: "#ffffff",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  profileHeaderText: {
    color: "white",
    alignSelf: "center",
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: "#e2e2e2",
    marginTop: 15,
  },
});
