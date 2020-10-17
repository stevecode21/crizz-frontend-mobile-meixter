import React, {Fragment} from 'react'
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  BackHandler
} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import styled from 'styled-components/native'
import {BoxShadow} from 'react-native-shadow'
import Lear from '../../Screens/Home'
import Launch from '../../Screens/Launch'
import TeachTab from '../TeachTab/'
import MeStack from '../MeStack'

import colors from '../../Themes/Colors'
import fonts from '../../Themes/Fonts'
import useAuth from '../../Services/Auth'

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  textLabel: {
    color: colors.white,
    fontSize: 12, 
    fontFamily: fonts.SemiBold, 
    textAlign: 'center'
  },
  icon: {resizeMode: 'stretch', backgroundColor: "transparent", justifyContent: 'center', alignSelf: 'center'},
  lineTab: {borderColor: colors.cyanTransparent, borderBottomWidth: 1, width: '100%'},
})

const Container = styled.View`
  flex: 1;
  flex-direction: row; 
  justify-content: center;
  align-self: center;
  position: absolute; 
  left: 0;
  right: 0;
  bottom: 0;  
  padding-top: 10px;
  background-color: ${colors.transparent}; 
  height: 70px;
  width: 100%;
`
const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colors.lila};
  opacity: 0.5;
  position: absolute;
`

function MyTabBar({ state, descriptors, navigation }) {
  const {setInHome} = useAuth()
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <Container>
      <Separator />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            setInHome((route.name == 'Lear') ? true : false)
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const shadowOpt = {
            width:102,
            height:6,
            color: colors.cyan,
            border:5,
            radius:3,
            opacity:0.7,
            x:0,
            y:0
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            {label == 'Lear' && isFocused && 
              (<Image style={[styles.icon, {width: 34, height: 30}]} source={require('../../../assets/img/menu_learn-active.png')} />)
            }
            {label == 'Lear' && !isFocused &&  
              (<Image style={[styles.icon, {width: 34, height: 30}]} source={require('../../../assets/img/menu_learn-inactive.png')} />)
            }

            {label == 'Sesions' && isFocused && 
              (<Image style={[styles.icon, {width: 32, height: 30}]} source={require('../../../assets/img/menu_session-active.png')} />)
            }
            {label == 'Sesions' && !isFocused &&  
              (<Image style={[styles.icon, {width: 32, height: 30}]} source={require('../../../assets/img/menu_session-inactive.png')} />)
            }

            {label == 'Teach' && isFocused && 
              (<Image style={[styles.icon, {width: 34, height: 30}]} source={require('../../../assets/img/menu_teach-active.png')} />)
            }
            {label == 'Teach' && !isFocused &&  
              (<Image style={[styles.icon, {width: 34, height: 30}]} source={require('../../../assets/img/menu_teach-inactive.png')} />)
            }

            {label == 'Me' && isFocused && 
              (<Image style={[styles.icon, {width: 36, height: 32}]} source={require('../../../assets/img/menu_me-active.png')} />)
            }
            {label == 'Me' && !isFocused &&  
              (<Image style={[styles.icon, {width: 36, height: 32}]} source={require('../../../assets/img/menu_me-inactive.png')} />)
            }

            <Text style={[styles.textLabel, { color: isFocused ? colors.white : colors.whiteTrasparent }]}>
              {label}
            </Text>
            {isFocused && (
              <View style={{flex: 1, position: 'absolute', bottom: 0, width: '100%'}}>
                <BoxShadow setting={shadowOpt}>
                  <View style={styles.lineTab}></View>
                </BoxShadow>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </Container>
  );
}

const getTabBarVisibility = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';

  if (routeName === 'OPTIONS') {
    return false;
  }

  return true;
}

export default function MainStack() {
  return (
    <Tab.Navigator 
      lazy={true} 
      backBehavior="initialRoute" 
      initialRouteName="Lear" 
      tabBar={props => <MyTabBar {...props} />} 
    >
      <Tab.Screen name="Lear" component={Lear}/>
      <Tab.Screen name="Sesions" component={Launch} />
      <Tab.Screen name="Teach" component={TeachTab} />
      <Tab.Screen name="Me" component={MeStack} options={({ route }) => ({
        tabBarVisible: getTabBarVisibility(route)
      })}/>      
    </Tab.Navigator>
  );
}
