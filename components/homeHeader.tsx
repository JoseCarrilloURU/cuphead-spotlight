import { Image, Text, View, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { playSound } from "@/components/soundUtils";
import AnimatedButton from "@/components/AnimatedButton";
import routerTransition from "./routerTransition";

interface HomeHeaderProps {
  placeholder: string;
  originTab: number;
  searchValue: string;
  setModalShown: (shown: boolean) => void;
  username: string;
  emailUser: string;
  personid: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  placeholder,
  originTab,
  searchValue,
  setModalShown,
  username,
  emailUser,
  personid,
}) => {
  const [searchText, setSearchText] = useState(searchValue);
  const [deleteModalShown, setDeleteModalShown] = useState(false);

  const handleLogOutPressed = async () => {
    console.log("Log Out Pressed");
    await playSound(require("@/assets/sound/Back.wav"));
    routerTransition("navigate", "/", {});
  };

  const handleBackToHome = async () => {
    console.log("Back To Home Pressed");
    await playSound(require("@/assets/sound/Back.wav"));
    routerTransition("replace", "/(tabs)/discover", {
      personId: personid,
    });
  };

  const handleGoBack = async () => {
    console.log("Go Back Pressed");
    await playSound(require("@/assets/sound/Back.wav"));
    routerTransition("back", "/", {});
  };

  const handleSearchFiltersPressed = () => {
    console.log("Search Filters Pressed");
    setModalShown(true);
  };

  const handleDeleteAccount = async (personid: string) => {
    console.log("Delete Account Pressed");
    try {
      const response = await fetch(
        "https://backend-rottentomatoes.onrender.com/deleteAccount",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personid,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `response was not ok: ${response.statusText} - ${errorText}`
        );
      }

      const responseData = await response.json();
      console.log("Account deleted successfully:", responseData);
      routerTransition("navigate", "/", {});
      return responseData;
    } catch (error) {
      console.error("Error deleting account:", error);
      return null;
    }
  };

  const handleSearchGo = async () => {
    console.log("Search Go Pressed");
    await playSound(require("@/assets/sound/Go.wav"));
    routerTransition("replace", "/search", {
      placeholder: placeholder,
      originTab: originTab,
      searchText: searchText,
      personId: personid,
    });
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
      {originTab <= 4 && (
        <AnimatedButton
          onPress={handleLogOutPressed}
          source={require("@/assets/images/home/LogOut.png")}
          style={headerstyles.logoutbutton}
          disabled={false}
        />
      )}
      {originTab >= 6 && (
        <AnimatedButton
          onPress={handleGoBack}
          source={require("@/assets/images/home/GoBack.png")}
          style={headerstyles.logoutbutton}
          disabled={false}
        />
      )}
      {originTab === 5 && (
        <AnimatedButton
          onPress={handleBackToHome}
          source={require("@/assets/images/home/BackToHome.png")}
          style={headerstyles.logoutbutton}
          disabled={false}
        />
      )}
      {
        originTab !== 4 && (
          <View>
            <Image
              source={require("@/assets/images/home/searchbar.png")}
              style={headerstyles.searchbar}
            />
            <TextInput
              style={headerstyles.searchtext}
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
              placeholder={placeholder}
              placeholderTextColor="#555"
              keyboardType="email-address"
              numberOfLines={1}
              maxLength={20}
            />
            <AnimatedButton
              onPress={handleSearchFiltersPressed}
              source={require("@/assets/images/home/FiltersButton.png")}
              style={headerstyles.searchfiltersbutton}
              disabled={false}
            />
            <AnimatedButton
              onPress={handleSearchGo}
              source={require("@/assets/images/home/searchicon2.png")}
              style={headerstyles.searchicon}
              disabled={false}
            />
          </View>
        ) /* isProfile && BOTON DE ELIMINAR CUENTA, NOMBRE DE USUARIO Y E-MAIL */
      }

      {originTab === 4 && (
        <View>
          <AnimatedButton
            onPress={handleDeleteAccount}
            source={require("@/assets/images/home/DeleteAccount.png")}
            style={headerstyles.searchfiltersbutton}
            disabled={false}
          />
          <Text
            style={headerstyles.username}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Welcome, {username}!
          </Text>
          <Text
            style={headerstyles.email}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {emailUser}
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
