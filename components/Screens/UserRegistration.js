import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Animated,
  StyleSheet,
} from "react-native";
import { Layout } from "../Layout/Layout";
import { Picker } from "@react-native-picker/picker";

function UserRegistration() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const fadeAnim = new Animated.Value(1);
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState("male");
  const nextPage = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setTimeout(() => setPage(3), 500);
  };

  const submit = () => {
    // submit the form
  };

  if (page === 1) {
    return (
      <View>
        <Animated.View>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Name"
          />
          <Button title="Next" onPress={nextPage} />
        </Animated.View>
      </View>
    );
  } else if (page === 2) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Age:</Text>
        <Picker
          selectedValue={age}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue) => setAge(itemValue)}
        >
          {/* Add options for ages 18 to 100 */}
          {[...Array(83).keys()].map((i) => (
            <Picker.Item key={i} label={`${i + 18}`} value={i + 18} />
          ))}
        </Picker>
        <Button title="Next" onPress={nextPage} />
      </View>
    );
  } else {
    return (
      <View>
        <Animated.View style={{ opacity: fadeAnim }}>
          <View>
            <Picker
              selectedValue={gender}
              style={{ height: 50, width: 160 }}
              onValueChange={(itemValue) => setGender(itemValue)}
            >
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
          <Button title="Back" onPress={() => setPage(2)} />
          <Button title="Submit" onPress={submit} />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  picker: {
    height: 50,
    width: 100,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
});

export default UserRegistration;
