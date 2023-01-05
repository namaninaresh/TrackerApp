import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../theme/colors";
import { size } from "../../theme/fonts";
import Loader from "../atoms/Loader";
import metrics from "../../theme/metrics";
import { Layout } from "../Layout/Layout";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import TransactionItem from "../molecules/TransactionItem";

export default function AllTransactionScreen({ navigation }) {
  const [transactions, setTransactions] = useState();
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRefreshing(true);
    const tempData = [];
    const q = query(collection(db, "transactions"), orderBy("created", "desc"));
    onSnapshot(q, (querSnap) => {
      querSnap.forEach((doc) => {
        tempData.push({ id: doc.id, ...doc.data() });
      });
      setRefreshing(false);
      setTransactions(tempData);
    });
    /* const querySnapSHot = await getDocs(collection(db, "transactions"));
    querySnapSHot.forEach((doc) => {
      tempData.push({ id: doc.id, ...doc.data() });
    });
    */
  };

  return (
    <>
      <Loader visible={refreshing} />
      <Layout>
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
              <Icon name="filter-variant" size={20} />
            </View>

            <FlatList
              data={transactions}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }, index) => (
                <TransactionItem item={item} key={index} />
              )}
            />
          </View>
        </View>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    borderRadius: 10,
    flex: 1,
    marginTop: 10,
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
