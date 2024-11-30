import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { playSound } from "@/components/soundUtils";
import LottieView from "lottie-react-native";
import { MotiView, MotiImage, MotiText } from "moti";
import HomeHeader from "@/components/homeHeader";
import tabstyles from "../tabstyles";
import {
  backdropImageMap,
  getFlagVideoForNumber,
} from "@/components/imageMaps";
import AnimatedButton from "@/components/AnimatedButton";
import routerTransition from "@/components/routerTransition";
import { usePersonId } from "../../components/PersonIdContext";

interface Movie {
  id: number;
  title: string;
  score: number;
  date: string;
  banner?: string;
  media_type: string;
}

interface Review {
  _id: string;
  content: string;
  author: {
    _id: string;
    username: string;
    email_user: string;
  };
  movie: {
    _id: string;
    title: string;
    banner: string;
  };
  createdAt: string;
  rating: number;
}

export default function Home() {
  const { personId } = usePersonId();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [username, setUsername] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [lastSeenMovies, setLastSeenMovies] = useState<any[]>([]);
  const [watchlistMovies, setWatchlistMovies] = useState<any[]>([]);
  const [lastSeenSeries, setLastSeenSeries] = useState<any[]>([]);
  const [watchlistSeries, setWatchlistSeries] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const [backupUrl] = useState("https://backend-rottentomatoes.onrender.com");

  const paginatedReviews = reviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    console.log("Person ID: ", personId);

    const fetchReviews = async () => {
      if (personId) {
        const reviewsData = await fetchReviewsByAuthor(personId);
        if (reviewsData) {
          setReviews(reviewsData);
          if (reviewsData.length > 0) {
            const { username, email_user } = reviewsData[0].author;
            setUsername(username);
            setEmailUser(email_user);
            console.log(username, email_user);
          }
        }
      }
    };

    fetchReviews();
    fetchLastSeenMovies();
    fetchWatchlistMovies();
    fetchLastSeenSeries();
    fetchWatchlistSeries();
  }, [personId]);

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
      console.log("Last seen movies response:", responseData);

      if (!responseData.lastSeenMovies) {
        throw new Error("lastSeenMovies is undefined in the response");
      }

      // Ordenar los datos por `seenAt`
      responseData.lastSeenMovies.sort((a: any, b: any) => {
        const dateA = new Date(a.seenAt).getTime();
        const dateB = new Date(b.seenAt).getTime();
        return dateB - dateA;
      });

      const movieDetailsPromises = responseData.lastSeenMovies
        .slice(0, 10)
        .map(async (movie: any) => {
          const movieDetails = await fetchMovieById(movie._id);
          if (movieDetails) {
            const date = new Date(movieDetails.releaseDate);
            const formattedDate = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

            return {
              _id: movieDetails._id,
              id: movieDetails.movieId,
              title: movieDetails.title,
              score: Math.floor(movieDetails.ratings * 10), // Use Math.floor to remove decimals
              date: formattedDate,
              banner: movieDetails.banner
                ? `https://image.tmdb.org/t/p/w500${movieDetails.banner}`
                : undefined,
              media_type: movieDetails.media_type,
              seenAt: movie.seenAt, // Include seenAt
            };
          }
          return null;
        });

      const formattedMovies = (await Promise.all(movieDetailsPromises)).filter(
        (movie) => movie !== null && movie.id !== undefined
      );

      setLastSeenMovies(formattedMovies);
      console.log(`Last seen movies fetched successfully:`, formattedMovies);
    } catch (error) {
      console.error(`Fetching last seen movies failed:`, error);
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
      console.log("Last watchlist response:", responseData);

      if (!responseData.watchlist) {
        throw new Error("watchlist is undefined in the response");
      }

      // Obtener los detalles de cada película en la lista de seguimiento
      const movieDetailsPromises = responseData.watchlist.map(
        async (movie: any) => {
          const movieDetails = await fetchMovieById(movie._id);
          if (movieDetails) {
            const date = new Date(movieDetails.releaseDate);
            const formattedDate = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

            return {
              _id: movieDetails._id,
              id: movieDetails.movieId,
              title: movieDetails.title,
              score: Math.floor(movieDetails.ratings * 10), // Use Math.floor to remove decimals
              date: formattedDate,
              banner: movieDetails.banner
                ? `https://image.tmdb.org/t/p/w500${movieDetails.banner}`
                : undefined,
              seenAt: movie.addedAt, // Include addedAt as seenAt
            };
          }
          return null;
        }
      );

      const formattedMovies = (await Promise.all(movieDetailsPromises)).filter(
        (movie) => movie !== null
      );

      setWatchlistMovies(formattedMovies);
      console.log(`Watchlist fetched successfully:`, formattedMovies);
    } catch (error) {
      console.error(`Fetching watchlist failed:`, error);
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
        throw new Error(`API response was not ok: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Last seen series response:", responseData);

      if (!responseData.lastSeenSeries) {
        throw new Error("lastSeenSeries is undefined in the response");
      }

      const seriesDetailsPromises = responseData.lastSeenSeries
        .slice(0, 10)
        .map(async (series: any) => {
          console.log("series", series._id);
          const seriesDetails = await fetchSeriesById(series._id);
          console.log("seriesDetails", seriesDetails);
          if (seriesDetails) {
            const date = new Date(seriesDetails.releaseDate);
            const formattedDate = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

            return {
              _id: seriesDetails._id,
              id: seriesDetails.seriesId,
              title: seriesDetails.title,
              score: Math.floor(seriesDetails.ratings * 10), // Use Math.floor to remove decimals
              date: formattedDate,
              banner: seriesDetails.banner
                ? `https://image.tmdb.org/t/p/w500${seriesDetails.banner}`
                : undefined,
              media_type: seriesDetails.media_type,
            };
          }
          return null;
        });

      const formattedSeries = (await Promise.all(seriesDetailsPromises)).filter(
        (series) => series !== null && series.id !== undefined
      );

      setLastSeenSeries(formattedSeries);
      console.log(`Last seen series fetched successfully:`, formattedSeries);
    } catch (error) {
      console.error(`Fetching last seen series failed:`, error);
    }
  };

  const fetchWatchlistSeries = async () => {
    try {
      const response = await fetch(
        `${backupUrl}/getWatchlistSeries/${personId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API response was not ok: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Last watchlist series response:", responseData);

      if (!responseData.watchlistSeries) {
        throw new Error("watchlistSeries is undefined in the response");
      }

      const seriesDetailsPromises = responseData.watchlistSeries
        .slice(0, 10)
        .map(async (series: any) => {
          console.log("series", series._id);
          const seriesDetails = await fetchSeriesById(series._id);
          console.log("seriesDetails", seriesDetails);
          if (seriesDetails) {
            const date = new Date(seriesDetails.releaseDate);
            const formattedDate = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

            return {
              _id: seriesDetails._id,
              id: seriesDetails.seriesId,
              title: seriesDetails.title,
              score: Math.floor(seriesDetails.ratings * 10), // Use Math.floor to remove decimals
              date: formattedDate,
              banner: seriesDetails.banner
                ? `https://image.tmdb.org/t/p/w500${seriesDetails.banner}`
                : undefined,
              media_type: seriesDetails.media_type,
            };
          }
          return null;
        });

      const formattedSeries = (await Promise.all(seriesDetailsPromises)).filter(
        (series) => series !== null && series.id !== undefined
      );

      setWatchlistSeries(formattedSeries);
      console.log(`Watchlist series fetched successfully:`, formattedSeries);
    } catch (error) {
      console.error(`Fetching watchlist series failed:`, error);
    }
  };

  const fetchMovieById = async (movieId: string) => {
    try {
      const response = await fetch(`${backupUrl}/getMovieById/${movieId}`, {
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
      console.log("Movie details response:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return null;
    }
  };

  const fetchSeriesById = async (id: string) => {
    try {
      const response = await fetch(`${backupUrl}/getSeriesById/${id}`, {
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
      console.log("Series details response:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error fetching series details:", error);
      return null;
    }
  };

  const fetchReviewsByAuthor = async (authorId: string) => {
    try {
      const response = await fetch(`${backupUrl}/reviews/author/${authorId}`, {
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
      console.log("Reviews by author response:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error fetching reviews by author:", error);
      return null;
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

  const handleItemPressViewOnly = async (id: string, title: string) => {
    console.log("Item Pressed (View Only):", id, title);

    try {
      // Try to fetch the movie by ID and title
      const movie = await fetchMovieByIdAndTitle(id, title);
      if (movie) {
        console.log("Movie found:", movie);
        // Realizar la transición de enrutamiento
        routerTransition("push", "/movie", {
          id,
          title,
          movieId: movie._id,
        });
      } else {
        // If movie is not found, try to fetch the series by ID and title
        const series = await fetchSeriesByIdAndTitle(id, title);
        if (series) {
          console.log("Series found:", series);
          // Realizar la transición de enrutamiento
          routerTransition("push", "/tvshow", {
            id,
            title,
            seriesId: series._id,
          });
        } else {
          console.log(
            "Neither movie nor series found with the given ID and title."
          );
        }
      }
    } catch (error) {
      console.error("Error fetching movie or series:", error);
    }
  };

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
        const handleItemPressViewOnly = async (
          id: string,
          title: string,
          media_type: string
        ) => {
          console.log("Item Pressed (View Only):", id, title, media_type);

          try {
            // Try to fetch the movie by ID and title
            const movie = await fetchMovieByIdAndTitle(id, title);
            if (movie) {
              console.log("Movie found:", movie);
              // Realizar la transición de enrutamiento
              routerTransition("push", "/movie", {
                id,
                title,
                movieId: movie._id,
              });
            } else {
              // If movie is not found, try to fetch the series by ID and title
              const series = await fetchSeriesByIdAndTitle(id, title);
              if (series) {
                console.log("Series found:", series);
                // Realizar la transición de enrutamiento
                routerTransition("push", "/tvshow", {
                  id,
                  title,
                  seriesId: series._id,
                });
              } else {
                console.log(
                  "Neither movie nor series found with the given ID and title."
                );
              }
            }
          } catch (error) {
            console.error("Error fetching movie or series:", error);
          }
        };
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

  const GoToFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const GoToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const Movie: React.FC<{
    id: string;
    title: string;
    score: number;
    date: string;
    banner: string | undefined;
    onPress: () => void;
  }> = ({ id, title, score, date, banner, onPress }) => (
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

  const Review: React.FC<Review> = ({
    _id,
    content,
    author,
    movie,
    createdAt,
    rating,
  }) => (
    <View style={profilestyles.itemContainer}>
      <Pressable
        onPress={() => handleItemPressViewOnly(movie._id, movie.title)}
      >
        <Image
          source={require("@/assets/images/home/searchcard.png")}
          style={profilestyles.itemCard}
        />
        {movie.banner && (
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.banner}` }}
            style={profilestyles.itemPoster}
          />
        )}
        <Image
          source={require("@/assets/images/home/scorebadge.png")}
          style={profilestyles.itemScoreBadge}
        />
        <Text style={profilestyles.itemScore}>{rating}</Text>
        {/* <Image
          source={getFlagImageForNumber(score)}
          style={searchstyles.imgScoreFlag}
        /> */}
        <LottieView
          source={getFlagVideoForNumber(2)}
          loop={true}
          speed={0.6}
          autoPlay
          style={profilestyles.itemScoreFlag}
        />
        <Text
          style={profilestyles.itemTitle}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {movie.title}
        </Text>
        <Text
          style={profilestyles.itemData}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {new Date(createdAt).toLocaleDateString()}
        </Text>
        <Text
          style={profilestyles.itemDesc}
          ellipsizeMode="tail"
          numberOfLines={4}
        >
          {content}
        </Text>
        <Text style={profilestyles.yourscore}>Your Score:</Text>
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
          height: 800,
          zIndex: 0,
        }}
      />
      <MotiImage
        source={require("@/assets/images/backgrounds/bg_profile.png")}
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
          placeholder="Search Movies & TV..."
          originTab={4}
          searchValue=""
          setModalShown={() => {}}
          username={username}
          emailUser={emailUser}
        />
        <View style={tabstyles.listcontainer}>
          <Image
            source={require("@/assets/images/home/stripbg.png")}
            style={tabstyles.stripbg}
          />
          <Text style={tabstyles.stripTitle} numberOfLines={1}>
            In Your Watchlist
          </Text>
          <Image source={backdropImageMap[1]} style={tabstyles.backdrop} />
          <FlatList
            data={[...watchlistMovies, ...watchlistSeries]}
            renderItem={({ item }) => (
              <Movie
                id={item.id}
                title={item.title}
                score={item.score}
                date={item.date}
                banner={item.banner}
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
            Last Seen by You
          </Text>
          <Image source={backdropImageMap[2]} style={tabstyles.backdrop2} />
          <FlatList
            data={[...lastSeenMovies, ...lastSeenSeries]}
            renderItem={({ item }) => (
              <Movie
                id={item.id}
                title={item.title}
                score={item.score}
                date={item.date}
                banner={item.banner}
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
        <Text style={profilestyles.yourreviews}>Your Reviews</Text>
        <View style={profilestyles.listcontainer}>
          <FlatList
            data={paginatedReviews.filter(
              (item) =>
                item._id !== undefined && item.movie && item.movie.banner
            )}
            renderItem={({ item }) => (
              <Review
                _id={item._id}
                content={item.content}
                author={item.author}
                movie={item.movie}
                createdAt={item.createdAt}
                rating={item.rating} // Pass the rating to the Review component
              />
            )}
            keyExtractor={(item) => item._id.toString()}
            scrollEnabled={false}
          />
        </View>
        <AnimatedButton
          onPress={GoToFirstPage}
          source={require("@/assets/images/home/First.png")}
          style={profilestyles.firstpage}
          disabled={currentPage === 1}
        />
        <AnimatedButton
          onPress={handlePreviousPage}
          source={require("@/assets/images/home/Previous.png")}
          style={profilestyles.prevpage}
          disabled={currentPage === 1}
        />
        <AnimatedButton
          onPress={handleNextPage}
          source={require("@/assets/images/home/Next.png")}
          style={profilestyles.nextpage}
          disabled={currentPage === totalPages}
        />
        <AnimatedButton
          onPress={GoToLastPage}
          source={require("@/assets/images/home/Last.png")}
          style={profilestyles.lastpage}
          disabled={currentPage === totalPages}
        />
        <Image
          source={require("@/assets/images/home/page.png")}
          style={profilestyles.currentpage}
        />
        <Text style={profilestyles.currentpagenum} numberOfLines={1}>
          {currentPage}
        </Text>
      </ScrollView>
    </View>
  );
}

const profilestyles = StyleSheet.create({
  firstpage: {
    position: "absolute",
    width: 68,
    height: 68,
    top: 2,
    left: 5,
  },
  prevpage: {
    position: "absolute",
    width: 68,
    height: 68,
    top: -6,
    left: 83,
  },
  currentpage: {
    position: "relative",
    width: 70,
    height: 70,
    top: -10,
    left: 162,
  },
  nextpage: {
    position: "absolute",
    width: 68,
    height: 68,
    top: -6,
    left: 240,
  },
  lastpage: {
    position: "absolute",
    width: 65,
    height: 65,
    top: 2,
    left: 320,
  },
  currentpagenum: {
    position: "relative",
    width: 70,
    height: 70,
    top: -69,
    left: 161,
    fontSize: 30,
    fontFamily: "BoldFont",
    color: "#111",
    zIndex: 1,
    textAlign: "center",
    textShadowColor: "#fff",
    marginBottom: -50,
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
    top: 161.5,
    left: 311.4,
    fontSize: 15,
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
    top: 142,
    left: 317.8,
    zIndex: 1,
  },
  itemScoreFlag: {
    position: "absolute",
    width: 60,
    height: 120,
    top: 68,
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
  listcontainer: {
    marginTop: 50,
    height: "auto",
    // marginBottom: 80,
  },
  yourreviews: {
    position: "absolute",
    height: "auto",
    width: 262,
    top: 1083,
    left: 64,
    textDecorationLine: "underline",
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
    textAlign: "center",
  },
  yourscore: {
    position: "relative",
    width: 133,
    top: -1.5,
    left: 242,
    fontSize: 14,
    fontFamily: "BoldFont",
    textDecorationLine: "underline",
    color: "#ccbcab",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    borderColor: "black",
    borderWidth: 0,
    lineHeight: 20,
  },
});
