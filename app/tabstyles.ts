import { StyleSheet } from "react-native";

const tabstyles = StyleSheet.create({
  toggle1: {
    position: "absolute",
    width: 100,
    top: -40,
    right: 25,
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
    width: 100,
    top: -22,
    right: 25,
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
  backdrop: {
    position: "absolute",
    width: 240,
    height: 240,
    top: 25,
    left: 75,
    opacity: 0.4,
  },
  backdrop2: {
    position: "absolute",
    width: 280,
    height: 240,
    top: 25,
    left: 50,
    opacity: 0.4,
  },
  stripbg: {
    position: "absolute",
    width: 400,
    height: 425,
    opacity: 0.7,
    top: -50,
  },
  itemContainer: {
    marginRight: 30,
    marginLeft: 18,
  },
  itemCard: {
    position: "relative",
    width: 150,
    height: 230,
  },
  itemPoster: {
    position: "absolute",
    width: 136,
    height: 202,
    top: 11,
    left: 3,
    borderStyle: "solid",
    borderColor: "#222",
    borderWidth: 1,
  },
  itemTitle: {
    position: "relative",
    width: 133,
    top: 2,
    left: 5,
    fontSize: 16,
    fontFamily: "BoldFont",
    color: "#ccbcab",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: -1 },
    borderColor: "transparent",
    borderWidth: 1,
  },
  itemDate: {
    position: "relative",
    width: 140,
    height: 140,
    top: 1,
    left: 5,
    fontSize: 16,
    fontFamily: "BaseFont",
    color: "#ccbcab",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: -1 },
  },
  itemScore: {
    position: "absolute",
    width: 70,
    height: 70,
    top: 195.5,
    left: 106.8,
    fontSize: 25,
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
    width: 75,
    height: 75,
    top: 175,
    left: 105,
    zIndex: 1,
  },
  itemScoreFlag: {
    position: "absolute",
    width: 70,
    height: 140,
    top: 98,
    left: 115,
    transform: [{ rotate: "-5deg" }],
  },
  stripTitle: {
    width: 400,
    top: -6,
    left: 15,
    fontSize: 18,
    fontFamily: "PadNCarrilloFont",
    color: "#f8e7d5",
    zIndex: 1,
    textShadowRadius: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    borderColor: "transparent",
    borderWidth: 1,
  },
  listcontainer: {
    marginTop: 300,
    height: 380,
  },
  listcontainer2: {
    marginTop: 40,
    height: 380,
  },
  background: {
    position: "absolute",
    width: 900,
    height: 900,
    top: -44,
    left: -254,
    zIndex: -1,
  },
});
export default tabstyles;
