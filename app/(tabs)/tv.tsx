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
import { usePersonId } from "../../components/PersonIdContext"; 

interface Movie {
  id: number;
  title: string;
  score: number;
  date: string;
  banner?: string;
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
  const { personId } = usePersonId();
  const [bestToggle, setBestToggle] = useState(false);
  const [popularSeries, setPopularSeries] = useState<Series[]>([]);
  const [topRatedSeries, setTopRatedSeries] = useState<Series[]>([]);
  const [actionAdventureSeries, setActionAdventureSeries] = useState<Series[]>([]);
  const [animationSeries, setAnimationSeries] = useState<Series[]>([]);
  const [dramaSeries, setDramaSeries] = useState<Series[]>([]);
  const [comedySeries, setComedySeries] = useState<Series[]>([]);
  const [backupUrl] = useState("https://backend-rottentomatoes.onrender.com");

  useEffect(() => {
    if (personId) {
      console.log("Person ID in Tv:", personId);
      fetchPopularSeries();
      fetchTopRatedSeries();
      fetchActionAdventureSeries();
      fetchAnimationSeries();
      fetchDramaSeries();
      fetchComedySeries();
    } else {
      console.log("Person ID is not available yet");
    }
  }, [personId]);

  const fetchPopularSeries = async () => {
    try {
      const response = await fetch(`${backupUrl}/popularSeries`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API response was not ok: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("popularSeries response:", responseData);

      if (!responseData.results) {
        throw new Error(`API response did not contain results: ${JSON.stringify(responseData)}`);
      }

      const formattedSeries = responseData.results.slice(0, 10).map((series: any) => ({
        id: series.id,
        title: series.name || series.original_title,
        score: Math.floor(series.vote_average * 10), // Use Math.floor to remove decimals
        date: series.release_date || series.first_air_date,
        banner: series.poster_path ? `https://image.tmdb.org/t/p/w500${series.poster_path}` : undefined,
      }));
      setPopularSeries(formattedSeries);
      console.log("popularSeries fetched successfully:", formattedSeries);
    } catch (error) {
      console.error("Fetching popularSeries failed:", error);
    }
  };

  const fetchTopRatedSeries = async () => {
    try {
      const response = await fetch(`${backupUrl}/topRatedSeries`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API response was not ok: ${response.statusText}`);
      }

      const responseData = await response.json();
      //console.log("topRatedSeries response:", responseData);

      if (!responseData.results) {
        throw new Error(`API response did not contain results: ${JSON.stringify(responseData)}`);
      }

      const formattedSeries = responseData.results.slice(0, 10).map((series: any) => ({
        id: series.id,
        title: series.name || series.original_title,
        score: Math.floor(series.vote_average * 10), // Use Math.floor to remove decimals
        date: series.release_date || series.first_air_date,
        banner: series.poster_path ? `https://image.tmdb.org/t/p/w500${series.poster_path}` : undefined,
      }));
      setTopRatedSeries(formattedSeries);
      //console.log("topRatedSeries fetched successfully:", formattedSeries);
    } catch (error) {
      console.error("Fetching topRatedSeries failed:", error);
    }
  };

  const fetchActionAdventureSeries = async () => {
    try {
      const response = await fetch(`${backupUrl}/actionAdventureSeries`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API response was not ok: ${response.statusText}`);
      }

      const responseData = await response.json();
     //console.log("actionAdventureSeries response:", responseData);

      if (!responseData.results) {
        throw new Error(`API response did not contain results: ${JSON.stringify(responseData)}`);
      }

      const formattedSeries = responseData.results.slice(0, 10).map((series: any) => ({
        id: series.id,
        title: series.name || series.original_title,
        score: Math.floor(series.vote_average * 10), // Use Math.floor to remove decimals
        date: series.release_date || series.first_air_date,
        banner: series.poster_path ? `https://image.tmdb.org/t/p/w500${series.poster_path}` : undefined,
      }));
      setActionAdventureSeries(formattedSeries);
     // console.log("actionAdventureSeries fetched successfully:", formattedSeries);
    } catch (error) {
      console.error("Fetching actionAdventureSeries failed:", error);
    }
  };

  const fetchAnimationSeries = async () => {
    try {
      const response = await fetch(`${backupUrl}/animationSeries`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API response was not ok: ${response.statusText}`);
      }

      const responseData = await response.json();
      //console.log("animationSeries response:", responseData);

      if (!responseData.results) {
        throw new Error(`API response did not contain results: ${JSON.stringify(responseData)}`);
      }

      const formattedSeries = responseData.results.slice(0, 10).map((series: any) => ({
        id: series.id,
        title: series.name || series.original_title,
        score: Math.floor(series.vote_average * 10), // Use Math.floor to remove decimals
        date: series.release_date || series.first_air_date,
        banner: series.poster_path ? `https://image.tmdb.org/t/p/w500${series.poster_path}` : undefined,
      }));
      setAnimationSeries(formattedSeries);
      //console.log("animationSeries fetched successfully:", formattedSeries);
    } catch (error) {
      console.error("Fetching animationSeries failed:", error);
    }
  };

  const fetchDramaSeries = async () => {
    try {
      const response = await fetch(`${backupUrl}/dramaSeries`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API response was not ok: ${response.statusText}`);
      }

      const responseData = await response.json();
      //console.log("dramaSeries response:", responseData);

      if (!responseData.results) {
        throw new Error(`API response did not contain results: ${JSON.stringify(responseData)}`);
      }

      const formattedSeries = responseData.results.slice(0, 10).map((series: any) => ({
        id: series.id,
        title: series.name || series.original_title,
        score: Math.floor(series.vote_average * 10), // Use Math.floor to remove decimals
        date: series.release_date || series.first_air_date,
        banner: series.poster_path ? `https://image.tmdb.org/t/p/w500${series.poster_path}` : undefined,
      }));
      setDramaSeries(formattedSeries);
      //console.log("dramaSeries fetched successfully:", formattedSeries);
    } catch (error) {
      console.error("Fetching dramaSeries failed:", error);
    }
  };

  const fetchComedySeries = async () => {
    try {
      const response = await fetch(`${backupUrl}/comedySeries`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API response was not ok: ${response.statusText}`);
      }

      const responseData = await response.json();
      //console.log("comedySeries response:", responseData);

      if (!responseData.results) {
        throw new Error(`API response did not contain results: ${JSON.stringify(responseData)}`);
      }

      const formattedSeries = responseData.results.slice(0, 10).map((series: any) => ({
        id: series.id,
        title: series.name || series.original_title,
        score: Math.floor(series.vote_average * 10), // Use Math.floor to remove decimals
        date: series.release_date || series.first_air_date,
        banner: series.poster_path ? `https://image.tmdb.org/t/p/w500${series.poster_path}` : undefined,
      }));
      setComedySeries(formattedSeries);
      //console.log("comedySeries fetched successfully:", formattedSeries);
    } catch (error) {
      console.error("Fetching comedySeries failed:", error);
    }
  };

  const handleItemPress = (/*id: number*/) => {
    console.log("Item Pressed");
  };

  const handleBestToggle = () => {
    console.log("Best Toggle Pressed");
    setBestToggle(!bestToggle);
  };

  const Movie: React.FC<Series & { onPress: () => void }> = ({ id, title, score, date, banner, onPress }) => (
    <View style={tabstyles.itemContainer}>
      <Pressable onPress={onPress}>
        <Image
          source={require("@/assets/images/home/itemcard.png")}
          style={tabstyles.itemCard}
        />
        {banner && <Image source={{ uri: banner }} style={tabstyles.itemPoster} />}
      </Pressable>
      <Image
        source={require("@/assets/images/home/scorebadge.png")}
        style={tabstyles.itemScoreBadge}
      />
      <Text style={tabstyles.itemScore}>{score}</Text>
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
            data={popularSeries}
            renderItem={({ item }) => (
              <Movie
              id={item.id}
              title={item.title}
              score={item.score}
              date={item.date}
              banner={item.banner}
              onPress={() => handleItemPress(item.id)}
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
            data={topRatedSeries}
            renderItem={({ item }) => (
              <Movie
              id={item.id}
              title={item.title}
              score={item.score}
              date={item.date}
              banner={item.banner}
              onPress={() => handleItemPress(item.id)}
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
            Best in adventure TV
          </Text>
          <Image source={backdropImageMap[3]} style={tabstyles.backdrop} />
          <FlatList
            data={actionAdventureSeries}
            renderItem={({ item }) => (
              <Movie
              id={item.id}
              title={item.title}
              score={item.score}
              date={item.date}
              banner={item.banner}
              onPress={() => handleItemPress(item.id)}
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
            Best in Animated TV
          </Text>
          <Image source={backdropImageMap[4]} style={tabstyles.backdrop} />
          <FlatList
             data={animationSeries}
            renderItem={({ item }) => (
              <Movie
              id={item.id}
              title={item.title}
              score={item.score}
              date={item.date}
              banner={item.banner}
              onPress={() => handleItemPress(item.id)}
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
          <Image source={backdropImageMap[4]} style={tabstyles.backdrop} />
          <FlatList
            data={dramaSeries}
            renderItem={({ item }) => (
              <Movie
              id={item.id}
              title={item.title}
              score={item.score}
              date={item.date}
              banner={item.banner}
              onPress={() => handleItemPress(item.id)}
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
            Best in Comedy TV
          </Text>
          <Image source={backdropImageMap[4]} style={tabstyles.backdrop} />
          <FlatList
            data={comedySeries}
            renderItem={({ item }) => (
              <Movie
              id={item.id}
              title={item.title}
              score={item.score}
              date={item.date}
              banner={item.banner}
              onPress={() => handleItemPress(item.id)}
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
