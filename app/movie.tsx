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
  getFlagImageForNumber,
  getFlagVideoForNumber,
} from "@/components/imageMaps";
import routerTransition from "@/components/routerTransition";

interface Movie {
  title: string;
  categories: string[];
  score: number;
  date: string;
  duration: string;
  desc: string;
}

interface Cast {
  name: string;
  role: string;
}

const MovieInfo: Movie[] = [
  {
    title: "The Wild Robot",
    categories: ["Animation", "Science Fiction", "Family"],
    score: 88,
    date: "Sep 27, 2024",
    duration: "1h 42m",
    desc: "After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island. To survive the harsh environment, Roz bonds with the island's animals and cares for an orphaned baby goose.",
  },
];

const CastInfo: Cast[] = [
  {
    name: "Lupita Nyong'o",
    role: "Roz (Voice)",
  },
  {
    name: "Pedro Pascal",
    role: "Fink (Voice)",
  },
  {
    name: "Kit Connor",
    role: "Brightbill (Voice)",
  },
];

const Category: React.FC<{ category: string }> = ({ category }) => (
  <View style={moviestyles.castContainer}>
    <Text style={moviestyles.categoryItem}>{category}</Text>
  </View>
);

const Cast: React.FC<Cast> = ({ name, role }) => (
  <View style={moviestyles.castContainer}>
    <Image
      source={require("@/assets/images/home/itemcard.png")}
      style={moviestyles.castCard}
    />
    <Image
      source={require("@/assets/images/home/mockPosters/castPoster.png")}
      style={moviestyles.castPicture}
    />
    <Text style={moviestyles.castTitle}>{name}</Text>
    <Text style={moviestyles.castRole}>{role}</Text>
  </View>
);

export default function Movie() {
  let [watchlist, setWatchlist] = useState(false);

  const handleWatchlist = () => {
    console.log("Watchlist button pressed");
    setWatchlist(!watchlist);
  };

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
        source={require("@/assets/images/backgrounds/bg_movies.png")}
        style={moviestyles.background}
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
          placeholder="Search Movies & TV..."
          originTab={6}
          searchValue=""
        />
        <View>
          <Image
            source={require("@/assets/images/home/backdropcard.png")}
            style={moviestyles.backdropcard}
          />
          <Image
            source={require("@/assets/images/home/mockPosters/backdropmoviehd.jpg")}
            style={moviestyles.backdrop}
          />
          <Image
            source={require("@/assets/images/home/scorebadge.png")}
            style={moviestyles.itemScoreBadge}
          />
          <Text style={moviestyles.itemScore}>{MovieInfo[0].score}</Text>
          {/* <Image
          source={getFlagImageForNumber(MovieInfo[0].score)}
          style={moviestyles.imgScoreFlag}
        /> */}
          <LottieView
            source={getFlagVideoForNumber(MovieInfo[0].score)}
            loop={true}
            speed={0.6}
            autoPlay
            style={moviestyles.itemScoreFlag}
          />
          <Text style={moviestyles.itemTitle}>{MovieInfo[0].title}</Text>
          <Text
            style={moviestyles.itemData}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Movie - {MovieInfo[0].duration} - Released {MovieInfo[0].date}
          </Text>
          <Image
            source={require("@/assets/images/home/itemcard.png")}
            style={moviestyles.itemCard}
          />
          <Image
            source={require("@/assets/images/home/mockPosters/2.jpg")}
            style={moviestyles.itemPoster}
          />
          <AnimatedButton
            onPress={handleWatchlist}
            source={
              watchlist
                ? require("@/assets/images/home/addtowatchlist2.png")
                : require("@/assets/images/home/addtowatchlist.png")
            }
            style={moviestyles.watchlist}
            disabled={false}
          />
          {/* <View style={moviestyles.listcontainer}>
          <FlatList
            data={MovieInfo[0].categories}
            renderItem={({ item }) => <Category category={item} />}
            keyExtractor={(index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View> */}
          <Text style={moviestyles.overviewtitle}>Overview</Text>
          <Text style={moviestyles.overview}>{MovieInfo[0].desc}</Text>
          <View style={{ top: -300, left: 0 }}>
            <Text style={moviestyles.itemTitle}>Top Cast</Text>
          </View>
          <View style={moviestyles.listcontainer}>
            <FlatList
              data={CastInfo}
              renderItem={({ item }) => (
                <Cast name={item.name} role={item.role} />
              )}
              keyExtractor={(index) => index.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const moviestyles = StyleSheet.create({
  categoryItem: {
    position: "absolute",
    width: 220,
    height: "auto",
    top: 300,
    left: 153,
    fontSize: 16,
    fontFamily: "BaseFont",
    color: "#ccbcab",
    zIndex: 10,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    borderColor: "black",
    borderWidth: 0,
    lineHeight: 22,
  },
  castTitle: {
    position: "relative",
    height: "auto",
    width: 135,
    top: 0,
    left: 5,
    fontSize: 16,
    fontFamily: "BoldFont",
    color: "#ccbcab",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    borderColor: "black",
    borderWidth: 0,
    lineHeight: 25,
  },
  castRole: {
    position: "relative",
    width: 135,
    height: "auto",
    top: 0,
    left: 5,
    fontSize: 16,
    fontFamily: "BaseFont",
    color: "#ccbcab",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
  },
  castContainer: {
    marginRight: 10,
    marginLeft: 18,
  },
  castCard: {
    position: "relative",
    width: 130,
    height: 200,
  },
  castPicture: {
    position: "absolute",
    width: 118,
    height: 176,
    top: 9,
    left: 2.5,
    borderStyle: "solid",
    borderColor: "#222",
    borderWidth: 1,
  },
  listcontainer: {
    marginTop: -50,
    height: "auto",
  },
  watchlist: {
    position: "relative",
    width: 125,
    height: 27,
    top: 88,
    left: 252,
  },
  overview: {
    position: "relative",
    width: 220,
    height: "auto",
    top: -80,
    left: 15,
    fontSize: 16,
    fontFamily: "BaseFont",
    color: "#ccbcab",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    borderColor: "black",
    borderWidth: 0,
    lineHeight: 22,
  },
  overviewtitle: {
    position: "relative",
    width: 133,
    top: -90,
    left: 15,
    fontSize: 19,
    fontFamily: "BoldFont",
    color: "#ccbcab",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    borderColor: "black",
    borderWidth: 0,
    lineHeight: 20,
  },
  itemPoster: {
    position: "relative",
    width: 113,
    height: 166,
    top: 64,
    left: 255,
    borderStyle: "solid",
    borderColor: "#222",
    borderWidth: 2,
    opacity: 1,
  },
  itemCard: {
    position: "relative",
    width: 130,
    height: 190,
    top: 245,
    left: 250,
  },
  itemScore: {
    position: "absolute",
    width: 70,
    height: 70,
    top: 428,
    left: 301,
    fontSize: 28,
    fontFamily: "BoldFont",
    color: "#ccbcab",
    zIndex: 9,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textAlign: "center",
    textShadowOffset: { width: 2, height: 2 },
  },
  itemScoreBadge: {
    position: "absolute",
    width: 85,
    height: 85,
    top: 405,
    left: 295,
    zIndex: 8,
  },
  itemScoreFlag: {
    position: "absolute",
    width: 90,
    height: 180,
    top: 302,
    left: 298,
    transform: [{ rotate: "-10deg" }],
    zIndex: 7,
  },
  imgScoreFlag: {
    position: "absolute",
    width: 60,
    height: 120,
    top: 335,
    left: 310,
    transform: [{ rotate: "-10deg" }],
    zIndex: 7,
  },
  itemTitle: {
    position: "relative",
    width: 350,
    height: "auto",
    top: 237,
    left: 20,
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
  },
  itemData: {
    position: "absolute",
    width: 360,
    height: "auto",
    top: 245,
    left: 16,
    fontSize: 18,
    fontFamily: "BaseFont",
    color: "#ccbcab",
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    borderColor: "white",
    borderWidth: 0,
    zIndex: 7,
    textAlign: "center",
  },
  backdrop: {
    position: "absolute",
    width: 369,
    height: 207,
    top: 243,
    left: 12,
    borderStyle: "solid",
    borderColor: "#222",
    borderWidth: 2,
    zIndex: 6,
    opacity: 0.85,
  },
  backdropcard: {
    position: "relative",
    width: 410,
    height: 235,
    top: 230,
    left: -8,
    zIndex: 5,
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
