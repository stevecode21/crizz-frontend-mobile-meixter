import React from 'react';
import ImageProfile from '../Screens/Register/ImageProfile';
import {createStackNavigator} from '@react-navigation/stack';
import Routes from './Routes';

const Stack = createStackNavigator();

export default props => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={Routes.IMAGE_PROFILE_SCREEN}>
      <Stack.Screen name={Routes.IMAGE_PROFILE_SCREEN} component={ImageProfile} />
    </Stack.Navigator>
  );
};
