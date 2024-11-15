// const imageMapFlags = {
//   1: require("../assets/images/TarotCards/1.png"),
//   2: require("../assets/images/TarotCards/2.png"),
//   3: require("../assets/images/TarotCards/3.png"),
//   4: require("../assets/images/TarotCards/4.png"),
//   5: require("../assets/images/TarotCards/5.png"),
//   6: require("../assets/images/TarotCards/6.png"),
//   7: require("../assets/images/TarotCards/7.png"),
//   8: require("../assets/images/TarotCards/8.png"),
//   9: require("../assets/images/TarotCards/9.png"),
//   10: require("../assets/images/TarotCards/10.png"),
//   11: require("../assets/images/TarotCards/11.png"),
//   12: require("../assets/images/TarotCards/12.png"),
//   13: require("../assets/images/TarotCards/13.png"),
//   14: require("../assets/images/TarotCards/14.png"),
//   15: require("../assets/images/TarotCards/15.png"),
//   16: require("../assets/images/TarotCards/16.png"),
//   17: require("../assets/images/TarotCards/17.png"),
//   18: require("../assets/images/TarotCards/18.png"),
//   19: require("../assets/images/TarotCards/19.png"),
//   20: require("../assets/images/TarotCards/20.png"),
// };

const backdropImageMap = {
  1: require("@/assets/images/icons/1.png"),
  2: require("@/assets/images/icons/2.png"),
  3: require("@/assets/images/icons/3.png"),
  4: require("@/assets/images/icons/4.png"),
};

const getFlagImageForNumber = (number) => {
  if (number >= 85 && number <= 100) {
    return require("../assets/images/flags/80-100.png");
  } else if (number >= 70 && number <= 84) {
    return require("../assets/images/flags/70-79.png");
  } else if (number >= 40 && number <= 69) {
    return require("../assets/images/flags/69-40.png");
  } else if (number >= 0 && number <= 39) {
    return require("../assets/images/flags/39-0.png");
  } else {
    return null;
  }
};
const getFlagVideoForNumber = (number) => {
  if (number >= 85 && number <= 100) {
    return require("../assets/images/flags/Flag4.json");
  } else if (number >= 70 && number <= 84) {
    return require("../assets/images/flags/Flag3.json");
  } else if (number >= 40 && number <= 69) {
    return require("../assets/images/flags/Flag2.json");
  } else if (number >= 0 && number <= 39) {
    return require("../assets/images/flags/Flag1.json");
  } else {
    return null;
  }
};

export { backdropImageMap, getFlagImageForNumber, getFlagVideoForNumber };
