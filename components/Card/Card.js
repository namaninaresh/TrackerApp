import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Layout from "../Layout/Layout";
import CardBody from "./CardBody";
import CardTitle from "./CardTitle";

const Card = (props) => {
  const sibilings = React.Children.map(props.children, (child) => {
    console.log("d", child.type.displayName);
  });
  return (
    <View style={styles.container}>
      {React.Children.map(props.children, (child, index) =>
        React.cloneElement(child, { index })
      )}
    </View>
  );
};

Card.Title = CardTitle;
Card.Body = CardBody;

const styles = StyleSheet.create({
  container: {},
});

export default Card;
