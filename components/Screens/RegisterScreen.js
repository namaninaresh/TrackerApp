import {
  Text,
  View,
  ScrollView,
  Keyboard,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";

import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Loader from "../atoms/Loader";
import colors from "../../theme/colors";
import metrics from "../../theme/metrics";
import { size, weight } from "../../theme/fonts";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";

export default function Register({ navigation }) {
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
    setTimeout(async () => {
      setLoading(false);
      const actionCodeSettings = {
        url: "https://www.example.com/?email=user@example.com",
        iOS: {
          bundleId: "com.example.ios",
        },
        android: {
          packageName: "com.example.android",
          installApp: true,
          minimumVersion: "12",
        },
        handleCodeInApp: true,
      };
      try {
        await createUserWithEmailAndPassword(
          auth,
          inputs.email,
          inputs.password
        ).then(
          async (response) => {
            await updateProfile(response.user, {
              displayName: inputs.fullname,
            });
            await sendEmailVerification(response.user, actionCodeSettings);
            AsyncStorage.setItem(
              "Auth_Token",
              response._tokenResponse.refreshToken
            );
          }
          //await sendEmailVerification(response.user, actionCodeSettings)
          //response.__tokenResponse.refreshToken
          // console.log("Verification email sent", response);
        );

        addDoc(collection(db, "users"), {
          username: inputs.email,
          password: inputs.password,
          fullname: inputs.fullname,

          created: Timestamp.now(),
        });

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
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <View style={styles.headerBlock}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backIconContainer}
          >
            <Icon name={"arrow-left"} style={styles.backIcon} />
          </TouchableOpacity>

          <Text style={styles.title}>Registration</Text>
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
            onChangeText={(text) => handleChange(text, "fullname")}
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
          style={styles.alreadyAccount}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          Aready have account ? Login
        </Text>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  alreadyAccount: {
    fontSize: size.font10,
    fontWeight: weight.full,
    marginVertical: 10,
    textAlign: "center",
  },
  backIcon: {
    color: colors.lightDark,
    fontSize: 22,
    paddingHorizontal: 10,
  },
  backIconContainer: {
    backgroundColor: colors.ash1,
    borderRadius: 50,
    left: 0,
    position: "absolute",
    paddingVertical: 10,
  },
  headerBlock: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    paddingVertical: 40,
  },
  scrollViewStyle: {
    paddingTop: 50,
    paddingHorizontal: 20,
    width: metrics.screenWidth,
  },
  title: {
    fontSize: size.font16,
    fontWeight: weight.full,
    marginVertical: 10,
  },
});
