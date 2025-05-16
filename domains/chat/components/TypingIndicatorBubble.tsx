import TypingDots from '@/domains/shared/components/TypingDots';
import TypingDot from '@/domains/shared/components/TypingDots';
import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface TypingIndicatorBubbleProps {
  senderName: string;
}

export const TypingIndicatorBubble = memo(({ senderName }: TypingIndicatorBubbleProps) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surfaceVariant }]}>
      <Text style={styles.senderText}>{senderName} is typing</Text>
      <TypingDots />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginVertical: 4,
  },
  senderText: {
    marginRight: 8,
    fontSize: 14,
  },
});
