import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import colors from "../../theme/colors";
import Icon from "@expo/vector-icons/MaterialIcons";

function InputModal({
  onSubmit,
  message,
  visible,
  iconName = "check",
  iconColor = "white",
  iconBgStyle,
}) {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      visible={visible}
      onRequestClose={onSubmit}
    >
      <View style={styles.container} onStartShouldSetResponder={handleSubmit}>
        <View style={styles.modal}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ flex: 1, textAlign: "center" }}>
              {false && "Header Name"}
            </Text>
            <TouchableOpacity onPress={handleSubmit}>
              <Icon
                name="close"
                size={15}
                style={{
                  backgroundColor: colors.ash3,
                  padding: 5,
                  borderRadius: 50,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingVertical: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ paddingVertical: 10 }}>{message}</Text>
            <View
              style={{
                justifyContent: "flex-end",
                paddingVertical: 10,
              }}
            >
              <View
                style={[
                  {
                    backgroundColor: "#38B000",
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  { ...iconBgStyle },
                ]}
              >
                <Icon name={iconName} size={25} color={iconColor} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  input: {
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 16,
  },
  modal: {
    backgroundColor: "white",
    padding: 10,
    width: "80%",
    margin: "auto",
    borderRadius: 10,
    shadowColor: colors.ash8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 9,
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
});

export default InputModal;
