import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';

import { useStyle } from './style';
import { BottomParamList, BottomTabsProps } from './types';
import { useTheme } from '@/theme';
import { BOTTOM_TABS } from '@/constant';


const Tab = createBottomTabNavigator<BottomParamList>();

const BottomTabs: React.FC<BottomTabsProps> = ({}) => {
  const styles = useStyle();
  const {layout, colors} = useTheme()
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [styles.tabStyle],
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grey,
        tabBarHideOnKeyboard: true,
      }}>
      {BOTTOM_TABS.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.name as any}
          component={item.component}
          initialParams={item.initialParams}
          options={{
            tabBarLabel: item.title,
            tabBarLabelStyle: {fontSize: 12, fontFamily: 'Poppins-Medium', fontWeight:'400'},
            tabBarIcon: ({focused}) => (
              <item.svg
                width={22}
                height={22}
                fill={focused ? colors.primary : colors.grey}
              />
            ),
            tabBarShowLabel: true,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabs;
