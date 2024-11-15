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
import { setTransition } from "@/components/globals";

interface Movie {
  id: number;
  title: string;
  score: number;
  date: string;
}

const Movies: Movie[] = [
  {
    id: 1,
    title: "Arcane",
    score: 88,
    date: "Nov 06, 2021",
  },
  {
    id: 2,
    title: "The Wild Robot",
    score: 84,
    date: "Sep 12, 2024",
  },
  {
    id: 3,
    title: "Venom: The Last Dance",
    score: 64,
    date: "Oct 24, 2024",
  },
  {
    id: 4,
    title: "Sharknado",
    score: 33,
    date: "July 11, 2013",
  },
];

export default function Home() {
  const handleItemPress = (/*id: number*/) => {
    console.log("Item Pressed");
  };

  const Movie: React.FC<Movie> = ({ id, title, score, date }) => (
    <View style={tab1styles.itemContainer}>
      <Pressable onPress={handleItemPress}>
        <Image
          source={require("@/assets/images/home/itemcard.png")}
          style={tab1styles.itemCard}
        />
        <Image source={mockPosterMap[id]} style={tab1styles.itemPoster} />
      </Pressable>
      <Image
        source={require("@/assets/images/home/scorebadge.png")}
        style={tab1styles.itemScoreBadge}
      />
      <Text style={tab1styles.itemScore}>{score}</Text>
      {/* <Image
        source={getFlagImageForNumber(score)}
        style={tab1styles.itemScoreFlag}
      /> */}
      <LottieView
        source={getFlagVideoForNumber(score)}
        loop={true}
        speed={0.6}
        autoPlay
        style={tab1styles.itemScoreFlag}
      />
      <Text style={tab1styles.itemTitle} numberOfLines={2} ellipsizeMode="tail">
        {title}
      </Text>
      <Text style={tab1styles.itemDate} numberOfLines={1} ellipsizeMode="tail">
        {date}
      </Text>
    </View>
  );

  return (
    <View>
      <View
        pointerEvents={"none"}
        style={{
          position: "absolute",
          backgroundColor: "black",
          opacity: 0.5,
          width: 400,
          height: 800,
          zIndex: 0,
        }}
      />
      <MotiImage
        source={require("@/assets/images/backgrounds/bg_discover.png")}
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
      <ScrollView>
        <HomeHeader placeholder={"Search Movies & TV..."} isProfile={false} />
        <View style={tab1styles.listcontainer}>
          <Image
            source={require("@/assets/images/home/stripbg.png")}
            style={tab1styles.stripbg}
          />
          <Text style={tab1styles.stripTitle} numberOfLines={1}>
            Trending Right Now
          </Text>
          <Image source={backdropImageMap[1]} style={tab1styles.backdrop} />
          <FlatList
            data={Movies}
            renderItem={({ item }) => (
              <Movie
                id={item.id}
                title={item.title}
                score={item.score}
                date={item.date}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          ></FlatList>
        </View>
        <View style={tab1styles.listcontainer2}>
          <Image
            source={require("@/assets/images/home/stripbg.png")}
            style={tab1styles.stripbg}
          />
          <Text style={tab1styles.stripTitle} numberOfLines={1}>
            Top Rated This Year
          </Text>
          <Image source={backdropImageMap[2]} style={tab1styles.backdrop2} />
          <FlatList
            data={Movies}
            renderItem={({ item }) => (
              <Movie
                id={item.id}
                title={item.title}
                score={item.score}
                date={item.date}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={tab1styles.listcontainer2}>
          <Image
            source={require("@/assets/images/home/stripbg.png")}
            style={tab1styles.stripbg}
          />
          <Text style={tab1styles.stripTitle} numberOfLines={1}>
            Your Watchlist
          </Text>
          <Image source={backdropImageMap[3]} style={tab1styles.backdrop} />
          <FlatList
            data={Movies}
            renderItem={({ item }) => (
              <Movie
                id={item.id}
                title={item.title}
                score={item.score}
                date={item.date}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={tab1styles.listcontainer2}>
          <Image
            source={require("@/assets/images/home/stripbg.png")}
            style={tab1styles.stripbg}
          />
          <Text style={tab1styles.stripTitle} numberOfLines={1}>
            Last Seen By You
          </Text>
          <Image source={backdropImageMap[4]} style={tab1styles.backdrop} />
          <FlatList
            data={Movies}
            renderItem={({ item }) => (
              <Movie
                id={item.id}
                title={item.title}
                score={item.score}
                date={item.date}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const tab1styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    width: 240,
    height: 240,
    top: 25,
    left: 75,
    opacity: 0.4,
  },
  backdrop2: {
    position: "absolute",
    width: 280,
    height: 240,
    top: 25,
    left: 50,
    opacity: 0.4,
  },
  stripbg: {
    position: "absolute",
    width: 400,
    height: 425,
    opacity: 0.7,
    top: -50,
  },
  itemContainer: {
    marginRight: 30,
    marginLeft: 18,
  },
  itemCard: {
    position: "relative",
    width: 150,
    height: 230,
  },
  itemPoster: {
    position: "absolute",
    width: 136,
    height: 202,
    top: 11,
    left: 2.5,
    borderStyle: "solid",
    borderColor: "#222",
    borderWidth: 1,
  },
  itemTitle: {
    position: "relative",
    width: 133,
    top: 2,
    left: 5,
    fontSize: 16,
    fontFamily: "BoldFont",
    color: "#ccbcab",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: -1 },
    borderColor: "transparent",
    borderWidth: 1,
  },
  itemDate: {
    position: "relative",
    width: 140,
    height: 140,
    top: 1,
    left: 5,
    fontSize: 16,
    fontFamily: "BaseFont",
    color: "#ccbcab",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: -1 },
  },
  itemScore: {
    position: "absolute",
    width: 70,
    height: 70,
    top: 195.5,
    left: 106.8,
    fontSize: 25,
    fontFamily: "BoldFont",
    color: "#ccbcab",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textAlign: "center",
    textShadowOffset: { width: 2, height: 2 },
  },
  itemScoreBadge: {
    position: "absolute",
    width: 75,
    height: 75,
    top: 175,
    left: 105,
    zIndex: 1,
  },
  itemScoreFlag: {
    position: "absolute",
    width: 70,
    height: 140,
    top: 98,
    left: 115,
    transform: [{ rotate: "-5deg" }],
  },
  stripTitle: {
    width: 400,
    top: -6,
    left: 15,
    fontSize: 18,
    fontFamily: "PadNCarrilloFont",
    color: "#f8e7d5",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    borderColor: "transparent",
    borderWidth: 1,
  },
  listcontainer: {
    marginTop: 300,
    height: 380,
  },
  listcontainer2: {
    marginTop: 40,
    height: 380,
  },
  background: {
    position: "absolute",
    width: 900,
    height: 900,
    top: -44,
    left: -254,
    zIndex: -1,
  },
});
