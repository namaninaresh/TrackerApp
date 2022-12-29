import {
  Text,
  View,
  ScrollView,
  Keyboard,
  Alert,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";

import Input from "../Input";
import Button from "../Button";
import Loader from "../Loader";
import metrics from "../../theme/metrics";
import { size, weight } from "../../theme/fonts";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
        signInWithEmailAndPassword(auth, inputs.email, inputs.password)
          .then((response) => {
            AsyncStorage.setItem(
              "Auth_Token",
              response._tokenResponse.refreshToken
            );
            navigation.replace("DrawerNavigationRoutes");
            /*sessionStorage.setItem(
              "Auth_Token",
              response._tokenResponse.refreshToken
            ); */
          })
          .catch((error) => {
            console.log("error", error);
            if (error.code === "auth/wrong-password") {
              handleError("Wrong Password ! Try again", "password");
            }
            if (error.code === "auth/user-not-found") {
              handleError("User not found ", "email");
            }
          });

        //AsyncStorage.setItem("user",JSON.stringify(inputs))
        //navigate
      } catch (error) {
        console.log("errors", error);
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
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <View style={styles.headerBlock}>
          <Text style={styles.title}>Login</Text>
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
          style={styles.newhere}
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
  headerBlock: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 70,
  },
  title: {
    fontSize: size.font16,
    fontWeight: weight.full,
    marginVertical: 10,
  },
  newhere: {
    fontSize: size.font12,
    textAlign: "center",
    fontWeight: weight.full,
    marginVertical: 10,
  },
  scrollViewStyle: {
    paddingHorizontal: 20,
    paddingTop: 50,

    width: metrics.screenWidth,
  },
});
