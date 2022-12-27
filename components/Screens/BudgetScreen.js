import {
  Text,
  View,
  ScrollView,
  Keyboard,
  Alert,
  StyleSheet,
} from "react-native";
import colors from "../../theme/colors";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { Layout } from "../Layout/Layout";
import metrics from "../../theme/metrics";
import { size } from "../../theme/fonts";
import { color } from "react-native-reanimated";
const rupee = "\u20B9";
export default function BudgetScreen() {
  return (
    <Layout>
      <View style={styles.widgets}>
        <View style={styles.widgetContent}>
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.amount}>{rupee}17,000</Text>
            <Text style={styles.avaiableTxt}>ICICI</Text>
          </View>
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.amount}>{rupee}1,000</Text>
            <Text style={styles.avaiableTxt}>Paytm</Text>
          </View>
        </View>
      </View>
      <View style={styles.expense}>
        <View style={[styles.expenseBlock]}>
          <Icon
            name="circle"
            size={25}
            color={colors.orange}
            style={styles.icon}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={{ color: colors.ash5 }}>Spent</Text>
            <Text style={styles.expenseAmount}>{rupee}14000</Text>
          </View>
        </View>
        <View style={[styles.expenseBlock]}>
          <Icon
            name="circle"
            size={25}
            color={colors.purple}
            style={styles.icon}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={{ color: colors.ash5 }}>Earned</Text>
            <Text style={styles.expenseAmount}>{rupee}10000</Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <View
          style={{
            marginTop: 50,
            marginHorizontal: 10,
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              fontWeight: "900",
              fontSize: 14,
              paddingVertical: 30,
              color: colors.ash7,
              paddingHorizontal: 10,
            }}
          >
            Recent Transations
          </Text>

          <View
            style={{
              paddingHorizontal: 20,
              borderBottomColor: colors.ash2,
              borderBottomWidth: 0.6,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "800" }}>Domino's Pizza</Text>
              <Text style={{ fontWeight: "900" }}>{rupee}2000</Text>
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
                Today
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
              Description about the payment if any you mentioned beofre or after
              trainsiotnand everything
            </Text>
          </View>
        </View>
      </View>
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
    overflow: "hidden",
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
