import {
  Text,
  View,
  ScrollView,
  Keyboard,
  Alert,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import colors from "../../theme/colors";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { Layout } from "../Layout/Layout";
import metrics from "../../theme/metrics";
import { size } from "../../theme/fonts";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import UserContext from "../context/UserContext";
import MoneyFormat from "../atoms/MoneyFormat";
import TransactionItem from "../molecules/TransactionItem";
const rupee = "\u20B9";

const Spent = ({ totalExpenses }) => (
  <View
    style={{
      width: metrics.screenWidth - 30,
    }}
  >
    <View
      style={{
        backgroundColor: "rgba(23,26,28,0.9)",
        //backgroundColor: "#171a1c",
        //backgroundColor: "rgba(58,167,127,1)",
        //  backgroundColor: "rgba(153,153,153,0.5)",
        height: 200,
        margin: 10,
        borderRadius: 10,
        color: "#47474e",
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "#fff",
          //color: "#47474e",
          fontWeight: "800",
          fontSize: 14,
          paddingVertical: 10,
          textTransform: "uppercase",
        }}
      >
        Total Spent
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "900",
            fontSize: 22,
            paddingVertical: 10,
          }}
        >
          {rupee} {MoneyFormat(totalExpenses)}
        </Text>
      </View>
    </View>
  </View>
);

const Spent1 = ({ totalExpenses }) => (
  <View
    style={{
      width: metrics.screenWidth - 30,
    }}
  >
    <View
      style={{
        backgroundColor: "#171a1c",
        //backgroundColor: "rgba(58,167,127,1)",
        //  backgroundColor: "rgba(153,153,153,0.5)",
        height: 200,
        margin: 10,
        borderRadius: 10,
        color: "#47474e",
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "#fff",
          //color: "#47474e",
          fontWeight: "800",
          fontSize: 14,
          paddingVertical: 10,
          textTransform: "uppercase",
        }}
      >
        Total Spent
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "900",
            fontSize: 22,
            paddingVertical: 10,
          }}
        >
          {rupee} {MoneyFormat(totalExpenses)}
        </Text>
      </View>
    </View>
  </View>
);
const Child1 = () => (
  <View
    style={{
      width: metrics.screenWidth - 30,
    }}
  >
    <View
      style={{
        backgroundColor: "#307ecc",
        //backgroundColor: "rgba(58,167,127,1)",
        //  backgroundColor: "rgba(153,153,153,0.5)",
        height: 200,
        margin: 10,
        borderRadius: 10,
        color: "white",
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "800",
          fontSize: 14,
          paddingVertical: 10,
          textTransform: "uppercase",
        }}
      >
        Account Balance
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "800", fontSize: 16, color: "white" }}>
          ICICI -
        </Text>
        <Text
          style={{
            color: "white",
            fontWeight: "900",
            fontSize: 22,
            paddingVertical: 10,
          }}
        >
          {rupee} 10,000
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "800", fontSize: 16, color: "white" }}>
          PAYTM -{" "}
        </Text>
        <Text
          style={{
            color: "white",
            fontWeight: "900",
            fontSize: 22,
            paddingVertical: 10,
          }}
        >
          {rupee} 10,000
        </Text>
      </View>
    </View>
  </View>
);

export default function HomeScreen({ navigation }) {
  const [totalExpenses, setExpenses] = useState(0);
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    //fetchData();

    const unsubscribe = navigation.addListener("focus", () => {
      // fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  const [refreshing, setRefreshing] = useState(true);
  const fetchData = async () => {
    const tempData = [];
    let tempExpense = 0;

    const q = query(collection(db, "transactions"), orderBy("created", "desc"));
    onSnapshot(q, (querSnap) => {
      let count = 0;

      querSnap.forEach((doc) => {
        tempExpense += Number(doc.data()["amount"]);
        if (count < 4) tempData.push({ id: doc.id, ...doc.data() });
        count++;
      });

      setExpenses(tempExpense);
      setRefreshing(false);
      setTransactions(tempData);
    });
    /* const q = query(collection(db, "transactions"), orderBy("created", "desc"));
    onSnapshot(q, (querSnap) => {
      let count = 0;

      querSnap.forEach((doc) => {
        tempExpense = count;
        if (count < 2) tempData.push({ id: doc.id, ...doc.data() });
        count++;
        //console.log(JSON.stringify(doc.data()));
      });
    }); */
    /*
    const querySnapSHot = await getDocs(collection(db, "transactions"));
    let count = 0;
    querySnapSHot.forEach((doc) => {
      tempExpense += Number(doc.data()["amount"]);
      tempData.push({ id: doc.id, ...doc.data() });
      count++;
    }); */

    /*const transRef = collection(db, "transactions");

    const q = query(transRef, orderBy("created", "desc"), limit(4));
    onSnapshot(q, (querSnap) => {
      querSnap.forEach((doc) => {
        tempExpense += Number(doc.data()["amount"]);
        tempData.push({ id: doc.id, ...doc.data() });
        //console.log(JSON.stringify(doc.data()));
      });
    }); */
  };

  return (
    <Layout>
      <ScrollView
        style={{ paddingBottom: 100 }}
        /*refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        } */
      >
        <ScrollView
          horizontal
          style={{ backgroundColor: "white", marginBottom: 10 }}
          disableIntervalMomentum={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={metrics.screenWidth}
        >
          <Spent totalExpenses={totalExpenses} />
          <Child1 />
        </ScrollView>
        <View style={styles.content}>
          <View
            style={{
              marginHorizontal: 10,
              backgroundColor: "white",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                paddingVertical: 30,
              }}
            >
              <Text
                style={{
                  fontWeight: "900",
                  fontSize: 14,
                  color: colors.ash7,
                }}
              >
                Recent Transations
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("AllTransactions")}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    color: colors.bldark3,
                    textDecorationLine: "underline",
                  }}
                >
                  see all
                </Text>
                <Icon name={"chevron-right"} size={15} color={colors.bldark3} />
              </TouchableOpacity>
            </View>

            {/* {transactions && (
            <FlatList
              data={[
                ...transactions,
                ...transactions,
                ...transactions,
                ...transactions,
              ]}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <Transation item={item} /> } 
            
            />
          )} */}
            {transactions &&
              transactions.map((item, index) => (
                <TransactionItem item={item} key={index} />
              ))}
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  widgets: {
    width: metrics.screenWidth,
    flex: 0.3,
    zIndex: 1000,
    transform: [{ scaleX: 2 }],
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,

    backgroundColor: colors.mintGreen,
    //backgroundColor: "#3EB489",
    //backgroundColor: "#2B2D42",
    shadowColor: colors.ash4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  amount: {
    fontSize: size.font20,
    fontWeight: "900",
    color: colors.ash1,
    letterSpacing: 1.3,
  },
  avaiableTxt: {
    fontSize: size.font14,
    paddingVertical: 10,
    fontWeight: "400",
    opacity: 0.6,
    color: colors.ash0,
    letterSpacing: 1,
  },
  widgetContent: {
    transform: [{ scaleX: 0.5 }],
    justifyContent: "space-between",
    flexDirection: "row",
    alignContent: "center",
    flex: 1,
    paddingHorizontal: 20,
  },
  expense: {
    position: "absolute",
    zIndex: 10000,
    top: metrics.screenHeight / 5,
    width: "80%",
    margin: "auto",
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.ash1,
    shadowColor: colors.ash4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flex: 0.7,
    paddingBottom: 120,
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
