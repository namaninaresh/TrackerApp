import { Text, View, ScrollView, Keyboard, Alert } from "react-native";
import { size, weight } from "../../theme/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "../Input";
import Button from "../Button";
import { useState } from "react";
import Loader from "../Loader";
import colors from "../../theme/colors";
import metrics from "../../theme/metrics";
import { Layout } from "../Layout/Layout";
export default function TaskScreen() {
  return (
    <Layout>
      <Text>Task Screen</Text>
    </Layout>
  );
}
