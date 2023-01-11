import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import * as React from "react";

import Swipeable from "react-native-gesture-handler/Swipeable";
import colors from "../../theme/colors";
import { size } from "../../theme/fonts";
import Loader from "../atoms/Loader";
import metrics from "../../theme/metrics";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Layout } from "../Layout/Layout";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useContext, useEffect, useState } from "react";

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
import Filter from "../atoms/Filter";
import UserContext from "../context/UserContext";
import Button from "../atoms/Button";
const transData = [
  {
    amount: "110",
    description: "Ticket+ gey+ peanuts ",
    id: "orRv7UEITXlK0FRxQYdN",
    title: "Train to wgl",
  },
  {
    amount: "50",
    description: "To secu east ",
    id: "xW6xPVj7S28nUASzKdIu",
    title: "Metro",
  },
  {
    amount: "72",
    description: "Chapathi 6th jan",
    id: "aYTSFlXegYUI1YzR0gxm",
    title: "Lunch",
  },
  {
    amount: "240",
    description: "On jan 6th to uppal",
    id: "Y0cULTAX0khGEbGYiYfJ",
    title: "Bus to hyd ",
  },
  {
    amount: "30",
    description: "On jan 6th 2023",
    id: "N92c3127iNshB0VNAhQQ",
    title: "Auto to hnk bus stand ",
  },
  {
    amount: "165",
    description: "Bought eggs on 4th jan ",
    id: "nYGUT9iW4bQHOZEs9uWH",
    title: "Eggs",
  },
  {
    amount: "800",
    description: "Newyear party cost sent to bijay",
    id: "kYvPjw7hCxFxKKRxsXBM",
    title: "NewYear Party",
  },
  {
    amount: "282.49",
    description: "Internet bill on 2nd jan",
    id: "MYK6FBeqJyBJti2abJyf",
    title: "Internet bill",
  },
  {
    amount: "60",
    description: "Praneeth , me on 2nd jan ",
    id: "8buaSQ4CqfcWUK9h606y",
    title: "Tiffin ",
  },
  {
    amount: "8098",
    description: "Credit card on 1st jan",
    id: "W5Cn7ipvP7oHfwGF3aam",
    title: "Credit card bill",
  },
  {
    amount: "10",
    description: "In train., Gey came given",
    id: "EBQQssitmVuwHrzQFZJP",
    title: "Gey ",
  },
  {
    amount: "80",
    description: "Train to wgl -shathavahana ",
    id: "3T9mPOHT245KR5eY41C0",
    title: "Train cost to wgl",
  },
  {
    amount: "75",
    description: "Chicken manchuria lunch",
    id: "GILGPhCJCpmPY8hQWuvC",
    title: "Lunch on 30dec",
  },
  {
    amount: "100",
    description: "For gng and cmng ",
    id: "oJzXrOagFflyoY201QMd",
    title: "Metro cost",
  },
  {
    amount: "240",
    description: "Hnk to hyd bus cost",
    id: "nlPAb0xAs8GOSXi93GKy",
    title: "Bus to Hyd",
  },
  {
    amount: "30",
    description: "Auto to hnk for Hyderabad gng on 30 dec ",
    id: "cFOT0a1plT6rzRawjHlp",
    title: "Auto to hnk bus stand",
  },
];
export default function AllTransactionScreenSwipe({ navigation }) {
  //const [transactions, setTransactions] = useState();
  const [filterModal, setfilterModal] = useState(false);

  const { allData, addTransaction } = useContext(UserContext);
  const [refreshing, setRefreshing] = useState(allData["loading"]);

  let row = [];
  let prevOpenedRow;

  const SPACING = 20;
  const AVATAR_SIZE = 70;
  const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
  const scrollY = React.useRef(new Animated.Value(0)).current;

  /**
   *
   */
  const renderItem = ({ item, index }, onClick) => {
    const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];
    const opacityInputRange = [
      -1,
      0,
      ITEM_SIZE * index,
      ITEM_SIZE * (index + 0.5),
    ];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });
    const opacity = scrollY.interpolate({
      inputRange: opacityInputRange,
      outputRange: [1, 1, 1, 0],
    });

    //
    const closeRow = (index) => {
      console.log("closerow");
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };

    const renderRightActions = (progress, dragX, onClick) => {
      return (
        <View
          style={{
            margin: 0,
            alignContent: "center",
            justifyContent: "center",
            width: 70,
          }}
        >
          <Button color="red" onPress={onClick} title="DELETE"></Button>
        </View>
      );
    };

    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={(progress, dragX) =>
            renderRightActions(progress, dragX, onClick)
          }
          onSwipeableOpen={() => closeRow(index)}
          leftThreshold={80}
          rightThreashold={40}
          ref={(ref) => (row[index] = ref)}
          rightOpenValue={-100}
        >
          <Animated.View
            style={{
              flexDirection: "row",
              padding: SPACING,

              marginBottom: SPACING,
              backgroundColor: "rgba(255,255,255,0.8)",

              borderRadius: 12,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              opacity,
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 1,
              transform: [{ scale }],
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
              <Text style={{ fontWeight: "900" }}>{item.amount}</Text>
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
          </Animated.View>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  const deleteItem = ({ item, index }) => {
    console.log(item, index);
    let a = listData;
    a.splice(index, 1);
    console.log(a);
    setListData([...a]);
  };
  useEffect(() => {
    //fetchData();
  }, []);
  console.log("alldata==>", allData);
  const handleFilterModal = () => {
    setfilterModal(!filterModal);
  };

  const submitFilter = (filters) => {
    console.log("filters");
  };
  const fetchData = async () => {
    setRefreshing(true);
    const tempData = [];
    setRefreshing(false);
    setTransactions(transData);
    /* const q = query(collection(db, "transactions"), orderBy("created", "desc"));
    onSnapshot(q, (querSnap) => {
      querSnap.forEach((doc) => {
        tempData.push({ id: doc.id, ...doc.data() });
      });

      console.log(tempData);
      setRefreshing(false);
      setTransactions(tempData);
    }); */
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
                All Transactions Swipe
              </Text>
              <Icon
                name="filter-variant"
                size={20}
                onPress={handleFilterModal}
              />
            </View>
            <Filter
              visible={filterModal}
              onClose={handleFilterModal}
              onSubmit={submitFilter}
            />

            <Animated.FlatList
              data={allData.transactions}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: { contentOffset: { y: scrollY } },
                  },
                ],
                { useNativeDriver: true }
              )}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={(v) =>
                renderItem(v, () => {
                  console.log("Pressed", v);
                  deleteItem(v);
                })
              }
            />
            {/* <FlatList
              data={allData.transactions}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }, index) => (
                <TransactionItem item={item} key={index} />
              )}
            /> */}
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
    paddingBottom: 80,
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
