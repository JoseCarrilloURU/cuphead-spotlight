import { Audio } from "expo-av";

export const playSound = async (soundFile, options = {}) => {
  const { sound } = await Audio.Sound.createAsync(soundFile, options);
  await sound.playAsync();
  return sound;
};
