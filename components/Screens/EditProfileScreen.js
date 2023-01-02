import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Keyboard,
  View,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../theme/colors";
import { size } from "../../theme/fonts";
import metrics from "../../theme/metrics";
import { useContext } from "react";
import { Layout } from "../Layout/Layout";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { getAuth, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
function capitalFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
import TextField from "../atoms/TextField";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import UserContext from "../context/UserContext";
import InfoModal from "../atoms/InfoModal";
import InputModal from "../atoms/InfoModal";

export default function EditProfileScreen() {
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  //const user = getAuth().currentUser;
  let { displayName, email } = user;

  const [inputs, setInputs] = useState({
    fullname: displayName,
    email: email,
    password: "",
    confirmpassword: "",
  });

  const [modalVisible, setModalVisible] = useState(false);

  const handleButtonPress = () => {
    setModalVisible(!modalVisible);
  };

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

    if (inputs.password.length > 0 || inputs.confirmpassword.length > 0) {
      if (!inputs.password) {
        handleError("Please enter password", "password");
        valid = false;
      } else if (inputs.password.length < 4) {
        handleError("Min length of password is 4 digits", "password");
        valid = false;
      }
      if (!inputs.confirmpassword) {
        handleError("Please enter password", "confirmpassword");
        valid = false;
      } else if (inputs.confirmpassword.length < 4) {
        handleError("Min length of password is 4 digits", "password");
        valid = false;
      }

      if (inputs.confirmpassword !== inputs.password) {
        handleError("Passwords are not matching", "confirmpassword");
        handleError("Passwords are not matching", "password");
        valid = false;
      }
    }

    if (valid) updateUserDetails();
  };

  const updateUserDetails = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);

      try {
        updateProfile(getAuth().currentUser, {
          displayName: inputs.fullname,
        })
          .then(() => {
            setUser({ ...user, displayName: inputs.fullname });
            setModalVisible(!modalVisible);
          })
          .catch((error) => {
            console.log("err", error);
          });
        /* await updateProfile(user, {
              displayName: inputs.fullname, 
            }); */

        /*AsyncStorage.setItem(
              "Auth_Token",
              response._tokenResponse.refreshToken
            ); */

        //await sendEmailVerification(response.user, actionCodeSettings)
        //response.__tokenResponse.refreshToken
        // console.log("Verification email sent", response);

        //AsyncStorage.setItem("user",JSON.stringify(inputs))
        //navigate
      } catch (error) {
        console.log("something", error);
      }
    }, 500);
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const handleChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.userIconContainer}>
            <Image
              source={require("../../assets/user.jpg")}
              style={styles.userIcon}
            />
            <View
              style={{
                backgroundColor: "white",
                width: 40,
                height: 40,
                bottom: 0,
                position: "absolute",
                right: 0,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="camera-outline" size={25} />
            </View>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 140 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              fontSize: size.font14,
              fontWeight: "700",
              paddingLeft: 10,
              paddingVertical: 20,
            }}
          >
            Your Information :
          </Text>
          <View style={{ flexDirection: "column", width: "100%" }}>
            {/*<TextField
            style={styles.textField}
            value={value}
            label="Full Name"
            errorText={error}
            onChangeText={(text) => setValue(text)}
          />
          */}
            <Input
              iconName="account-outline"
              placeholder="Full name"
              error={errors.fullname}
              value={inputs.fullname}
              onFocus={() => {
                handleError(null, "fullname");
              }}
              onChangeText={(text) => handleChange(text, "fullname")}
            />
            <Input
              iconName="email-outline"
              placeholder="Email"
              error={errors.email}
              value={inputs.email}
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
            <Input
              iconName="lock-outline"
              placeholder="Confirm Password"
              password
              error={errors.confirmpassword}
              onFocus={() => {
                handleError(null, "confirmpassword");
              }}
              onChangeText={(text) => handleChange(text, "confirmpassword")}
            />
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <Button
                text="Save"
                type="primary"
                buttonStyle={{ backgroundColor: "#1ba351" }}
                bordered
                size="small"
                onPress={validate}
              />
              <Button
                text="Cancel"
                type="primary"
                buttonStyle={{ backgroundColor: colors.pink }}
                bordered
                size="small"
                onPress={() => navigation.goBack()}
              />
            </View>

            <InputModal
              visible={modalVisible}
              onSubmit={handleButtonPress}
              message="Profile updated Successfully !"
            />
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    width: metrics.screenWidth, //Dimensions.get("window").width,
    height: metrics.screenHeight,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  textField: {
    width: "100%",
    marginVertical: 10,
  },
  editProfilebtn: {
    padding: 10,
    backgroundColor: "#307ecc",
    color: colors.ash0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  userIconContainer: {
    alignItems: "center",
    backgroundColor: colors.ash1,
    borderRadius: 60,
    height: 100,
    justifyContent: "center",
    width: 100,
    marginHorizontal: 10,
    marginRight: 20,
  },
  userIcon: {
    borderRadius: 50,
    height: 80,
    width: 80,
  },
  usertitle: {
    fontWeight: "800",
  },
  userdescription: {
    fontSize: size.font12,
    paddingVertical: 10,
    color: colors.ash5,
    fontWeight: "100",
  },
});
