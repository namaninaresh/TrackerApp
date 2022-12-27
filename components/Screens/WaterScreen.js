import { Text, View, ScrollView, Keyboard, Alert } from "react-native";

import { Layout } from "../Layout/Layout";
export default function WaterScreen() {
  return (
    <Layout>
      <View
        style={{
          paddingTop: 0,
          backgroundColor: "pink",
        }}
      >
        <Text>Water Screen</Text>
      </View>
    </Layout>
  );
}
