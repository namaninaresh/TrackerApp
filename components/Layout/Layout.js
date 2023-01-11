import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
export const Layout = ({ children, style }) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={[
        {
          paddingBottom: insets.bottom,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
        { ...style },
      ]}
      edges={["right", "left"]}
    >
      <StatusBar style="dark" />
      {children}
    </SafeAreaView>
  );
};
