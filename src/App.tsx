import 'react-native-gesture-handler';

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
