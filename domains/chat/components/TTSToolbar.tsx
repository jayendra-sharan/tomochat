import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import * as Speech from "expo-speech";
import { IconButton, Text } from "react-native-paper";

export function TTSToolbar({ text }: { text: string }) {
  const [rate, setRate] = useState(0.9); // default: normal
  const [voiceId, setVoiceId] = useState<string | null>(null);
  const [speedIndex, setSpeedIndex] = useState(1); // 0: Slow, 1: Normal, 2: Fast
  const speedOptions = [0.5, 0.9, 1.3];

  useEffect(() => {
    (async () => {
      const voices = await Speech.getAvailableVoicesAsync();
      const nlVoice = voices.find((v) => v.language === "nl-NL");
      if (nlVoice) setVoiceId(nlVoice.identifier);
    })();
  }, []);

  const handleSpeak = () => {
    Speech.speak(text, {
      language: "nl-NL",
      voice: voiceId || undefined,
      rate: speedOptions[speedIndex],
    });
  };

  const toggleSpeed = () => {
    setSpeedIndex((speedIndex + 1) % speedOptions.length);
  };

  return (
    <View style={styles.toolbar}>
      <IconButton icon="volume-high" onPress={handleSpeak} />
      <Text style={styles.label}>
        {speedIndex === 0 ? "🐢" : speedIndex === 2 ? "⚡" : "🚶"} Speed
      </Text>
      <IconButton icon="repeat" onPress={toggleSpeed} />
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  label: {
    fontSize: 14,
    marginHorizontal: 4,
  },
});
