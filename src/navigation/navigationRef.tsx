import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { NavigationProps } from './types';

export const navigationRef = createNavigationContainerRef<NavigationProps>();

export function navigate(name: any, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function resetStack(name: string, screen: string) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name, params: {screen}}],
      }),
    );
  }
}