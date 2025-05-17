import TypingDots from '@/domains/shared/components/TypingDots';
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
      <Text style={[styles.senderText, { color: theme.colors.onSurface }]}>
        {senderName} is typing
      </Text>
      <TypingDots count={3} />
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
    borderTopLeftRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  senderText: {
    marginRight: 8,
    fontSize: 14,
  },
});