import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, View, Image, StyleSheet, StatusBar } from "react-native";
import * as Font from "expo-font";
import useDisableBackButton from "../components/useDisableBackButton";
import { MotiView } from "moti";
import { playSound } from "../components/soundUtils";
import LottieView from "lottie-react-native";
import { useTransition } from "../hooks/useTransition";

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const isTransitioning = useTransition();

  if (Platform.OS === "android") {
    useDisableBackButton();
  }

  const loadFonts = async () => {
    await Font.loadAsync({
      PadNCarrilloFont: require("../assets/fonts/CupheadFelix-Regular-merged.ttf"),
      BaseFont: require("../assets/fonts/CupheadVogue-Bold-merged.ttf"),
      BoldFont: require("../assets/fonts/CupheadVogue-ExtraBold.otf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    const loadSFX = async () => {
      await playSound(require("../assets/sound/OldFilmLoop.wav"), {
        isLooping: true,
        volume: 0.6,
      });
      loadFonts();
    };

    loadSFX();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 80,
        }}
      >
        <Image
          source={require("../assets/images/graintexture.png")}
          style={texturestyle.texture}
        />
        <Image
          source={require("../assets/images/inshade.png")}
          style={texturestyle.shade}
        />
        <LottieView
          source={require("../assets/images/scratchgrain.json")}
          loop={true}
          speed={1.0}
          autoPlay
          style={texturestyle.scratch}
        />
        <MotiView
          from={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ type: "timing", duration: 1800, delay: 1000 }}
          style={texturestyle.fadescreen}
        />
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 1 : 0 }}
          transition={{ type: "timing", duration: 500 }}
          style={texturestyle.fadescreen}
        />
      </View>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="search" />
      </Stack>
    </View>
  );
}

const texturestyle = StyleSheet.create({
  texture: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.25,
    zIndex: 84,
  },
  scratch: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.8,
    zIndex: 84,
  },
  shade: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 85,
  },
  fadescreen: {
    backgroundColor: "black",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 80,
  },
});
