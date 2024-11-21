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
import { useLocalSearchParams } from "expo-router";
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
import routerTransition from "@/components/routerTransition";

interface Movie {
  id: number;
  title: string;
  score: number;
  date: string;
  banner?: string;
}

interface personIdProps {
  personId: number; // personId is a number
}



// const Movies: Movie[] = [
//   {
//     id: 1,
//     title: "Arcane",
//     score: 88,
//     date: "Nov 06, 2021",
//   },
//   {
//     id: 2,
//     title: "The Wild Robot",
//     score: 84,
//     date: "Sep 12, 2024",
//   },
//   {
//     id: 3,
//     title: "Venom: The Last Dance",
//     score: 64,
//     date: "Oct 24, 2024",
//   },
//   {
//     id: 4,
//     title: "Sharknado",
//     score: 33,
//     date: "July 11, 2013",
//   },
// ];

export default function Home() {
  const { personId } = useLocalSearchParams<{ personId: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [primaryUrl] = useState("http://backend-rottentomatoes-please-enough.up.railway.app");
  const [backupUrl] = useState("https://backend-rottentomatoes.onrender.com");

  useEffect(() => {
    if (!personId) {
      console.log("personId is not available yet");
      return;
    }
  
    console.log("Received personId from discover:", personId); // Log the personId to verify
  
    // const fetchMovies = async (endpoint: string, setState: React.Dispatch<React.SetStateAction<Movie[]>>) => {
    //   try {
    //     const response = await fetch(`${backupUrl}/${endpoint}`, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
  
    //     if (!response.ok) {
    //       throw new Error(`API response was not ok: ${response.statusText}`);
    //     }
  
    //     const responseData = await response.json();
    //     const formattedMovies = responseData.results.slice(0, 10).map((movie: any) => ({
    //       id: movie.id,
    //       title: movie.name || movie.original_title,
    //       score: Math.floor(movie.vote_average * 10), // Use Math.floor to remove decimals
    //       date: movie.release_date || movie.first_air_date,
    //       banner: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    //     }));
    //     setState(formattedMovies);
    //     console.log(`${endpoint} fetched successfully:`, formattedMovies);
    //   } catch (error) {
    //     console.error(`Fetching ${endpoint} failed:`, error);
    //   }
    // };
  
    // fetchMovies("trendingMovies", setMovies);
    // fetchMovies("popularMovies", setPopularMovies);
  }, [personId, primaryUrl, backupUrl]);

  const handleItemPress = (/*id: number*/) => {
    console.log("Item Pressed");
    routerTransition("push", "/movie", {});
  };

  const Movie: React.FC<Movie> = ({ id, title, score, date, banner }) => (
    <View style={tabstyles.itemContainer}>
      <Pressable onPress={handleItemPress}>
        <Image
          source={require("@/assets/images/home/itemcard.png")}
          style={tabstyles.itemCard}
        />
        <Image source={{ uri: banner }} style={tabstyles.itemPoster} />
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
        source={require("@/assets/images/backgrounds/bg_discover.png")}
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
          placeholder={"Search Movies & TV..."}
          originTab={1}
          searchValue={""}
        />
        <View style={tabstyles.listcontainer}>
          <Image
            source={require("@/assets/images/home/stripbg.png")}
            style={tabstyles.stripbg}
          />
          <Text style={tabstyles.stripTitle} numberOfLines={1}>
            Trending Right Now
          </Text>
          <Image source={backdropImageMap[1]} style={tabstyles.backdrop} />
          <FlatList
            data={movies}
            renderItem={({ item }) => (
              <Movie
                id={item.id}
                title={item.title}
                score={item.score}
                date={item.date}
                banner={item.banner}
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
            Top rated This Year
          </Text>
          <Image source={backdropImageMap[2]} style={tabstyles.backdrop2} />
          <FlatList
            data={popularMovies}
            renderItem={({ item }) => (
              <Movie
                id={item.id}
                title={item.title}
                score={item.score}
                date={item.date}
                banner={item.banner}
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
            Your Watchlist
          </Text>
          <Image source={backdropImageMap[3]} style={tabstyles.backdrop} />
          <FlatList
            data={popularMovies}
            renderItem={({ item }) => (
              <Movie
                id={item.id}
                title={item.title}
                score={item.score}
                date={item.date}
                banner={item.banner}
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
            data={popularMovies}
            renderItem={({ item }) => (
              <Movie
                id={item.id}
                title={item.title}
                score={item.score}
                date={item.date}
                banner={item.banner}
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
};


