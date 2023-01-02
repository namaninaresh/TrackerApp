import React, { useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/FontAwesome5";
import {
  MainStackNavigator,
  SearchStackNavigator,
  ProfileStackNavigator,
  TransactionStackNavigator,
  NotificationStackNavigator,
} from "./StackNavigator";
import colors from "../../theme/colors";
import { Animated, Dimensions, TouchableOpacity, View } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = (props) => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,

          tabBarHideOnKeyboard: true,
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
          name="Search"
          component={SearchStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: "absolute",
                }}
              >
                <Icon
                  name="search"
                  size={20}
                  color={focused ? "red" : "grey"}
                ></Icon>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 1.7,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="ActionButton"
          component={TransactionStackNavigator}
          options={({ navigation }) => ({
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("ActionButton")}
                stye={{ backgroundColor: "green" }}
              >
                <View
                  style={{
                    width: 70,
                    height: 70,
                    backgroundColor: colors.ash0,
                    borderRadius: 35,
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: -60,
                    left: -30,
                  }}
                >
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: "red",
                      borderRadius: 25,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="plus"
                      size={20}
                      color={focused ? "white" : "white"}
                    ></Icon>
                  </View>
                </View>
              </TouchableOpacity>
            ),
          })}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 60,
                useNativeDriver: true,
              }).start();
            },
          })}
        />

        <Tab.Screen
          name="NotificationTab"
          component={NotificationStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: "absolute",
                }}
              >
                <Icon
                  name="bell"
                  size={20}
                  color={focused ? "red" : "grey"}
                ></Icon>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 5,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="My Profile"
          component={ProfileStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: "absolute",
                }}
              >
                <Icon
                  name="user-alt"
                  size={20}
                  color={focused ? "red" : "grey"}
                ></Icon>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 6.8,
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
          left: 35,
          borderRadius: 50,
          transform: [{ translateX: tabOffsetValue }],
        }}
      ></Animated.View>
    </>
  );
};

function getWidth() {
  let width = Dimensions.get("window").width;
  width = width - 60;
  return width / 8;
}
export default BottomTabNavigator;
