import { StyleSheet, View, Text } from "react-native";

const CardBody = (props) => {
  console.log("boduy", props);
  return (
    <View style={styles.container}>
      <Text>{props.children}</Text>
    </View>
  );
};
CardBody.displayName = "Card.Body";
const styles = StyleSheet.create({
  container: {},
});

export default CardBody;
