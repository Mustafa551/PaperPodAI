import type { ReactotronReactNative } from 'reactotron-react-native';

import Reactotron from 'reactotron-react-native';
import mmkvPlugin from 'reactotron-react-native-mmkv';
import {
  QueryClientManager,
  reactotronReactQuery,
} from 'reactotron-react-query';

import config from '../app.json';
import { queryClient, storage } from './App';

const queryClientManager = new QueryClientManager({
  queryClient,
});

Reactotron.configure({
  name: config.name,
  onDisconnect: () => {
    queryClientManager.unsubscribe();
  },
})
  // Disable the error tracking plugin; it blows up when React Query surfaces non-Error throwables.
  .useReactNative({
    errors: false,
  })
  .use(mmkvPlugin<ReactotronReactNative>({ storage }))
  .use(reactotronReactQuery(queryClientManager))
  .connect();
