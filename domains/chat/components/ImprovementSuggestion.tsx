import { View, StyleSheet } from "react-native";
import { Suggestion } from "../types";
import { Text } from "react-native-paper";

export function ImprovementSuggestion({
  suggestion,
}: {
  suggestion: Suggestion | undefined | null;
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
        padding: 10,
      }}
    >
      <View style={styles.textWrapper}>
        <Text style={styles.label}>You said:</Text>
        <Text style={styles.text}>{suggestion.original}</Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.label}>English:</Text>
        <Text style={styles.text}>{suggestion.english}</Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.label}>Issues:</Text>
        <Text style={styles.text}>{suggestion.issues.join(", ")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 3,
    textAlign: "left",
    marginRight: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: "normal",
    textAlign: "left",
  },
});
