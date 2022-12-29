import React from "react";
import { Text, View, ScrollView, Image } from "react-native";
import { size } from "../../theme/fonts";
import Button from "../atoms/Button";
import metrics from "../../theme/metrics";
import colors from "../../theme/colors";

export default function WelcomeScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 50,
        height: metrics.screenHeight,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "baseline",

          flexDirection: "row",
        }}
      >
        <Image
          source={require("../../assets/logo.png")}
          style={[
            {
              width: metrics.screenWidth - 90,
              height: metrics.screenHeight / 1.5,
              resizeMode: "contain",
            },
          ]}
        />
        {/* <Text style={{ fontSize: size.font14, color: "#214c93" }}>My </Text>
        <Text style={{ fontSize: 50, fontWeight: "900", color: "#214c93" }}>
          TRACKER
      </Text>  */}
      </View>
      {/* <Image
        source={require("../../assets/notes.png")}
        style={[
          { width: metrics.screenWidth, height: 400, resizeMode: "contain" },
        ]} 
      />*/}
      <Text
        style={{
          textAlign: "center",
          fontSize: size.font20,
          fontWeight: "900",
          textTransform: "uppercase",
          paddingVertical: 30,
        }}
      >
        Welcome
      </Text>
      {/*<Text
        style={{
          textAlign: "center",
          fontSize: size.font12,
          paddingVertical: 10,
        }}
      >
        Something is wring .plase dont mind , im drunk
      </Text> */}
      <View style={{ flexDirection: "row" }}>
        <Button text={"Register"} size="small" />
        <Button text={"Login"} size="small" type="outlined" />
      </View>
    </ScrollView>
  );
}
