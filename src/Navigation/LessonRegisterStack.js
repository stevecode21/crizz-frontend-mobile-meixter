import React from 'react';
import CreateLesson from '../Screens/Teach/CreateLesson';

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
    <Stack.Navigator headerMode="none" initialRouteName={Routes.CREATE_LESSON}>
      <Stack.Screen name={Routes.CREATE_LESSON} component={CreateLesson} options={{ cardStyleInterpolator: fadeConfig }} />
    </Stack.Navigator>
  );
};
