import { View, StyleSheet } from 'react-native';
import { ReactNode } from 'react';
import { useTheme } from 'react-native-paper';

interface Props {
  children: ReactNode;
  footer: ReactNode;
}

export default function BottomBarLayout({ children, footer }: Props) {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>{children}</View>
      <View
        style={[
          styles.footer,
          {
            borderTopColor: theme.colors.outline,
            backgroundColor: theme.colors.surface,
          },
        ]}
      >
        {footer}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    padding: 8,
  },
});