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
import { useLocalSearchParams } from "expo-router";

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
  movieTitle: string;
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

const Category: React.FC<{ category: string }> = ({ category }) => (
  <View style={moviestyles.categoryContainer}>
    <Text style={moviestyles.categoryItem}>{category}</Text>
  </View>
);

const Cast: React.FC<{ name: string; role: string; profilePath: string }> = ({
  name,
  role,
  profilePath,
}) => (
  <View style={moviestyles.castContainer}>
    <Image
      source={require("@/assets/images/home/itemcard.png")}
      style={moviestyles.castCard}
    />
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/w500${profilePath}` }}
      style={moviestyles.castPicture}
    />
    <Text style={moviestyles.castTitle}>{name}</Text>
    <Text style={moviestyles.castRole}>{role}</Text>
  </View>
);

const OtherReview: React.FC<OtherReviews> = ({
  name,
  date,
  score,
  review,
  movieTitle,
}) => (
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
      Published: {date} at {movieTitle}
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
  const {
    id: searchid,
    title: searchTitle,
    personId: searchPersonId,
    movieId: searhMovieId,
  } = useLocalSearchParams<{
    id: string;
    title: string;
    personId: string;
    movieId: string;
  }>();
  const [modalShown, setModalShown] = useState(false);
  const [isSendDisabled, setIsSendDisabled] = useState(true);
  let [watchlist, setWatchlist] = useState(false);
  let [reviewmade, setReviewmade] = useState(false);
  let [yourScore, setYourScore] = useState("");
  let [popupShown, setPopupShown] = useState(false);
  const [otherReviews, setOtherReviews] = useState<OtherReviews[]>([]);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(1);
  const [reviewEditContent, setReviewEditContent] = useState("");
  const [reviewEditRating, setReviewEditRating] = useState(1);
  const [initialReviewContent, setInitialReviewContent] = useState("");
  const [initialReviewRating, setInitialReviewRating] = useState(1);
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [primaryUrl] = useState(
    "http://backend-rottentomatoes-please-enough.up.railway.app"
  );
  const [backupUrl] = useState("https://backend-rottentomatoes.onrender.com");
  const [MovieData, setMovieData] = useState<any>({
    title: "",
    categories: [],
    score: 0,
    userscore: 0,
    date: "",
    duration: "",
    desc: "",
    cast: [],
    director: "",
    createdBy: "",
    ratings: 0,
    releaseDate: "",
    description: "",
    banner: "",
  });

  useEffect(() => {
    console.log(
      "Movie page loaded",
      searchid,
      searchTitle,
      searchPersonId,
      searhMovieId
    );

    const fetchData = async () => {
      try {
        const movie = await fetchMovieByIdAndTitle(searchid, searchTitle);
        if (movie) {
          movie.releaseDate = formatDate(movie.releaseDate);
          setMovieData(movie);
        } else {
          const series = await fetchSeriesByIdAndTitle(searchid, searchTitle);
          if (series) {
            series.releaseDate = formatDate(series.releaseDate);
            setMovieData(series);
          } else {
            console.log(
              "Neither movie nor series found with the given ID and title."
            );
          }
        }

        const watchlist = await fetchUserWatchlist(searchPersonId);
        console.log("User watchlist:", watchlist);
        const isInWatchlist = watchlist.some(
          (item: any) => item._id === searhMovieId
        );
        setWatchlist(isInWatchlist);
        console.log("Is in watchlist:", isInWatchlist);
      } catch (error) {
        console.error("Error fetching movie or series:", error);
      }
    };

    fetchData();
    fetchReviewByAuthorAndMovie(searchPersonId, searhMovieId);
    fetchReviewsByMovieId(searhMovieId);
  }, [searchid, searchTitle]);

  useEffect(() => {
    if (reviewContent.trim() === "" || reviewContent === reviewEditContent) {
      setIsSendDisabled(true);
    } else {
      setIsSendDisabled(false);
    }
  }, [reviewContent, reviewEditContent]);

  // useEffect(() => {
  //   if (!watchlist) {
  //     removeFromWatchlist(searchPersonId, searhMovieId);
  //   }
  // }, [watchlist]);

  const fetchUserWatchlist = async (userId: string) => {
    try {
      const response = await fetch(`${backupUrl}/getWatchlist/${userId}`, {
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
      console.log("User watchlist response:", responseData);

      if (!responseData.watchlist) {
        throw new Error("watchlist is undefined in the response");
      }

      return responseData.watchlist;
    } catch (error) {
      console.error("Error fetching user watchlist:", error);
      return [];
    }
  };

  const fetchReviewsByMovieId = async (movieId: string) => {
    try {
      const response = await fetch(`${backupUrl}/reviews/movie/${movieId}`, {
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
      //console.log("Reviews by movie ID response:", responseData);

      const formattedReviews = responseData.map((review: any) => ({
        name: review.author.username,
        date: new Date(review.createdAt).toLocaleDateString(),
        score: review.rating,
        review: review.content,
        movieTitle: review.movie.title,
      }));

      setOtherReviews(formattedReviews); // Store the formatted reviews in the state
      return responseData;
    } catch (error) {
      console.error("Error fetching reviews by movie ID:", error);
      return null;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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

  const handleEnterReview = () => {
    console.log("Enter Review button pressed");
    setPopupShown(true);
    fetchReviewByAuthorAndMovie(searchPersonId, searhMovieId);
    console.log(searchPersonId, searhMovieId);
  };

  const fetchReviewByAuthorAndMovie = async (
    authorId: string,
    movieId: string
  ) => {
    try {
      const response = await fetch(
        `${backupUrl}/reviews/author/${authorId}/movie/${movieId}`,
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
      if (responseData.length > 0) {
        setReviewmade(true); // Set review made to true
        setReviewId(responseData[0]._id); // Set the review ID
        setReviewContent(responseData[0].content);
        setReviewEditContent(responseData[0].content);
        setReviewRating(responseData[0].rating);
        setReviewEditRating(responseData[0].rating);
      }
      console.log("Review by author and movie response:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error fetching review by author and movie:", error);
      return null;
    }
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
  const handleSendReview = async () => {
    console.log("Send Review button pressed");
    Keyboard.dismiss();

    if (reviewmade) {
      // Update existing review
      await updateReview(
        reviewId,
        reviewContent,
        searchPersonId,
        searhMovieId,
        reviewRating
      );
    } else {
      // Create new review
      await createReview(
        reviewContent,
        searchPersonId,
        searhMovieId,
        reviewRating
      );
    }

    setReviewmade(true);
    setPopupShown(false);
  };
  const updateReview = async (
    reviewId: any,
    content: string,
    authorId: string,
    movieId: string,
    rating: number
  ) => {
    try {
      const response = await fetch(`${backupUrl}/review/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          author: authorId,
          movie: movieId,
          rating,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API response was not ok: ${response.statusText} - ${errorText}`
        );
      }

      const responseData = await response.json();
      console.log("Review updated successfully:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error updating review:", error);
      return null;
    }
  };

  const createReview = async (
    content: string,
    authorId: string,
    movieId: string,
    rating: number
  ) => {
    try {
      const response = await fetch(`${backupUrl}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          author: authorId,
          movie: movieId,
          rating,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API response was not ok: ${response.statusText} - ${errorText}`
        );
      }

      const responseData = await response.json();
      console.log("Review created successfully:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error creating review:", error);
      return null;
    }
  };

  const addToWatchlist = async (userId: string, movieId: string) => {
    try {
      console.log("Adding movie to watchlist:", userId, movieId);
      const response = await fetch(`${backupUrl}/yourWatchlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          movieId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API response was not ok: ${response.statusText} - ${errorText}`
        );
      }

      const responseData = await response.json();
      console.log("Movie added to watchlist successfully:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error adding movie to watchlist:", error);
      return null;
    }
  };

  const removeFromWatchlist = async (userId: string, movieId: string) => {
    try {
      const response = await fetch(`${backupUrl}/removeFromWatchlistSeries`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          movieId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API response was not ok: ${response.statusText} - ${errorText}`
        );
      }

      const responseData = await response.json();
      console.log("Movie removed from watchlist successfully:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
      return null;
    }
  };

  const handleWatchlist = async () => {
    console.log("Watchlist button pressed");
    if (watchlist) {
      await removeFromWatchlist(searchPersonId, searhMovieId);
      console.log("Movie removed from watchlist", searchPersonId, searhMovieId);
    } else {
      await addToWatchlist(searchPersonId, searhMovieId);
    }
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
          disabled={isSendDisabled}
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
          value={reviewRating.toString()}
          onChangeText={(text: any) => setReviewRating(text)}
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
            placeholder={"Give your opinion about this movie..."}
            placeholderTextColor="#777"
            multiline={true}
            numberOfLines={12}
            keyboardType="email-address"
            maxLength={250}
            value={reviewContent}
            onChangeText={(text) => setReviewContent(text)}
          />
        </ScrollView>
      </MotiView>
      <MotiImage
        source={require("@/assets/images/backgrounds/bg_movies.png")}
        style={moviestyles.background}
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
      <ScrollView nestedScrollEnabled={true}>
        <HomeHeader
          placeholder="Search Movies & TV..."
          originTab={6}
          searchValue={""}
          setModalShown={setModalShown}
          username=""
          emailUser=""
          personid={""}
        />
        <View></View>
        <View>
          <Image
            source={require("@/assets/images/home/backdropcard.png")}
            style={moviestyles.backdropcard}
          />
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${MovieData.banner}`,
            }}
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
            <Text style={moviestyles.itemScore}>{MovieData.ratings}</Text>
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
            <Text style={moviestyles.seasonScore}>{MovieData.score}</Text>
            <LottieView
              source={getFlagVideoForNumber(MovieInfo[0].score)}
              loop={true}
              speed={0.6}
              autoPlay
              style={moviestyles.seasonScoreFlag}
            />
          </View>
          <Text style={moviestyles.itemTitle}>{MovieData.title}</Text>
          <Text
            style={moviestyles.itemData}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Movie - {MovieData.duration}`min` - Released {MovieData.releaseDate}
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
            source={{
              uri: `https://image.tmdb.org/t/p/w500${MovieData.banner}`,
            }}
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
              data={MovieData.categories}
              renderItem={({ item }) => <Category category={item} />}
              keyExtractor={(item) => item}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <Text style={moviestyles.overviewtitle}>Overview</Text>
          <Text style={moviestyles.overview}>{MovieData.description}</Text>
          <View style={{ top: -335, left: 0 }}>
            <Text style={moviestyles.itemTitlesub}>Top Cast</Text>
          </View>
          <View style={moviestyles.listcontainer}>
            <FlatList
              data={MovieData.cast}
              renderItem={({ item }) => (
                <Cast
                  name={item.name}
                  role={item.role}
                  profilePath={item.profile_path}
                />
              )}
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
            {reviewContent || "You haven't reviewed this movie yet."}
          </Text>
          <MotiView
            from={{ opacity: 0 }}
            animate={reviewmade ? { opacity: 1 } : {}}
          >
            <Image
              source={require("@/assets/images/home/scorebadge.png")}
              style={moviestyles.myreviewbadge}
            />
            <Text style={moviestyles.myreviewscore}>{reviewRating}</Text>
            <LottieView
              source={getFlagVideoForNumber(reviewRating)}
              loop={true}
              speed={0.6}
              autoPlay
              style={moviestyles.myreviewflag}
            />
          </MotiView>
        </View>
        <View style={{ marginBottom: otherReviews.length === 0 ? 180 : 0 }} />
        <View style={{ top: -590, left: 31 }}>
          <Text style={moviestyles.itemTitlesub}>Latest Reviews</Text>
        </View>
        <View style={moviestyles.otherslistcontainer}>
          <FlatList
            data={otherReviews}
            renderItem={({ item }) => (
              <OtherReview
                name={item.name}
                date={item.date}
                score={item.score}
                review={item.review}
                movieTitle={item.movieTitle} // Pass movieTitle
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}
