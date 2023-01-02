import React, { Children } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../theme/colors";

function SwipeableRow({ children }) {
  return (
    <Swipeable
      renderRightActions={(progress, dragX) => {
        {
          const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: "clamp",
          });
          return (
            <View style={styles.rightActions}>
              <Animated.View
                style={{
                  transform: [{ translateX: scale }],
                }}
              >
                <Ionicons
                  name="ios-trash"
                  size={30}
                  color={colors.scarletRed}
                />
              </Animated.View>
            </View>
          );
        }
      }}
    >
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  text: {
    fontSize: 16,
  },
  rightActions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default SwipeableRow;
