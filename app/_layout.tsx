import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, View, Image, StyleSheet } from "react-native";
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
          transition={{ type: "timing", duration: 1000, delay: 1000 }}
          style={texturestyle.fadescreen}
        />
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 1 : 0 }}
          transition={{ type: "timing", duration: 600 }}
          style={texturestyle.fadescreen}
        />
      </View>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        {/*VER TRANSICIONES DE NAVIGATOR, Y MANEJAR OPACIDAD DE LAYOUT DESDE INDEX*/}
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
    opacity: 0.6,
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
