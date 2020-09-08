import React from 'react';
import {ImageBackground, StyleSheet, Image} from 'react-native';
import colors from '../../Themes/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  }
});

export default function() {
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../../assets/bg.png')}
    >

    </ImageBackground>
  );
}
