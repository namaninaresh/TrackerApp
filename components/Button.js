import React from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import colors from "../theme/colors";

const Button = ({
  text,
  onPress,
  type = "primary",
  bordered = false,
  icon,
  buttonStyle,
  size = "large",
}) => {
  const large = "100%";
  const small = "80%";
  const btnSize = size === "large" ? large : small;
  let btnBgColor = colors.ash0;
  if (type === "primary") {
    btnBgColor = colors.cyan;
  }
  const btnTextColor = type === "primary" ? "#ffffff" : "#000";
  const iconColor = type === "primary" ? "#ffffff" : "grey";
  const btnBorderRadius = 10; //bordered ? 10 : 10;

  const containerCommonStyle = {
    backgroundColor: btnBgColor,
    height: 45,
    width: btnSize,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: btnBorderRadius,
  };

  const textCommonStyle = {
    color: btnTextColor,
    fontSize: 14,
    fontWeight: "900",
    textTransform: "uppercase",
    textAlign: "center",
  };

  const border = type === "outlined" && {
    borderColor: "#e7e7e7",
    borderWidth: 1.5,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={[containerCommonStyle, border, buttonStyle]}>
        {icon && (
          <Icon
            name={icon}
            style={{
              fontSize: 20,
              paddingHorizontal: 2,
              color: iconColor,
            }}
          />
        )}
        <Text style={[textCommonStyle]}> {text} </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
/*import React from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../theme/colors";
const Button = ({
  title,
  icon,
  backgroundColor,
  buttonStyle,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        ...styles.container,
        ...buttonStyle,
        backgroundColor,
      }}
    >
      {icon && (
        <Icon
          name={icon}
          style={{
            fontSize: 22,
            paddingHorizontal: 10,
            color: colors.light,
          }}
        />
      )}
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 55,
    width: "100%",
    marginTop: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 1,
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
}); */
