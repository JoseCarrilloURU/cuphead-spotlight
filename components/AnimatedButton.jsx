import React from "react";
import { Pressable } from "react-native";
import { MotiImage } from "moti";

const AnimatedButton = ({ onPress, source, style, disabled }) => {
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
      disabled={disabled}
      style={{
        zIndex: 15,
        borderColor: "black",
        borderWidth: 0,
        width: 0,
        height: 0,
      }}
    >
      <MotiImage
        source={source}
        style={style}
        animate={{
          transform: [{ scale: isPressed ? 1.2 : 1 }],
          opacity: disabled ? 0.5 : 1,
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
