import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { MotiImage } from "moti";

const AnimatedButton = ({ onPress, source, style }) => {
  const [isPressed, setIsPressed] = React.useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <MotiImage
        source={source}
        style={style}
        animate={{
          transform: [{ scale: isPressed ? 1.2 : 1 }],
        }}
        transition={{
          type: "timing",
          duration: 150,
        }}
      />
    </Pressable>
  );
};

export default AnimatedButton;
