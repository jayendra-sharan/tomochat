import { View, StyleSheet } from "react-native";
import { Icon, Text } from "react-native-paper";

import { Suggestion } from "../types";
import { TTSToolbar } from "./TTSToolbar";
import { useFeatureFlag } from "@/redux/FeatureProvider";

export function ImprovementSuggestion({
  suggestion,
  content,
}: {
  suggestion: Suggestion | undefined | null;
  content?: string;
}) {
  const { enableFeedback } = useFeatureFlag();
  // @todo remove this, and add check in parent, also the type above
  if (!suggestion) {
    return;
  }

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <View style={styles.textWrapper}>
        <TTSToolbar text={content || ""} />
      </View>
      <View style={styles.textWrapper}>
        <Text>
          <Text style={styles.label}>Original text: </Text>
          {suggestion.original}
        </Text>
      </View>
      {!!suggestion.translated && (
        <View style={styles.textWrapper}>
          <Text>
            <Text style={styles.label}>In English: </Text>
            {suggestion.translated}
          </Text>
        </View>
      )}
      <View style={styles.textWrapper}>
        <Text>
          <Text style={styles.label}>What's fixed: </Text>
          {suggestion.fixLogic}
        </Text>
      </View>
      {enableFeedback && (
        <View style={[styles.textWrapper, styles.feedback]}>
          <Icon source="thumb-up" size={16} />
          <Icon source="thumb-down" size={16} />
          <Icon source="bug" size={16} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 3,
    textAlign: "left",
    marginRight: 4,
    display: "flex",
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 14,
    fontWeight: "normal",
    textAlign: "left",
  },
  feedback: {
    justifyContent: "flex-end",
    gap: 12,
  },
});
