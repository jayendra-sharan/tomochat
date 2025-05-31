import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import { Suggestion } from "../types";
import { TTSToolbar } from "./TTSToolbar";

export function ImprovementSuggestion({
  suggestion,
  content,
}: {
  suggestion: Suggestion | undefined | null;
  content?: string;
}) {
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
      <View style={styles.textWrapper}>
        <Text>
          <Text style={styles.label}>What's fixed: </Text>
          {suggestion.fixLogic}
        </Text>
      </View>
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
});
