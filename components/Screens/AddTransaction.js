import {
  Text,
  View,
  ScrollView,
  Keyboard,
  Alert,
  StyleSheet,
} from "react-native";
import { createRef, forwardRef, useEffect, useState } from "react";
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
import { Layout } from "../Layout/Layout";
export default function AddTransactionScreen({ navigation }) {
  const [inputs, setInputs] = useState({
    title: "",
    amount: 0,
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.title) {
      handleError("Please enter title", "title");
      valid = false;
    }
    if (!inputs.amount) {
      handleError("Please enter amount", "amount");
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
        addDoc(collection(db, "transactions"), {
          amount: inputs.amount,
          description: inputs.description,
          title: inputs.title,
          created: Timestamp.now(),
        });

        setInputs({
          title: "",
          amount: 0,
          description: "",
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
        <View>
          <Input
            iconName="card-text"
            placeholder="Title"
            error={errors.title}
            value={inputs.title}
            onFocus={() => {
              handleError(null, "title");
            }}
            onChangeText={(text) => handleChange(text, "title")}
          />
          <Input
            iconName="cash"
            placeholder="Amount"
            keyboardType="numeric"
            error={errors.amount}
            value={inputs.amount}
            onFocus={() => {
              handleError(null, "amount");
            }}
            onChangeText={(text) => handleChange(text, "amount")}
          />
          <Input
            iconName="comment-text"
            placeholder="Description"
            error={errors.description}
            value={inputs.description}
            onFocus={() => {
              handleError(null, "description");
            }}
            onChangeText={(text) => handleChange(text, "description")}
          />
        </View>

        <Button
          text="Add Transaction"
          type="primary"
          bordered
          size="large"
          buttonStyle={{ backgroundColor: colors.mintGreen }}
          onPress={validate}
        />
        <Button
          text="View All Transactions"
          type="primary"
          bordered
          size="large"
          buttonStyle={{ backgroundColor: colors.gold }}
          onPress={() => navigation.navigate("AllTransactions")}
        />
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
