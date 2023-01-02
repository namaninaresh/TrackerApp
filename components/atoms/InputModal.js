import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import colors from "../../theme/colors";
import Icon from "@expo/vector-icons/MaterialIcons";
import Input from "./Input";
import Button from "./Button";

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

  const handleEdit = () => {
    onEdit(inputs);
    onClose();
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container} onStartShouldSetResponder={onClose}>
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
              value={inputs.bankName}
              onChangeText={(text) => setInputs({ ...inputs, bankName: text })}
            />
            <Input
              iconName="account-outline"
              placeholder="Bank Type"
              value={inputs.type}
              onChangeText={(text) => setInputs({ ...inputs, type: text })}
            />
            <Input
              iconName="account-outline"
              placeholder="Amount"
              value={inputs.amount}
              onChangeText={(text) => setInputs({ ...inputs, amount: text })}
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
                onPress={handleEdit}
              />
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
