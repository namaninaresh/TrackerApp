import { useEffect, useRef, useMemo } from "react";

import {
  StyleSheet,
  useWindowDimensions,
  Animated,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
export interface SpringAnimationConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export function useSpring(
  value: { to: number },
  config?: SpringAnimationConfig
): Animated.Value {
  const animatedValue = useMemo(() => new Animated.Value(value.to), []);
  useEffect(() => {
    const animation = Animated.spring(animatedValue, {
      ...config,
      toValue: value.to,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [value.to]);
  return animatedValue;
}
