// app/_layout.tsx
import { Slot } from 'expo-router';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import WebWrapper from '../components/WebWrapper';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export default function Layout() {
  return (
    <Provider store={store}>
      <PaperProvider theme={MD3LightTheme}>
        <WebWrapper>
          <Slot />
        </WebWrapper>
      </PaperProvider>
    </Provider>
  );
}
