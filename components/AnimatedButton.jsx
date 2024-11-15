import React from "react";
import { Pressable } from "react-native";
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
      style={{ zIndex: 15 }}
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
