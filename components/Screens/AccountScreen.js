import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Animated,
  ToastAndroid,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Layout } from "../Layout/Layout";
import metrics from "../../theme/metrics";
import colors from "../../theme/colors";
import { size } from "../../theme/fonts";
import SwipeableRow from "../atoms/SwipeableRow";

import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import InputModal from "../atoms/InputModal";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  addDoc,
  Timestamp,
} from "firebase/firestore";

const ListItem = ({ data, onEdit, onDelete }) => {
  return (
    <Swipeable
      renderRightActions={(progress, dragX) => {
        {
          const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: "clamp",
          });
          return (
            <View style={styles.rightActions}>
              <Animated.View
                style={{
                  transform: [{ translateX: scale }],
                }}
              >
                <Ionicons
                  name="ios-trash"
                  size={30}
                  color={colors.scarletRed}
                />
              </Animated.View>
            </View>
          );
        }
      }}
    >
      <View style={[styles.listItem]}>
        {data.logo ? (
          <Image
            source={data.logo}
            style={{
              width: 40,
              height: 40,
              resizeMode: "contain",
            }}
          />
        ) : (
          <View
            style={{
              backgroundColor: colors.ash0,
              padding: 10,
              borderRadius: 30,
            }}
          >
            <Icon name={data.icon ? data.icon : "bank"} size={20} />
          </View>
        )}

        <Text style={[styles.cardTitle, { fontSize: 12 }]}>{data.name}</Text>
        <View
          style={{
            backgroundColor: colors.mintGreen,
            paddingVertical: 3,
            paddingHorizontal: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: size.font14 }}>
            {"\u20B9"}
            {data.amount}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onEdit}
          style={{
            marginLeft: 15,
            backgroundColor: colors.ash0,
            padding: 10,
            borderRadius: 30,
          }}
        >
          <Icon name="pencil" size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.separator}></View>
    </Swipeable>
  );
};

export default function AccountScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [listData, setListData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [listData]);

  const fetchData = async () => {
    const tempData = [];
    const querySnapSHot = await getDocs(collection(db, "accounts"));
    querySnapSHot.forEach((doc) => {
      tempData.push({ id: doc.id, ...doc.data() });
    });
    setListData(tempData);
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
    setEditingItem(null);
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setEditingItem({ id: listData.length, amount: 0 });
  };

  /*const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const handleChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  }; */

  const handleEditItem = (editedItem, name) => {
    setEditingItem(editedItem);
  };

  const handleSave = async (editedItem) => {
    const found = listData.some((el) => el.id === editedItem.id);

    if (!found) {
      try {
        addDoc(collection(db, "accounts"), {
          amount: editedItem.amount,
          name: editedItem.name,
          type: editedItem.type,
          created: Timestamp.now(),
        });
        ToastAndroid.show("Successfully Added !", ToastAndroid.BOTTOM);

        listData.push(editedItem);
      } catch (error) {
        ToastAndroid.show(
          "Something wrong-Adding Account !",
          ToastAndroid.BOTTOM
        );
      }
    }
    if (found) {
      const newData = listData.map((item) => {
        if (item.id === editedItem.id) {
          item.amount = editedItem.amount;
          return item;
        }
        return item;
      });
      setListData(newData);
      updateDoc(doc(db, "accounts", editedItem["id"]), { ...editedItem })
        .then(() => {
          ToastAndroid.show("Successfully Updated !", ToastAndroid.BOTTOM);
        })
        .catch(() =>
          ToastAndroid.show(
            "Something went wrong -updating Account!",
            ToastAndroid.TOP
          )
        );
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={toggleModal}
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
              borderRadius: 10,
              paddingHorizontal: 20,
              backgroundColor: colors.white,
            }}
          >
            <Icon
              name="bank-plus"
              size={40}
              style={{
                padding: 10,
                backgroundColor: colors.ash1,
                borderRadius: 50,
              }}
              color={colors.mintGreen}
            />

            <Text style={{ paddingVertical: 5 }}>Add Bank/Card</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <FlatList
            data={listData}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ListItem
                data={item}
                onDelete={() => onDelete(item)}
                onEdit={() => handleEditItem(item, "list item")}
              />
            )}
          />
        </View>
      </View>

      {editingItem && (
        <InputModal
          visible={true}
          item={editingItem}
          onEdit={(item) => handleSave(item)}
          onClose={handleModal}
          // onClose={() => setEditingItem(null) }
        />
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: metrics.screenWidth,
    height: metrics.screenHeight,

    alignItems: "center",
    paddingTop: 40,
  },

  card: {
    width: "100%",
    height: "70%",
    padding: 10,
    borderRadius: 10,
    shadowColor: colors.ash0,
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 0.65,
    elevation: 1,
  },
  cardTitle: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: size.font16,
    textTransform: "uppercase",
    fontWeight: "800",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "white",
  },
  separator: {
    marginVertical: 5,

    borderBottomColor: colors.ash1,
    borderBottomWidth: 1,
    opacity: 0.4,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  text: {
    fontSize: 16,
  },
  rightActions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
