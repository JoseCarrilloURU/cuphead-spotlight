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
import { formatDate, formatType } from "@/components/formatDate";
import HomeHeader from "@/components/homeHeader";
import {
  mockPosterMap,
  searchBGMap,
  getFlagImageForNumber,
  getFlagVideoForNumber,
} from "@/components/imageMaps";
import FiltersModal from "@/components/filtersModal";

interface Movie {
  id: number;
  type: string;
  title: string;
  score: number;
  date: string;
  duration: string;
  desc: string;
  poster: string | null;
}

export default function Search() {
  const { placeholder, originTab, searchText } = useLocalSearchParams<{
    placeholder: string;
    originTab: string;
    searchText: string;
  }>();

  const [movies, setMovies] = useState<Movie[]>([]);
  const bgnum = parseInt(originTab);
  const [modalShown, setModalShown] = useState(false);
  const [bestToggle, setBestToggle] = useState(false);
  const [filter, setFilter] = useState<"popularity" | "rating" | "date">(
    "popularity"
  );
  const [query, setQuery] = useState(searchText); // Add state for query

  useEffect(() => {
    console.log("Search Page Loaded", { placeholder, originTab, searchText });
    fetchSearchResults(query);
  }, [query]); // Add query as a dependency

  const fetchSearchResults = async (query: string) => {
    try {
      const response = await fetch(
        `https://backend-rottentomatoes.onrender.com/searchMulti?query=${encodeURIComponent(
          query
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API response was not ok: ${response.statusText} - ${errorText}`
        );
      }

      const responseData = await response.json();
      console.log("Search results response:", responseData);

      const formattedMovies = responseData.map((item: any) => ({
        id: item.movieId,
        type: formatType(item.media_type),
        title: item.name,
        score: Math.floor(item.vote_average * 10), // Use Math.floor to remove decimals
        date: formatDate(item.first_air_date),
        duration: item.runtime ? `${item.runtime} min` : "N/A",
        desc: item.overview,
        poster: item.poster_path
          ? "https://image.tmdb.org/t/p/w500${item.poster_path}"
          : null,
      }));

      setMovies(formattedMovies);
      console.log(formattedMovies);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleBestToggle = () => {
    console.log("Best Toggle Pressed");
    setBestToggle(!bestToggle);
  };

  const handleFilterToggle = () => {
    setFilter((prevFilter) => {
      if (prevFilter === "popularity") return "rating";
      if (prevFilter === "rating") return "date";
      return "popularity";
    });
  };

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
    poster,
  }) => (
    <View style={searchstyles.itemContainer}>
      <Pressable onPress={handleItemPress}>
        <Image
          source={require("@/assets/images/home/searchcard.png")}
          style={searchstyles.itemCard}
        />
        {poster && (
          <Image source={{ uri: poster }} style={searchstyles.itemPoster} />
        )}
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
          {type} - {date}
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
      <FiltersModal modalShown={modalShown} setModalShown={setModalShown} />
      <ScrollView>
        <HomeHeader
          placeholder={placeholder}
          originTab={5}
          searchValue={searchText}
          setModalShown={setModalShown}
          username=""
          emailUser=""
        />
        <Image
          source={require("@/assets/images/home/TheResults.png")}
          style={searchstyles.results}
        />
        <Image
          source={require("@/assets/images/home/sortbg.png")}
          style={searchstyles.sortbg}
        />
        <Text style={searchstyles.stripTitle} numberOfLines={1}>
          Sort By
        </Text>
        <View style={{ left: -137, top: -9 }}>
          <Pressable
            onPress={handleFilterToggle}
            style={{
              borderColor: "black",
              borderWidth: 0,
              borderStyle: "solid",
              position: "absolute",
              top: 29,
              right: 0,
              zIndex: 14,
            }}
          >
            <MotiText
              from={{
                scale: 0.8,
                opacity: 0.4,
              }}
              animate={
                filter === "popularity" ? { scale: 1.1, opacity: 1 } : {}
              }
              transition={{
                type: "timing",
                duration: 800,
              }}
              style={searchstyles.toggle1}
            >
              Popularity
            </MotiText>
            <MotiText
              from={{ scale: 0.8, opacity: 0.4 }}
              animate={filter === "rating" ? { scale: 1.1, opacity: 1 } : {}}
              transition={{
                type: "timing",
                duration: 800,
              }}
              style={searchstyles.toggle2}
            >
              Rating
            </MotiText>
            <MotiText
              from={{ scale: 0.8, opacity: 0.4 }}
              animate={filter === "date" ? { scale: 1.1, opacity: 1 } : {}}
              transition={{
                type: "timing",
                duration: 800,
              }}
              style={searchstyles.toggle3}
            >
              Date
            </MotiText>
          </Pressable>
        </View>
        <Pressable
          onPress={handleBestToggle}
          style={{
            borderColor: "black",
            borderWidth: 0,
            borderStyle: "solid",
            position: "absolute",
            top: 29,
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
            style={searchstyles.toggle1}
          >
            Descending
          </MotiText>
          <MotiText
            from={{ scale: 0.8, opacity: 0.4 }}
            animate={bestToggle ? { scale: 1.1, opacity: 1 } : {}}
            transition={{
              type: "timing",
              duration: 800,
            }}
            style={searchstyles.toggle2}
          >
            Ascending
          </MotiText>
        </Pressable>
        <View style={searchstyles.listcontainer}>
          <FlatList
            data={movies}
            renderItem={({ item }) => (
              <Movie
                id={item.id}
                type={item.type}
                title={item.title}
                score={item.score}
                date={item.date}
                duration={item.duration}
                desc={item.desc}
                poster={item.poster}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
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
  toggle1: {
    position: "absolute",
    width: 120,
    top: 354,
    right: 8,
    fontSize: 14,
    fontFamily: "PadNCarrilloFont",
    color: "#f8e7d5",
    zIndex: 1,
    textShadowRadius: 6,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    borderColor: "transparent",
    borderWidth: 1,
  },
  toggle2: {
    position: "absolute",
    width: 120,
    top: 374,
    right: 7,
    fontSize: 14,
    fontFamily: "PadNCarrilloFont",
    color: "#f8e7d5",
    zIndex: 1,
    textShadowRadius: 6,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    borderColor: "transparent",
    borderWidth: 1,
  },
  toggle3: {
    position: "absolute",
    width: 120,
    top: 394,
    right: 8,
    fontSize: 14,
    fontFamily: "PadNCarrilloFont",
    color: "#f8e7d5",
    zIndex: 1,
    textShadowRadius: 6,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    borderColor: "transparent",
    borderWidth: 1,
  },
  stripTitle: {
    position: "absolute",
    width: 400,
    top: 390,
    left: 12,
    fontSize: 18,
    fontFamily: "PadNCarrilloFont",
    color: "#f8e7d5",
    zIndex: 10,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    borderColor: "transparent",
    borderWidth: 0,
  },
  sortbg: {
    position: "absolute",
    width: 400,
    height: 115,
    opacity: 1,
    top: 350,
  },
  listcontainer: {
    marginTop: 480,
    height: "auto",
    // marginBottom: 80,
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
  results: {
    position: "absolute",
    width: 360,
    height: 82,
    top: 257,
    left: 14,
  },
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
  background: {
    position: "absolute",
    width: 900,
    height: 900,
    top: -30,
    left: -254,
    zIndex: -1,
  },
});
