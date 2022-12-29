import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SplashScreen = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    let authToken = AsyncStorage.getItem("Auth_Token");
    if (authToken) {
      navigation.replace("DrawerNavigationRoutes");
    }
  });
  /*useEffect(() => {
    setTimeout(() => {
      setAnimating(false);

      AsyncStorage.getItem("user_id").then((value) =>
        navigation.replace(value === null ? "Auth" : "DrawerNavigationRoutes")
      );
    }, 5000);
  }, []); */

  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#307ecc",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
