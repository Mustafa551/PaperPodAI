import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

export type BottomParamList = {
  HomeScreen: object;
};

export type BottomTabsProps = {
};

export type BottomTabs = {
  name: any;
  component: any;
  svg: any;
  title: string;
  initialParams: object;
};

export type BottomNavigationProps = BottomTabNavigationProp<BottomParamList>;