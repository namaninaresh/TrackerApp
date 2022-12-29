import React from "react";
import { View, Text, Alert, StyleSheet, Image } from "react-native";

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
import { size } from "../../theme/fonts";
const CustomSidebarMenu = (props) => {
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Image
            source={require("../../assets/user.jpg")}
            style={stylesSidebar.userIcon}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text style={stylesSidebar.profileHeaderText}>Naresh Namani</Text>
          <Text style={stylesSidebar.profileHeaderDescription}>
            lovelychinna799@gmail.com
          </Text>
        </View>
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
  userIcon: {
    borderRadius: 50,
    height: 50,
    width: 50,
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
    backgroundColor: colors.ash3,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  profileHeaderText: {
    color: "white",

    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  profileHeaderDescription: {
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: size.font12,
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: "#e2e2e2",
    marginTop: 15,
  },
});
