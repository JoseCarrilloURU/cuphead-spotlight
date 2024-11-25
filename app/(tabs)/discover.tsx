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
import formatDate from "@/components/formatDate";
import tabstyles from "../tabstyles";
import routerTransition from "@/components/routerTransition";
import FiltersModal from "@/components/filtersModal";
import { usePersonId } from "@/components/PersonIdContext";

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
  const { personId: searchPersonId } = useLocalSearchParams<{
    personId: string;
  }>();
  const [modalShown, setModalShown] = useState(false);
  const { personId, setPersonId } = usePersonId(); // Use the context
  const [movies, setMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);
  const [lastSeenMovies, setLastSeenMovies] = useState<Movie[]>([]);
  const [lastSeenSeries, setLastSeenSeries] = useState<Series[]>([]);
  const [watchlistSeries, setWatchlistSeries] = useState<Series[]>([]);
  const [primaryUrl] = useState(
    "http://backend-rottentomatoes-please-enough.up.railway.app"
  );
  const [backupUrl] = useState("https://backend-rottentomatoes.onrender.com");

  useEffect(() => {
    if (!searchPersonId) {
      console.log("personId is not available yet");
      return;
    }

    console.log("Received personId from discover:", searchPersonId); // Log the personId to verify
    setPersonId(searchPersonId); // Set the personId in the context
    console.log("personId is set in the context:", searchPersonId);

    const fetchMovies = async (
      endpoint: string,
      setState: React.Dispatch<React.SetStateAction<Movie[]>>
    ) => {
      try {
        const response = await fetch(`${backupUrl}/${endpoint}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`API response was not ok: ${response.statusText}`);
        }

        const responseData = await response.json();
        //console.log(`${endpoint} fetched successfully:`, responseData);

        const formattedMovies = responseData.results
          .slice(0, 12)
          .map((movie: any) => ({
            id: movie.id,
            title: movie.name || movie.original_title,
            score: Math.floor(movie.vote_average * 10), // Use Math.floor to remove decimals
            date: formatDate(movie.release_date || movie.first_air_date),
            banner: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            media_type: movie.media_type,
          }));
        setState(formattedMovies);
        //console.log(`${endpoint} fetched successfully:`, formattedMovies);
      } catch (error) {
       //console.error(`Fetching ${endpoint} failed:`, error);
      }
    };

    const fetchLastSeenMovies = async () => {
      try {
        const response = await fetch(`${backupUrl}/getLastSeen/${personId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`API response was not ok: ${response.statusText}`);
        }

        const responseData = await response.json();
        //console.log("Last seen movies response:", responseData);

        const formattedMovies = responseData.lastSeenMovies
          .slice(0, 10)
          .map((movie: any) => {
            const date = new Date(movie.releaseDate);
            const formattedDate = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

            return {
              _id: movie._id,
              id: movie.movieId,
              title: movie.title,
              score: Math.floor(movie.ratings * 10), // Use Math.floor to remove decimals
              date: formattedDate,
              banner: movie.banner
                ? `https://image.tmdb.org/t/p/w500${movie.banner}`
                : undefined,
              media_type: movie.media_type,
            };
          });
        setLastSeenMovies(formattedMovies);
        //console.log(`Last seen movies fetched successfully:`, formattedMovies);
      } catch (error) {
       // console.error(`Fetching last seen  failed:`, error);
      }
    };

    const fetchWatchlistMovies = async () => {
      try {
        const response = await fetch(`${backupUrl}/getWatchlist/${personId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`API response was not ok: ${response.statusText}`);
        }

        const responseData = await response.json();
        // console.log("Last watchlist response:", responseData);

        const formattedMovies = responseData.watchlist
          .slice(0, 10)
          .map((movie: any) => {
            const date = new Date(movie.releaseDate);
            const formattedDate = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

            return {
              _id: movie._id,
              id: movie.movieId,
              title: movie.title,
              score: Math.floor(movie.ratings * 10), // Use Math.floor to remove decimals
              date: formattedDate,
              banner: movie.banner
                ? `https://image.tmdb.org/t/p/w500${movie.banner}`
                : undefined,
            };
          });
        setWatchlistMovies(formattedMovies);
        // console.log(`Watchlist fetched successfully:`, formattedMovies);
      } catch (error) {
       // console.error(`Fetching last seen  failed:`, error);
      }
    };

    const fetchLastSeenSeries = async () => {
      try {
        const response = await fetch(`${backupUrl}/lastSeenSeries/${personId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API response was not ok: ${response.statusText} - ${errorText}`);
        }
    
        const responseData = await response.json();
        //console.log("Last seen series response:", responseData);
    
        const formattedSeries = responseData.lastSeenSeries.slice(0, 10).map((series: any) => ({
          _id: series._id,
          id: series.seriesId,
          title: series.title,
          score: Math.floor(series.ratings * 10), // Use Math.floor to remove decimals
          date: series.releaseDate,
          banner: series.banner ? `https://image.tmdb.org/t/p/w500${series.banner}` : undefined,
        }));
        setLastSeenSeries(formattedSeries);
        //console.log(`Last seen series fetched successfully:`, formattedSeries);
      } catch (error) {
       // console.error(`Fetching last seen series failed:`, error);
      }
    };
    
    const fetchWatchlistSeries = async () => {
      try {
        const response = await fetch(`${backupUrl}/watchlistSeries/${personId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API response was not ok: ${response.statusText} - ${errorText}`);
        }
    
        const responseData = await response.json();
       //console.log("Watchlist series response:", responseData);
    
        const formattedSeries = responseData.watchlistSeries.slice(0, 10).map((series: any) => ({
          _id: series._id,
          id: series.seriesId,
          title: series.title,
          score: Math.floor(series.ratings * 10), // Use Math.floor to remove decimals
          date: series.releaseDate,
          banner: series.banner ? `https://image.tmdb.org/t/p/w500${series.banner}` : undefined,
        }));
        setWatchlistSeries(formattedSeries);
        //console.log(`Watchlist series fetched successfully:`, formattedSeries);
      } catch (error) {
        //console.error(`Fetching watchlist series failed:`, error);
      }
    };

    fetchMovies("trendingMovies", setMovies);
    fetchMovies("trendingWeekMovies", setPopularMovies);
    fetchLastSeenMovies();
    fetchWatchlistMovies();
    fetchLastSeenSeries();
    fetchWatchlistSeries();
  }, [personId, primaryUrl, backupUrl]);

// Fetch movie by ID and title
  const fetchMovieByIdAndTitle = async (movieId: string, title: string) => {
    try {
      const response = await fetch(`${backupUrl}/getMovieByIdAndTitle/${movieId}/${title}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API response was not ok: ${response.statusText} - ${errorText}`);
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
      const response = await fetch(`${backupUrl}/getSeriesByIdAndTitle/${seriesId}/${title}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API response was not ok: ${response.statusText} - ${errorText}`);
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
        throw new Error(`API response was not ok: ${response.statusText} - ${errorText}`);
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
        throw new Error(`API response was not ok: ${response.statusText} - ${errorText}`);
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
        movieId: movie.id,
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
        throw new Error(`API response was not ok: ${response.statusText} - ${errorText}`);
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
      seriesId: series.id,
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
        throw new Error(`API response was not ok: ${response.statusText} - ${errorText}`);
      }
  
      const responseData = await response.json();
      console.log("Series added to last seen successfully:", responseData);
    } catch (error) {
      console.error("Error adding series to last seen:", error);
    }
  };



  // Handle item press
  const handleItemPress = async (id: number, title: string, media_type: string) => {
    console.log("Item Pressed:", id, title, media_type);
  
    try {
      // Try to fetch the movie by ID and title
      const movie = await fetchMovieByIdAndTitle(id.toString(), title);
      if (movie) {
        console.log("Movie found:", movie);
        const lastSeenMovie = { personId,  id };
        await addLastSeenMovie(lastSeenMovie);
        routerTransition("push", "/movie", { id, title });
      } else {
        // If movie is not found, try to fetch the series by ID and title
        const series = await fetchSeriesByIdAndTitle(id.toString(), title);
        if (series) {
          console.log("Series found:", series);
          const lastSeenSeries = {personId, id }; // Corrected key to seriesId
          await addLastSeenSeries(lastSeenSeries);
          routerTransition("push", "/tvshow", { id, title });
        } else {
          console.log("Neither movie nor series found with the given ID and title.");
  
          // If neither movie nor series is found, create a new entry based on media_type
          if (media_type === "movie") {
            const newMovie = { id, title, media_type };
            const lastSeenMovie = { personId, id };
            await createMovie(newMovie);
            await addLastSeenMovie(lastSeenMovie);
            console.log("New movie created:", newMovie);
            routerTransition("push", "/movie", { id, title });
          } else if (media_type === "tv") {
            const newSeries = { id, title, media_type };
            const lastSeenSeries = { personId, seriesId: id }; // Corrected key to seriesId
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

  const Movie: React.FC<Movie & { onPress: (id: number, title: string, media_type: string) => void }> = ({ id, title, score, date, banner, media_type, onPress }) => (
    <View style={tabstyles.itemContainer}>
      <Pressable onPress={() => onPress(id, title, media_type)}>
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
      <FiltersModal modalShown={modalShown} setModalShown={setModalShown} />
      <ScrollView>
        <HomeHeader
          placeholder={"Search Movies & TV..."}
          originTab={1}
          searchValue={""}
          setModalShown={setModalShown}
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
                onPress={() => handleItemPress(item.id , item.title, item.media_type)} // Pass the id to handleItemPress
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
                onPress={() => handleItemPress(item.id , item.title, item.media_type)} // Pass the id to handleItemPress
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
            In Your Watchlist
          </Text>
          <Image source={backdropImageMap[3]} style={tabstyles.backdrop} />
          <FlatList
            data={[...watchlistMovies, ...watchlistSeries]}
            renderItem={({ item }) => (
              <Movie
                id={item.id}
                title={item.title}
                score={item.score}
                date={item.date}
                banner={item.banner}
                onPress={() => handleItemPress(item.id , item.title, item.media_type)} // Pass the id to handleItemPress
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
            data={[...lastSeenMovies, ...lastSeenSeries]}
            renderItem={({ item }) => (
              <Movie
                id={item.id}
                title={item.title}
                score={item.score}
                date={item.date}
                banner={item.banner}
                onPress={() => handleItemPress(item.id , item.title, item.media_type)} // Pass the id to handleItemPress
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
