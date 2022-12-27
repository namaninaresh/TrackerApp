import {
  Text,
  View,
  ScrollView,
  Keyboard,
  Alert,
  Animated,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";

import Input from "../Input";
import Button from "../Button";
import Loader from "../Loader";
import colors from "../../theme/colors";
import metrics from "../../theme/metrics";
import { size, weight } from "../../theme/fonts";

export default function Register({ navigation }) {
  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    password: "",
    age: 18,
    gender: "male",
    weight: 75,
    heightFeet: 5,
    heightInches: 9,
  });
  const [page, setPage] = useState(1);
  const [animatePress, setAnimatePress] = useState(new Animated.Value(1));

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false); // track the element's visibility

  // toggle the element's visibility

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!inputs.email) {
      handleError("Please enter email", "email");
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please enter valid email", "email");
    }
    if (!inputs.password) {
      handleError("Please enter password", "password");
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
        navigation.replace("DrawerNavigationRoutes");
        //AsyncStorage.setItem("user",JSON.stringify(inputs))
        //navigate
      } catch (error) {
        Alert.alert("Error", "Something is wrong");
      }
    }, 1000);
  };
  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const handleChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  return (
    <>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,

          width: metrics.screenWidth,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 70,
          }}
        >
          <Text
            style={{
              fontSize: size.font16,
              fontWeight: weight.full,
              marginVertical: 10,
            }}
          >
            Login
          </Text>
          <Text style={{ fontSize: size.font12, fontWeight: weight.low }}>
            Please login with following details
          </Text>
        </View>
        <View>
          <Input
            iconName="email-outline"
            placeholder="Email"
            error={errors.email}
            onFocus={() => {
              handleError(null, "email");
            }}
            onChangeText={(text) => handleChange(text, "email")}
          />
          <Input
            iconName="lock-outline"
            placeholder="Password"
            password
            error={errors.password}
            onFocus={() => {
              handleError(null, "password");
            }}
            onChangeText={(text) => handleChange(text, "password")}
          />
        </View>
        <Button
          text="Login"
          type="primary"
          bordered
          size="large"
          onPress={validate}
        />
        <Text
          style={{
            fontSize: size.font12,
            textAlign: "center",
            fontWeight: weight.full,
            marginVertical: 10,
          }}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          New Here ? Register
        </Text>
        {/*}  <Button
        title={"Register"}
        onPress={validate}
        backgroundColor={colors.btnColor}
      />
      <Text>or Continue with</Text>
      <Button title={"facebook"} icon="google" onPress={validate} />
      <Button title={"Google"} icon="google" onPress={validate} /> */}
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fadeInRightElement: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
  },
});
