import React from "react";
import { View, Animated, StyleSheet } from "react-native";

export default function TypingDots({ count = 3 }: {count: number}) {
  const step = 50;
  return (
    <View style={styles.dots}>
      {
        Array.from({ length: count }).map((_, i) => (
          <TypingDot key={step * i} delay={step + (i * 50)} />
        ))
      }
    </View>
  )
}

function TypingDot ({ delay }: { delay: number }) {
  const bounce = new Animated.Value(0);

  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, {
          toValue: -4,
          duration: 200,
          useNativeDriver: true,
          delay,
        }),
        Animated.timing(bounce, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [bounce, delay]);

  return (
    <Animated.View style={[styles.dot, { transform: [{ translateY: bounce }] }]} />
  );
};


const styles = StyleSheet.create({
  dots: {
    flexDirection: 'row',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#888',
    marginHorizontal: 2,
  },
});

