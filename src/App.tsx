import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { configureGoogleSignIn } from './config/googleAuth';

// Disable console logs
// if (__DEV__ === true) {
//   console.log = () => {};
//   console.warn = () => {};
//   console.error = () => {};
//   console.info = () => {};
//   console.debug = () => {};
// }

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MMKV } from 'react-native-mmkv';

import { ThemeProvider } from '@/theme';
import ApplicationNavigator from '@/navigation/Application';

import '@/translations';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ModalProvider from './context/ModalProvider';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
    },
  },
});

export const storage = new MMKV();

function App() {
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  return (
    <ThemeProvider storage={storage}>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <ModalProvider>
            <QueryClientProvider client={queryClient}>
              <ApplicationNavigator />
            </QueryClientProvider>
          </ModalProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

export default App;
