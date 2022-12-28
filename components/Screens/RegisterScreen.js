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
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";

import Input from "../Input";
import Button from "../Button";
import Loader from "../Loader";
import colors from "../../theme/colors";
import metrics from "../../theme/metrics";
import { size, weight } from "../../theme/fonts";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import firebase, { auth, db } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.fullname) {
      handleError("Please enter full name", "fullname");
      valid = false;
      nextPage(1);
    }
    if (!inputs.email) {
      handleError("Please enter email", "email");
      valid = false;
      nextPage(1);
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please enter valid email", "email");
      nextPage(1);
    }
    if (!inputs.password) {
      handleError("Please enter password", "password");
      valid = false;
      nextPage(1);
    } else if (inputs.password.length < 4) {
      handleError("Min length of password is 4 digits", "password");
      valid = false;
      nextPage(1);
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
          age: inputs.age,
          weight: inputs.weight,
          gender: inputs.gender,
          heightFeet: inputs.heightFeet,
          heightInches: inputs.heightInches,
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

  const nextPage = (pageNumber = 2) => {
    //toggleVisibility();
    setPage(pageNumber);
    /*Animated.timing(animatePress, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setTimeout(() => setPage(pageNumber), 500); */
  };

  const handleChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const PageContent = () => {
    return (
      <>
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
          <View
            style={{
              flexDirection: "row",
              backgroundColor: colors.ash0,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
            }}
          >
            <Icon
              name={"calendar-today"}
              style={{
                fontSize: 22,
                paddingHorizontal: 10,
                color: colors.lightDark,
              }}
            />
            <Text
              style={{
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                paddingHorizontal: 10,
                flex: 1,
                opacity: 0.5,
              }}
            >
              Age
            </Text>
            <Picker
              selectedValue={inputs.age}
              style={{ width: 100 }}
              onValueChange={(itemValue) => handleChange(itemValue, "age")}
            >
              {/* Add options for ages 18 to 100 */}
              {[...Array(60).keys()].map((i) => (
                <Picker.Item key={i} label={`${i + 18}`} value={i + 18} />
              ))}
            </Picker>
          </View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: colors.ash0,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 15,
              borderRadius: 15,
            }}
          >
            <Icon
              name={"gender-male-female"}
              style={{
                fontSize: 22,
                paddingHorizontal: 10,
                color: colors.lightDark,
              }}
            />
            <Text
              style={{
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                paddingHorizontal: 10,
                flex: 1,
                opacity: 0.5,
              }}
            >
              Gender
            </Text>
            <Picker
              selectedValue={inputs.gender}
              style={{ height: 50, width: 120 }}
              onValueChange={(itemValue) => handleChange(itemValue, "gender")}
            >
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
        </View>
        <Button
          text="Next"
          type="primary"
          bordered
          size="large"
          onPress={nextPage}
        />
      </>
    );
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
            marginVertical: 20,
          }}
        >
          {page !== 1 && (
            <TouchableOpacity
              onPress={() => nextPage(1)}
              style={{
                position: "absolute",
                left: 0,
                paddingVertical: 10,
                backgroundColor: colors.ash1,
                borderRadius: 50,
              }}
            >
              <Icon
                name={"arrow-left"}
                style={{
                  fontSize: 22,
                  paddingHorizontal: 10,
                  color: colors.lightDark,
                }}
              />
            </TouchableOpacity>
          )}
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
          <View
            style={{
              flexDirection: "row",
              backgroundColor: colors.ash0,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
            }}
          >
            <Icon
              name={"calendar-today"}
              style={{
                fontSize: 22,
                paddingHorizontal: 10,
                color: colors.lightDark,
              }}
            />
            <Text
              style={{
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                paddingHorizontal: 10,
                flex: 1,
                opacity: 0.5,
              }}
            >
              Age
            </Text>
            <Picker
              selectedValue={inputs.age}
              style={{ width: 100 }}
              onValueChange={(itemValue) => handleChange(itemValue, "age")}
            >
              {/* Add options for ages 18 to 100 */}
              {[...Array(60).keys()].map((i) => (
                <Picker.Item key={i} label={`${i + 18}`} value={i + 18} />
              ))}
            </Picker>
          </View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: colors.ash0,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 15,
              borderRadius: 15,
            }}
          >
            <Icon
              name={"gender-male-female"}
              style={{
                fontSize: 22,
                paddingHorizontal: 10,
                color: colors.lightDark,
              }}
            />
            <Text
              style={{
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                paddingHorizontal: 10,
                flex: 1,
                opacity: 0.5,
              }}
            >
              Gender
            </Text>
            <Picker
              selectedValue={inputs.gender}
              style={{ height: 50, width: 120 }}
              onValueChange={(itemValue) => handleChange(itemValue, "gender")}
            >
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: colors.ash0,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
          }}
        >
          <Icon
            name={"weight-kilogram"}
            style={{
              fontSize: 22,
              paddingHorizontal: 10,
              color: colors.lightDark,
            }}
          />
          <Text
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              paddingHorizontal: 10,
              flex: 1,
              opacity: 0.5,
            }}
          >
            Weight
          </Text>

          <Picker
            selectedValue={inputs.weight}
            style={{ width: 120 }}
            onValueChange={(itemValue) => handleChange(itemValue, "age")}
          >
            {/* Add options for ages 18 to 100 */}
            {[...Array(190).keys()].map((i) => (
              <Picker.Item key={i} label={`${i + 30} kg`} value={i + 30} />
            ))}
          </Picker>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: colors.ash0,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 15,
            borderRadius: 15,
          }}
        >
          <Icon
            name={"human-male-height-variant"}
            style={{
              fontSize: 22,
              paddingHorizontal: 10,
              color: colors.lightDark,
            }}
          />
          <Text
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              paddingHorizontal: 10,
              flex: 1,
              opacity: 0.5,
            }}
          >
            Height
          </Text>
          <Picker
            selectedValue={inputs.heightFeet}
            style={{ height: 50, width: 80 }}
            onValueChange={(itemValue) => setFeet(itemValue)}
          >
            {/* Add options for heights in feet */}
            {[...Array(8).keys()].map((i) => (
              <Picker.Item key={i} label={`${i + 4}'`} value={i + 4} />
            ))}
          </Picker>
          <Picker
            selectedValue={inputs.heightInches}
            style={{ height: 50, width: 90 }}
            onValueChange={(itemValue) => setInches(itemValue)}
          >
            {/* Add options for heights in inches */}
            {[...Array(12).keys()].map((i) => (
              <Picker.Item key={i} label={`${i}''`} value={i} />
            ))}
          </Picker>
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
          onPress={() => navigation.navigate("LoginScreen")}
        >
          Aready have account ? Login
        </Text>
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
