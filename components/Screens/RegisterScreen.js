import { Text, View, ScrollView, Keyboard, Alert } from "react-native";
import { size, weight } from "../../theme/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "../Input";
import Button from "../Button";
import { useState } from "react";
import Loader from "../Loader";
import colors from "../../theme/colors";
import metrics from "../../theme/metrics";
export default function Register() {
  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.fullname) {
      handleError("Please enter full name", "fullname");
      valid = false;
    }
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
    <>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,

          width: metrics.screenWidth,
          height: metrics.screenHeight,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 50,
          }}
        >
          <Text
            style={{
              fontSize: size.font16,
              fontWeight: weight.full,
              marginVertical: 10,
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
            iconName="account-outline"
            placeholder="Full name"
            error={errors.fullname}
            onFocus={() => {
              handleError(null, "fullname");
            }}
            onChangeText={(text) => handleChange(text, "fulname")}
          />
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
          text="Register"
          type="primary"
          bordered
          size="large"
          onPress={validate}
        />
        <Button
          text="Google"
          type="outlined"
          icon={"google"}
          bordered
          buttonStyle={{ borderWidth: 0 }}
          size="large"
        />
        <Button
          text="Facebook"
          icon={"facebook"}
          type="outlined"
          buttonStyle={{
            borderWidth: 0,
          }}
          bordered
          size="large"
        />
        {/*}  <Button
          title={"Register"}
          onPress={validate}
          backgroundColor={colors.btnColor}
        />
        <Text>or Continue with</Text>
        <Button title={"facebook"} icon="google" onPress={validate} />
        <Button title={"Google"} icon="google" onPress={validate} /> */}
        <Text
          style={{
            fontSize: size.font10,
            textAlign: "center",
            fontWeight: weight.full,
            marginVertical: 10,
          }}
        >
          Aready have account ? Login
        </Text>
      </ScrollView>
    </>
  );
}
