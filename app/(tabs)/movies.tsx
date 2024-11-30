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
import { usePersonId } from "../../components/PersonIdContext"; // Correct import path
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
  const [moviesInTheater, setMoviesInTheater] = useState<Movie[]>([]);
  const [backupUrl] = useState("https://backend-rottentomatoes.onrender.com");
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [discover, setDiscover] = useState<any[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [animatedMovies, setAnimatedMovies] = useState<Movie[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (personId) {
      console.log("Person ID in Movie:", personId);
      fetchMoviesInTheater();
      fetchTopRatedMovies();
      fetchActionMovies();
      fetchComedyMovies();
      fetchAnimatedMovies();
      fetchHorrorMovies();
      fetchUpcomingPopularSeries();
    } else {
      console.log("Person ID is not available yet");
    }
  }, [personId]);

  const fetchMoviesInTheater = async () => {
    try {
      const response = await fetch(`${backupUrl}/moviesInTheater`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API response was not ok: ${response.statusText}`);
      }

      const responseData = await response.json();
      //console.log("Movies in theater response:", responseData);

      // Assuming responseData is an array of movies
      const formattedMovies = responseData.slice(0, 10).map((movie: any) => ({
        id: movie.id,
        title: movie.name || movie.original_title,
        score: Math.floor(movie.vote_average * 10), // Use Math.floor to remove decimals
        date: movie.release_date || movie.first_air_date,
        banner: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : undefined,
      }));
      setMoviesInTheater(formattedMovies);
      //console.log(`Movies in theater fetched successfully:`, formattedMovies);
    } catch (error) {
      console.error(`Fetching movies in theater failed:`, error);
    }
  };

  const fetchUpcomingPopularSeries = async () => {
    try {
      const response = await fetch(`${backupUrl}/discoverMovies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API response was not ok: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("popular new movies response:", responseData);

      if (!Array.isArray(responseData.results)) {
        throw new Error(
          `API response results is not an array: ${JSON.stringify(
            responseData
          )}`
        );
      }

      const formattedSeries = responseData.results
        .slice(0, 10)
        .map((movie: any) => ({
          id: movie.id,
          title: movie.name || movie.original_title,
          score: Math.floor(movie.vote_average * 10), // Use Math.floor to remove decimals
          date: movie.release_date,
          banner: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : undefined,
        }));

      setDiscover(formattedSeries);
      console.log(
        "Upcoming popular series fetched successfully:",
        formattedSeries
      );
    } catch (error) {
      console.error("Fetching upcoming popular series failed:", error);
    }
  };

  const fetchTopRatedMovies = async () => {
    try {
      const response = await fetch(`${backupUrl}/topRated`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API response was not ok: ${response.statusText}`);
      }

      const responseData = await response.json();
      //console.log("topRated response:", responseData);

      if (!responseData.results) {
        throw new Error(
          `API response did not contain results: ${JSON.stringify(
            responseData
          )}`
        );
      }

      const formattedMovies = responseData.results
        .slice(0, 10)
        .map((movie: any) => ({
          id: movie.id,
          title: movie.name || movie.original_title,
          score: Math.floor(movie.vote_average * 10), // Use Math.floor to remove decimals
          date: movie.release_date || movie.first_air_date,
          banner: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : undefined,
        }));
      setTopRatedMovies(formattedMovies);
      //console.log("Top rated movies fetched successfully:", formattedMovies);
    } catch (error) {
      console.error("Fetching top rated movies failed:", error);
    }
  };

  const fetchActionMovies = async () => {
    try {
      const response = await fetch(`${backupUrl}/actionMoviesByRating`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API response was not ok: ${response.statusText}`);
      }

      const responseData = await response.json();
      //console.log("actionMoviesByRating response:", responseData);

      const formattedMovies = responseData.slice(0, 10).map((movie: any) => ({
        id: movie.id,
        title: movie.name || movie.original_title,
        score: Math.floor(movie.vote_average * 10), // Use Math.floor to remove decimals
        date: movie.release_date || movie.first_air_date,
        banner: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : undefined,
      }));
      setActionMovies(formattedMovies);
      //console.log("actionMoviesByRating fetched successfully:", formattedMovies);
    } catch (error) {
      console.error("Fetching actionMoviesByRating failed:", error);
    }
  };

  const fetchComedyMovies = async () => {
    try {
      const response = await fetch(`${backupUrl}/comedyMoviesByRating`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API response was not ok: ${response.statusText} - ${errorText}`
        );
      }

      const responseData = await response.json();
      //console.log("comedyMoviesByRating response:", responseData);

      const formattedMovies = responseData.slice(0, 10).map((movie: any) => ({
        id: movie.id,
        title: movie.name || movie.original_title,
        score: Math.floor(movie.vote_average * 10), // Use Math.floor to remove decimals
        date: movie.release_date || movie.first_air_date,
        banner: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : undefined,
      }));
      setComedyMovies(formattedMovies);
      //console.log("comedyMoviesByRating fetched successfully:", formattedMovies);
    } catch (error) {
      console.error("Fetching comedyMoviesByRating failed:", error);
    }
  };

  const fetchAnimatedMovies = async () => {
    try {
      const response = await fetch(`${backupUrl}/animatedMoviesByRating`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API response was not ok: ${response.statusText} - ${errorText}`
        );
      }

      const responseData = await response.json();
      //console.log("animatedMoviesByRating response:", responseData);

      // Assuming responseData is an array of movies
      const formattedMovies = responseData.slice(0, 10).map((movie: any) => ({
        id: movie.id,
        title: movie.name || movie.original_title,
        score: Math.floor(movie.vote_average * 10), // Use Math.floor to remove decimals
        date: movie.release_date || movie.first_air_date,
        banner: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : undefined,
      }));
      setAnimatedMovies(formattedMovies);
      //console.log("animatedMoviesByRating fetched successfully:", formattedMovies);
    } catch (error) {
      console.error("Fetching animatedMoviesByRating failed:", error);
    }
  };

  const fetchHorrorMovies = async () => {
    try {
      const response = await fetch(`${backupUrl}/horrorMoviesByRating`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API response was not ok: ${response.statusText} - ${errorText}`
        );
      }

      const responseData = await response.json();
      //console.log("horrorMoviesByRating response:", responseData);

      // Assuming responseData is an array of movies
      const formattedMovies = responseData.slice(0, 10).map((movie: any) => ({
        id: movie.id,
        title: movie.name || movie.original_title,
        score: Math.floor(movie.vote_average * 10), // Use Math.floor to remove decimals
        date: movie.release_date || movie.first_air_date,
        banner: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : undefined,
      }));
      setHorrorMovies(formattedMovies);
      //console.log("horrorMoviesByRating fetched successfully:", formattedMovies);
    } catch (error) {
      console.error("Fetching animatedMoviesByRating failed:", error);
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

  const Movie: React.FC<Movie> = ({
    id,
    title,
    score,
    date,
    banner,
    media_type,
  }) => (
    <View style={tabstyles.itemContainer}>
      <Pressable onPress={() => handleItemPress(id, title, media_type)}>
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
        source={require("@/assets/images/backgrounds/bg_movies.png")}
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
          originTab={2}
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
            Most Popular in Theaters
          </Text>
          <Image source={backdropImageMap[1]} style={tabstyles.backdrop} />
          <FlatList
            data={moviesInTheater}
            renderItem={({ item }) => (
              <Movie
                id={item.id}
                title={item.title}
                score={item.score}
                date={item.date}
                banner={item.banner}
                media_type={"movie"}
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
            The Best Movies
          </Text>
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
            data={bestToggle ? topRatedMovies : discover}
            renderItem={({ item }) => (
              <Movie
                id={item.id}
                title={item.title}
                score={item.score}
                date={item.date}
                banner={item.banner}
                media_type={"movie"}
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
            Best in Action Movies
          </Text>
          <Image source={backdropImageMap[3]} style={tabstyles.backdrop} />
          <FlatList
            data={actionMovies}
            renderItem={({ item }) => (
              <Movie
                id={item.id}
                title={item.title}
                score={item.score}
                date={item.date}
                banner={item.banner}
                media_type={"movie"}
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
            Best in Comedy Movies
          </Text>
          <Image source={backdropImageMap[4]} style={tabstyles.backdrop} />
          <FlatList
            data={comedyMovies}
            renderItem={({ item }) => (
              <Movie
                id={item.id}
                title={item.title}
                score={item.score}
                date={item.date}
                banner={item.banner}
                media_type={"movie"}
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
            Best in Animated Movies
          </Text>
          <Image source={backdropImageMap[4]} style={tabstyles.backdrop} />
          <FlatList
            data={animatedMovies}
            renderItem={({ item }) => (
              <Movie
                id={item.id}
                title={item.title}
                score={item.score}
                date={item.date}
                banner={item.banner}
                media_type={"movie"}
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
            Best in Horror Movies
          </Text>
          <Image source={backdropImageMap[4]} style={tabstyles.backdrop} />
          <FlatList
            data={horrorMovies}
            renderItem={({ item }) => (
              <Movie
                id={item.id}
                title={item.title}
                score={item.score}
                date={item.date}
                banner={item.banner}
                media_type={"movie"}
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
