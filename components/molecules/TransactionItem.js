import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../theme/colors";
import { size } from "../../theme/fonts";
const rupee = "\u20B9";
export default TransactionItem = ({ item }) => (
  <View
    key={item.id}
    style={{
      paddingHorizontal: 20,
      borderBottomColor: colors.ash2,
      borderBottomWidth: 0.4,

      paddingVertical: 5,
    }}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
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
        paddingVertical: 10,
        opacity: 0.5,
      }}
    >
      <Text style={{ fontWeight: "100", fontSize: size.font10 }}>Today</Text>
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
);
