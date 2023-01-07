import { StyleSheet, View, Text } from "react-native";
import Layout from "../Layout/Layout";

const CardTitle = (props) => {
  console.log("ttle", props);
  return (
    <View style={styles.container}>
      <Text>{props.children}</Text>
    </View>
  );
};

CardTitle.displayName = "Card.Title";

const styles = StyleSheet.create({
  container: {},
});

export default CardTitle;
