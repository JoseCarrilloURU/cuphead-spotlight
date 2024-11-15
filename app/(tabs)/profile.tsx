import {
  ScrollView,
  Image,
  Text,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import React, { useState, useEffect } from "react";
import { router, SplashScreen } from "expo-router";
import { playSound } from "@/components/soundUtils";
import LottieView from "lottie-react-native";
import { MotiView, MotiImage, MotiText } from "moti";
import AnimatedButton from "@/components/AnimatedButton";
import HomeHeader from "@/components/homeHeader";
import { setTransition } from "@/components/globals";

export default function Home() {
  return (
    <View>
      <View
        pointerEvents={"none"}
        style={{
          position: "absolute",
          backgroundColor: "black",
          opacity: 0.6,
          width: 400,
          height: 800,
          zIndex: 0,
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
      <HomeHeader placeholder={"Search TV Shows..."} isProfile={true} />
    </View>
  );
}

const tab1styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: 900,
    height: 900,
    top: -44,
    left: -254,
    zIndex: -1,
  },
});
