import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  MaterialCommunityIcons as Icon,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import colors from "../../theme/colors";
import { size } from "../../theme/fonts";
import metrics from "../../theme/metrics";

import { Layout } from "../Layout/Layout";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { useContext } from "react";
import UserContext from "../context/UserContext";
function capitalFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

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
              <Text style={[styles.usertitle, { fontSize: size.font16 }]}>
                {user.displayName
                  ? capitalFirstLetter(user.displayName)
                  : "Chinna Namani"}
              </Text>
              <Text style={styles.userdescription}>{user.email}</Text>
              <TouchableOpacity
                style={styles.editProfilebtn}
                onPress={() => {
                  navigation.navigate("EditProfile");
                }}
              >
                <Text style={{ color: "white", fontWeight: "700" }}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 170 }}>
          <View
            style={{
              borderRadius: 10,
              marginHorizontal: 20,
              marginVertical: 10,
            }}
          >
            <View style={[styles.card, { flexDirection: "column" }]}>
              <TouchableOpacity
                style={[styles.listItem]}
                onPress={() => navigation.navigate("AccountScreen")}
              >
                <MaterialIcons name="account-balance" size={20} />
                <Text style={styles.cardTitle}>Accounts</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} />
              </TouchableOpacity>
              {/*} <TouchableOpacity style={[styles.listItem]}>
                <Ionicons name="card-outline" size={24} />
                <Text style={styles.cardTitle}>Cards</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} />
              </TouchableOpacity> */}

              <TouchableOpacity style={[styles.listItem]}>
                <Ionicons name="cash-outline" size={20} />
                <Text style={styles.cardTitle}>Cash </Text>
                <View
                  style={{
                    backgroundColor: colors.mintGreen,
                    paddingVertical: 3,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "white", fontSize: size.font12 }}>
                    {"\u20B9"}10,000
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.listItem]}>
                <Icon name="account-cash" size={20} />
                <Text style={styles.cardTitle}>Debt Loans </Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.listItem]}>
                <Icon name="cash-refund" size={20} />
                <Text style={styles.cardTitle}>Credit Loans</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} />
              </TouchableOpacity>
              <View style={styles.separator}></View>
              <TouchableOpacity style={[styles.listItem]}>
                <Ionicons name="stats-chart-outline" size={20} />
                <Text style={styles.cardTitle}>Stats </Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.listItem]}>
                <Icon name="bank-transfer" size={22} />
                <Text style={styles.cardTitle}>All Transactions </Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} />
              </TouchableOpacity>
              <View style={styles.separator}></View>
              <TouchableOpacity
                style={[styles.listItem]}
                onPress={() => navigation.navigate("SettingsScreen")}
              >
                <Ionicons name="settings-outline" size={20} />
                <Text style={styles.cardTitle}>Settings</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.listItem]}>
                <MaterialIcons name="delete-outline" size={20} />
                <Text style={styles.cardTitle}>Clear Cache</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.listItem]}>
                <MaterialIcons name="logout" size={20} />
                <Text style={styles.cardTitle}>Logout</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} />
              </TouchableOpacity>
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
    paddingTop: 30,
  },
  editProfilebtn: {
    padding: 10,
    backgroundColor: "#307ecc",
    color: colors.ash0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
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
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  separator: {
    marginVertical: 5,
    borderBottomColor: colors.ash1,
    borderBottomWidth: 1,
    opacity: 0.4,
  },
});
