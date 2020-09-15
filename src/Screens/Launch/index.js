import React from 'react';
import {ImageBackground, StyleSheet, Image, Text, TouchableHighlight} from 'react-native';
import colors from '../../Themes/Colors';
import { LinearGradient } from 'expo-linear-gradient';

import useTranslation from '../../i18n';
import useAuth from '../../Services/Auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start'
  }
});

export default function() {
  const {logout, checkAccount} = useAuth()

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../../assets/bg.png')}
    >
      <TouchableHighlight
        onPress={() => logout()}
      >
        <Text style={{marginTop: 50, color: 'white'}}> logout </Text> 
      </TouchableHighlight>
      
    </ImageBackground>
  );
}
