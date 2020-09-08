import React from 'react';
import Login from '../Screens/Login';
import {createStackNavigator} from '@react-navigation/stack';
import Routes from './Routes';

const Stack = createStackNavigator();

export default props => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={Routes.LOGIN_SCREEN}>
      <Stack.Screen name={Routes.LOGIN_SCREEN} component={Login} />
    </Stack.Navigator>
  );
};
