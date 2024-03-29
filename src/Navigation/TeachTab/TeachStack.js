import React, {Fragment} from 'react'
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import styled from 'styled-components/native'
import {BoxShadow} from 'react-native-shadow'
import Routes from '../Routes'

import Mylessons from '../../Screens/Teach/Mylessons'
import Upcoming from '../../Screens/Teach/Upcoming'
import Completed from '../../Screens/Teach/Completed'
import Header from '../../Components/TeachHeader'

import colors from '../../Themes/Colors'
import fonts from '../../Themes/Fonts'
import useAuth from '../../Services/Auth'
import useTranslation from '../../i18n'

const Tab = createMaterialTopTabNavigator()

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  textLabel: {
    paddingTop: 17,
    fontSize: 14, 
    fontFamily: fonts.regular, 
    textAlign: 'center'
  },
  lineTab: {width: '100%', bottom: 0, position: 'absolute'},
})

const Container = styled.View`
  flex-direction: row
  height: 50px
  background-color: ${colors.blueDark}
  margin-top: 0px
`

function TopBar({ state, descriptors, navigation, position }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options
  const {t} = useTranslation()

  if (focusedOptions.tabBarVisible === false) {
    return null
  }

  return (
    <Fragment>
      <Header navigation={navigation}/>
      <Container>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name

          const isFocused = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            })
          }

          const shadowOpt = {
              width:200,
              height:2,
              color: colors.cyan,
              border:5,
              radius:3,
              opacity:0.8,
              x:0,
              y:0
          }

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
            >
              <Text style={[styles.textLabel, { color: isFocused ? colors.cyan : colors.whiteTrasparent }]}>
                {t(label)}
              </Text>
              {isFocused ? (
                <View style={[styles.lineTab, {borderColor: colors.cyan, borderBottomWidth: 4,}]}></View>
              ) : (
                <View style={[styles.lineTab, {borderColor: colors.lila, borderBottomWidth: 2,}]}></View>
              )}
            </TouchableOpacity>
          )
        })}
      </Container>
    </Fragment>
  )
}


export default function TeachStack() {

  return (
    <Tab.Navigator 
      swipeEnabled={true} 
      initialRouteName={Routes.UPCOMING} 
      tabBar={props => <TopBar {...props} />} 
    >
      <Tab.Screen name={Routes.MY_LESSONS} component={Mylessons} />
      <Tab.Screen name={Routes.UPCOMING} component={Upcoming} />
      <Tab.Screen name={Routes.COMPLETED} component={Completed} />   
    </Tab.Navigator>
  )
}
