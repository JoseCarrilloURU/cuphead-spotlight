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
import { useLocalSearchParams } from "expo-router";
import { playSound } from "@/components/soundUtils";
import LottieView from "lottie-react-native";
import { MotiView, MotiImage, MotiText } from "moti";
import AnimatedButton from "@/components/AnimatedButton";
import HomeHeader from "@/components/homeHeader";
import {
  mockPosterMap,
  searchBGMap,
  getFlagImageForNumber,
  getFlagVideoForNumber,
} from "@/components/imageMaps";
import routerTransition from "@/components/routerTransition";

interface Movie {
  id: number;
  type: string;
  title: string;
  score: number;
  date: string;
  duration: string;
  desc: string;
}



const Movies: Movie[] = [
  {
    id: 1,
    type: "TV Show",
    title: "Arcane",
    score: 88,
    date: "Nov 06, 2021",
    duration: "18 eps",
    desc: "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
  },
  {
    id: 2,
    type: "Movie",
    title: "The Wild Robot",
    score: 84,
    date: "Sep 12, 2024",
    duration: "1h 42m",
    desc: "After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island. To survive the harsh environment, Roz bonds with the island's animals and cares for an orphaned baby goose.",
  },
  {
    id: 3,
    type: "Movie",
    title: "Venom: The Last Dance",
    score: 64,
    date: "Oct 24, 2024",
    duration: "1h 49m",
    desc: "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
  },
  // {
  //   id: 4,
  //   type: "Movie",
  //   title: "Sharknado",
  //   score: 33,
  //   date: "July 11, 2013",
  //   duration: "1h 26m",
  //   desc: "A freak hurricane hits Los Angeles, causing man-eating sharks to be scooped up in tornadoes and flooding the city with shark-infested seawater. Surfer and bar-owner Fin sets out with his friends Baz and Nova to rescue his estranged wife April and teenage daughter Claudia.",
  // },
];

export default function Search() {
  const { placeholder, originTab, searchText } = useLocalSearchParams<{
    placeholder: string;
    originTab: string;
    searchText: string;
  }>();

  const bgnum = parseInt(originTab);

  const handleItemPress = (/*id: number*/) => {
    console.log("Item Pressed");
  };
  const GoToFirstPage = (/*id: number*/) => {
    console.log("First Page Pressed");
  };
  const handlePreviousPage = (/*id: number*/) => {
    console.log("Previous Page Pressed");
  };
  const handleNextPage = (/*id: number*/) => {
    console.log("Next Page Pressed");
  };

  const Movie: React.FC<Movie> = ({
    id,
    type,
    title,
    score,
    date,
    duration,
    desc,
  }) => (
    <View style={searchstyles.itemContainer}>
      <Pressable onPress={handleItemPress}>
        <Image
          source={require("@/assets/images/home/searchcard.png")}
          style={searchstyles.itemCard}
        />
        <Image source={mockPosterMap[id]} style={searchstyles.itemPoster} />
        <Image
          source={require("@/assets/images/home/scorebadge.png")}
          style={searchstyles.itemScoreBadge}
        />
        <Text style={searchstyles.itemScore}>{score}</Text>
        {/* <Image
          source={getFlagImageForNumber(score)}
          style={searchstyles.imgScoreFlag}
        /> */}
        <LottieView
          source={getFlagVideoForNumber(score)}
          loop={true}
          speed={0.6}
          autoPlay
          style={searchstyles.itemScoreFlag}
        />
        <Text
          style={searchstyles.itemTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Text
          style={searchstyles.itemData}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {type} - {duration} - {date}
        </Text>
        <Text
          style={searchstyles.itemDesc}
          ellipsizeMode="tail"
          numberOfLines={4}
        >
          {desc}
        </Text>
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
          height: 900,
          zIndex: 0,
        }}
      />
      <MotiImage
        source={searchBGMap[bgnum]}
        style={searchstyles.background}
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
          placeholder={placeholder}
          originTab={5}
          searchValue={searchText}
        />
        <Image
          source={require("@/assets/images/home/TheResults.png")}
          style={searchstyles.results}
        />
        <View style={searchstyles.listcontainer}>
          <FlatList
            data={Movies}
            renderItem={({ item }) => (
              <Movie
                id={item.id}
                type={item.type}
                title={item.title}
                score={item.score}
                date={item.date}
                duration={item.duration}
                desc={item.desc}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          ></FlatList>
        </View>
        <AnimatedButton
          onPress={handlePreviousPage}
          source={require("@/assets/images/home/First.png")}
          style={searchstyles.firstpage}
          disabled={true}
        />
        <AnimatedButton
          onPress={handlePreviousPage}
          source={require("@/assets/images/home/Previous.png")}
          style={searchstyles.prevpage}
          disabled={true}
        />
        <AnimatedButton
          onPress={handleNextPage}
          source={require("@/assets/images/home/Next.png")}
          style={searchstyles.nextpage}
          disabled={false}
        />
        <Image
          source={require("@/assets/images/home/page.png")}
          style={searchstyles.currentpage}
        />
        <Text style={searchstyles.currentpagenum} numberOfLines={1}>
          1
        </Text>
      </ScrollView>
    </View>
  );
}

const searchstyles = StyleSheet.create({
  firstpage: {
    position: "absolute",
    width: 68,
    height: 68,
    top: 13,
    left: 25,
  },
  prevpage: {
    position: "absolute",
    width: 72,
    height: 72,
    top: 3,
    left: 112,
  },
  currentpage: {
    position: "relative",
    width: 76,
    height: 76,
    top: -2,
    left: 202,
  },
  nextpage: {
    position: "absolute",
    width: 72,
    height: 72,
    top: 4,
    left: 298,
  },
  currentpagenum: {
    position: "relative",
    width: 70,
    height: 70,
    top: -68,
    left: 204,
    fontSize: 34,
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
    top: 141,
    left: 312,
    fontSize: 18,
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
    top: 123.5,
    left: 317.8,
    zIndex: 1,
  },
  itemScoreFlag: {
    position: "absolute",
    width: 60,
    height: 120,
    top: 55,
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
    marginTop: 360,
    height: "auto",
    // marginBottom: 80,
  },
  results: {
    position: "absolute",
    width: 360,
    height: 82,
    top: 260,
    left: 14,
  },
  background: {
    position: "absolute",
    width: 900,
    height: 900,
    top: -30,
    left: -254,
    zIndex: -1,
  },
});
