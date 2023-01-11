import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  Animated,
} from "react-native";
import colors from "../../theme/colors";
import metrics from "../../theme/metrics";
import Loader from "../atoms/Loader";
import UserContext from "../context/UserContext";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Layout } from "../Layout/Layout";
import { size } from "../../theme/fonts";
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
const TransactionsScreen = (props) => {
  const { allData, addTransaction } = useContext(UserContext);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(allData["loading"]);

  const handleFilterModal = () => {
    //setfilterModal(!filterModal);
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
          </View>

          <Animated.FlatList
            data={[...allData.transactions, ...allData.transactions]}
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
            contentContainerStyle={{
              padding: 20,
              paddingTop: 20,
            }}
            renderItem={({ item, index }) => {
              const inputRange = [
                -1,
                0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 2),
              ];
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
              return (
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
                  <View>
                    <Text style={{ fontSize: 20, fontWeight: "700" }}>
                      {item.title}
                    </Text>
                    <Text style={{ fontSize: 14, opacity: 0.7 }}>
                      {item.id}
                    </Text>
                    <Text
                      style={{ fontSize: 12, opacity: 0.8, color: "#0099cc" }}
                    >
                      {item.description}
                    </Text>
                  </View>
                </Animated.View>
              );
            }}
          />
        </View>
      </Layout>
    </>
  );
};

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

export default TransactionsScreen;

/*import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  Animated,
} from "react-native";
import UserContext from "../context/UserContext";
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
const TransactionsScreen = (props) => {
  const { allData, addTransaction } = useContext(UserContext);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Image
        source={require("../../assets/man_2.png")}
        blurRadius={80}
        style={[StyleSheet.absoluteFillObject]}
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
        contentContainerStyle={{
          padding: 20,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
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
          return (
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
              <Image
                source={require("../../assets/man_2.png")}
                style={{ width: 70, height: 70, borderRadius: 70 }}
              />
              <View>
                <Text style={{ fontSize: 20, fontWeight: "700" }}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: 14, opacity: 0.7 }}>{item.id}</Text>
                <Text style={{ fontSize: 12, opacity: 0.8, color: "#0099cc" }}>
                  {item.description}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default TransactionsScreen;
*/
