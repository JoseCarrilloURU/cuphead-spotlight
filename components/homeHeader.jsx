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
import { setTransition } from "@/components/globals";

const HomeHeader = ({ placeholder, isProfile }) => {
  useEffect(() => {
    setTimeout(() => {
      setTransition(false);
    }, 500);
  }, []);

  const handleLogOutPressed = async () => {
    console.log("Log Out Pressed");

    setTransition(true);
    await playSound(require("@/assets/sound/Back.wav"));

    setTimeout(() => {
      setTransition(false);
      router.navigate("../");
    }, 1000);
  };

  const handleSearchFiltersPressed = () => {
    console.log("Search Filters Pressed");
  };
  const handleDeleteAccount = () => {
    console.log("Delete Account Pressed");
  };

  const handleSearchGo = () => {
    console.log("Search Go Pressed");
  };
  return (
    <View>
      <Image
        source={require("@/assets/images/home/header.png")}
        style={headerstyles.header}
      />
      <Image
        source={require("@/assets/images/home/logo.png")}
        style={headerstyles.logo}
      />
      <Text style={headerstyles.padncar}>
        Pad N' Carrillo Entertainment Inc.
      </Text>
      <AnimatedButton
        onPress={handleLogOutPressed}
        source={require("@/assets/images/home/LogOut.png")}
        style={headerstyles.logoutbutton}
      />
      {
        !isProfile && (
          <View>
            <Image
              source={require("@/assets/images/home/searchbar.png")}
              style={headerstyles.searchbar}
            />
            <TextInput
              style={headerstyles.searchtext}
              placeholder={placeholder}
              placeholderTextColor="#555"
              keyboardType="email-address"
              numberOfLines={1}
              ellipsizeMode="tail"
              maxLength={50}
            />
            <AnimatedButton
              onPress={handleSearchFiltersPressed}
              source={require("@/assets/images/home/FiltersButton.png")}
              style={headerstyles.searchfiltersbutton}
            />
            <AnimatedButton
              onPress={handleSearchGo}
              source={require("@/assets/images/home/searchicon2.png")}
              style={headerstyles.searchicon}
            />
          </View>
        ) /* isProfile && BOTON DE ELIMINAR CUENTA, NOMBRE DE USUARIO Y E-MAIL */
      }
      {isProfile && (
        <View>
          <AnimatedButton
            onPress={handleDeleteAccount}
            source={require("@/assets/images/home/DeleteAccount.png")}
            style={headerstyles.searchfiltersbutton}
          />
          <Text
            style={headerstyles.username}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Welcome, user!
          </Text>
          <Text
            style={headerstyles.email}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            yourmail@email.com
          </Text>
        </View>
      )}
    </View>
  );
};

const headerstyles = StyleSheet.create({
  logoutbutton: {
    position: "absolute",
    width: 80,
    height: 80,
    top: 52,
    left: 32,
  },
  searchfiltersbutton: {
    position: "absolute",
    width: 80,
    height: 80,
    top: 52,
    left: 282,
    zIndex: 6,
  },
  searchicon: {
    position: "absolute",
    width: 43,
    height: 43,
    top: 146,
    left: 305,
    zIndex: 6,
  },
  email: {
    position: "absolute",
    fontFamily: "BaseFont",
    fontSize: 20,
    width: 350,
    height: 40,
    backgroundColor: "transparent",
    color: "#ffefe0",
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    top: 166,
    left: 20,
    textAlign: "center",
    zIndex: 8,
  },
  username: {
    position: "absolute",
    fontFamily: "BoldFont",
    fontSize: 30,
    width: 360,
    height: 40,
    backgroundColor: "transparent",
    color: "#ffe02f",
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    top: 135,
    left: 16,
    textAlign: "center",

    zIndex: 8,
  },
  searchtext: {
    position: "absolute",
    fontFamily: "BaseFont",
    fontSize: 20,
    width: 280,
    height: 60,
    padding: 10,
    backgroundColor: "transparent",
    color: "#000",
    top: 135,
    left: 32,
    zIndex: 8,
  },
  searchbar: {
    position: "absolute",
    width: 335,
    height: 83,
    top: 130,
    left: 28,
    zIndex: 6,
  },
  logo: {
    position: "absolute",
    width: 145,
    height: 72.5,
    top: 54,
    left: 123,
    zIndex: 6,
  },
  header: {
    position: "absolute",
    width: 397,
    height: 288,
    top: -21,
    left: 0,
    zIndex: 5,
  },
  padncar: {
    fontFamily: "PadNCarrilloFont",
    fontSize: 13,
    position: "absolute",
    top: 208,
    left: 47,
    opacity: 0.8,
    zIndex: 6,
  },
});

export default HomeHeader;
