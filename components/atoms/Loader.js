import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import metrics from "../../theme/metrics";
const Loader = ({ visible = true }) => {
  return (
    visible && (
      <View
        style={[
          styles.container,
          { height: metrics.screenHeight, width: metrics.screenWidth },
        ]}
      >
        <View style={styles.loader}>
          <ActivityIndicator size={"large"} color="#E0E0E0" />
          <Text style={{ paddingHorizontal: 20 }}>Loading...</Text>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  loader: {
    height: 70,
    backgroundColor: "white",
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
export default Loader;
