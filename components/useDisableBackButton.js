import { useEffect } from "react";
import { BackHandler } from "react-native";

const useDisableBackButton = () => {
  useEffect(() => {
    const backAction = () => {
      // Prevent default behavior
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
};

export default useDisableBackButton;