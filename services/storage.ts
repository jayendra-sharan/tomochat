import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const isWeb = Platform.OS === 'web';
const prefix = 'cw.'; // your namespace

function withPrefix(key: string) {
  return `${prefix}${key}`;
}

export const storage = {
  async getItem(key: string) {
    const fullKey = withPrefix(key);
    if (isWeb) {
      return Promise.resolve(localStorage.getItem(fullKey));
    } else {
      return SecureStore.getItemAsync(fullKey);
    }
  },

  async setItem(key: string, value: string) {
    const fullKey = withPrefix(key);
    if (isWeb) {
      localStorage.setItem(fullKey, value);
      return;
    } else {
      return SecureStore.setItemAsync(fullKey, value);
    }
  },

  async removeItem(key: string) {
    const fullKey = withPrefix(key);
    if (isWeb) {
      localStorage.removeItem(fullKey);
      return;
    } else {
      return SecureStore.deleteItemAsync(fullKey);
    }
  },
};
