import { Image, Pressable, TextInput, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import React, { useState, useEffect } from "react";
import { router, SplashScreen } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { playSound } from "../components/soundUtils";
import LottieView from "lottie-react-native";
import { MotiView, MotiImage, MotiText } from "moti";
import AnimatedButton from "../components/AnimatedButton";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  setTimeout(() => {
    SplashScreen.hideAsync();
  }, 800);

  const [pressableDisabled, setPressableDisabled] = useState(false);
  const [loginEnabled, setLoginEnabled] = useState(false);
  const [registerEnabled, setRegisterEnabled] = useState(false);
  const [sendEnabled, setSendEnabled] = useState(false);
  const [verifyEnabled, setVerifyEnabled] = useState(false);
  const [confirmEnabled, setConfirmEnabled] = useState(false);
  const [cardOpacity, setCardOpacity] = useState(0);

  useEffect(() => {
    const loadMusic = async () => {
      await playSound(require("../assets/sound/indexMusic.wav"), {
        isLooping: true,
        volume: 0.5,
      });
    };

    loadMusic();
  }, []);

  const handlePress = async () => {
    console.log("Tap To Begin Pressed");
    setPressableDisabled(true);
    setLoginEnabled(true);
    await playSound(require("../assets/sound/TapToBegin.wav"));
    setTimeout(async () => {
      await playSound(require("../assets/sound/ToggleCard.wav"));
    }, 550);
  };

  const handleLoginPressed = async () => {
    console.log("Login Pressed");
    await playSound(require("../assets/sound/LoginTransition.wav"));
  };

  const handleGoToRegister = async () => {
    console.log("Go To Register Pressed");
    setTimeout(async () => {
      await playSound(require("../assets/sound/ToggleCard.wav"));
    }, 650);
    setLoginEnabled(false);
    setRegisterEnabled(true);
  };

  const handleGoToForgot = async () => {
    console.log("Go To Credentials Pressed");
    setTimeout(async () => {
      await playSound(require("../assets/sound/ToggleCard.wav"));
    }, 650);
    setLoginEnabled(false);
    setSendEnabled(true);
    setCardOpacity(0);
  };

  const handleRegisterPressed = async () => {
    console.log("Register Pressed");
    setTimeout(async () => {
      await playSound(require("../assets/sound/ToggleCard.wav"));
    }, 650);
    setLoginEnabled(true);
    setRegisterEnabled(false);
  };

  const handleSendPressed = async () => {
    console.log("Send Button Pressed");
    setTimeout(async () => {
      await playSound(require("../assets/sound/ToggleCard.wav"));
    }, 650);
    setVerifyEnabled(true);
    setSendEnabled(false);
    setCardOpacity(1);
  };

  const handleVerifyPressed = async () => {
    console.log("Verify Button Pressed");
    setTimeout(async () => {
      await playSound(require("../assets/sound/ToggleCard.wav"));
    }, 650);
    setConfirmEnabled(true);
    setVerifyEnabled(false);
    setCardOpacity(2);
  };

  const handleConfirmPressed = async () => {
    console.log("Confirm Button Pressed");
    setTimeout(async () => {
      await playSound(require("../assets/sound/ToggleCard.wav"));
    }, 650);
    setLoginEnabled(true);
    setConfirmEnabled(false);
  };

  const handleBackToLogin1 = async () => {
    console.log("Back to Login from Register Pressed");
    setTimeout(async () => {
      await playSound(require("../assets/sound/Back.wav"));
    }, 650);
    setLoginEnabled(true);
    setRegisterEnabled(false);
  };

  const handleBackToLogin2 = async () => {
    console.log("Back to Login from Send Pressed");
    setTimeout(async () => {
      await playSound(require("../assets/sound/Back.wav"));
    }, 650);
    setLoginEnabled(true);
    setSendEnabled(false);
  };

  const handleBackToLogin3 = async () => {
    console.log("Back to Login from Verify Pressed");
    setTimeout(async () => {
      await playSound(require("../assets/sound/Back.wav"));
    }, 650);
    setLoginEnabled(true);
    setVerifyEnabled(false);
  };

  const handleBackToLogin4 = async () => {
    console.log("Back to Login from Confirm Pressed");
    setTimeout(async () => {
      await playSound(require("../assets/sound/Back.wav"));
    }, 650);
    setLoginEnabled(true);
    setConfirmEnabled(false);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={pressableDisabled}
      style={{ flex: 1 }}
    >
      <MotiView>
        <MotiImage
          source={require("../assets/images/index/Logo.png")}
          style={styles.logo}
          from={{
            translateY: 0,
            scale: 1,
          }}
          animate={
            pressableDisabled
              ? {
                  translateY: -25,
                  scale: 0.8,
                }
              : {}
          }
          transition={{
            type: "timing",
            duration: 800,
          }}
        />
        <MotiText
          style={styles.padncar}
          from={{ opacity: 1, translateY: 0, scale: 1 }}
          animate={
            pressableDisabled ? { opacity: 0, translateY: -35, scale: 0.7 } : {}
          }
          transition={{
            type: "timing",
            duration: 650,
            delay: 100,
            easing: Easing.in(Easing.ease),
          }}
        >
          Pad N' Carrillo Entertainment Inc.
        </MotiText>
        <MotiView
          style={styles.tapfade}
          from={{
            opacity: 0,
          }}
          animate={
            pressableDisabled
              ? {
                  opacity: 0.6,
                }
              : {}
          }
          transition={{
            type: "timing",
            duration: 900,
          }}
        />
        <MotiImage
          source={require("../assets/images/index/TapToBegin.png")}
          style={styles.taptobegin}
          from={{
            opacity: 1,
          }}
          animate={{
            opacity: 0,
          }}
          transition={{
            type: "timing",
            duration: 2000,
            loop: !pressableDisabled,
          }}
        />
        <LottieView
          source={require("../assets/images/index/cuphead.json")}
          loop={true}
          speed={0.8}
          autoPlay
          style={styles.cuphead}
        />
        <Image
          source={require("../assets/images/index/chips.png")}
          style={styles.chips}
        />
        <MotiImage
          source={require("../assets/images/backgrounds/bg_start.png")}
          style={styles.background}
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
      </MotiView>

      {/* ASSETS DE LOGIN */}
      <MotiView
        from={{
          translateX: 400,
        }}
        animate={
          loginEnabled
            ? {
                translateX: 0,
              }
            : registerEnabled
            ? {
                translateX: -400,
              }
            : {}
        }
        transition={{
          type: "timing",
          duration: 650,
          easing: Easing.out(Easing.cubic),
          delay: 700,
        }}
      >
        <Image
          source={require("../assets/images/index/logincard.png")}
          style={styles.logincard}
        />
        <Image
          source={require("../assets/images/index/field.png")}
          style={styles.field1login}
        />
        <TextInput
          style={styles.text1login}
          placeholder="Enter Username..."
          placeholderTextColor="#555"
          // value={username}
          //onChangeText={(text) => setUsername(text.toLowerCase())} // Convierte a minúsculas
          keyboardType="email-address"
          multiline={false} // No permitir múltiples líneas
          scrollEnabled={false} // Evitar que el input se desplace horizontalmente
          numberOfLines={1} // Forzar una sola línea
          //ellipsizeMode="tail"
          maxLength={50}
        />
        <Image
          source={require("../assets/images/index/field.png")}
          style={styles.field2login}
        />
        <TextInput
          style={styles.text2login}
          placeholder="Enter Password..."
          placeholderTextColor="#555"
          secureTextEntry={true}
          // value={username}
          //onChangeText={(text) => setUsername(text.toLowerCase())} // Convierte a minúsculas
          keyboardType="email-address"
          multiline={false} // No permitir múltiples líneas
          scrollEnabled={false} // Evitar que el input se desplace horizontalmente
          numberOfLines={1} // Forzar una sola línea
          //ellipsizeMode="tail"
          maxLength={50}
        />
      </MotiView>
      <MotiView
        from={{
          translateY: 300,
        }}
        animate={
          loginEnabled
            ? {
                translateY: 0,
              }
            : {}
        }
        transition={{
          type: "timing",
          duration: 1000,
          easing: Easing.out(Easing.cubic),
          delay: 250,
        }}
      >
        <Image
          source={require("../assets/images/index/boardlogin.png")}
          style={styles.boardlogin}
        />
        <AnimatedButton
          onPress={handleLoginPressed}
          source={require("../assets/images/index/loginbutton.png")}
          style={styles.logbutton}
        />
        <AnimatedButton
          onPress={handleGoToRegister}
          source={require("../assets/images/index/gotoregister.png")}
          style={styles.gotoregister}
        />
        <AnimatedButton
          onPress={handleGoToForgot}
          source={require("../assets/images/index/gotoforgotcreds.png")}
          style={styles.gotoforgot}
        />
      </MotiView>

      {/* ASSETS DE REGISTER */}
      <MotiView
        from={{
          translateX: 400,
        }}
        animate={
          registerEnabled
            ? {
                translateX: 0,
              }
            : {}
        }
        transition={{
          type: "timing",
          duration: 650,
          easing: Easing.out(Easing.cubic),
          delay: 700,
        }}
      >
        <Image
          source={require("../assets/images/index/registercard.png")}
          style={styles.regcard}
        />
        <Image
          source={require("../assets/images/index/field.png")}
          style={styles.field1reg}
        />
        <TextInput
          style={styles.text1reg}
          placeholder="Enter E-Mail..."
          placeholderTextColor="#555"
          // value={username}
          //onChangeText={(text) => setUsername(text.toLowerCase())} // Convierte a minúsculas
          keyboardType="email-address"
          multiline={false} // No permitir múltiples líneas
          scrollEnabled={false} // Evitar que el input se desplace horizontalmente
          numberOfLines={1} // Forzar una sola línea
          //ellipsizeMode="tail"
          maxLength={50}
        />
        <Image
          source={require("../assets/images/index/field.png")}
          style={styles.field2reg}
        />
        <TextInput
          style={styles.text2reg}
          placeholder="Enter Username..."
          placeholderTextColor="#555"
          // value={username}
          //onChangeText={(text) => setUsername(text.toLowerCase())} // Convierte a minúsculas
          keyboardType="email-address"
          multiline={false} // No permitir múltiples líneas
          scrollEnabled={false} // Evitar que el input se desplace horizontalmente
          numberOfLines={1} // Forzar una sola línea
          //ellipsizeMode="tail"
          maxLength={50}
        />
        <Image
          source={require("../assets/images/index/field.png")}
          style={styles.field3reg}
        />
        <TextInput
          style={styles.text3reg}
          placeholder="Enter Password..."
          placeholderTextColor="#555"
          // value={username}
          //onChangeText={(text) => setUsername(text.toLowerCase())} // Convierte a minúsculas
          keyboardType="email-address"
          multiline={false} // No permitir múltiples líneas
          scrollEnabled={false} // Evitar que el input se desplace horizontalmente
          numberOfLines={1} // Forzar una sola línea
          // ellipsizeMode="tail"
          maxLength={50}
        />
      </MotiView>
      <MotiView
        from={{
          translateY: 300,
        }}
        animate={
          registerEnabled
            ? {
                translateY: 0,
              }
            : {}
        }
        transition={{
          type: "timing",
          duration: 1000,
          easing: Easing.out(Easing.cubic),
          delay: 350,
        }}
      >
        <Image
          source={require("../assets/images/index/boardregister.png")}
          style={styles.boardreg}
        />
        <AnimatedButton
          onPress={handleRegisterPressed}
          source={require("../assets/images/index/registerbutton.png")}
          style={styles.regbutton}
        />
        <AnimatedButton
          onPress={handleBackToLogin1}
          source={require("../assets/images/index/gobacktologin.png")}
          style={styles.backtologin1}
        />
      </MotiView>

      {/* ASSETS DE FORGOT CREDENTIALS (SEND) */}
      <MotiView
        from={{
          translateX: -400,
        }}
        animate={
          sendEnabled
            ? {
                translateX: 0,
              }
            : verifyEnabled || confirmEnabled
            ? {
                translateX: 400,
              }
            : {}
        }
        transition={{
          type: "timing",
          duration: 650,
          easing: Easing.out(Easing.cubic),
          delay: 700,
        }}
        style={{
          opacity: loginEnabled && cardOpacity !== 0 ? 0 : 1,
        }}
      >
        <Image
          source={require("../assets/images/index/forgotcredcard.png")}
          style={styles.sendcard}
        />
        <Image
          source={require("../assets/images/index/field.png")}
          style={styles.field1forgot}
        />
        <TextInput
          style={styles.text1forgot}
          placeholder="Enter E-Mail..."
          placeholderTextColor="#555"
          // value={username}
          //onChangeText={(text) => setUsername(text.toLowerCase())} // Convierte a minúsculas
          keyboardType="email-address"
          multiline={false} // No permitir múltiples líneas
          scrollEnabled={false} // Evitar que el input se desplace horizontalmente
          numberOfLines={1} // Forzar una sola línea
          //ellipsizeMode="tail"
          maxLength={50}
        />
      </MotiView>
      <MotiView
        from={{
          translateY: 300,
        }}
        animate={
          sendEnabled
            ? {
                translateY: 0,
              }
            : {}
        }
        transition={{
          type: "timing",
          duration: 1000,
          easing: Easing.out(Easing.cubic),
          delay: 350,
        }}
      >
        <Image
          source={require("../assets/images/index/boardregister.png")}
          style={styles.boardsend}
        />
        <AnimatedButton
          onPress={handleSendPressed}
          source={require("../assets/images/index/send.png")}
          style={styles.sendbutton}
        />
        <AnimatedButton
          onPress={handleBackToLogin2}
          source={require("../assets/images/index/gobacktologin.png")}
          style={styles.backtologin2}
        />
      </MotiView>

      {/* ASSETS DE FORGOT CREDENTIALS (VERIFY) */}
      <MotiView
        from={{
          translateX: -400,
        }}
        animate={
          verifyEnabled
            ? {
                translateX: 0,
              }
            : confirmEnabled
            ? {
                translateX: 400,
              }
            : {}
        }
        transition={{
          type: "timing",
          duration: 650,
          easing: Easing.out(Easing.cubic),
          delay: 700,
        }}
        style={{
          opacity: loginEnabled && cardOpacity === 2 ? 0 : 1,
        }}
      >
        <Image
          source={require("../assets/images/index/forgotcard.png")}
          style={styles.verifycard}
        />
        <Image
          source={require("../assets/images/index/field.png")}
          style={styles.field2forgot}
        />
        <TextInput
          style={styles.text2forgot}
          placeholder="Enter the Code Sent..."
          placeholderTextColor="#555"
          // value={username}
          //onChangeText={(text) => setUsername(text.toLowerCase())} // Convierte a minúsculas
          keyboardType="email-address"
          multiline={false} // No permitir múltiples líneas
          scrollEnabled={false} // Evitar que el input se desplace horizontalmente
          numberOfLines={1} // Forzar una sola línea
          //ellipsizeMode="tail"
          maxLength={50}
        />
      </MotiView>
      <MotiView
        from={{
          translateY: 300,
        }}
        animate={
          verifyEnabled
            ? {
                translateY: 0,
              }
            : {}
        }
        transition={{
          type: "timing",
          duration: 1000,
          easing: Easing.out(Easing.cubic),
          delay: 350,
        }}
      >
        <Image
          source={require("../assets/images/index/boardregister.png")}
          style={styles.boardverify}
        />
        <AnimatedButton
          onPress={handleVerifyPressed}
          source={require("../assets/images/index/verify.png")}
          style={styles.verifybutton}
        />
        <AnimatedButton
          onPress={handleBackToLogin3}
          source={require("../assets/images/index/gobacktologin.png")}
          style={styles.backtologin3}
        />
      </MotiView>

      {/* ASSETS DE FORGOT CREDENTIALS (CONFIRM) */}
      <MotiView
        from={{
          translateX: -400,
        }}
        animate={
          confirmEnabled
            ? {
                translateX: 0,
              }
            : {}
        }
        transition={{
          type: "timing",
          duration: 650,
          easing: Easing.out(Easing.cubic),
          delay: 700,
        }}
      >
        <Image
          source={require("../assets/images/index/confirmcard.png")}
          style={styles.sendcard}
        />
        <Image
          source={require("../assets/images/index/field.png")}
          style={styles.field3forgot}
        />
        <TextInput
          style={styles.text3forgot}
          placeholder="Enter Password..."
          placeholderTextColor="#555"
          // value={username}
          //onChangeText={(text) => setUsername(text.toLowerCase())} // Convierte a minúsculas
          keyboardType="email-address"
          multiline={false} // No permitir múltiples líneas
          scrollEnabled={false} // Evitar que el input se desplace horizontalmente
          numberOfLines={1} // Forzar una sola línea
          //ellipsizeMode="tail"
          maxLength={50}
        />
        <Image
          source={require("../assets/images/index/field.png")}
          style={styles.field4forgot}
        />
        <TextInput
          style={styles.text4forgot}
          placeholder="Verify Password..."
          placeholderTextColor="#555"
          // value={username}
          //onChangeText={(text) => setUsername(text.toLowerCase())} // Convierte a minúsculas
          keyboardType="email-address"
          multiline={false} // No permitir múltiples líneas
          scrollEnabled={false} // Evitar que el input se desplace horizontalmente
          numberOfLines={1} // Forzar una sola línea
          //ellipsizeMode="tail"
          maxLength={50}
        />
      </MotiView>
      <MotiView
        from={{
          translateY: 300,
        }}
        animate={
          confirmEnabled
            ? {
                translateY: 0,
              }
            : {}
        }
        transition={{
          type: "timing",
          duration: 1000,
          easing: Easing.out(Easing.cubic),
          delay: 350,
        }}
      >
        <Image
          source={require("../assets/images/index/boardregister.png")}
          style={styles.boardsend}
        />
        <AnimatedButton
          onPress={handleConfirmPressed}
          source={require("../assets/images/index/confirm.png")}
          style={styles.confirmbutton}
        />
        <AnimatedButton
          onPress={handleBackToLogin4}
          source={require("../assets/images/index/gobacktologin.png")}
          style={styles.backtologin2}
        />
      </MotiView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  confirmbutton: {
    position: "absolute",
    width: 210,
    height: 45,
    top: 628,
    left: 85,
    zIndex: 6,
  },
  backtologin4: {
    position: "absolute",
    width: 170,
    height: 60,
    top: 712,
    left: 110,
    zIndex: 6,
  },
  boardconfirm: {
    position: "absolute",
    width: 325,
    height: 225,
    top: 590,
    left: 32,
  },
  confirmcard: {
    position: "absolute",
    width: 380,
    height: 410,
    top: 190,
    left: 9,
    zIndex: 6,
  },
  field3forgot: {
    position: "absolute",
    width: 300,
    height: 80,
    top: 350,
    left: 51,
    zIndex: 6,
  },
  text3forgot: {
    position: "absolute",
    fontFamily: "BaseFont",
    fontSize: 24,
    width: 250,
    height: 60,
    padding: 10,
    backgroundColor: "transparent",
    color: "#000",
    top: 330,
    left: 64,
    zIndex: 7,
  },
  field4forgot: {
    position: "absolute",
    width: 300,
    height: 80,
    top: 460,
    left: 42,
    zIndex: 6,
  },
  text4forgot: {
    position: "absolute",
    fontFamily: "BaseFont",
    fontSize: 24,
    width: 260,
    height: 60,
    padding: 10,
    backgroundColor: "transparent",
    color: "#000",
    top: 440,
    left: 57,
    zIndex: 7,
  },
  verifybutton: {
    position: "absolute",
    width: 190,
    height: 55,
    top: 623,
    left: 96,
    zIndex: 6,
  },
  backtologin3: {
    position: "absolute",
    width: 170,
    height: 60,
    top: 712,
    left: 110,
    zIndex: 6,
  },
  boardverify: {
    position: "absolute",
    width: 325,
    height: 225,
    top: 590,
    left: 32,
  },
  verifycard: {
    position: "absolute",
    width: 380,
    height: 410,
    top: 190,
    left: 9,
    zIndex: 6,
  },
  field2forgot: {
    position: "absolute",
    width: 300,
    height: 80,
    top: 430,
    left: 44,
    zIndex: 6,
  },
  text2forgot: {
    position: "absolute",
    fontFamily: "BaseFont",
    fontSize: 24,
    width: 250,
    height: 60,
    padding: 10,
    backgroundColor: "transparent",
    color: "#000",
    top: 410,
    left: 58,
    zIndex: 7,
  },
  sendbutton: {
    position: "absolute",
    width: 170,
    height: 55,
    top: 622,
    left: 108,
    zIndex: 6,
  },
  backtologin2: {
    position: "absolute",
    width: 170,
    height: 60,
    top: 712,
    left: 110,
    zIndex: 6,
  },
  boardsend: {
    position: "absolute",
    width: 325,
    height: 225,
    top: 590,
    left: 32,
  },
  sendcard: {
    position: "absolute",
    width: 380,
    height: 410,
    top: 190,
    left: 9,
    zIndex: 6,
  },
  field1forgot: {
    position: "absolute",
    width: 300,
    height: 80,
    top: 430,
    left: 44,
    zIndex: 6,
  },
  text1forgot: {
    position: "absolute",
    fontFamily: "BaseFont",
    fontSize: 24,
    width: 230,
    height: 60,
    padding: 10,
    backgroundColor: "transparent",
    color: "#000",
    top: 410,
    left: 58,
    zIndex: 7,
  },
  regbutton: {
    position: "absolute",
    width: 200,
    height: 40,
    top: 630,
    left: 94,
    zIndex: 6,
  },
  backtologin1: {
    position: "absolute",
    width: 170,
    height: 60,
    top: 712,
    left: 110,
    zIndex: 6,
  },
  boardreg: {
    position: "absolute",
    width: 325,
    height: 225,
    top: 590,
    left: 32,
  },
  regcard: {
    position: "absolute",
    width: 380,
    height: 410,
    top: 190,
    left: 9,
    zIndex: 6,
  },
  field1reg: {
    position: "absolute",
    width: 300,
    height: 80,
    top: 320,
    left: 44,
    zIndex: 6,
  },
  text1reg: {
    position: "absolute",
    fontFamily: "BaseFont",
    fontSize: 24,
    width: 230,
    height: 60,
    padding: 10,
    backgroundColor: "transparent",
    color: "#000",
    top: 300,
    left: 58,
    zIndex: 7,
  },
  field2reg: {
    position: "absolute",
    width: 300,
    height: 80,
    top: 400,
    left: 44,
    zIndex: 6,
  },
  text2reg: {
    position: "absolute",
    fontFamily: "BaseFont",
    fontSize: 24,
    width: 230,
    height: 60,
    padding: 10,
    backgroundColor: "transparent",
    color: "#000",
    top: 380,
    left: 57,
    zIndex: 7,
  },
  field3reg: {
    position: "absolute",
    width: 300,
    height: 80,
    top: 480,
    left: 44,
    zIndex: 6,
  },
  text3reg: {
    position: "absolute",
    fontFamily: "BaseFont",
    fontSize: 24,
    width: 230,
    height: 60,
    padding: 10,
    backgroundColor: "transparent",
    color: "#000",
    top: 460,
    left: 58,
    zIndex: 7,
  },
  logbutton: {
    position: "absolute",
    width: 190,
    height: 45,
    top: 625,
    left: 105,
    zIndex: 6,
  },
  gotoregister: {
    position: "absolute",
    width: 130,
    height: 32,
    top: 700,
    left: 140,
    zIndex: 6,
  },
  gotoforgot: {
    position: "absolute",
    width: 145,
    height: 30,
    top: 750,
    left: 128,
    zIndex: 6,
  },
  boardlogin: {
    position: "absolute",
    width: 325,
    height: 225,
    top: 595,
    left: 40,
  },
  logincard: {
    position: "absolute",
    width: 380,
    height: 410,
    top: 185,
    left: 7,
    zIndex: 6,
  },
  field1login: {
    position: "absolute",
    width: 300,
    height: 80,
    top: 350,
    left: 44,
    zIndex: 6,
  },
  text1login: {
    position: "absolute",
    fontFamily: "BaseFont",
    fontSize: 24,
    width: 230,
    height: 60,
    padding: 10,
    backgroundColor: "transparent",
    color: "#000",
    top: 330,
    left: 57,
    zIndex: 7,
  },
  text2login: {
    position: "absolute",
    fontFamily: "BaseFont",
    fontSize: 24,
    width: 230,
    height: 60,
    padding: 10,
    backgroundColor: "transparent",
    color: "#000",
    top: 430,
    left: 68,
    zIndex: 7,
  },
  field2login: {
    position: "absolute",
    width: 300,
    height: 80,
    top: 450,
    left: 57,
    zIndex: 6,
  },
  tapfade: {
    position: "absolute",
    width: 900,
    height: 900,
    backgroundColor: "#000",
    zIndex: 5,
  },
  padncar: {
    fontFamily: "PadNCarrilloFont",
    fontSize: 15,
    position: "absolute",
    top: 235,
    left: 24,
  },
  cuphead: {
    position: "absolute",
    width: 450,
    height: 450,
    top: 290,
    left: -30,
    zIndex: 1,
  },
  chips: {
    position: "absolute",
    width: 1000,
    height: 150,
    top: 678,
    left: -25,
    zIndex: 2,
  },
  logo: {
    position: "absolute",
    top: 50,
    left: 15,
    width: 360,
    height: 180,
    zIndex: 6,
  },
  taptobegin: {
    position: "absolute",
    width: 250,
    height: 50,
    top: 730,
    left: 64,
    zIndex: 5,
  },
  background: {
    position: "absolute",
    width: 900,
    height: 900,
    top: -35,
    left: -260,
    zIndex: -1,
    alignSelf: "center",
  },
});
