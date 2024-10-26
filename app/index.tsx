import {
  View,
  Image,
  Pressable,
  TextInput,
  Keyboard,
  Text,
  StyleSheet,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import React, { useState, useEffect } from "react";
import { router, SplashScreen } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { playSound } from "../components/soundUtils";
import { MotiView, MotiImage, MotiText } from "moti";

export default function Index() {
  const [pressableDisabled, setPressableDisabled] = useState(false);

  const handlePress = async () => {
    console.log("Tap To Begin Pressed");
    setPressableDisabled(true);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={pressableDisabled}
      style={{ flex: 1 }}
    >
      <MotiView>
        <MotiView>
          <MotiImage
            source={require("../assets/images/index/TapToBegin.png")}
            style={styles.taptobegin}
          />
        </MotiView>
      </MotiView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  taptobegin: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
  },
  background: {
    position: "absolute",
    width: 400,
    height: 400,
    bottom: 50,
    alignSelf: "center",
  },
});
