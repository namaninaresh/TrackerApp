import { Timestamp } from "firebase/firestore";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import colors from "../../theme/colors";
import { size } from "../../theme/fonts";
import timeConverter from "../atoms/timeConverter";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
const rupee = "\u20B9";
let row = [];
let prevOpenedRow;
export default TransactionItem = ({ item, index, onClick }) => {
  const closeRow = (index) => {
    console.log("closerow");
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const renderRightActions = (progress, dragX, onClick) => {
    return (
      <TouchableOpacity
        onPress={onClick}
        style={{
          alignContent: "center",
          justifyContent: "center",
          width: 50,
        }}
      >
        <Icon
          name="delete"
          size={30}
          color={colors.scarletRed}
          style={{
            alignSelf: "center",
          }}
        />
      </TouchableOpacity>
    );
  };
  const renderLeftActions = (progress, dragX, onClick) => {
    return (
      <TouchableOpacity
        onPress={onClick}
        style={{
          alignContent: "center",
          justifyContent: "center",
          width: 50,
        }}
      >
        <Icon
          name="file-document-edit"
          size={30}
          color={colors.mintGreen}
          style={{
            alignSelf: "center",
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, onClick)
      }
      renderLeftActions={(progress, dragX) =>
        renderLeftActions(progress, dragX, onClick)
      }
      onSwipeableOpen={() => closeRow(index)}
      ref={(ref) => (row[index] = ref)}
      rightOpenValue={-100}
    >
      <View
        key={item.id}
        style={{
          paddingHorizontal: 20,
          borderBottomColor: colors.ash2,
          borderBottomWidth: 0.4,

          backgroundColor: "white",
          marginVertical: 5,
          borderRadius: 10,
          paddingVertical: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: "800" }}>{item.title}</Text>
          <Text style={{ fontWeight: "900" }}>
            {rupee}
            {item.amount}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",

            opacity: 0.5,
          }}
        >
          <Text style={{ fontWeight: "100", fontSize: size.font10 }}>
            {item["created"] && timeConverter(item["created"])}
            {/*{//Date.parse(item.created.toDate().toString())} */}
          </Text>
          <Text
            style={{
              fontWeight: "800",
              fontSize: size.font10,
              color: colors.orange,
            }}
          >
            Debicted
          </Text>
        </View>
        <Text
          style={{
            fontSize: size.font10,
            paddingBottom: 10,
            opacity: 0.3,
            letterSpacing: 0.2,
          }}
        >
          {item.description}
        </Text>
      </View>
    </Swipeable>
  );
};
