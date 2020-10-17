import React from 'react';
import Me from '../Screens/Me';
import Settings from '../Screens/Me/Settings';

import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import Routes from './Routes';

const Stack = createStackNavigator();

const fadeConfig = ({ current }) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  }
}

const openLeft = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
}

export default props => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={Routes.ME}>
      <Stack.Screen name={Routes.ME} component={Me} options={{ cardStyleInterpolator: fadeConfig }} />
      <Stack.Screen name={Routes.OPTIONS} component={Settings} options={{ ...openLeft }}/>
    </Stack.Navigator>
  );
};
