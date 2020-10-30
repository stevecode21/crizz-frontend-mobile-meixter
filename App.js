import React, {useEffect} from 'react';
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  YellowBox
} from 'react-native';
import RootNavigation from './src/Navigation/AppNavigation';
import Constants from 'expo-constants';

import {LocaleContextProvider} from './src/i18n/LocaleContext';
import {AppContextProvider} from './src/Services/Auth/AppContext';

import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

export default function App() {

  YellowBox.ignoreWarnings(['Animated: `useNativeDriver`'])
  const colorScheme = useColorScheme();
  const themeStatusBarStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';

  const styles = StyleSheet.create({
    containerSafe: {
      flex: 1
    }
  })

  let [fontsLoaded] = useFonts({
    TitlingRegular: require('./assets/fonts/TitlingGothicFBNormalRegular.otf'),
    TitlingMedium: require('./assets/fonts/TitlingGothicFBNormalMedium.otf'),
    TitilliumWebSemiBold: require('./assets/fonts/TitilliumWeb-SemiBold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <LocaleContextProvider>
        <AppearanceProvider>
          <AppContextProvider>
            <SafeAreaView style={styles.containerSafe}>
              <StatusBar translucent backgroundColor='transparent' barStyle={themeStatusBarStyle} />
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <RootNavigation />
              </TouchableWithoutFeedback>
            </SafeAreaView>
          </AppContextProvider>
        </AppearanceProvider>
      </LocaleContextProvider>
    )
  }
}
