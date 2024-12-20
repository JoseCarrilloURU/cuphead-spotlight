import { Image, Pressable, TextInput } from "react-native";
import { Easing } from "react-native-reanimated";
import React, { useState, useEffect } from "react";
import { router, SplashScreen } from "expo-router";
import { playSound } from "@/components/soundUtils";
import { Audio } from "expo-av";
import LottieView from "lottie-react-native";
import { MotiView, MotiImage, MotiText } from "moti";
import AnimatedButton from "@/components/AnimatedButton";
import routerTransition from "@/components/routerTransition";
import styles from "./indexstyles";
import { setTransition } from "@/components/globals";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "@/components/ToastUtils";
import { RootSiblingParent } from "react-native-root-siblings";
import "react-toastify/dist/ReactToastify.css";

SplashScreen.preventAutoHideAsync();

const preloadMusic = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("@/assets/sound/appMusic.wav"),
    {
      isLooping: true,
      volume: 0.4,
    }
  );
  await setTimeout(() => {
    sound.playAsync();
  }, 300);
  return sound;
};

export default function Index() {
  setTimeout(() => {
    SplashScreen.hideAsync();
  }, 300);

  const [music, setMusic] = useState<Audio.Sound | null>(null);
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
  const [email, setEmail] = useState("");
  const [secretToken, setSecretToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [backupUrl] = useState("https://backend-rottentomatoes.onrender.com");

  const handlePress = async () => {
    console.log("Tap To Begin Pressed");
    setPressableDisabled(true);
    setLoginEnabled(true);
    await playSound(require("@/assets/sound/TapToBegin.wav"));
    setTimeout(async () => {
      await playSound(require("@/assets/sound/ToggleCard.wav"));
    }, 550);
  };

  const handleLoginPressed = async () => {
    console.log("Login Pressed");

    const dataLogin = {
      identifier: loginuser,
      password: password,
    };

    const primaryUrl =
      "http://backend-rottentomatoes-please-enough.up.railway.app/login";
    const backupUrl = "https://backend-rottentomatoes.onrender.com/login";
    await playSound(require("@/assets/sound/LoginTransition.wav"));

    try {
      const response = await fetch(backupUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataLogin),
      });

      if (!response.ok) {
        throw new Error("Primary API response was not ok");
      }

      const data = await response.json();
      showToast("login success");
      routerTransition("push", "/(tabs)/discover", {
        personId: data.personId,
      });
    } catch (error) {
      showToast("username or password are wrong");
    }
  };

  const handleGoToRegister = async () => {
    console.log("Go To Register Pressed");
    setTimeout(async () => {
      await playSound(require("@/assets/sound/ToggleCard.wav"));
    }, 650);
    setLoginEnabled(false);
    setRegisterEnabled(true);
  };

  const handleGoToForgot = async () => {
    console.log("Go To Credentials Pressed");
    setTimeout(async () => {
      setEmail("");
      await playSound(require("@/assets/sound/ToggleCard.wav"));
    }, 650);
    setLoginEnabled(false);
    setSendEnabled(true);
    setCardOpacity(0);
  };

  const handleRegisterPressed = async () => {
    console.log("Register Pressed");
    console.log(email, username, password);

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = username.trim();
    console.log(`Trimmed email: ${trimmedEmail}`); // Añadir log para depuración
    if (!emailRegex.test(trimmedEmail)) {
      showToast("Invalid email address");
      console.log("invalid email");
      return;
    }

    // Validar password
    if (password.length < 8) {
      showToast("Password must be at least 8 characters long");
      return;
    }

    // Validar username
    if (username.length < 3) {
      showToast("Username must be at least 3 characters long");
      return;
    }

    const dataRegister = {
      email_user: username,
      password: password,
      username: email,
    };

    try {
      const response = await fetch(`${backupUrl}/register`, {
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
        await playSound(require("@/assets/sound/ToggleCard.wav"));
      }, 650);
      setLoginEnabled(true);
      setRegisterEnabled(false);
    } catch (error) {
      //console.error("Registration failed:", error);
      showToast("Register Failed, try again");
    }
  };

  const handleSendPressed = async () => {
    console.log("Send Button Pressed");
    setSecretToken("");
    setTimeout(async () => {
      await playSound(require("@/assets/sound/ToggleCard.wav"));
    }, 650);
    setVerifyEnabled(true);
    setSendEnabled(false);
    setCardOpacity(1);

    const dataReset = {
      email_user: email,
    };

    try {
      const response = await fetch(
        "http://backend-rottentomatoes-please-enough.up.railway.app/resetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataReset),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      showToast("code sent");

      const data = await response.json();
      console.log("Password reset request successful:", data);
    } catch (error) {
      showToast("Error sending the code, check your remail");
      //console.error("Password reset request failed:", error);
    }
  };

  const handleVerifyPressed = async () => {
    console.log("Verify Button Pressed");

    setNewPassword("");
    setConfirmPassword("");

    const dataCheckReset = {
      email_user: email,
      resetCode: secretToken,
    };

    console.log(dataCheckReset);

    try {
      const response = await fetch(
        "http://backend-rottentomatoes-please-enough.up.railway.app/checkReset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataCheckReset),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      showToast("the code is correct");
      setTimeout(async () => {
        await playSound(require("@/assets/sound/ToggleCard.wav"));
      }, 650);
      setConfirmEnabled(true);
      setVerifyEnabled(false);
      setCardOpacity(2);

      console.log("Check reset successful:", data);
    } catch (error) {
      showToast("the code is incorrect");
      console.error("Check reset failed:", error);
    }
  };

  const handleConfirmPressed = async () => {
    console.log("Confirm Button Pressed");

    const dataNewPassword = {
      email_user: email,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };

    try {
      const response = await fetch(
        "http://backend-rottentomatoes-please-enough.up.railway.app/newPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataNewPassword),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      showToast(
        "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character"
      );
      setTimeout(async () => {
        await playSound(require("@/assets/sound/ToggleCard.wav"));
      }, 650);
      setLoginEnabled(true);
      setConfirmEnabled(false);

      console.log("Password reset successful:", data);
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

  const handleBackToLogin1 = async () => {
    console.log("Back to Login from Register Pressed");
    setTimeout(async () => {
      await playSound(require("@/assets/sound/Back.wav"));
    }, 650);
    setEmail("");
    setUsername("");
    setPassword("");
    setLoginEnabled(true);
    setRegisterEnabled(false);
  };

  const handleBackToLogin2 = async () => {
    console.log("Back to Login from Send Pressed");
    setTimeout(async () => {
      await playSound(require("@/assets/sound/Back.wav"));
    }, 650);
    setLoginEnabled(true);
    setSendEnabled(false);
  };

  const handleBackToLogin3 = async () => {
    console.log("Back to Login from Verify Pressed");
    setTimeout(async () => {
      await playSound(require("@/assets/sound/Back.wav"));
    }, 650);
    setLoginEnabled(true);
    setVerifyEnabled(false);
  };

  const handleBackToLogin4 = async () => {
    console.log("Back to Login from Confirm Pressed");
    setTimeout(async () => {
      await playSound(require("@/assets/sound/Back.wav"));
    }, 650);
    setLoginEnabled(true);
    setConfirmEnabled(false);
  };

  return (
    <RootSiblingParent>
      <Pressable
        onPress={handlePress}
        disabled={pressableDisabled}
        style={{ flex: 1 }}
      >
        <MotiView>
          <MotiImage
            source={require("@/assets/images/index/Logo.png")}
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
              pressableDisabled
                ? { opacity: 0, translateY: -35, scale: 0.7 }
                : {}
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
            source={require("@/assets/images/index/TapToBegin.png")}
            style={styles.taptobegin}
            from={{
              opacity: 1,
            }}
            animate={
              pressableDisabled
                ? {
                    opacity: 0,
                  }
                : {}
            }
            transition={{
              type: "timing",
              duration: 900,
            }}
          />
          <LottieView
            source={require("@/assets/images/index/cuphead.json")}
            loop={true}
            speed={0.8}
            autoPlay
            style={styles.cuphead}
          />
          <Image
            source={require("@/assets/images/index/chips.png")}
            style={styles.chips}
          />
          <MotiImage
            source={require("@/assets/images/backgrounds/bg_start.png")}
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
            source={require("@/assets/images/index/logincard.png")}
            style={styles.logincard}
          />
          <Image
            source={require("@/assets/images/index/field.png")}
            style={styles.field1login}
          />
          <TextInput
            style={styles.text1login}
            placeholder="Username or email..."
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
            source={require("@/assets/images/index/field.png")}
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
            source={require("@/assets/images/index/boardlogin.png")}
            style={styles.boardlogin}
          />
          <AnimatedButton
            onPress={handleLoginPressed}
            source={require("@/assets/images/index/loginbutton.png")}
            style={styles.logbutton}
            disabled={false}
          />
          <AnimatedButton
            onPress={handleGoToRegister}
            source={require("@/assets/images/index/gotoregister.png")}
            style={styles.gotoregister}
            disabled={false}
          />
          <AnimatedButton
            onPress={handleGoToForgot}
            source={require("@/assets/images/index/gotoforgotcreds.png")}
            style={styles.gotoforgot}
            disabled={false}
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
            source={require("@/assets/images/index/registercard.png")}
            style={styles.regcard}
          />
          <Image
            source={require("@/assets/images/index/field.png")}
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
            source={require("@/assets/images/index/field.png")}
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
            source={require("@/assets/images/index/field.png")}
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
            source={require("@/assets/images/index/boardregister.png")}
            style={styles.boardreg}
          />
          <AnimatedButton
            onPress={handleRegisterPressed}
            source={require("@/assets/images/index/registerbutton.png")}
            style={styles.regbutton}
            disabled={false}
          />
          <AnimatedButton
            onPress={handleBackToLogin1}
            source={require("@/assets/images/index/gobacktologin.png")}
            style={styles.backtologin1}
            disabled={false}
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
            source={require("@/assets/images/index/forgotcredcard.png")}
            style={styles.sendcard}
          />
          <Image
            source={require("@/assets/images/index/field.png")}
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
            source={require("@/assets/images/index/boardregister.png")}
            style={styles.boardsend}
          />
          <AnimatedButton
            onPress={handleSendPressed}
            source={require("@/assets/images/index/send.png")}
            style={styles.sendbutton}
            disabled={false}
          />
          <AnimatedButton
            onPress={handleBackToLogin2}
            source={require("@/assets/images/index/gobacktologin.png")}
            style={styles.backtologin2}
            disabled={false}
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
            source={require("@/assets/images/index/forgotcard.png")}
            style={styles.verifycard}
          />
          <Image
            source={require("@/assets/images/index/field.png")}
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
            maxLength={6}
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
            source={require("@/assets/images/index/boardregister.png")}
            style={styles.boardverify}
          />
          <AnimatedButton
            onPress={handleVerifyPressed}
            source={require("@/assets/images/index/verify.png")}
            style={styles.verifybutton}
            disabled={false}
          />
          <AnimatedButton
            onPress={handleBackToLogin3}
            source={require("@/assets/images/index/gobacktologin.png")}
            style={styles.backtologin3}
            disabled={false}
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
            source={require("@/assets/images/index/confirmcard.png")}
            style={styles.sendcard}
          />
          <Image
            source={require("@/assets/images/index/field.png")}
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
            source={require("@/assets/images/index/field.png")}
            style={styles.field4forgot}
          />
          <TextInput
            style={styles.text4forgot}
            placeholder="Verify Password@."
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
            source={require("@/assets/images/index/boardregister.png")}
            style={styles.boardsend}
          />
          <AnimatedButton
            onPress={handleConfirmPressed}
            source={require("@/assets/images/index/confirm.png")}
            style={styles.confirmbutton}
            disabled={false}
          />
          <AnimatedButton
            onPress={handleBackToLogin4}
            source={require("@/assets/images/index/gobacktologin.png")}
            style={styles.backtologin2}
            disabled={false}
          />
        </MotiView>
      </Pressable>
    </RootSiblingParent>
  );
}
