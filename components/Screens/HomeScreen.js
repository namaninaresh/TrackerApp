import { Text, View, ScrollView, Keyboard, Alert } from "react-native";
import { size, weight } from "../../theme/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "../Input";
import Button from "../Button";

import { Layout } from "../Layout/Layout";
export default function HomeScreen({ navigation }) {
  return (
    <Layout>
      <Text>Home Screen</Text>
    </Layout>
  );
}
