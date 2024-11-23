import { StyleSheet } from "react-native";

const moviestyles = StyleSheet.create({
  seasonContainer: {
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 30,
  },
  seasonCard: {
    position: "relative",
    width: 370,
    height: 165,
  },
  seasonPoster: {
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
  seasonTitle: {
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
  seasonDate: {
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
  seasonDesc: {
    position: "absolute",
    width: 209,
    height: 90,
    top: 62,
    left: 116,
    fontSize: 15,
    fontFamily: "BaseFont",
    color: "#555",
    zIndex: 1,
    borderColor: "black",
    borderWidth: 0,
    // textShadowRadius: 6,
    // textShadowColor: "#000",
    // textShadowOffset: { width: 3, height: 1 },
  },
  seasonScore: {
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
  seasonScoreBadge: {
    position: "absolute",
    width: 60,
    height: 60,
    top: 123.5,
    left: 317.8,
    zIndex: 1,
  },
  seasonScoreFlag: {
    position: "absolute",
    width: 60,
    height: 120,
    top: 55,
    left: 322,
    transform: [{ rotate: "-10deg" }],
  },
  seasonlistcontainer: {
    marginTop: 50,
    height: "auto",
    marginBottom: -25,
  },

  popupx: {
    position: "absolute",
    zIndex: 16,
    top: 90,
    left: 58,
    width: 78,
    height: 27,
  },
  popupdelete: {
    position: "absolute",
    zIndex: 16,
    top: 91,
    left: 224,
    width: 108,
    height: 27,
  },
  popupsend: {
    position: "absolute",
    zIndex: 16,
    top: 513,
    left: 121,
    width: 140,
    height: 40,
  },
  popupscoretext: {
    position: "absolute",
    fontFamily: "BaseFont",
    fontSize: 30,
    backgroundColor: "transparent",
    color: "#bbb",
    textDecorationLine: "underline",
    width: 285,
    height: 80,
    padding: 10,
    top: 103,
    left: 195,
    zIndex: 16,
  },
  popupscore: {
    position: "absolute",
    fontFamily: "BaseFont",
    fontSize: 20,
    backgroundColor: "transparent",
    color: "#bbb",
    textDecorationLine: "underline",
    width: 280,
    height: 60,
    padding: 10,
    top: 120,
    left: 85,
    zIndex: 16,
  },
  popuptext: {
    fontFamily: "BaseFont",
    fontSize: 20,
    backgroundColor: "transparent",
    width: 330,
    color: "#bbb",
    zIndex: 16,
    borderColor: "white",
    borderWidth: 0,
  },
  popuptextcontainer: {
    position: "absolute",
    borderColor: "white",
    top: 180,
    left: 30,
    borderWidth: 0,
    width: 330,
    height: 323,
    zIndex: 16,
  },
  popupbg: {
    position: "absolute",
    zIndex: 15,
    top: 40,
    left: 5.5,
    width: 380,
    height: 550,
  },
  othersreview: {
    fontSize: 18,
    fontFamily: "BaseFont",
    color: "#555",
    borderColor: "black",
    borderWidth: 0,
    zIndex: -10,
    // textShadowRadius: 6,
    // textShadowColor: "#000",
    // textShadowOffset: { width: 3, height: 1 },
  },
  othersreviewcontainer: {
    position: "relative",
    top: -330,
    left: 24,
    borderColor: "black",
    borderWidth: 0,
    width: 295,
    height: 245,
    zIndex: 14,
  },
  othersdate: {
    width: 324,
    height: 25,
    top: -331,
    left: 22,
    fontSize: 17,
    fontFamily: "BaseFont",
    color: "#222",
    zIndex: 1,
    borderColor: "black",
    borderWidth: 0,
    // textShadowRadius: 6,
    // textShadowColor: "#000",
    // textShadowOffset: { width: 3, height: 1 },
  },
  othersauthor: {
    height: 26,
    width: 310,
    top: -330,
    left: 25,
    fontSize: 20,
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
  otherscard: {
    position: "relative",
    width: 370,
    height: 355,
  },
  othersitemcontainer: {
    marginLeft: 10,
    marginRight: 16,
  },
  otherslistcontainer: {
    marginTop: -340,
    marginBottom: -250,
  },
  categoryItem: {
    position: "relative",
    width: "auto",
    height: 28,
    top: 0,
    left: 0,
    fontSize: 20,
    fontFamily: "BoldFont",
    color: "#222",
    zIndex: 10,
    borderColor: "#ccbcab",
    backgroundColor: "#ccbcab",
    borderRadius: 10,
    borderWidth: 2,
    lineHeight: 23,
    boxShadow: "3px 3px 5px 0px #000",
  },
  categoryContainer: {
    marginRight: 15,
  },
  categorylistcontainer: {
    position: "relative",
    marginTop: 0,
    width: 220,
    top: -95,
    left: 15,
    height: 70,
    borderWidth: 0,
    borderColor: "black",
  },
  myreviewflag: {
    position: "relative",
    width: 65,
    height: 130,
    top: -375,
    left: 331,
    transform: [{ rotate: "-3deg" }],
  },
  myreviewscore: {
    position: "relative",
    width: 70,
    height: 70,
    top: -208.5,
    left: 321,
    fontSize: 15,
    fontFamily: "BoldFont",
    color: "#ccbcab",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textAlign: "center",
    textShadowOffset: { width: 2, height: 2 },
  },
  myreviewbadge: {
    position: "relative",
    width: 65,
    height: 65,
    top: -165,
    left: 325,
    zIndex: 1,
  },
  reviewcollapsed: {
    position: "relative",
    fontFamily: "BaseFont",
    fontSize: 18,
    width: 298,
    height: 160,
    padding: 10,
    backgroundColor: "transparent",
    color: "#bbb",
    top: -130,
    left: 46.5,
    zIndex: 14,
    borderWidth: 0,
    borderColor: "white",
  },
  reviewinput: {
    position: "absolute",
    fontFamily: "BaseFont",
    fontSize: 24,
    width: 230,
    height: 60,
    padding: 10,
    backgroundColor: "transparent",
    color: "#000",
    top: 330,
    left: 550,
    zIndex: 7,
  },
  reviewbutton: {
    position: "relative",
    width: 240,
    height: 60,
    top: -172,
    left: 75,
  },
  reviewcontainer: {
    position: "relative",
    width: 370,
    height: 230,
    top: 40,
    left: 9,
  },
  castTitle: {
    position: "relative",
    height: "auto",
    width: 135,
    top: 0,
    left: 5,
    fontSize: 16,
    fontFamily: "BoldFont",
    color: "#ccbcab",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    borderColor: "black",
    borderWidth: 0,
    lineHeight: 25,
  },
  castRole: {
    position: "relative",
    width: 135,
    height: "auto",
    top: 0,
    left: 5,
    fontSize: 16,
    fontFamily: "BaseFont",
    color: "#ccbcab",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
  },
  castContainer: {
    marginRight: 5,
    marginLeft: 15,
  },
  castCard: {
    position: "relative",
    width: 130,
    height: 200,
  },
  castPicture: {
    position: "absolute",
    width: 118,
    height: 176,
    top: 9,
    left: 2.5,
    borderStyle: "solid",
    borderColor: "#222",
    borderWidth: 1,
  },
  listcontainer: {
    marginTop: -85,
    height: "auto",
  },
  watchlist: {
    position: "relative",
    width: 125,
    height: 27,
    top: 88,
    left: 252,
  },
  overview: {
    position: "relative",
    width: 220,
    height: "auto",
    top: -115,
    left: 15,
    fontSize: 16,
    fontFamily: "BaseFont",
    color: "#ccbcab",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    borderColor: "black",
    borderWidth: 0,
    lineHeight: 22,
  },
  overviewtitle: {
    position: "relative",
    width: 133,
    top: -120,
    left: 15,
    fontSize: 19,
    fontFamily: "BoldFont",
    color: "#ccbcab",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    borderColor: "black",
    borderWidth: 0,
    lineHeight: 20,
  },
  itemPoster: {
    position: "relative",
    width: 113,
    height: 166,
    top: 64,
    left: 255,
    borderStyle: "solid",
    borderColor: "#222",
    borderWidth: 2,
    opacity: 1,
  },
  itemCard: {
    position: "relative",
    width: 130,
    height: 190,
    top: 245,
    left: 250,
  },
  itemScore: {
    position: "absolute",
    width: 70,
    height: 70,
    top: 428,
    left: 301,
    fontSize: 28,
    fontFamily: "BoldFont",
    color: "#ccbcab",
    zIndex: 9,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textAlign: "center",
    textShadowOffset: { width: 2, height: 2 },
  },
  itemScoreBadge: {
    position: "absolute",
    width: 85,
    height: 85,
    top: 405,
    left: 295,
    zIndex: 8,
  },
  itemScoreFlag: {
    position: "absolute",
    width: 90,
    height: 180,
    top: 302,
    left: 298,
    transform: [{ rotate: "-10deg" }],
    zIndex: 7,
  },
  imgScoreFlag: {
    position: "absolute",
    width: 60,
    height: 120,
    top: 335,
    left: 310,
    transform: [{ rotate: "-10deg" }],
    zIndex: 7,
  },
  itemTitlesub: {
    position: "relative",
    width: 350,
    height: "auto",
    top: 237,
    left: 20,
    fontSize: 40,
    fontFamily: "BoldFont",
    textDecorationLine: "underline",
    color: "#ccbcab",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    borderColor: "black",
    lineHeight: 50,
    borderWidth: 0,
  },
  itemTitle: {
    position: "relative",
    width: 350,
    height: "auto",
    top: 237,
    left: 20,
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
  },
  itemData: {
    position: "absolute",
    width: 360,
    height: "auto",
    top: 245,
    left: 16,
    fontSize: 18,
    fontFamily: "BaseFont",
    color: "#ccbcab",
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    borderColor: "white",
    borderWidth: 0,
    zIndex: 7,
    textAlign: "center",
  },
  backdrop: {
    position: "absolute",
    width: 369,
    height: 207,
    top: 243,
    left: 12,
    borderStyle: "solid",
    borderColor: "#222",
    borderWidth: 2,
    zIndex: 6,
    opacity: 0.85,
  },
  backdropcard: {
    position: "relative",
    width: 410,
    height: 235,
    top: 230,
    left: -8,
    zIndex: 5,
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

export default moviestyles;