import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Routes from './Routes';
import LaunchScreen from '../Screens/Launch';
import LoginStack from './LoginStack';
//import MainStack from './MainStack';
import {APP_STATE} from '../Constants';

export default function RootNavigation(props) {

  const [stateLogin, setStateLogin] = useState('PUBLIC_LOGIN') //PUBLIC_LOGIN, MAIN_APP, CHECKING_LOGIN, UNKNOWN

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {stateLogin === APP_STATE.PRIVATE ? (
          <Stack.Screen name={Routes.MAIN_APP} component={LaunchScreen} />
        ) : stateLogin === APP_STATE.PUBLIC ? (
          <Stack.Screen name={Routes.LOGIN_STACK} component={LoginStack} />
        ) : (
          <Stack.Screen name={Routes.LOADING} component={LaunchScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();
