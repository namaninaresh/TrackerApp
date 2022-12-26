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
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          flex: 1,
          backgroundColor: colors.ash0,
          alignItems: "center",
          justifyContent: "center",
        },
        { ...style },
      ]}
      edges={["top", "left", "right"]}
    >
      {children}
    </SafeAreaView>
  );
};
