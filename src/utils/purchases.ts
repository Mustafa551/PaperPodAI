import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';

type RevenueCatStatus = 'idle' | 'configuring' | 'configured' | 'failed';

let configurePromise: Promise<boolean> | null = null;
let configurationStatus: RevenueCatStatus = 'idle';
let logHandlerRegistered = false;
let identifiedUserId: string | null = null;

const REVENUECAT_API_KEYS = {
  android: 'goog_oLcWeyQfooPSFBTWsgtsOtzGxuD',
  ios: 'appl_KeFoybfiJCgdBQzsrgAHEzFCVMU',
} as const;

const getRevenueCatApiKey = () =>
  Platform.OS === 'ios'
    ? REVENUECAT_API_KEYS.ios
    : REVENUECAT_API_KEYS.android;

const registerLogHandler = () => {
  if (logHandlerRegistered) {
    return;
  }

  Purchases.setLogHandler((_logLevel, message) => {
    console.log(`[RevenueCat] ${message}`);
  });
  logHandlerRegistered = true;
};

export const isRevenueCatReady = () => configurationStatus === 'configured';

export const ensureRevenueCatConfigured = async (): Promise<boolean> => {
  if (configurationStatus === 'configured') {
    return true;
  }

  if (configurePromise) {
    return configurePromise;
  }

  const apiKey = getRevenueCatApiKey();
  console.log('[RevenueCat] configure start');
  console.log(
    `[RevenueCat] selected ${Platform.OS} api key present: ${Boolean(apiKey)}`,
  );

  if (!apiKey) {
    configurationStatus = 'failed';
    console.log('[RevenueCat] configure failure: missing platform API key');
    return false;
  }

  configurationStatus = 'configuring';
  registerLogHandler();

  configurePromise = (async () => {
    try {
      await Purchases.configure({ apiKey });
      configurationStatus = 'configured';
      console.log('[RevenueCat] configure success');
      return true;
    } catch (error) {
      configurationStatus = 'failed';
      console.log('[RevenueCat] configure failure', error);
      return false;
    } finally {
      if (configurationStatus !== 'configuring') {
        configurePromise = null;
      }
    }
  })();

  return configurePromise;
};

export const identifyRevenueCatUser = async (
  appUserId?: string | null,
): Promise<boolean> => {
  const normalizedUserId = appUserId?.trim();
  if (!normalizedUserId) {
    return false;
  }

  const configured = await ensureRevenueCatConfigured();
  if (!configured) {
    return false;
  }

  if (identifiedUserId === normalizedUserId) {
    return true;
  }

  try {
    await Purchases.logIn(normalizedUserId);
    identifiedUserId = normalizedUserId;
    console.log('[RevenueCat] identify success');
    return true;
  } catch (error) {
    console.log('[RevenueCat] identify failure', error);
    return false;
  }
};
