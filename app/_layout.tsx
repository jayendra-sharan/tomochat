import { Slot } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import WebWrapper from '../domains/shared/components/WebWrapper';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { TomoTheme } from '@/theme';

export default function Layout() {
  return (
    <Provider store={store}>
      <PaperProvider theme={TomoTheme}>
        <WebWrapper>
          <Slot />
        </WebWrapper>
      </PaperProvider>
    </Provider>
  );
}
