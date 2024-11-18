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
  getFlagImageForNumber,
  getFlagVideoForNumber,
} from "@/components/imageMaps";
import tabstyles from "../tabstyles";
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
  const [bestToggle, setBestToggle] = useState(false);

  const handleItemPress = (/*id: number*/) => {
    console.log("Item Pressed");
  };

  const handleBestToggle = () => {
    console.log("Best Toggle Pressed");
    setBestToggle(!bestToggle);
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
      <Image
        source={getFlagImageForNumber(score)}
        style={tabstyles.imgScoreFlag}
      />
      {/* <LottieView
        source={getFlagVideoForNumber(score)}
        loop={true}
        speed={0.6}
        autoPlay
        style={tabstyles.itemScoreFlag}
      /> */}
      <Text style={tabstyles.itemTitle} numberOfLines={2} ellipsizeMode="tail">
        {title}
      </Text>
      <Text style={tabstyles.itemDate} numberOfLines={1} ellipsizeMode="tail">
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
        source={require("@/assets/images/backgrounds/bg_tv.png")}
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
        <HomeHeader
          placeholder={"Search TV Shows..."}
          originTab={3}
          searchValue={""}
        />
        <View style={tabstyles.listcontainer}>
          <Image
            source={require("@/assets/images/home/stripbg.png")}
            style={tabstyles.stripbg}
          />
          <Text style={tabstyles.stripTitle} numberOfLines={1}>
            Most Popular in TV
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
          ></FlatList>
        </View>
        <View style={tabstyles.listcontainer2}>
          <Image
            source={require("@/assets/images/home/stripbg.png")}
            style={tabstyles.stripbg}
          />
          <Text style={tabstyles.stripTitle} numberOfLines={1}>
            The Best TV Shows
          </Text>
          <Pressable
            onPress={handleBestToggle}
            style={{
              borderColor: "black",
              borderWidth: 2,
              borderStyle: "solid",
              position: "absolute",
              top: 28,
              right: 0,
              zIndex: 14,
            }}
          >
            <MotiText
              from={{ scale: 1.1, opacity: 1 }}
              animate={bestToggle ? { scale: 0.8, opacity: 0.4 } : {}}
              transition={{
                type: "timing",
                duration: 800,
              }}
              style={tabstyles.toggle1}
            >
              This Year
            </MotiText>
            <MotiText
              from={{ scale: 0.8, opacity: 0.4 }}
              animate={bestToggle ? { scale: 1.1, opacity: 1 } : {}}
              transition={{
                type: "timing",
                duration: 800,
              }}
              style={tabstyles.toggle2}
            >
              All Time
            </MotiText>
          </Pressable>
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
        <View style={tabstyles.listcontainer2}>
          <Image
            source={require("@/assets/images/home/stripbg.png")}
            style={tabstyles.stripbg}
          />
          <Text style={tabstyles.stripTitle} numberOfLines={1}>
            Best in Drama TV
          </Text>
          <Image source={backdropImageMap[3]} style={tabstyles.backdrop} />
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
            Last Seen By You
          </Text>
          <Image source={backdropImageMap[4]} style={tabstyles.backdrop} />
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
