import {
  ScrollView,
  Image,
  Text,
  View,
  FlatList,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import React, { useState, useEffect } from "react";
import { router, SplashScreen } from "expo-router";
import { playSound } from "@/components/soundUtils";
import LottieView from "lottie-react-native";
import { MotiView, MotiImage, MotiText } from "moti";
import AnimatedButton from "@/components/AnimatedButton";
import HomeHeader from "@/components/homeHeader";
import {
  mockPosterMap,
  backdropImageMap,
  getFlagVideoForNumber,
} from "@/components/imageMaps";
import routerTransition from "@/components/routerTransition";

export default function Movie() {
  return (
    <View>
      <View
        pointerEvents={"none"}
        style={{
          position: "absolute",
          backgroundColor: "black",
          opacity: 0.6,
          width: 400,
          height: 900,
          zIndex: 0,
        }}
      />
      <MotiImage
        source={require("@/assets/images/backgrounds/bg_movies.png")}
        style={moviestyles.background}
        // from={{
        //   transform: [{ rotateZ: "0deg" }],
        // }}
        // animate={{
        //   transform: [{ rotateZ: "-360deg" }],
        // }}
        // transition={{
        //   type: "timing",
        //   duration: 45000,
        //   loop: true,
        //   repeatReverse: false,
        //   easing: Easing.linear,
        // }}
      />
      <HomeHeader placeholder="Search Movies..." originTab={6} searchValue="" />
    </View>
  );
}

const moviestyles = StyleSheet.create({
  background: {
    position: "absolute",
    width: 900,
    height: 900,
    top: -30,
    left: -254,
    zIndex: -1,
  },
});
