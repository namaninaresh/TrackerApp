import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import colors from "../../theme/colors";
export const Layout = ({ children, style }) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={[
        {
          paddingBottom: insets.bottom,
          paddingTop: insets.top,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
        { ...style },
      ]}
      edges={["top", "right", "left"]}
    >
      {children}
    </SafeAreaView>
  );
};
