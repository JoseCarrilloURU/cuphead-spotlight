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
  backdropImageMap,
  getFlagVideoForNumber,
} from "@/components/imageMaps";
import tabstyles from "../tabstyles";
import FiltersModal from "@/components/filtersModal";
import { usePersonId } from "../../components/PersonIdContext";
import routerTransition from "@/components/routerTransition";

interface Movie {
  id: number;
  title: string;
  score: number;
  date: string;
  banner?: string;
  media_type: string;
}

export default function Home() {
  const { personId } = usePersonId();
  const [bestToggle, setBestToggle] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  const [popularSeries, setPopularSeries] = useState<Movie[]>([]);
  const [upcomingPopularSeries, setUpcomingPopularSeries] = useState<any[]>([]);
  const [topRatedSeries, setTopRatedSeries] = useState<Movie[]>([]);
  const [actionAdventureSeries, setActionAdventureSeries] = useState<Movie[]>(
    []
  );
  const [animationSeries, setAnimationSeries] = useState<Movie[]>([]);
  const [dramaSeries, setDramaSeries] = useState<Movie[]>([]);
  const [comedySeries, setComedySeries] = useState<Movie[]>([]);
  const [backupUrl] = useState("https://backend-rottentomatoes.onrender.com");

  useEffect(() => {
    if (personId) {
      console.log("Person ID in Tv:", personId);
      fetchPopularSeries();
      fetchUpcomingPopularSeries();
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
        throw new Error(
          `API response did not contain results: ${JSON.stringify(
            responseData
          )}`
        );
      }

      const formattedSeries = responseData.results
        .slice(0, 10)
        .map((series: any) => ({
          id: series.id,
          title: series.name || series.original_title,
          score: Math.floor(series.vote_average * 10), // Use Math.floor to remove decimals
          date: series.release_date || series.first_air_date,
          banner: series.poster_path
            ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
            : undefined,
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
        throw new Error(
          `API response did not contain results: ${JSON.stringify(
            responseData
          )}`
        );
      }

      const formattedSeries = responseData.results
        .slice(0, 10)
        .map((series: any) => ({
          id: series.id,
          title: series.name || series.original_title,
          score: Math.floor(series.vote_average * 10), // Use Math.floor to remove decimals
          date: series.release_date || series.first_air_date,
          banner: series.poster_path
            ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
            : undefined,
        }));
      setTopRatedSeries(formattedSeries);
      //console.log("topRatedSeries fetched successfully:", formattedSeries);
    } catch (error) {
      console.error("Fetching topRatedSeries failed:", error);
    }
  };

  const fetchUpcomingPopularSeries = async () => {
    try {
      const response = await fetch(`${backupUrl}/getUpcomingPopularSeries`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API response was not ok: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Upcoming popular series response:", responseData);

      if (!Array.isArray(responseData)) {
        throw new Error(
          `API response is not an array: ${JSON.stringify(responseData)}`
        );
      }

      let initialScore = 95; // Valor inicial para el score

      const formattedSeries = responseData.slice(0, 10).map((series: any) => {
        const score = initialScore; // Asignar el valor actual de initialScore
        initialScore -= 2; // Decrementar initialScore en 5 en cada iteración

        return {
          id: series.id,
          title: series.name || series.original_title,
          score: score, // Usar el valor de score
          date: series.release_date || series.first_air_date,
          banner: series.poster_path
            ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
            : undefined,
        };
      });

      setUpcomingPopularSeries(formattedSeries);
      console.log(
        "Upcoming popular series fetched successfully:",
        formattedSeries
      );
    } catch (error) {
      console.error("Fetching upcoming popular series failed:", error);
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
        throw new Error(
          `API response did not contain results: ${JSON.stringify(
            responseData
          )}`
        );
      }

      const formattedSeries = responseData.results
        .slice(0, 10)
        .map((series: any) => ({
          id: series.id,
          title: series.name || series.original_title,
          score: Math.floor(series.vote_average * 10), // Use Math.floor to remove decimals
          date: series.release_date || series.first_air_date,
          banner: series.poster_path
            ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
            : undefined,
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
        throw new Error(
          `API response did not contain results: ${JSON.stringify(
            responseData
          )}`
        );
      }

      const formattedSeries = responseData.results
        .slice(0, 10)
        .map((series: any) => ({
          id: series.id,
          title: series.name || series.original_title,
          score: Math.floor(series.vote_average * 10), // Use Math.floor to remove decimals
          date: series.release_date || series.first_air_date,
          banner: series.poster_path
            ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
            : undefined,
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
        throw new Error(
          `API response did not contain results: ${JSON.stringify(
            responseData
          )}`
        );
      }

      const formattedSeries = responseData.results
        .slice(0, 10)
        .map((series: any) => ({
          id: series.id,
          title: series.name || series.original_title,
          score: Math.floor(series.vote_average * 10), // Use Math.floor to remove decimals
          date: series.release_date || series.first_air_date,
          banner: series.poster_path
            ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
            : undefined,
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
        throw new Error(
          `API response did not contain results: ${JSON.stringify(
            responseData
          )}`
        );
      }

      const formattedSeries = responseData.results
        .slice(0, 10)
        .map((series: any) => ({
          id: series.id,
          title: series.name || series.original_title,
          score: Math.floor(series.vote_average * 10), // Use Math.floor to remove decimals
          date: series.release_date || series.first_air_date,
          banner: series.poster_path
            ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
            : undefined,
        }));
      setComedySeries(formattedSeries);
      //console.log("comedySeries fetched successfully:", formattedSeries);
    } catch (error) {
      console.error("Fetching comedySeries failed:", error);
    }
  };

  // Fetch movie by ID and title
  const fetchMovieByIdAndTitle = async (movieId: string, title: string) => {
    try {
      const response = await fetch(
        `${backupUrl}/getMovieByIdAndTitle/${movieId}/${title}`,
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
      //console.log("Movie by ID and title response:", responseData);
      return responseData;
    } catch (error) {
      console.error(`Fetching movie by ID and title failed:`, error);
      return null;
    }
  };

  // Fetch series by ID and title
  const fetchSeriesByIdAndTitle = async (seriesId: string, title: string) => {
    try {
      const response = await fetch(
        `${backupUrl}/getSeriesByIdAndTitle/${seriesId}/${title}`,
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
      //console.log("Series by ID and title response:", responseData);
      return responseData;
    } catch (error) {
      console.error(`Fetching series by ID and title failed:`, error);
      return null;
    }
  };

  // fetch to save the movie
  const createMovie = async (movie: any) => {
    try {
      const movieData = {
        movieId: movie.id,
      };

      const response = await fetch(`${backupUrl}/createMovie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API response was not ok: ${response.statusText} - ${errorText}`
        );
      }

      const responseData = await response.json();
      //console.log("Movie created successfully:", responseData);
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  // fetch to save the series
  const createSeries = async (series: any) => {
    try {
      const seriesData = {
        seriesId: series.id,
      };

      const response = await fetch(`${backupUrl}/createSeries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(seriesData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API response was not ok: ${response.statusText} - ${errorText}`
        );
      }

      const responseData = await response.json();
      //console.log("Series created successfully:", responseData);
    } catch (error) {
      console.error("Error creating series:", error);
    }
  };

  const addLastSeenMovie = async (movie: any) => {
    try {
      const movieData = {
        userId: personId,
        movieId: movie.movieId,
      };
      console.log("movieData", movieData);
      const response = await fetch(`${backupUrl}/saveOurMovie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API response was not ok: ${response.statusText} - ${errorText}`
        );
      }

      const responseData = await response.json();
      console.log("Movie saved successfully:", responseData);
    } catch (error) {
      console.error("Error saving movie:", error);
    }
  };

  const addLastSeenSeries = async (series: any) => {
    const seriesData = {
      userId: personId,
      seriesId: series.seriesId,
    };

    console.log("seriesData", seriesData);
    try {
      const response = await fetch(`${backupUrl}/addLastSeenSeries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(seriesData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API response was not ok: ${response.statusText} - ${errorText}`
        );
      }

      const responseData = await response.json();
      console.log("Series added to last seen successfully:", responseData);
    } catch (error) {
      console.error("Error adding series to last seen:", error);
    }
  };

  //updates last seen movie
  const updateLastSeenMovie = async (movie: any) => {
    const movieData = {
      userId: personId,
      movieId: movie.movieId,
    };
    try {
      const response = await fetch(`${backupUrl}/updateLastSeenMovie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API response was not ok: ${response.statusText} - ${errorText}`
        );
      }

      const responseData = await response.json();
      console.log("Movie updated successfully:", responseData);
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  //updates last seen series
  const updateLastSeenSeries = async (series: any) => {
    const seriesData = {
      userId: personId,
      seriesId: series.seriesId,
    };
    try {
      const response = await fetch(`${backupUrl}/updateLastSeenSeries/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(seriesData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API response was not ok: ${response.statusText} - ${errorText}`
        );
      }
      const responseData = await response.json();
      console.log("Series updated successfully:", responseData);
    } catch (error) {
      console.error("Error updating series:", error);
    }
  };

  const isMovieInLastSeen = async (userId: any, movieId: string) => {
    try {
      const response = await fetch(
        `${backupUrl}/isMovieInLastSeen/${userId}/${movieId}`,
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
      console.log("Movie in last seen check response:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error checking if movie is in last seen:", error);
      return null;
    }
  };

  const isSeriesInLastSeen = async (userId: any, seriesId: string) => {
    try {
      const response = await fetch(
        `${backupUrl}/isSeriesInLastSeen/${userId}/${seriesId}`,
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
      console.log("Series in last seen check response:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error checking if series is in last seen:", error);
      return null;
    }
  };

  // Handle item press
  const handleItemPress = async (
    id: number,
    title: string,
    media_type: string
  ) => {
    console.log("Item Pressed:", id, title, media_type);

    try {
      // Try to fetch the movie by ID and title
      const movie = await fetchMovieByIdAndTitle(id.toString(), title);
      if (movie) {
        console.log("Movie found:", movie);
        //console.log("p",personId, movie._id);
        const MovieInLastSeen = await isMovieInLastSeen(personId, movie._id);
        if (MovieInLastSeen) {
          console.log("Movie is already in last seen");
          const lastSeenMovie = { personId, movieId: id };
          await updateLastSeenMovie(lastSeenMovie);
        } else {
          const lastSeenMovie = { personId, movieId: id };
          console.log("lastSeenMovie", lastSeenMovie);
          await addLastSeenMovie(lastSeenMovie);
        }
        routerTransition("push", "/movie", {
          id,
          title,
          personId,
          movieId: movie._id,
        });
      } else {
        // If movie is not found, try to fetch the series by ID and title
        const series = await fetchSeriesByIdAndTitle(id.toString(), title);
        if (series) {
          console.log("Series found:", series);
          const SeriesInLastSeen = await isSeriesInLastSeen(
            personId,
            series._id
          );
          if (SeriesInLastSeen) {
            console.log("Series is already in last seen");
            console.log(personId, series._id);
            const lastSeenSeries = { personId, seriesId: series._id };
            await updateLastSeenSeries(lastSeenSeries);
          } else {
            const lastSeenSeries = { personId, seriesId: id };
            console.log("lastSeenSeries", lastSeenSeries);
            await addLastSeenSeries(lastSeenSeries);
          }
          routerTransition("push", "/tvshow", {
            id,
            title,
            personId,
            seriesId: series._id,
          });
        } else {
          console.log(
            "Neither movie nor series found with the given ID and title."
          );

          // If neither movie nor series is found, create a new entry based on media_type
          if (media_type === "movie") {
            const newMovie = { id, title, media_type };
            const lastSeenMovie = { personId, movieId: id };
            await createMovie(newMovie);
            await addLastSeenMovie(lastSeenMovie);
            console.log("New movie created:", newMovie);
            routerTransition("push", "/movie", { id, title });
          } else if (media_type === "tv") {
            const newSeries = { id, title, media_type };
            const lastSeenSeries = { personId, seriesId: id };
            await createSeries(newSeries);
            await addLastSeenSeries(lastSeenSeries);
            console.log("New series created:", newSeries);
            routerTransition("push", "/tvshow", { id, title });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching movie or series:", error);
    }
  };

  const handleBestToggle = () => {
    console.log("Best Toggle Pressed");
    setBestToggle(!bestToggle);
  };

  const Movie: React.FC<Movie & { onPress: () => void }> = ({
    id,
    title,
    score,
    date,
    banner,
    onPress,
  }) => (
    <View style={tabstyles.itemContainer}>
      <Pressable onPress={onPress}>
        <Image
          source={require("@/assets/images/home/itemcard.png")}
          style={tabstyles.itemCard}
        />
        {banner && (
          <Image source={{ uri: banner }} style={tabstyles.itemPoster} />
        )}
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
        from={{
          transform: [{ rotateZ: "0deg" }],
        }}
        animate={{
          transform: [{ rotateZ: "-360deg" }],
        }}
        transition={{
          type: "timing",
          duration: 45000,
          loop: true,
          repeatReverse: false,
          easing: Easing.linear,
        }}
      />
      <FiltersModal modalShown={modalShown} setModalShown={setModalShown} />
      <ScrollView>
        <HomeHeader
          placeholder={"Search Movies & TV..."}
          originTab={3}
          searchValue={""}
          setModalShown={setModalShown}
          username=""
          emailUser=""
          personid={""}
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
                media_type={"tv"}
                onPress={() =>
                  handleItemPress(item.id, item.title, item.media_type)
                }
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
            data={bestToggle ? topRatedSeries : upcomingPopularSeries}
            renderItem={({ item }) => (
              <Movie
                id={item.id}
                title={item.title}
                score={item.score}
                date={item.date}
                banner={item.banner}
                media_type={"tv"}
                onPress={() =>
                  handleItemPress(item.id, item.title, item.media_type)
                }
              />
            )}
            keyExtractor={(item) => item.id}
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
                media_type={"tv"}
                onPress={() =>
                  handleItemPress(item.id, item.title, item.media_type)
                }
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
                media_type={"tv"}
                onPress={() =>
                  handleItemPress(item.id, item.title, item.media_type)
                }
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
                media_type={"tv"}
                onPress={() =>
                  handleItemPress(item.id, item.title, item.media_type)
                }
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
                media_type={"tv"}
                onPress={() =>
                  handleItemPress(item.id, item.title, item.media_type)
                }
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
