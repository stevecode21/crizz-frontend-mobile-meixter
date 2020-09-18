import React from 'react';
import ImageProfile from '../Screens/Register/ImageProfile';
import CreateProfile from '../Screens/Register/CreateProfile';
import GenderProfile from '../Screens/Register/AdjustProfile.js';

import {createStackNavigator} from '@react-navigation/stack';
import Routes from './Routes';

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
    <Stack.Navigator headerMode="none" initialRouteName={Routes.IMAGE_PROFILE_SCREEN}>
      <Stack.Screen name={Routes.IMAGE_PROFILE_SCREEN} component={ImageProfile} options={{ cardStyleInterpolator: fadeConfig }} />
      <Stack.Screen name={Routes.PROFILE_SCREEN} component={CreateProfile} options={{ cardStyleInterpolator: fadeConfig }} />
      <Stack.Screen name={Routes.GENDER_SCREEN} component={GenderProfile} options={{ cardStyleInterpolator: fadeConfig }} />
    </Stack.Navigator>
  );
};
