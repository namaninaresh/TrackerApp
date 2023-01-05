import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Keyboard,
} from "react-native";
import colors from "../../theme/colors";
import Icon from "@expo/vector-icons/MaterialIcons";
import Input from "./Input";
import Button from "./Button";
import metrics from "../../theme/metrics";

function InputModal({
  visible,
  item,
  onClose,
  onEdit,

  iconName = "check",
  iconColor = "white",
  iconBgStyle,
}) {
  const [inputs, setInputs] = useState(item);
  const [errors, setErrors] = useState({});
  const handleEdit = () => {
    onEdit(inputs);
    onClose();
  };

  const handleChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.name) {
      handleError("Please enter title", "name");
      valid = false;
    }
    if (!inputs.type) {
      handleError("Please enter amount", "type");
      valid = false;
    }
    if (!inputs.amount) {
      handleError("Please enter amount", "amount");
      valid = false;
    }

    if (valid) handleEdit();
  };
  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backDrop} onStartShouldSetResponder={onClose}></View>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <Text style={{ flex: 1, textAlign: "center" }}>
              {false && "Header Name"}
            </Text>
            <TouchableOpacity onPress={onClose}>
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
              width: "100%",
            }}
          >
            <Input
              iconName="account-outline"
              placeholder="Bank name"
              value={inputs.name}
              error={errors.name}
              onFocus={() => {
                handleError(null, "name");
              }}
              onChangeText={(text) => handleChange(text, "name")}
            />
            <Input
              iconName="account-outline"
              placeholder="Bank Type"
              value={inputs.type}
              error={errors.type}
              onFocus={() => {
                handleError(null, "type");
              }}
              onChangeText={(text) => handleChange(text, "type")}
            />
            <Input
              iconName="account-outline"
              placeholder="Amount"
              keyboardType="numeric"
              error={errors.amount}
              value={inputs.amount.toString()}
              onFocus={() => {
                handleError(null, "amount");
              }}
              onChangeText={(text) => handleChange(text, "amount")}
            />
            <View
              style={{
                justifyContent: "flex-end",
                paddingVertical: 10,
              }}
            >
              <Button
                text="Save"
                type="primary"
                bordered
                size="large"
                onPress={validate}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backDrop: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    paddingTop: metrics.screenHeight / 4,
    justifyContent: "center",
    alignItems: "center",
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
    zIndex: 10000,
    elevation: 9,
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
});

export default InputModal;
