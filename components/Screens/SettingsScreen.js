import { useContext } from "react";
import { Text } from "react-native";
import Card from "../Card/Card";
import AuthContext from "../context/AuthContext";

import { Layout } from "../Layout/Layout";
export default function SettingsScreen() {
  const { user } = useContext(AuthContext);

  console.log("seetings", user.displayName);
  return (
    <Layout>
      <Card>
        <Card.Title>Title</Card.Title>
        <Card.Body>Card Body</Card.Body>
      </Card>
    </Layout>
  );
}
