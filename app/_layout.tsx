import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, View, Image, StyleSheet } from "react-native";
import * as Font from "expo-font";
import useDisableBackButton from "../components/useDisableBackButton";
import { playSound } from "../components/soundUtils";

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
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
        volume: 0.4,
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
      </View>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}

const texturestyle = StyleSheet.create({
  texture: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 85,
  },
  shade: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 84,
  },
});
