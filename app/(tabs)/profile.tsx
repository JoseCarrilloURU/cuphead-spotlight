import { Image, View, Pressable, TextInput, StyleSheet } from "react-native";
import { Easing } from "react-native-reanimated";
import React, { useState, useEffect } from "react";
import { router, SplashScreen } from "expo-router";
import { playSound } from "@/components/soundUtils";
import LottieView from "lottie-react-native";
import { MotiView, MotiImage, MotiText } from "moti";
import AnimatedButton from "@/components/AnimatedButton";
import { setTransition } from "@/components/globals";

export default function Home() {
  return (
    <View>
      <View
        style={{
          backgroundColor: "black",
          opacity: 0.6,
          width: "100%",
          height: "100%",
        }}
      />
      <MotiImage
        source={require("@/assets/images/backgrounds/bg_profile.png")}
        style={tab1styles.background}
        from={{
          transform: [{ rotateZ: "0deg" }],
        }}
        animate={{
          transform: [{ rotateZ: "-360deg" }],
        }}
        transition={{
          type: "timing",
          duration: 45000,
          loop: true,
          repeatReverse: false,
          easing: Easing.linear,
        }}
      />
    </View>
  );
}

const tab1styles = StyleSheet.create({
  goback: {
    position: "absolute",
    width: 170,
    height: 60,
    top: 712,
    left: 110,
    zIndex: 6,
  },
  background: {
    position: "absolute",
    width: 900,
    height: 900,
    top: -38,
    left: -260,
    zIndex: -1,
    alignSelf: "center",
  },
});
