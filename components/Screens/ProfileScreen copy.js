import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons as Icon, Ionicons } from "@expo/vector-icons";
import colors from "../../theme/colors";
import { size } from "../../theme/fonts";
import metrics from "../../theme/metrics";

import { Layout } from "../Layout/Layout";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
export default function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <Layout>
      <View style={styles.container}>
        <View
          style={{
            borderRadius: 10,
            marginHorizontal: 20,
            marginVertical: 10,
            backgroundColor: "white",
          }}
        >
          <View style={styles.headerContainer}>
            <View style={styles.userIconContainer}>
              <Image
                source={require("../../assets/user.jpg")}
                style={styles.userIcon}
              />
            </View>
            <View>
              <Text style={styles.usertitle}>Naresh Namani</Text>
              <Text style={styles.userdescription}>
                namaninaresh1996@gmail.com
              </Text>
            </View>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
          <View
            style={{
              borderRadius: 10,
              marginHorizontal: 20,
              marginVertical: 10,
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <View style={[styles.flexRow, styles.center]}>
                <TouchableOpacity style={styles.card}>
                  <Icon name="bank" size={40} color={colors.ash4} />
                  <Text style={styles.cardTitle}>Bank Accounts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                  <Ionicons name="cash" size={40} color={colors.ash4} />
                  <Text style={styles.cardTitle}>Cash</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.flexRow}>
                <TouchableOpacity style={styles.card}>
                  <Icon name="account-cash" size={40} color={colors.ash4} />
                  <Text style={styles.cardTitle}> Loans Taken</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                  <Icon name="cash-refund" size={40} color={colors.ash4} />
                  <Text style={styles.cardTitle}>Loans Given</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.flexRow}>
                <TouchableOpacity style={styles.card}>
                  <Icon name="chart-bar" size={40} color={colors.ash4} />
                  <Text style={styles.cardTitle}> Stats</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                  <Icon name="bank-transfer" size={40} color={colors.ash4} />
                  <Text style={styles.cardTitle}>All Trasactions</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.flexRow}>
                <TouchableOpacity style={styles.card}>
                  <Icon name="account-edit" size={40} color={colors.ash4} />
                  <Text style={styles.cardTitle}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => navigation.navigate("SettingsScreen")}
                >
                  <Ionicons name="settings" size={40} color={colors.ash4} />
                  <Text style={styles.cardTitle}>Settings</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    width: metrics.screenWidth,
    height: metrics.screenHeight,
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  userIconContainer: {
    alignItems: "center",
    backgroundColor: colors.ash1,
    borderRadius: 60,
    height: 100,
    justifyContent: "center",
    width: 100,
    marginHorizontal: 10,
    marginRight: 20,
  },
  userIcon: {
    borderRadius: 50,
    height: 80,
    width: 80,
  },
  usertitle: {
    fontSize: size.font16 * 1.1,
    fontWeight: "800",
  },
  userdescription: {
    fontSize: size.font12,
    paddingVertical: 10,
    color: colors.ash5,
    fontWeight: "100",
  },
  /*card: {
    backgroundColor: "white",
    flex: 1,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.ash3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  }, */
  card: {
    padding: 10,
    width: 140,
    margin: 10,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: colors.ash3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  cardTitle: {
    paddingVertical: 10,
  },
  flexRow: {
    flexDirection: "row",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
