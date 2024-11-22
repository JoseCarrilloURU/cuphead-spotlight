import {
  ScrollView,
  Image,
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import React, { useState, useEffect } from "react";
import { router, SplashScreen } from "expo-router";
import { playSound } from "@/components/soundUtils";
import LottieView from "lottie-react-native";
import { MotiView, MotiImage, MotiText } from "moti";
import HomeHeader from "@/components/homeHeader";
import tabstyles from "../tabstyles";
import {
  mockPosterMap,
  backdropImageMap,
  getFlagImageForNumber,
  getFlagVideoForNumber,
} from "@/components/imageMaps";
import AnimatedButton from "@/components/AnimatedButton";
import routerTransition from "@/components/routerTransition";

interface Movie {
  id: number;
  title: string;
  score: number;
  date: string;
}

interface Review {
  id: number;
  type: string;
  title: string;
  myscore: number;
  date: string;
  duration: string;
  myreview: string;
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

const Reviews: Review[] = [
  {
    id: 1,
    type: "TV Show",
    title: "Arcane",
    myscore: 100,
    date: "Nov 06, 2021",
    duration: "18 eps",
    myreview:
      "This might easily the best peace of science fiction ever created. Everything from the animation to the characters is just perfect.",
  },
  {
    id: 2,
    type: "Movie",
    title: "The Wild Robot",
    myscore: 80,
    date: "Sep 12, 2024",
    duration: "1h 42m",
    myreview:
      "The Wild Robot is one of the most bawling-prone movies ever, delightful with its incredible animation and score.",
  },
];

export default function Home() {
  const handleItemPress = (/*id: number*/) => {
    console.log("Item Pressed");
    routerTransition("push", "/movie", {});
  };

  const GoToFirstPage = (/*id: number*/) => {
    console.log("Previous Page Pressed");
  };
  const handlePreviousPage = (/*id: number*/) => {
    console.log("Previous Page Pressed");
  };
  const handleNextPage = (/*id: number*/) => {
    console.log("Next Page Pressed");
  };
  const GoToLastPage = (/*id: number*/) => {
    console.log("Next Page Pressed");
  };

  const Movie: React.FC<Movie> = ({ id, title, score, date }) => (
    <View style={tabstyles.itemContainer}>
      <Pressable onPress={handleItemPress}>
        <Image
          source={require("@/assets/images/home/itemcard.png")}
          style={tabstyles.itemCard}
        />
        <Image source={mockPosterMap[id]} style={tabstyles.itemPoster} />
      </Pressable>
      <Image
        source={require("@/assets/images/home/scorebadge.png")}
        style={tabstyles.itemScoreBadge}
      />
      <Text style={tabstyles.itemScore}>{score}</Text>
      {/* <Image
        source={getFlagImageForNumber(score)}
        style={tabstyles.imgScoreFlag}
      /> */}
      <LottieView
        source={getFlagVideoForNumber(score)}
        loop={true}
        speed={0.6}
        autoPlay
        style={tabstyles.itemScoreFlag}
      />
      <Text style={tabstyles.itemTitle} numberOfLines={2} ellipsizeMode="tail">
        {title}
      </Text>
      <Text style={tabstyles.itemDate} numberOfLines={1} ellipsizeMode="tail">
        {date}
      </Text>
    </View>
  );

  const Review: React.FC<Review> = ({
    id,
    type,
    title,
    myscore,
    date,
    duration,
    myreview,
  }) => (
    <View style={profilestyles.itemContainer}>
      <Pressable onPress={handleItemPress}>
        <Image
          source={require("@/assets/images/home/searchcard.png")}
          style={profilestyles.itemCard}
        />
        <Image source={mockPosterMap[id]} style={profilestyles.itemPoster} />
        <Image
          source={require("@/assets/images/home/scorebadge.png")}
          style={profilestyles.itemScoreBadge}
        />
        <Text style={profilestyles.itemScore}>{myscore}</Text>
        {/* <Image
          source={getFlagImageForNumber(score)}
          style={searchstyles.imgScoreFlag}
        /> */}
        <LottieView
          source={getFlagVideoForNumber(myscore)}
          loop={true}
          speed={0.6}
          autoPlay
          style={profilestyles.itemScoreFlag}
        />
        <Text
          style={profilestyles.itemTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Review: {title}
        </Text>
        <Text
          style={profilestyles.itemData}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {type} - {duration} - {date}
        </Text>
        <Text
          style={profilestyles.itemDesc}
          ellipsizeMode="tail"
          numberOfLines={4}
        >
          {myreview}
        </Text>
        <Text style={profilestyles.yourscore}>Your Score:</Text>
      </Pressable>
    </View>
  );

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
        style={tabstyles.background}
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
      <ScrollView>
        <HomeHeader placeholder={""} originTab={4} searchValue={""} />
        <View style={tabstyles.listcontainer}>
          <Image
            source={require("@/assets/images/home/stripbg.png")}
            style={tabstyles.stripbg}
          />
          <Text style={tabstyles.stripTitle} numberOfLines={1}>
            In Your Watchlist
          </Text>
          <Image source={backdropImageMap[1]} style={tabstyles.backdrop} />
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
        <View style={tabstyles.listcontainer2}>
          <Image
            source={require("@/assets/images/home/stripbg.png")}
            style={tabstyles.stripbg}
          />
          <Text style={tabstyles.stripTitle} numberOfLines={1}>
            Last Seen by You
          </Text>
          <Image source={backdropImageMap[2]} style={tabstyles.backdrop2} />
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
        <Text style={profilestyles.yourreviews}>Your Reviews</Text>
        <View style={profilestyles.listcontainer}>
          <FlatList
            data={Reviews}
            renderItem={({ item }) => (
              <Review
                id={item.id}
                type={item.type}
                title={item.title}
                myscore={item.myscore}
                date={item.date}
                duration={item.duration}
                myreview={item.myreview}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          ></FlatList>
        </View>
        <AnimatedButton
          onPress={GoToFirstPage}
          source={require("@/assets/images/home/First.png")}
          style={profilestyles.firstpage}
          disabled={true}
        />
        <AnimatedButton
          onPress={handlePreviousPage}
          source={require("@/assets/images/home/Previous.png")}
          style={profilestyles.prevpage}
          disabled={true}
        />
        <AnimatedButton
          onPress={handleNextPage}
          source={require("@/assets/images/home/Next.png")}
          style={profilestyles.nextpage}
          disabled={false}
        />
        <AnimatedButton
          onPress={GoToLastPage}
          source={require("@/assets/images/home/Last.png")}
          style={profilestyles.lastpage}
          disabled={false}
        />
        <Image
          source={require("@/assets/images/home/page.png")}
          style={profilestyles.currentpage}
        />
        <Text style={profilestyles.currentpagenum} numberOfLines={1}>
          1
        </Text>
      </ScrollView>
    </View>
  );
}

const profilestyles = StyleSheet.create({
  firstpage: {
    position: "absolute",
    width: 68,
    height: 68,
    top: 2,
    left: 5,
  },
  prevpage: {
    position: "absolute",
    width: 68,
    height: 68,
    top: -6,
    left: 83,
  },
  currentpage: {
    position: "relative",
    width: 70,
    height: 70,
    top: -10,
    left: 162,
  },
  nextpage: {
    position: "absolute",
    width: 68,
    height: 68,
    top: -6,
    left: 240,
  },
  lastpage: {
    position: "absolute",
    width: 65,
    height: 65,
    top: 2,
    left: 320,
  },
  currentpagenum: {
    position: "relative",
    width: 70,
    height: 70,
    top: -69,
    left: 161,
    fontSize: 30,
    fontFamily: "BoldFont",
    color: "#111",
    zIndex: 1,
    textAlign: "center",
    textShadowColor: "#fff",
    marginBottom: -50,
  },
  itemContainer: {
    marginLeft: 12,
    marginBottom: 35,
  },
  itemCard: {
    position: "relative",
    width: 370,
    height: 165,
  },
  itemPoster: {
    position: "absolute",
    width: 92,
    height: 138,
    top: 11,
    left: 16,
    opacity: 1,
    borderStyle: "solid",
    borderColor: "#222",
    borderWidth: 1,
  },
  itemTitle: {
    position: "absolute",
    height: 26,
    width: 222,
    top: 17,
    left: 116,
    fontSize: 18,
    textDecorationLine: "underline",
    fontFamily: "BoldFont",
    color: "#000",
    zIndex: 1,
    // textShadowRadius: 9,
    // textShadowColor: "#000",
    // textShadowOffset: { width: 3, height: 1 },
    borderColor: "black",
    borderWidth: 0,
  },
  itemData: {
    position: "absolute",
    width: 225,
    height: 25,
    top: 38,
    left: 116,
    fontSize: 16,
    fontFamily: "BaseFont",
    color: "#222",
    zIndex: 1,
    borderColor: "black",
    borderWidth: 0,
    // textShadowRadius: 6,
    // textShadowColor: "#000",
    // textShadowOffset: { width: 3, height: 1 },
  },
  itemDesc: {
    position: "absolute",
    width: 209,
    height: 90,
    top: 60,
    left: 116,
    fontSize: 16,
    fontFamily: "BaseFont",
    color: "#555",
    zIndex: 1,
    borderColor: "black",
    borderWidth: 0,
    // textShadowRadius: 6,
    // textShadowColor: "#000",
    // textShadowOffset: { width: 3, height: 1 },
  },
  itemScore: {
    position: "absolute",
    width: 70,
    height: 70,
    top: 161.5,
    left: 311.4,
    fontSize: 15,
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
    width: 60,
    height: 60,
    top: 142,
    left: 317.8,
    zIndex: 1,
  },
  itemScoreFlag: {
    position: "absolute",
    width: 60,
    height: 120,
    top: 68,
    left: 322,
    transform: [{ rotate: "-10deg" }],
  },
  imgScoreFlag: {
    position: "absolute",
    width: 50,
    height: 100,
    top: 68,
    left: 325,
    transform: [{ rotate: "-8deg" }],
  },
  listcontainer: {
    marginTop: 50,
    height: "auto",
    // marginBottom: 80,
  },
  yourreviews: {
    position: "absolute",
    height: "auto",
    width: 262,
    top: 1083,
    left: 64,
    textDecorationLine: "underline",
    fontSize: 40,
    fontFamily: "BoldFont",
    color: "#ccbcab",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    borderColor: "black",
    lineHeight: 50,
    borderWidth: 0,
    textAlign: "center",
  },
  yourscore: {
    position: "relative",
    width: 133,
    top: -1.5,
    left: 242,
    fontSize: 14,
    fontFamily: "BoldFont",
    textDecorationLine: "underline",
    color: "#ccbcab",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    borderColor: "black",
    borderWidth: 0,
    lineHeight: 20,
  },
});
