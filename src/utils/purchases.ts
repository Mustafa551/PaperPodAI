import type Purchases from 'react-native-purchases';

let cachedPurchases: Purchases | null | undefined;

export const getPurchasesModule = (): Purchases | null => {
  if (cachedPurchases !== undefined) {
    return cachedPurchases;
  }

  try {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    cachedPurchases = require('react-native-purchases').default;
  } catch (error) {
    cachedPurchases = null;
    if (__DEV__) {
      console.warn(
        'RevenueCat SDK is unavailable. Purchases-related features are disabled.',
        error,
      );
    }
  }

  return cachedPurchases;
};
