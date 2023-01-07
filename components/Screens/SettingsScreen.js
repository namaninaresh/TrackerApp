import { Text } from "react-native";
import Card from "../Card/Card";

import { Layout } from "../Layout/Layout";
export default function SettingsScreen() {
  return (
    <Layout>
      <Card>
        <Card.Title>Title</Card.Title>
        <Card.Body>Card Body</Card.Body>
      </Card>
    </Layout>
  );
}
