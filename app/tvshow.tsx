import {
  ScrollView,
  Image,
  Text,
  View,
  FlatList,
  TextInput,
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
  getFlagImageForNumber,
  getFlagVideoForNumber,
} from "@/components/imageMaps";
import moviestyles from "@/app/moviestyles";
import routerTransition from "@/components/routerTransition";

interface Show {
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
  eps: number;
}

interface OtherReviews {
  name: string;
  date: string;
  score: number;
  review: string;
}

interface Seasons {
  name: string;
  episodes: number;
  date: string;
  score: number;
  desc: string;
}

const ShowInfo: Show[] = [
  {
    title: "Arcane",
    categories: [
      "Animation",
      "Sci-Fi & Fantasy",
      "Action & Adventure",
      "Mystery",
    ],
    score: 88,
    date: "Sep 27, 2024",
    duration: "18 eps",
    desc: "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
  },
];

const CastInfo: Cast[] = [
  {
    name: "Hailee Steinfeld",
    role: "Vi (Voice)",
    eps: 18,
  },
  {
    name: "Ella Purnell",
    role: "Jinx (Voice)",
    eps: 18,
  },
  {
    name: "Kevin Alejandro",
    role: "Jayce (Voice)",
    eps: 15,
  },
];

const OtherReviewsInfo: OtherReviews[] = [
  {
    name: "John Doe",
    date: "Sep 27, 2024",
    score: 100,
    review:
      "This movie was amazing! I loved the animation and the story was so heartwarming. I highly recommend it to anyone who loves a good family movie.   This movie was amazing! I loved the animation and the story was so heartwarming. I highly recommend it to anyone who loves a good family movie.   This movie was amazing! I loved the animation and the story was so heartwarming. I highly recommend it to anyone who loves a good family movie.  This movie was amazing! I loved the animation and the story was so heartwarming. I highly recommend it to anyone who loves a good family movie.",
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

const SeasonsInfo: Seasons[] = [
  {
    name: "Season 1",
    episodes: 9,
    date: "Nov 06, 2021",
    score: 84,
    desc: "Two sisters. Two cities. One discovery that will change the world forever. In the cities of Piltover and Zaun, unrest stirs as inventors and thieves, politicians and crime lords chafe against the constraints of a society torn asunder.",
  },
  {
    name: "Season 2",
    episodes: 9,
    date: "Nov 09, 2024",
    score: 93,
    desc: "Alliances are forged, allegiances are smashed and fresh dangers emerge as the battle between Piltover and Zaun inspires both glory and heartbreak.",
  },
];

const Category: React.FC<{ category: string }> = ({ category }) => (
  <View style={moviestyles.categoryContainer}>
    <Text style={moviestyles.categoryItem}>{category}</Text>
  </View>
);

const Cast: React.FC<Cast> = ({ name, role, eps }) => (
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
    <Text style={moviestyles.castRole}>{eps} episodes</Text>
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
      Published: {date} at {ShowInfo[0].title}
    </Text>
    <ScrollView
      style={moviestyles.othersreviewcontainer}
      nestedScrollEnabled={true}
    >
      <Text style={moviestyles.othersreview}>{review}</Text>
    </ScrollView>
    <View style={{ top: -195, left: -10, marginBottom: -300 }}>
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

const Season: React.FC<Seasons> = ({ name, episodes, date, score, desc }) => (
  <View style={moviestyles.seasonContainer}>
    <Image
      source={require("@/assets/images/home/searchcard.png")}
      style={moviestyles.seasonCard}
    />
    <Image source={mockPosterMap[1]} style={moviestyles.seasonPoster} />
    <Image
      source={require("@/assets/images/home/scorebadge.png")}
      style={moviestyles.seasonScoreBadge}
    />
    <Text style={moviestyles.seasonScore}>{score}</Text>
    {/* <Image
        source={getFlagImageForNumber(score)}
        style={searchstyles.imgScoreFlag}
      /> */}
    <LottieView
      source={getFlagVideoForNumber(score)}
      loop={true}
      speed={0.6}
      autoPlay
      style={moviestyles.seasonScoreFlag}
    />
    <Text
      style={moviestyles.seasonTitle}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {name}
    </Text>
    <Text style={moviestyles.seasonDate} numberOfLines={1} ellipsizeMode="tail">
      {episodes} episodes - Out {date}
    </Text>
    <Text style={moviestyles.seasonDesc} ellipsizeMode="tail" numberOfLines={4}>
      {desc}
    </Text>
  </View>
);

export default function Movie() {
  let [watchlist, setWatchlist] = useState(false);
  let [reviewmade, setReviewmade] = useState(false);
  let [yourScore, setYourScore] = useState("");
  let [popupShown, setPopupShown] = useState(false);

  const handleEnterReview = () => {
    console.log("Enter Review button pressed");
    setPopupShown(true);
  };
  const handleExitReview = () => {
    console.log("Exit Review button pressed");
    setPopupShown(false);
  };
  const handleDelReview = () => {
    console.log("Delete Review button pressed");
    setReviewmade(false);
    setPopupShown(false);
  };
  const handleSendReview = () => {
    console.log("Send Review button pressed");
    setReviewmade(true);
    //CONVERTIR TEXT DE COLLAPSABLE AL REVIEW
    setPopupShown(false);
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
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: popupShown ? 0.6 : 0 }}
        transition={{ type: "timing", duration: 500 }}
        pointerEvents={popupShown ? "auto" : "none"}
        style={{
          position: "absolute",
          backgroundColor: "black",
          width: 400,
          height: 900,
          zIndex: 14,
        }}
      />
      <MotiView
        style={{ zIndex: 16 }}
        from={{ translateX: 400 }}
        animate={{ translateX: popupShown ? 3 : 400 }}
        transition={{
          type: "timing",
          duration: 850,
          easing: Easing.out(Easing.cubic),
          delay: 150,
        }}
      >
        <Image
          source={require("@/assets/images/home/ReviewBG.png")}
          style={moviestyles.popupbg}
        />
        <AnimatedButton
          onPress={handleExitReview}
          source={require("@/assets/images/home/x.png")}
          style={moviestyles.popupx}
          disabled={false}
        />
        <AnimatedButton
          onPress={handleSendReview}
          source={require("@/assets/images/index/send.png")}
          style={moviestyles.popupsend}
          disabled={false}
        />
        <AnimatedButton
          onPress={handleDelReview}
          source={require("@/assets/images/home/Delete.png")}
          style={moviestyles.popupdelete}
          disabled={reviewmade ? false : true}
        />
        <Text style={moviestyles.popupscore}>Your Score:</Text>
        <TextInput
          style={moviestyles.popupscoretext}
          value={yourScore}
          onChangeText={(text) => setYourScore(text)}
          placeholder="(0-100)"
          placeholderTextColor="#555"
          keyboardType="number-pad"
          numberOfLines={1}
          maxLength={3}
        />
        <ScrollView
          style={moviestyles.popuptextcontainer}
          nestedScrollEnabled={true}
        >
          <TextInput
            style={moviestyles.popuptext}
            placeholder="Give your opinion about this show..."
            placeholderTextColor="#777"
            multiline={true}
            numberOfLines={12}
            keyboardType="email-address"
            maxLength={250}
          />
        </ScrollView>
      </MotiView>
      <MotiImage
        source={require("@/assets/images/backgrounds/bg_tv.png")}
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
      <ScrollView nestedScrollEnabled={true}>
        <HomeHeader
          placeholder="Search Movies & TV..."
          originTab={6}
          searchValue=""
        />
        <View></View>
        <View>
          <Image
            source={require("@/assets/images/home/backdropcard.png")}
            style={moviestyles.backdropcard}
          />
          <Image
            source={require("@/assets/images/home/mockPosters/backdrophd.jpg")}
            style={moviestyles.backdrop}
          />
          <Image
            source={require("@/assets/images/home/scorebadge.png")}
            style={moviestyles.itemScoreBadge}
          />
          <Text style={moviestyles.itemScore}>{ShowInfo[0].score}</Text>
          {/* <Image
            source={getFlagImageForNumber(ShowInfo[0].score)}
            style={moviestyles.imgScoreFlag}
          /> */}
          <LottieView
            source={getFlagVideoForNumber(ShowInfo[0].score)}
            loop={true}
            speed={0.6}
            autoPlay
            style={moviestyles.itemScoreFlag}
          />
          <Text style={moviestyles.itemTitle}>{ShowInfo[0].title}</Text>
          <Text
            style={moviestyles.itemData}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            TV Show - {ShowInfo[0].duration} - Released {ShowInfo[0].date}
          </Text>
          <Image
            source={require("@/assets/images/home/itemcard.png")}
            style={moviestyles.itemCard}
          />
          <Image
            source={require("@/assets/images/home/mockPosters/1.jpg")}
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
              data={ShowInfo[0].categories}
              renderItem={({ item }) => <Category category={item} />}
              keyExtractor={(item) => item}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <Text style={moviestyles.overviewtitle}>Overview</Text>
          <Text style={moviestyles.overview}>{ShowInfo[0].desc}</Text>
          <View style={{ top: -335, left: 0 }}>
            <Text style={moviestyles.itemTitlesub}>Top Cast</Text>
          </View>
          <View style={moviestyles.listcontainer}>
            <FlatList
              data={CastInfo}
              renderItem={({ item }) => (
                <Cast name={item.name} role={item.role} eps={item.eps} />
              )}
              keyExtractor={(index) => index.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={{ top: -200, left: 0 }}>
            <Text style={moviestyles.itemTitlesub}>All Seasons</Text>
          </View>
          <View style={moviestyles.seasonlistcontainer}>
            <FlatList
              data={SeasonsInfo}
              renderItem={({ item }) => (
                <Season
                  name={item.name}
                  score={item.score}
                  date={item.date}
                  episodes={item.episodes}
                  desc={item.desc}
                />
              )}
              keyExtractor={(index) => index.toString()}
              scrollEnabled={true}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            ></FlatList>
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
            You haven't reviewed this show yet.
          </Text>
          <MotiView
            from={{ opacity: 0 }}
            animate={reviewmade ? { opacity: 1 } : {}}
          >
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
          </MotiView>
        </View>
        <View style={{ top: -590, left: 31 }}>
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