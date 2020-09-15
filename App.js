import React from 'react';
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';
import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import RootNavigation from './src/Navigation/AppNavigation';
import Constants from 'expo-constants';

import {LocaleContextProvider} from './src/i18n/LocaleContext';
import {AppContextProvider} from './src/Services/Auth/AppContext';

export default function App() {

  const styles = StyleSheet.create({
    containerSafe: {
      flex: 1,
      marginTop: Constants.statusBarHeight
    },
  })

  let [fontsLoaded] = useFonts({
    TitlingRegular: require('./assets/fonts/TitlingGothicFBComp-Reg.otf'),
    TitlingMedium: require('./assets/fonts/TitlingGothicFBNormalMedium.otf'),
    TitilliumWebSemiBold: require('./assets/fonts/TitilliumWeb-SemiBold.ttf')
  });
  
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <LocaleContextProvider>
        <AppContextProvider>
          <SafeAreaView style={styles.containerSafe}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <RootNavigation />
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </AppContextProvider>
      </LocaleContextProvider>
    )
  }
}
