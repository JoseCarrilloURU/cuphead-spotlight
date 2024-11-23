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

interface OtherReviews {
  name: string;
  date: string;
  score: number;
  review: string;
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

const OtherReviewsInfo: OtherReviews[] = [
  {
    name: "John Doe",
    date: "Sep 27, 2024",
    score: 100,
    review:
      "This movie was amazing! I loved the animation and the story was so heartwarming. I highly recommend it to anyone who loves a good family movie.",
  },
  {
    name: "Jane Doe",
    date: "Sep 27, 2024",
    score: 80,
    review:
      "I thought this movie was pretty good. The animation was great and the story was interesting. I would recommend it to anyone who likes animated movies.",
  },
  {
    name: "John Smith",
    date: "Sep 27, 2024",
    score: 60,
    review:
      "I thought this movie was okay. The animation was good, but the story was a bit boring. I would recommend it to anyone who likes animated movies.",
  },
  {
    name: "Jane Smith",
    date: "Sep 27, 2024",
    score: 40,
    review:
      "I thought this movie was bad. The animation was good, but the story was boring. I would not recommend it to anyone.",
  },
];

const Category: React.FC<{ category: string }> = ({ category }) => (
  <View style={moviestyles.categoryContainer}>
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

const OtherReview: React.FC<OtherReviews> = ({ name, date, score, review }) => (
  <View style={moviestyles.othersitemcontainer}>
    <Image
      source={require("@/assets/images/home/reviewscard.png")}
      style={moviestyles.otherscard}
    />
    <Text
      style={moviestyles.othersauthor}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      Review by {name}
    </Text>
    <Text style={moviestyles.othersdate} numberOfLines={1} ellipsizeMode="tail">
      Published: {date} at {MovieInfo[0].title}
    </Text>
    <Text
      style={moviestyles.othersreview}
      ellipsizeMode="tail"
      numberOfLines={12}
    >
      {review}
    </Text>
    <View style={{ top: -135, left: -10, marginBottom: -300 }}>
      <Image
        source={require("@/assets/images/home/scorebadge.png")}
        style={moviestyles.myreviewbadge}
      />
      <Text style={moviestyles.myreviewscore}>{score}</Text>
      <LottieView
        source={getFlagVideoForNumber(score)}
        loop={true}
        speed={0.6}
        autoPlay
        style={moviestyles.myreviewflag}
      />
    </View>
  </View>
);

export default function Movie() {

  let [watchlist, setWatchlist] = useState(false);
  const [reviewText, setReviewText] = useState("");

  

  const handleEnterReview = () => {
    console.log("Enter Review button pressed");
  };

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
          <View style={moviestyles.categorylistcontainer}>
            <FlatList
              data={MovieInfo[0].categories}
              renderItem={({ item }) => <Category category={item} />}
              keyExtractor={(item) => item}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <Text style={moviestyles.overviewtitle}>Overview</Text>
          <Text style={moviestyles.overview}>{MovieInfo[0].desc}</Text>
          <View style={{ top: -355, left: 0 }}>
            <Text style={moviestyles.itemTitlesub}>Top Cast</Text>
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
          <View style={{ top: -200, left: 20 }}>
            <Text style={moviestyles.itemTitlesub}>Write a Review!</Text>
          </View>
          <Image
            source={require("@/assets/images/home/ReviewContainer.png")}
            style={moviestyles.reviewcontainer}
          />
          <AnimatedButton
            onPress={handleEnterReview}
            source={require("@/assets/images/home/Review.png")}
            style={moviestyles.reviewbutton}
            disabled={false}
          />
          <Text
            ellipsizeMode="tail"
            style={moviestyles.reviewcollapsed}
            numberOfLines={6}
          >
            You haven't reviewed this movie yet.
          </Text>
          <TextInput
            style={moviestyles.reviewinput}
            placeholder="Say something about this movie..."
            placeholderTextColor="#555"
            value={reviewText}
            onChangeText={(text) => setReviewText(text)}
            keyboardType="email-address"
            multiline={false} // No permitir múltiples líneas
            scrollEnabled={false} // Evitar que el input se desplace horizontalmente
            maxLength={250}
          />
          <Image
            source={require("@/assets/images/home/scorebadge.png")}
            style={moviestyles.myreviewbadge}
          />
          <Text style={moviestyles.myreviewscore}>100</Text>
          <LottieView
            source={getFlagVideoForNumber(100)}
            loop={true}
            speed={0.6}
            autoPlay
            style={moviestyles.myreviewflag}
          />
        </View>
        <View style={{ top: -625, left: 31 }}>
          <Text style={moviestyles.itemTitlesub}>Latest Reviews</Text>
        </View>
        <View style={moviestyles.otherslistcontainer}>
          <FlatList
            data={OtherReviewsInfo}
            renderItem={({ item }) => (
              <OtherReview
                name={item.name}
                date={item.date}
                score={item.score}
                review={item.review}
              />
            )}
            keyExtractor={(index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const moviestyles = StyleSheet.create({
  othersreview: {
    width: 308,
    height: 255,
    top: -332,
    left: 23,
    fontSize: 17,
    fontFamily: "BaseFont",
    color: "#555",
    zIndex: 1,
    borderColor: "black",
    borderWidth: 0,
    // textShadowRadius: 6,
    // textShadowColor: "#000",
    // textShadowOffset: { width: 3, height: 1 },
  },
  othersdate: {
    width: 324,
    height: 25,
    top: -331,
    left: 22,
    fontSize: 17,
    fontFamily: "BaseFont",
    color: "#222",
    zIndex: 1,
    borderColor: "black",
    borderWidth: 0,
    // textShadowRadius: 6,
    // textShadowColor: "#000",
    // textShadowOffset: { width: 3, height: 1 },
  },
  othersauthor: {
    height: 26,
    width: 310,
    top: -330,
    left: 25,
    fontSize: 20,
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
  otherscard: {
    position: "relative",
    width: 370,
    height: 355,
  },
  othersitemcontainer: {
    marginLeft: 10,
    marginRight: 16,
  },
  otherslistcontainer: {
    marginTop: -370,
    marginBottom: -240,
  },
  categoryItem: {
    position: "relative",
    width: "auto",
    height: 28,
    top: 0,
    left: 0,
    fontSize: 20,
    fontFamily: "BoldFont",
    color: "#222",
    zIndex: 10,
    borderColor: "#ccbcab",
    backgroundColor: "#ccbcab",
    borderRadius: 10,
    borderWidth: 2,
    lineHeight: 23,
    boxShadow: "3px 3px 5px 0px #000",
  },
  categoryContainer: {
    marginRight: 15,
  },
  categorylistcontainer: {
    position: "relative",
    marginTop: 0,
    width: 220,
    top: -125,
    left: 15,
    height: 70,
    borderWidth: 0,
    borderColor: "black",
  },
  myreviewflag: {
    position: "relative",
    width: 65,
    height: 130,
    top: -430,
    left: 331,
    transform: [{ rotate: "-3deg" }],
  },
  myreviewscore: {
    position: "relative",
    width: 70,
    height: 70,
    top: -263.5,
    left: 321,
    fontSize: 15,
    fontFamily: "BoldFont",
    color: "#ccbcab",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textAlign: "center",
    textShadowOffset: { width: 2, height: 2 },
  },
  myreviewbadge: {
    position: "relative",
    width: 65,
    height: 65,
    top: -220,
    left: 325,
    zIndex: 1,
  },
  reviewcollapsed: {
    position: "relative",
    fontFamily: "BaseFont",
    fontSize: 18,
    width: 298,
    height: 160,
    padding: 10,
    backgroundColor: "transparent",
    color: "#bbb",
    top: -188,
    left: 46.5,
    zIndex: 14,
    borderWidth: 0,
    borderColor: "white",
  },
  reviewinput: {
    position: "absolute",
    fontFamily: "BaseFont",
    fontSize: 24,
    width: 230,
    height: 60,
    padding: 10,
    backgroundColor: "transparent",
    color: "#000",
    top: 330,
    left: 550,
    zIndex: 7,
  },
  reviewbutton: {
    position: "relative",
    width: 240,
    height: 60,
    top: -172,
    left: 75,
  },
  reviewcontainer: {
    position: "relative",
    width: 370,
    height: 230,
    top: 40,
    left: 9,
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
    marginRight: 5,
    marginLeft: 15,
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
    marginTop: -105,
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
    top: -135,
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
    top: -145,
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
  itemTitlesub: {
    position: "relative",
    width: 350,
    height: "auto",
    top: 237,
    left: 20,
    fontSize: 40,
    fontFamily: "BoldFont",
    textDecorationLine: "underline",
    color: "#ccbcab",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    borderColor: "black",
    lineHeight: 50,
    borderWidth: 0,
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
