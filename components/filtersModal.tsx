import {
  ScrollView,
  Image,
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Keyboard,
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import React, { useState, useEffect } from "react";
import { MotiView, MotiText } from "moti";
import { SelectList } from "react-native-dropdown-select-list";
import AnimatedButton from "@/components/AnimatedButton";
import { TabBarIcon } from "@/components/TabBarIcon";

const data = [
  { key: "1", value: "All Categories" },
  { key: "2", value: "Action & Adventure" },
  { key: "3", value: "Animation" },
  { key: "4", value: "Comedy" },
  { key: "5", value: "Crime & Drama" },
  { key: "6", value: "Sci-Fi & Fantasy" },
  { key: "7", value: "Family" },
  { key: "8", value: "Soap & Romance" },
  { key: "9", value: "History" },
  { key: "10", value: "Horror & Mystery" },
  { key: "11", value: "Western" },
  { key: "12", value: "Documentary" },
];

interface FiltersModalProps {
  modalShown: boolean;
  setModalShown: (shown: boolean) => void;
}

const FiltersModal: React.FC<FiltersModalProps> = ({
  modalShown,
  setModalShown,
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [rating, setRating] = useState<"off" | "on" | "range">("off");
  const [date, setDate] = useState<"off" | "on" | "range">("off");

  const handleDone = () => {
    console.log("Done Pressed");
    Keyboard.dismiss();
    setModalShown(false);
  };
  const handleOffPressed = () => {
    console.log("Off Pressed");
    setRating("off");
  };
  const handleOnPressed = () => {
    console.log("On Pressed");
    setRating("on");
  };
  const handleRangePressed = () => {
    console.log("Range Pressed");
    setRating("range");
  };
  const handleOffPressed2 = () => {
    console.log("Off Pressed");
    setDate("off");
  };
  const handleOnPressed2 = () => {
    console.log("Off Pressed");
    setDate("on");
  };
  const handleRangePressed2 = () => {
    console.log("Off Pressed");
    setDate("range");
  };

  return (
    <View>
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: modalShown ? 0.6 : 0 }}
        transition={{ type: "timing", duration: 1000 }}
        pointerEvents={modalShown ? "auto" : "none"}
        style={{
          position: "absolute",
          backgroundColor: "black",
          width: 400,
          height: 900,
          zIndex: 15,
        }}
      />
      <MotiView
        style={{ zIndex: 40 }}
        from={{ translateX: -400 }}
        animate={{ translateX: modalShown ? 0 : -400 }}
        transition={{
          type: "timing",
          duration: 850,
          easing: Easing.out(Easing.cubic),
          delay: 150,
        }}
      >
        <Image
          source={require("@/assets/images/home/searchfilters.png")}
          style={modalstyles.modalbg}
        />
        {/* <Text style={headerstyles.modaltitle}>Search Filters</Text> */}
        <View style={modalstyles.modalselect}>
          <SelectList
            setSelected={(val: string[]) => setSelected(val)}
            data={data}
            defaultOption={data[0]}
            fontFamily="BoldFont"
            save="value"
            onSelect={() => console.log(selected)}
            search={false}
            maxHeight={500}
            arrowicon={
              <View style={{ left: 7, top: -4 }}>
                <TabBarIcon
                  name={"chevron-expand"}
                  size={25}
                  color={"#f3ece1"}
                />
              </View>
            }
            boxStyles={{
              backgroundColor: "#333",
              width: 210,
              borderRadius: 15,
              maxHeight: 45,
            }}
            inputStyles={{ fontSize: 15, left: -2, color: "#f3ece1" }}
            dropdownStyles={{
              backgroundColor: "#333",
              width: 210,
              borderRadius: 15,
            }}
            dropdownTextStyles={{ lineHeight: 18, color: "#f3ece1" }}
          />
        </View>
        <Text style={modalstyles.modalsubtitle}>Rating</Text>
        <View style={{ left: 0, top: -64, zIndex: 18 }}>
          <Pressable onPress={handleOffPressed}>
            <MotiText
              from={{
                scale: 0.8,
                opacity: 0.4,
              }}
              animate={rating === "off" ? { scale: 1.1, opacity: 1 } : {}}
              transition={{
                type: "timing",
                duration: 800,
              }}
              style={modalstyles.toggle1}
            >
              Off
            </MotiText>
          </Pressable>
          <Pressable onPress={handleOnPressed}>
            <MotiText
              from={{ scale: 0.8, opacity: 0.4 }}
              animate={rating === "on" ? { scale: 1.1, opacity: 1 } : {}}
              transition={{
                type: "timing",
                duration: 800,
              }}
              style={modalstyles.toggle2}
            >
              On
            </MotiText>
          </Pressable>
          <MotiView
            from={{ opacity: 0 }}
            animate={
              rating === "on" || rating === "range"
                ? { opacity: 1 }
                : { opacity: 0.4 }
            }
            transition={{ type: "timing", duration: 800 }}
          >
            <TextInput
              style={modalstyles.textinput}
              placeholder="1-100"
              editable={rating === "on" || rating === "range"}
              placeholderTextColor={"#777"}
              multiline={false}
              keyboardType="number-pad"
              maxLength={3}
              onChangeText={(text) => console.log(text)}
            />
          </MotiView>
          <Pressable onPress={handleRangePressed}>
            <MotiText
              from={{ scale: 0.8, opacity: 0.4 }}
              animate={rating === "range" ? { scale: 1.1, opacity: 1 } : {}}
              transition={{
                type: "timing",
                duration: 800,
              }}
              style={modalstyles.toggle3}
            >
              Range
            </MotiText>
          </Pressable>
          <MotiView
            from={{ opacity: 0 }}
            animate={rating === "range" ? { opacity: 1 } : { opacity: 0.4 }}
            transition={{ type: "timing", duration: 800 }}
            style={{ left: 129 }}
          >
            <Text
              style={{
                position: "absolute",
                zIndex: 27,
                fontFamily: "BoldFont",
                fontSize: 25,
                top: 388,
                left: 125,
                color: "#666",
              }}
            >
              -
            </Text>
            <TextInput
              style={modalstyles.textinput}
              placeholder="1-100"
              editable={rating === "range"}
              placeholderTextColor={"#777"}
              multiline={false}
              keyboardType="number-pad"
              maxLength={3}
              onChangeText={(text) => console.log(text)}
            />
          </MotiView>
        </View>
        <View style={{ top: 100 }}>
          <Text style={modalstyles.modalsubtitle}>Dates</Text>
        </View>
        <View style={{ left: 0, top: 38, zIndex: 18 }}>
          <Pressable onPress={handleOffPressed2}>
            <MotiText
              from={{
                scale: 0.8,
                opacity: 0.4,
              }}
              animate={date === "off" ? { scale: 1.1, opacity: 1 } : {}}
              transition={{
                type: "timing",
                duration: 800,
              }}
              style={modalstyles.toggle1}
            >
              Off
            </MotiText>
          </Pressable>
          <Pressable onPress={handleOnPressed2}>
            <MotiText
              from={{ scale: 0.8, opacity: 0.4 }}
              animate={date === "on" ? { scale: 1.1, opacity: 1 } : {}}
              transition={{
                type: "timing",
                duration: 800,
              }}
              style={modalstyles.toggle2}
            >
              On
            </MotiText>
          </Pressable>
          <MotiView
            from={{ opacity: 0 }}
            animate={
              date === "on" || date === "range"
                ? { opacity: 1 }
                : { opacity: 0.4 }
            }
            transition={{ type: "timing", duration: 800 }}
            style={{}}
          >
            <TextInput
              style={modalstyles.textinput}
              placeholder="1920"
              editable={date === "on" || date === "range"}
              placeholderTextColor={"#777"}
              keyboardType="number-pad"
              multiline={false}
              maxLength={4}
              onChangeText={(text) => console.log(text)}
            />
          </MotiView>
          <Pressable onPress={handleRangePressed2}>
            <MotiText
              from={{ scale: 0.8, opacity: 0.4 }}
              animate={date === "range" ? { scale: 1.1, opacity: 1 } : {}}
              transition={{
                type: "timing",
                duration: 800,
              }}
              style={modalstyles.toggle3}
            >
              Range
            </MotiText>
          </Pressable>
          <MotiView
            from={{ opacity: 0 }}
            animate={date === "range" ? { opacity: 1 } : { opacity: 0.4 }}
            transition={{ type: "timing", duration: 800 }}
            style={{ left: 129 }}
          >
            <Text
              style={{
                position: "absolute",
                zIndex: 27,
                fontFamily: "BoldFont",
                fontSize: 25,
                top: 388,
                left: 125,
                color: "#666",
              }}
            >
              -
            </Text>
            <TextInput
              style={modalstyles.textinput}
              placeholder="2024"
              editable={date === "range"}
              placeholderTextColor={"#777"}
              keyboardType="number-pad"
              multiline={false}
              maxLength={4}
              onChangeText={(text) => console.log(text)}
            />
          </MotiView>
          <AnimatedButton
            onPress={handleDone}
            source={require("@/assets/images/home/done.png")}
            style={modalstyles.done}
            disabled={false}
          />
        </View>
      </MotiView>
    </View>
  );
};

const modalstyles = StyleSheet.create({
  textinput: {
    position: "absolute",
    fontFamily: "BaseFont",
    fontSize: 22,
    color: "#000",
    top: 385,
    left: 163,
    width: 62,
    height: 45,
    textAlign: "center",
    zIndex: 27,
  },
  done: {
    position: "absolute",
    top: 443,
    left: 150,
    width: 90,
    height: 37,
    zIndex: 20,
  },
  toggle1: {
    position: "absolute",
    width: 120,
    top: 360,
    right: 270,
    fontSize: 20,
    fontFamily: "BoldFont",
    color: "#333",
    zIndex: 1,
    textShadowRadius: 6,
    textAlign: "center",
    //textShadowColor: "#000",
    // textShadowOffset: { width: 3, height: 3 },
    borderColor: "transparent",
    borderWidth: 1,
  },
  toggle2: {
    position: "absolute",
    width: 120,
    top: 360,
    right: 140,
    fontSize: 20,
    fontFamily: "BoldFont",
    color: "#333",
    zIndex: 1,
    textShadowRadius: 6,
    textAlign: "center",
    //textShadowColor: "#000",
    // textShadowOffset: { width: 3, height: 3 },
    borderColor: "transparent",
    borderWidth: 1,
  },
  toggle3: {
    position: "absolute",
    width: 120,
    top: 365,
    right: 10,
    fontSize: 20,
    fontFamily: "BoldFont",
    color: "#333",
    zIndex: 1,
    textShadowRadius: 6,
    textAlign: "center",
    //textShadowColor: "#000",
    // textShadowOffset: { width: 3, height: 3 },
    borderColor: "transparent",
    borderWidth: 1,
    lineHeight: 20,
  },
  modalselect: {
    position: "absolute",
    top: 212,
    left: 92,
    zIndex: 20,
  },
  modalsubtitle: {
    position: "absolute",
    fontFamily: "BoldFont",
    fontSize: 26,
    width: 360,
    height: 40,
    backgroundColor: "transparent",
    color: "#333",
    textDecorationLine: "underline",
    // textShadowRadius: 6,
    // textShadowColor: "#000",
    // textShadowOffset: { width: 3, height: 3 },
    top: 262,
    left: 13,
    textAlign: "center",
    zIndex: 17,
  },
  modaltitle: {
    position: "absolute",
    fontFamily: "FilterFont",
    fontSize: 24.5,
    width: 360,
    height: 60,
    backgroundColor: "transparent",
    color: "#888",
    textDecorationLine: "underline",
    // textShadowRadius: 6,
    // textShadowColor: "#000",
    // textShadowOffset: { width: 3, height: 3 },
    top: 120,
    left: 14,
    textAlign: "center",
    zIndex: 17,
  },
  modalbg: {
    position: "absolute",
    width: 380,
    height: 460,
    top: 90,
    left: 6,
    zIndex: 16,
  },
});

export default FiltersModal;
