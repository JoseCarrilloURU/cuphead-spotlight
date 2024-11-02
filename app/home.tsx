import { Image, View, Pressable, TextInput, StyleSheet } from "react-native";
import { Easing } from "react-native-reanimated";
import React, { useState, useEffect } from "react";
import { router, SplashScreen } from "expo-router";
import { playSound } from "../components/soundUtils";
import LottieView from "lottie-react-native";
import { MotiView, MotiImage, MotiText } from "moti";
import AnimatedButton from "../components/AnimatedButton";
import { setTransition } from "../components/globals";

export default function Home() {
  const handleBack = () => {
    setTransition(true);
    setTimeout(() => {
      setTransition(false);
      router.navigate("/");
    }, 750);
  };

  return (
    <View style={{ backgroundColor: "blue+.3", width: "100%", height: "100%" }}>
      <AnimatedButton
        onPress={handleBack}
        source={require("../assets/images/index/gobacktologin.png")}
        style={homestyles.goback}
      />
    </View>
  );
}

const homestyles = StyleSheet.create({
  goback: {
    position: "absolute",
    width: 170,
    height: 60,
    top: 712,
    left: 110,
    zIndex: 6,
  },
});
