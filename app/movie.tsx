import {
  ScrollView,
  Image,
  Text,
  View,
  FlatList,
  TextInput,
  Keyboard,
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
import moviestyles from "@/app/moviestyles";
import FiltersModal from "@/components/filtersModal";
import routerTransition from "@/components/routerTransition";

interface Movie {
  title: string;
  categories: string[];
  score: number;
  userscore: number;
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
    userscore: 0,
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
    <ScrollView
      style={moviestyles.othersreviewcontainer}
      nestedScrollEnabled={true}
    >
      <Text style={moviestyles.othersreview}>{review}</Text>
    </ScrollView>
    <View style={{ top: -185, left: -10, marginBottom: -290 }}>
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
  const [modalShown, setModalShown] = useState(false);
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
    Keyboard.dismiss();
    setPopupShown(false);
  };
  const handleDelReview = () => {
    console.log("Delete Review button pressed");
    setReviewmade(false);
    Keyboard.dismiss();
    setPopupShown(false);
  };
  const handleSendReview = () => {
    console.log("Send Review button pressed");
    Keyboard.dismiss();
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
          placeholder="(1-100)"
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
            placeholder="Give your opinion about this movie..."
            placeholderTextColor="#777"
            multiline={true}
            numberOfLines={12}
            keyboardType="email-address"
            maxLength={250}
          />
        </ScrollView>
      </MotiView>
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
      <FiltersModal modalShown={modalShown} setModalShown={setModalShown} />
      <ScrollView nestedScrollEnabled={true}>
        <HomeHeader
          placeholder="Search Movies & TV..."
          originTab={6}
          searchValue={""}
          setModalShown={setModalShown}
        />
        <View></View>
        <View>
          <Image
            source={require("@/assets/images/home/backdropcard.png")}
            style={moviestyles.backdropcard}
          />
          <Image
            source={require("@/assets/images/home/mockPosters/backdropmoviehd.jpg")}
            style={moviestyles.backdrop}
          />
          <View
            style={{
              position: "absolute",
              left: -285,
            }}
          >
            <Image
              source={require("@/assets/images/home/scorebadge.png")}
              style={moviestyles.itemScoreBadge}
            />
            <Text style={moviestyles.itemScore}>{MovieInfo[0].userscore}</Text>
            {/* <Image
            source={getFlagImageForNumber(ShowInfo[0].score)}
            style={moviestyles.imgScoreFlag}
          /> */}
            <LottieView
              source={getFlagVideoForNumber(MovieInfo[0].userscore)}
              loop={true}
              speed={0.6}
              autoPlay
              style={moviestyles.itemScoreFlag}
            />
          </View>
          <View
            style={{
              position: "absolute",
              top: 300,
              left: 5,
              zIndex: 10,
            }}
          >
            <Image
              source={require("@/assets/images/home/scorebadge.png")}
              style={moviestyles.seasonScoreBadge}
            />
            <Text style={moviestyles.seasonScore}>{MovieInfo[0].score}</Text>
            <LottieView
              source={getFlagVideoForNumber(MovieInfo[0].score)}
              loop={true}
              speed={0.6}
              autoPlay
              style={moviestyles.seasonScoreFlag}
            />
          </View>
          <Text style={moviestyles.itemTitle}>{MovieInfo[0].title}</Text>
          <Text
            style={moviestyles.itemData}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Movie - {MovieInfo[0].duration} - Released {MovieInfo[0].date}
          </Text>
          <View style={{ top: -113, left: -72 }}>
            <Text
              style={moviestyles.itemData}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              User Score
            </Text>
          </View>
          <View style={{ top: -113, left: 73 }}>
            <Text
              style={moviestyles.itemData}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Reviewer Score
            </Text>
          </View>
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
          <View style={{ top: -335, left: 0 }}>
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
