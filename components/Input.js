import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          { borderColor: error ? "red" : isFocused ? "blue" : "#E0E0E0" },
        ]}
      >
        <Icon name={iconName} style={{ fontSize: 22, paddingHorizontal: 10 }} />
        <TextInput
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={{ flex: 1 }}
          {...props}
        />
        {password && (
          <Icon
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            style={{ fontSize: 22, paddingHorizontal: 10 }}
            onPress={() => setHidePassword(!hidePassword)}
          />
        )}
      </View>
      {error && <Text style={{ color: "red", marginTop: 7 }}>{error}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginVertical: 5,
    color: "grey",
  },
  inputContainer: {
    height: 55,
    backgroundColor: "#E0E0E0",
    flexDirection: "row",
    borderWidth: 0.2,
    alignItems: "center",
  },
});

export default Input;