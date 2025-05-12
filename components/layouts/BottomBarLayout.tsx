import { View } from 'react-native';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  footer: ReactNode;
}

export default function BottomBarLayout({ children, footer }: Props) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>{children}</View>

      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: '#ddd',
          padding: 8,
          backgroundColor: 'white',
        }}
      >
        {footer}
      </View>
    </View>
  );
}
