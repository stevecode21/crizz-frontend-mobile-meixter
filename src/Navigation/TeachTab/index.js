import React from 'react';
import Tab from './TeachStack';

import {createStackNavigator} from '@react-navigation/stack';
import Routes from '../Routes';

const Stack = createStackNavigator();

const fadeConfig = ({ current }) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  }
}

export default props => {


  return (
    <Stack.Navigator headerMode="none" initialRouteName={Routes.TEACH_TABS}>
      <Stack.Screen name={Routes.TEACH_TABS} component={Tab} options={{ cardStyleInterpolator: fadeConfig }} />
    </Stack.Navigator>
  );
};
