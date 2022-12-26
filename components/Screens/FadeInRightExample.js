import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

const FadeInRightExample = () => {
  const [visible, setVisible] = useState(false); // track the element's visibility
  const [fadeAnim] = useState(new Animated.Value(0)); // track the element's opacity
  const [slideAnim] = useState(new Animated.Value(0)); // track the element's position

  // toggle the element's visibility
  const toggleVisibility = () => {
    LayoutAnimation.configureNext({
      duration: 500,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Types.opacity,
      },
    });
    setVisible(!visible);
  };

  // update the element's opacity and position based on its visibility
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: visible ? 1 : 0,
        duration: 500,

        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: visible ? 1 : 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible]);

  // interpolate the element's opacity and position for the animation
  const fadeInterpolation = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const slideInterpolation = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleVisibility}>
        <Text>Toggle Visibility</Text>
      </TouchableOpacity>
      <Animated.View // use the interpolated values for the element's style
        style={[
          styles.fadeInRightElement,
          {
            opacity: fadeInterpolation,
            transform: [{ translateX: slideInterpolation }],
          },
        ]}
      >
        <Text>Fade In Right Element</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fadeInRightElement: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
  },
});

export default FadeInRightExample;
