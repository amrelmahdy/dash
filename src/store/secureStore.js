import { Platform } from 'react-native';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

export default function () {
  const extractKeys = Platform.select({
    ios: (items) => items[0].map((item) => item.key),
    android: Object.keys,
  });

  const noop = () => null;

  return {
    async getItem(key, callback = noop) {
      try {
        // getItem() returns `null` on Android and `undefined` on iOS;
        // explicitly return `null` here as `undefined` causes an exception
        // upstream.
        let result = await RNSecureStorage.get(key);

        if (typeof result === 'undefined') {
          result = null;
        }

        callback(null, result);

        return result;
      } catch (error) {
        callback(error);
        throw error;
      }
    },

    async setItem(key, value, callback = noop) {
      try {
        await RNSecureStorage.set(key, value, {
          accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
        });
        callback(null);
      } catch (error) {
        callback(error);
        throw error;
      }
    },

    async removeItem(key, callback = noop) {
      try {
        await RNSecureStorage.remove(key);
        callback(null);
      } catch (error) {
        callback(error);
        throw error;
      }
    },

    async getAllKeys(callback = noop) {
      try {
        const values = await RNSecureStorage.getAllKeys();
        const result = extractKeys(values);

        callback(null, result);

        return result;
      } catch (error) {
        callback(error);
        throw error;
      }
    },
  };
}