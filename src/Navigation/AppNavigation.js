import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Routes from './Routes';
import LaunchScreen from '../Screens/Launch';
import LoginStack from './LoginStack';
import RegisterStack from './RegisterStack';
//import MainStack from './MainStack';
import {APP_STATE} from '../Constants';
import useAuth from '../Services/Auth';

export default function RootNavigation(props) {

  const {stateApp} = useAuth()

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {stateApp === APP_STATE.PUBLIC ? (
          <Stack.Screen name={Routes.LOGIN_STACK} component={LoginStack} />
        ) : stateApp === APP_STATE.REGISTER ? (
          <Stack.Screen name={Routes.REGISTER_STACK} component={RegisterStack} />
        ) : (
          <Stack.Screen name={Routes.HOME_STACK} component={LaunchScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();
