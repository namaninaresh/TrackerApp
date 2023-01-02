import React, { useState, useRef } from "react";
import { View, Text, Modal, Button, Animated } from "react-native";

export function useFeedbackModal() {
  const [feedback, setFeedback] = useState(null);
  const opacity = useRef(new Animated.Value(0)).current;

  const showFeedback = (message) => {
    setFeedback(message);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const hideFeedback = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setFeedback(null);
    });
  };

  return [opacity, feedback, showFeedback, hideFeedback];
}

export default function FeedbackModal({ visible, onClose = () => {} }) {
  const [opacity = 1, feedback, showFeedback, hideFeedback] =
    useFeedbackModal();

  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <View style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", flex: 1 }}>
        {feedback && (
          <Animated.View style={{ opacity }}>
            <View style={{ backgroundColor: "white", padding: 20 }}>
              <Text>{feedback}</Text>
              <Button title="Close" onPress={hideFeedback} />
            </View>
          </Animated.View>
        )}
      </View>
    </Modal>
  );
}
