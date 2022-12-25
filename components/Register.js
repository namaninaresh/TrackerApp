import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Keyboard,
  Alert,
} from "react-native";
import { size, weight } from "../theme/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import Loader from "./Loader";
export default function Register() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.email) {
      handleError("Please enter email", "email");
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please enter valid Email", "email");
    }
    if (!inputs.password) {
      handleError("Please enter Password", "password");
      valid = false;
    } else if (inputs.password.length < 4) {
      handleError("Min length of password is 4 digits", "password");
      valid = false;
    }

    if (valid) register();
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      try {
        //AsyncStorage.setItem("user",JSON.stringify(inputs))
        //navigate
      } catch (error) {
        Alert.alert("Error", "Something is wrong");
      }
    }, 3000);
  };
  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const handleChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              fontSize: size.font16,
              fontWeight: weight.full,
            }}
          >
            Registration
          </Text>
          <Text style={{ fontSize: size.font12, fontWeight: weight.low }}>
            Please register down below
          </Text>
        </View>

        <View>
          <Input
            label={"Email"}
            iconName="email-outline"
            placeholder="Enter your email address"
            error={errors.email}
            onFocus={() => {
              handleError(null, "email");
            }}
            onChangeText={(text) => handleChange(text, "email")}
          />
          <Input
            label={"Password"}
            iconName="lock-outline"
            placeholder="Enter your password"
            password
            error={errors.password}
            onFocus={() => {
              handleError(null, "password");
            }}
            onChangeText={(text) => handleChange(text, "password")}
          />
        </View>
        <Button title={"Register"} onPress={validate} />
        <Text style={{ fontSize: size.font10, textAlign: "center" }}>
          Aready have account ? Login
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
