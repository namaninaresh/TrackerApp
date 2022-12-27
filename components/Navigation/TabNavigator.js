import React, { useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/FontAwesome5";
import WelcomeScreen from "../Screens/WelcomeScreen";
import {
  MainStackNavigator,
  TasksStackNavigator,
  BudgetStackNavigator,
  WaterStackNavigator,
} from "./StackNavigator";
import colors from "../../theme/colors";
import { Animated, Dimensions, TouchableOpacity, View } from "react-native";
import { Layout } from "../Layout/Layout";
import metrics from "../../theme/metrics";

const Tab = createBottomTabNavigator();

const EmptyScreen = () => {
  return (
    <Layout>
      <Text>Empyty screen</Text>
    </Layout>
  );
};
const BottomTabNavigator = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,

          tabBarActiveTintColor: "#58ceb2",
          tabBarInactiveTintColor: "gray",
          //Tab bar styles can be added here
          tabBarStyle: {
            backgroundColor: "white",
            position: "absolute",
            height: 60,
            bottom: 30,
            marginHorizontal: 20,
            borderRadius: 10,
            shadowColor: colors.ash4,
            shadowOpacity: 0.006,
            shadowOffset: {
              width: 10,
              height: 10,
            },
          },
          tabBarLabelStyle: { paddingBottom: 5 },
        })}
      >
        <Tab.Screen
          name="HomeStack"
          component={MainStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: "absolute",
                }}
              >
                <Icon
                  name="home"
                  size={20}
                  color={focused ? "red" : "grey"}
                ></Icon>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Water"
          component={WaterStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: "absolute",
                }}
              >
                <Icon
                  name="glass-whiskey"
                  size={20}
                  color={focused ? "red" : "grey"}
                ></Icon>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 1.1,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="ActionButton"
          component={WelcomeScreen}
          options={({ navigation }) => ({
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("ActionButton")}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "red",
                    borderRadius: 25,
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: -60,
                    left: -22,
                  }}
                >
                  <Icon
                    name="plus"
                    size={20}
                    color={focused ? "white" : "white"}
                  ></Icon>
                </View>
              </TouchableOpacity>
            ),
          })}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Tasks"
          component={TasksStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: "absolute",
                }}
              >
                <Icon
                  name="tasks"
                  size={20}
                  color={focused ? "red" : "grey"}
                ></Icon>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3.4,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Budget"
          component={BudgetStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: "absolute",
                }}
              >
                <Icon
                  name="credit-card"
                  size={20}
                  color={focused ? "red" : "grey"}
                ></Icon>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4.5,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View
        style={{
          width: getWidth(),
          height: 2,
          position: "absolute",
          bottom: 90,
          backgroundColor: "red",
          left: 25,
          borderRadius: 50,
          transform: [{ translateX: tabOffsetValue }],
        }}
      ></Animated.View>
    </>
  );
};

function getWidth() {
  let width = Dimensions.get("window").width;
  width = width - 80;
  return width / 5;
}
export default BottomTabNavigator;
