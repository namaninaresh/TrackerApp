import {
  Text,
  View,
  ScrollView,
  Keyboard,
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useEffect, useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";

import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Loader from "../atoms/Loader";
import colors from "../../theme/colors";
import metrics from "../../theme/metrics";
import { size, weight } from "../../theme/fonts";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import InfoModal from "../atoms/InfoModal";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function AddTransactionScreen({ navigation }) {
  const [inputs, setInputs] = useState({
    title: "",
    amount: 0,
    description: "",
    date: new Date(),
    dateTimeText: {
      date: "",
      time: "",
    },
    // date: new Date().toLocaleDateString("IST"),
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [mode, setMode] = useState("date");

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
          created: inputs.date,
        });
        setModalVisible(true);
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

  useEffect(() => {
    //fetchData();
    const unsubscribe = navigation.addListener("focus", () => {
      handleChange(new Date(), "date");
    });

    return unsubscribe;
  }, [navigation]);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || inputs.date;

    let datTime = setDateTime(currentDate);
    setInputs((prevState) => ({
      ...prevState,
      date: currentDate,
      dateTimeText: { date: datTime[0], time: datTime[1] },
    }));
    setShowDate(!showDate);
  };

  const setDateTime = (currentDate = inputs.date) => {
    let tempDate = new Date(currentDate);

    let date = tempDate.getDate();
    let m = tempDate.getMonth() + 1;

    if (date < 10) date = "0" + date;
    if (m < 10) m = "0" + m;

    let fDate = date + "/" + m + "/" + tempDate.getFullYear();

    //dateTimeText.date = fDate;

    let hr = tempDate.getHours();
    let min = tempDate.getMinutes();
    if (min < 10) min = "0" + min;
    let ampm = "am";
    if (hr > 12) {
      hr -= 12;
      ampm = "pm";
    }
    if (hr < 10) hr = "0" + hr;
    let fTime = hr + ":" + min + " " + ampm;
    //dateTimeText = fTime;

    return [fDate, fTime];
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                backgroundColor: "#fff",
                padding: 10,

                borderRadius: 10,
                flexDirection: "row",
              }}
              onPress={() => {
                setMode("date");
                setShowDate(!showDate);
              }}
            >
              <MaterialIcons name="date-range" size={24} color="black" />
              <Text
                style={{
                  padding: 5,
                }}
              >
                {inputs.dateTimeText.date}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: "center",
                backgroundColor: "#fff",
                padding: 10,

                borderRadius: 10,
                flexDirection: "row",
              }}
              onPress={() => {
                setMode("time");
                setShowDate(!showDate);
              }}
            >
              <MaterialIcons name="timer" size={24} color="black" />
              <Text style={{ padding: 5 }}>{inputs.dateTimeText.time}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {showDate && (
          <DateTimePicker
            mode={mode}
            is24Hour={false}
            value={inputs.date}
            onChange={onDateChange}
          />
        )}
        {/* <DateTimePicker
          mode="date"
          value={new Date()}
          onChange={(text) => console.log("date=", text)}
        /> */}
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
        <InfoModal
          visible={modalVisible}
          onSubmit={() => setModalVisible(!modalVisible)}
          message="Trasaction added Successfully !"
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
