import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";

const FILTERS = ["All", "Unread", "Read", "New", "Archived", "Flagged"];

const ChatFilters = ({
  selected = "All",
  onSelect = (filter: string) => {
    console.log(filter);
  },
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
      style={{ maxHeight: 40 }}
    >
      {FILTERS.map((filter) => (
        <Chip
          key={filter}
          compact
          style={styles.chip}
          mode={selected === filter ? "flat" : "outlined"}
          selected={selected === filter}
          onPress={() => onSelect(filter)}
          textStyle={styles.chipText}
        >
          {filter}
        </Chip>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  chip: {
    marginRight: 8,
    height: 32,
  },
  chipText: {
    fontSize: 14,
  },
});

export default ChatFilters;
