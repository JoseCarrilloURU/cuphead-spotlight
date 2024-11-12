import { Tabs } from "expo-router";
import { Image, View, Pressable, TextInput, StyleSheet } from "react-native";
import { Easing } from "react-native-reanimated";
import React, { useState, useEffect } from "react";
import { router, SplashScreen } from "expo-router";
import LottieView from "lottie-react-native";
import { MotiView, MotiImage, MotiText } from "moti";
import { Audio } from "expo-av";
import AnimatedButton from "@/components/AnimatedButton";
import { setTransition } from "@/components/globals";
import { TabBarIcon } from "@/components/TabBarIcon";

const preloadMusic = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("@/assets/sound/appMusic.wav"),
    {
      isLooping: true,
      volume: 0.4,
    }
  );
  await setTimeout(() => {
    sound.playAsync();
  }, 400);
  return sound;
};

export default function HomeTabLayout() {
  const [music, setMusic] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setTransition(false);
    }, 350);
    const loadAndPlayMusic = async () => {
      const sound = await preloadMusic();
      setMusic(sound);
    };

    loadAndPlayMusic();
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        lazy: false,
        tabBarStyle: {
          backgroundColor: "#c66242",
          borderColor: "#d7c7b5",
          borderWidth: 5,
          borderTopWidth: 5,
          borderStyle: "solid",
          height: 70,
        },
        tabBarActiveTintColor: "#ccbcab",
        tabBarInactiveTintColor: "#ccbcab",
        tabBarLabelStyle: {
          fontFamily: "BaseFont",
          fontSize: 14,
          paddingBottom: 2.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "planet" : "planet-outline"}
              size={focused ? 32 : 26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="movies"
        options={{
          title: "Movies",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "ticket" : "ticket-outline"}
              size={focused ? 32 : 26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tv"
        options={{
          title: "TV Shows",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "tv" : "tv-outline"}
              size={focused ? 32 : 26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "My Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person-circle" : "person-circle-outline"}
              size={focused ? 32 : 26}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
