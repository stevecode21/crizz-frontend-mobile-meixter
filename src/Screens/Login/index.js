import React from 'react';
import {
  Text, 
  Platform, 
  ScrollView, 
  StyleSheet, 
  Image,
  View,
  TextInput,
  Alert,
  TouchableHighlight
} from 'react-native';
import colors from '../../Themes/Colors';
import fonts from '../../Themes/Fonts';
import { LinearGradient } from 'expo-linear-gradient';

import { BoxShadow } from 'react-native-shadow'

import { Video } from 'expo-av';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewView: {
    flex: 1,
    alignItems: 'flex-start'
  },
  backgroundVideo:{
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    position:'absolute'
  },
  scroll:{
    width: '100%',
    height: '100%',
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  imageCenter: {
    backgroundColor: "transparent",
    marginTop: 106,
    alignSelf: 'center',
    width: 160,
    height: 125,
    resizeMode: 'stretch',
  },
  imageCenterWellcome: {
    backgroundColor: "transparent",
    marginTop: 33,
    alignSelf: 'center',
    width: 98,
    height: 31,
    resizeMode: 'stretch',
  },
  title: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 24,
    textAlign: "center",
    marginTop: 78,
  },
  textPhone: {
    color: colors.fucsia,
    fontFamily: fonts.SemiBold,
    fontSize: 18,
    marginTop: 90,
    marginLeft: 36,
    marginBottom: -20
  },
  containerInput: {
    borderColor: colors.lila, 
    borderBottomWidth: 1,
    marginLeft: 36,
    marginRight: 36,
    alignSelf: "stretch",
    height: 70,
  },
  inputPhone: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.medium,
    padding: 10,
    bottom: -15,
    width: '100%'
  },
  textPrefi: {
    color: colors.lila,
    fontSize: 18,
    fontFamily: fonts.medium
  },
  containerInputNumber: {
    marginLeft: 70,
    marginRight: 30,
    flexDirection: "row"
  },
  containerCenter: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: -9,
    justifyContent: "center",
  },
  containerInputPrefi: {
    flexDirection: "row",
    alignItems: "center"
  },
  imagenPhone: {
    resizeMode: "center",
    backgroundColor: "transparent",
    width: 33,
    height: 22,
  },
  containerButtom: {
    alignSelf: 'center',
    marginTop: 58,
    marginBottom: 20
  },
  buttom: {
    backgroundColor: colors.background2,
    borderRadius: 10,
    width: 194,
    height: 60,
    justifyContent: "center",
    alignItems: 'center',
  },
  textButton: {
    color: colors.cyan,
    fontFamily: fonts.SemiBold,
    fontSize: 18
  },
});

export default function({navigation}) {

  const shadowOpt = {
    width: 194,
    height: 60,
    color: colors.cyan,
    backgroundColor: 'transparent',
    border: 10,
    radius: 10,
    opacity: 0.9,
    x: 0,
    y: 0
  }

  return (
    <View style={styles.viewView}>
      <Video
        source={require("../../../assets/bg_video.mp4")}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={styles.backgroundVideo}
      />

        <ScrollView style={styles.scroll}>
          <Image
            source={require("../../../assets/img/logo.png")}
            style={styles.imageCenter}
          />
          <Image
            source={require("../../../assets/img/Welcome.png")}
            style={styles.imageCenterWellcome}
          />
          <Text style={styles.title}> Join MeiXter! </Text>
          <Text style={styles.textPhone}>Your Phone</Text>

          <View style={styles.containerInput}>  
            <View pointerEvents="box-none" style={styles.containerInputNumber}>
              <TextInput
                keyboardType={'phone-pad'}
                maxLength={12}
                placeholder="7454 123456"
                onChangeText={() => {}}
                style={styles.inputPhone}
              />
            </View>
            <View style={styles.containerCenter}>
              <View style={styles.containerInputPrefi}>
                <Image source={require("../../../assets/img/phone.png")} style={styles.imagenPhone}/>
                <Text style={styles.textPrefi}>+44</Text>
              </View>
            </View>
          </View>

          <View style={styles.containerButtom}>
            <BoxShadow setting={ shadowOpt }>
              <TouchableHighlight
                onPress={() => navigation.navigate('Login')}
                style={styles.buttom}
              >
                <Text style={styles.textButton}>
                  Access now{'       '}
                  <Image
                    source={require('../../../assets/img/arrowRight.png')}
                  />
                </Text>
              </TouchableHighlight>
            </BoxShadow>
          </View>
        </ScrollView>
    </View>
  );
}
