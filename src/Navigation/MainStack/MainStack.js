import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {BoxShadow} from 'react-native-shadow'
import Home from '../../Screens/Home';
import Launch from '../../Screens/Launch';

import colors from '../../Themes/Colors';
import fonts from '../../Themes/Fonts';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  textLabel: {
    color: colors.white,
    fontSize: 12, 
    fontFamily: fonts.SemiBold, 
    textAlign: 'center'
  },
  icon: {resizeMode: 'stretch', backgroundColor: "transparent", justifyContent: 'center', alignSelf: 'center'},
  lineTab: {borderColor: colors.cyan, borderBottomWidth: 1, width: 100},
  tabLayout: { 
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute', 
    left: 0,
    right: 0,
    bottom: 0,  
    paddingTop: 10,
    backgroundColor: colors.transparent, 
    height: 80,
    width: '100%',
    borderColor: colors.white, 
    borderTopWidth: 0.3,  
  }
})


function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.tabLayout}>
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
            opacity:0.8,
            x:0,
            y:0
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
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

            <Text style={[styles.textLabel, { color: isFocused ? colors.white : colors.white }]}>
              {label}
            </Text>
            {isFocused && (
              <View style={{flex: 1, position: 'absolute', bottom: 0}}>
                <BoxShadow setting={shadowOpt}>
                  <View style={styles.lineTab}></View>
                </BoxShadow>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function MainStack() {

  return (
    <Tab.Navigator initialRouteName="Home" tabBar={props => <MyTabBar {...props} />} >
      <Tab.Screen name="Lear" component={Home} />
      <Tab.Screen name="Sesions" component={Launch} />
      <Tab.Screen name="Teach" component={Launch} />
      <Tab.Screen name="Me" component={Launch} />      
    </Tab.Navigator>
  );
}

