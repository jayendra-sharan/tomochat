import React from 'react';
import { Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export const FieldError = ({ error }: { error?: string }) => (
  <View style={styles.wrapper}>
    {error ? <Text style={styles.text}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 20,
    marginBottom: 12,
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 13,
    color: '#B00020',
  },
});
