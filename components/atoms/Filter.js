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
import { Picker } from "@react-native-picker/picker";

import DateTimePicker from "@react-native-community/datetimepicker";

function Filter({
  visible,
  iconName = "check",
  iconColor = "white",
  onClose,
  onSubmit,
}) {
  const [fromDate, setFromDate] = useState();
  const [fromDateModal, setFromDateModal] = useState(false);
  const [toDateModal, setToDateModal] = useState(false);
  const [toDate, setToDate] = useState();
  const [sortBy, setSortBy] = useState("name");
  return (
    <Modal
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      visible={visible}
    >
      <View style={styles.backDrop} onStartShouldSetResponder={() => {}}></View>
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  alignItems: "center",
                }}
                onPress={() => setFromDateModal(!fromDateModal)}
              >
                <Icon name="date-range" size={24} color="black" />
                <Text>From </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  alignItems: "center",
                }}
                onPress={() => setToDateModal(!setToDate)}
              >
                <Icon name="date-range" size={24} color="black" />
                <Text>To </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 55,
                flexDirection: "row",
                paddingHorizontal: 20,
                width: "100%",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ paddingHorizontal: 10 }}> Sort By </Text>
              </View>
              <View
                style={{
                  height: 50,
                  flex: 1,
                  borderRadius: 10,
                  borderWidth: 0.2,
                }}
              >
                <Picker
                  selectedValue={sortBy}
                  onValueChange={(itemvlaue) => setSortBy(itemvlaue)}
                >
                  <Picker.Item label="Name" value={"name"} />
                  <Picker.Item label="Price-High" value={"highPrice"} />
                  <Picker.Item label="Price-Low" value={"lowPrice"} />
                </Picker>
              </View>
            </View>
            {fromDateModal && (
              <DateTimePicker
                mode={"date"}
                is24Hour={false}
                value={new Date()}
                onChange={() => {}}
              />
            )}
            <View
              style={{
                justifyContent: "flex-end",
                paddingVertical: 10,
              }}
            >
              <Button
                text="Filter"
                type="primary"
                bordered
                size="small"
                onPress={onSubmit}
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

export default Filter;
