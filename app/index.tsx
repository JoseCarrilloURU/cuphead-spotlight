import { Image, Pressable, TextInput, StyleSheet } from "react-native";
import { Easing } from "react-native-reanimated";
import React, { useState, useEffect } from "react";
import { router, SplashScreen } from "expo-router";
import { playSound } from "../components/soundUtils";
import LottieView from "lottie-react-native";
import { MotiView, MotiImage, MotiText } from "moti";
import AnimatedButton from "../components/AnimatedButton";
import { setTransition } from "../components/globals";
import styles from "./indexstyles";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  setTimeout(() => {
    SplashScreen.hideAsync();
  }, 100);

  const [pressableDisabled, setPressableDisabled] = useState(false);
  const [loginEnabled, setLoginEnabled] = useState(false);
  const [registerEnabled, setRegisterEnabled] = useState(false);
  const [sendEnabled, setSendEnabled] = useState(false);
  const [verifyEnabled, setVerifyEnabled] = useState(false);
  const [confirmEnabled, setConfirmEnabled] = useState(false);
  const [cardOpacity, setCardOpacity] = useState(0);
  const [loginuser, setLoginuser] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const[email, setEmail] = useState("");
  const[secretToken, setSecretToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 


  useEffect(() => {
    const loadMusic = async () => {
      await playSound(require("../assets/sound/indexMusic.wav"), {
        isLooping: true,
        volume: 0.4,
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
    setTransition(true);
    await playSound(require("../assets/sound/LoginTransition.wav"));

    const dataLogin = {
      identifier: loginuser,
      password: password,
    };

    try {
      const response = await fetch(
        "http://backend-rottentomatoes-please-enough.up.railway.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataLogin),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      setTimeout(() => {
        setTransition(false);
        router.push("/home");
      }, 750);
    } catch (error) {
      console.error("Login failed:", error);
      setTransition(false);
    }
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
  
    const dataReset = {
      email_user: email,
    };
  
    try {
      const response = await fetch("http://backend-rottentomatoes-please-enough.up.railway.app/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataReset),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log("Password reset request successful:", data);
    } catch (error) {
      console.error("Password reset request failed:", error);
    }
  };

  const handleRegisterPressed = async () => {
    console.log("Register Pressed");
  
    const dataRegister = {
      email_user: email,
      password: password,
      username: username,
    };
  
    try {
      const response = await fetch("http://backend-rottentomatoes-please-enough.up.railway.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataRegister),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log("Registration successful:", data);
  
      setTimeout(async () => {
        await playSound(require("../assets/sound/ToggleCard.wav"));
      }, 650);
  
      setLoginEnabled(true);
      setRegisterEnabled(false);
    } catch (error) {
      console.error("Registration failed:", error);
    }
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
            duration: 1300,
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
          value={loginuser}
          onChangeText={(text) => setLoginuser(text.toLowerCase())} // Convierte a minúsculas
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
          value={password}
          onChangeText={(text) => setPassword(text.toLowerCase())} // Convierte a minúsculas
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
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())} // Convierte a minúsculas
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
          value={username}
          onChangeText={(text) => setUsername(text.toLowerCase())} // Convierte a minúsculas
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
          value={password}
          onChangeText={(text) => setPassword(text.toLowerCase())} // Convierte a minúsculas
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
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())} // Convierte a minúsculas
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
           value={secretToken}
          onChangeText={(text) => setSecretToken(text.toLowerCase())} // Convierte a minúsculas
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
          value={newPassword}
          onChangeText={(text) => setNewPassword(text.toLowerCase())} // Convierte a minúsculas
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
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text.toLowerCase())} // Convierte a minúsculas
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
