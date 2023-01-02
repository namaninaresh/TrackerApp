import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../theme/colors";
import { size } from "../../theme/fonts";
import metrics from "../../theme/metrics";
import { Layout } from "../Layout/Layout";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import TransactionItem from "../molecules/TransactionItem";

export default function AllTransactionScreen({ navigation }) {
  const [transactions, setTransactions] = useState();
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const tempData = [];
    const querySnapSHot = await getDocs(collection(db, "transactions"));
    querySnapSHot.forEach((doc) => {
      tempData.push({ id: doc.id, ...doc.data() });
    });
    setRefreshing(false);
    setTransactions(tempData);
  };

  return (
    <Layout style={{ alignItems: "flex-start" }}>
      <View style={styles.content}>
        <View
          style={{
            marginHorizontal: 10,
            borderRadius: 10,
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              paddingVertical: 25,
            }}
          >
            <Text
              style={{
                fontWeight: "900",
                fontSize: 14,
                color: colors.ash7,
              }}
            >
              All Transactions
            </Text>
          </View>

          <FlatList
            data={transactions}
            renderItem={({ item }, index) => (
              <TransactionItem item={item} key={index} />
            )}
          />
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  content: {
    borderRadius: 10,
    flex: 1,
    width: metrics.screenWidth,
  },
  icon: {
    justifyContent: "center",
    alignContent: "center",
    paddingRight: 10,
    alignSelf: "center",
  },
  expenseBlock: {
    flexDirection: "row",
    paddingVertical: 10,
    marginHorizontal: 30,
  },
  expenseAmount: {
    paddingVertical: 5,
    color: colors.ash6,
    fontWeight: "900",
  },
});
