import React, {useEffect, useState} from 'react';
import {
  StyleSheet, 
  Image, 
  View,
  Text, 
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

import useTranslation from '../../i18n';
import useAuth from '../../Services/Auth';

import styles from './styles';
import codes from '../../i18n/Codes';
import colors from '../../Themes/Colors';

import { LinearGradient } from 'expo-linear-gradient';
import Routes from '../../Navigation/Routes';
//api services
import * as api from "../../Services/register";

export default function({navigation}) {
  const {logout, setLoading, checkAccount, showErrorToast, setStateApp, account, changeAccount} = useAuth()
  const {t, localeProvider} = useTranslation()

  const [hasPermission, setHasPermission] = useState(null)
  const [image, setImage] = useState(null)


  useEffect(() => {
    const backAction = () => {
      logout()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const _handleResultImage = async (result) => {
    if (!result.cancelled) {
      let base64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: 'base64',
      });
      setImage(base64);
    }
  };

  const pickImage = async (value) => {
    if (value === 'camera') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.3,
      });
      _handleResultImage(result);
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.3,
      });
      _handleResultImage(result);
    }
  };

  const handleUpload = async () => {
    if (image != null) 
    {
      setLoading(true);
      try 
      {
        let data = {
          register: true,
          profileImage: `data:image/png;base64,${image}`
        }
        let response = await api.imageProfile(data);
        changeAccount(response.result)
        setLoading(false)
        navigation.navigate(Routes.PROFILE_SCREEN)
      } 
      catch (error) 
      {
        console.log(error)
        setLoading(false)
        if (error.status == 401) 
        {
          showErrorToast(localeProvider.name == 'en' ? error.message_en : error.message_es)
        }
        else if (error.status == 403) 
        {
          showErrorToast(localeProvider.name == 'en' ? error.message_en : error.message_es)
          setStateApp(APP_STATE.PUBLIC)
        }
        else
        {
          showErrorToast(error.message);
        }
      }
    }
    else
    {
      if (account.urlProfileImage === undefined)
      {
        showErrorToast(t('registerUploadPhoto'))
      }
      else
      {
        navigation.navigate(Routes.PROFILE_SCREEN)
      }
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      if (account.step == 3)
        navigation.navigate(Routes.PROFILE_SCREEN)
      if (account.step == 4)
        navigation.navigate(Routes.GENDER_SCREEN)
    })();
  }, []);

  return (
    <View style={styles.viewView}>
      <LinearGradient
        colors={[colors.background, colors.background2]}
        style={styles.linearGradient}
      />
      <ScrollView style={styles.scroll}>
        <Text style={[styles.title, {marginTop: 70}]}> {t('registerPreparing')} </Text>
        <Text style={styles.textCreateProfile}> {t('registerCreateProfile')} </Text>
        <Image
          source={require("../../../assets/img/loading1.png")}
          style={styles.imageCenter}
        />  

        {account.urlProfileImage != undefined && image == null && (
          <Image
            style={styles.imageCenter2}
            source={{ uri: account.urlProfileImage }}
          />
        )}

        {account.urlProfileImage !== undefined && image !== null && (
          <Image
            style={styles.imageCenter2}
            source={{ uri: `data:image;base64,${image}` }}
          />
        )}

        {account.urlProfileImage === undefined && image === null && (
          <Image
            style={styles.imageCenter3}
            source={require("../../../assets/img/avatar.png")}
          />
        )}

        {account.urlProfileImage === undefined && image !== null && (
          <Image
            style={styles.imageCenter2}
            source={{ uri: `data:image;base64,${image}` }}
          />
        )}
           
        <Text style={styles.textUploadPhoto}> {t('registerUploadPhoto')} </Text>
        <View style={styles.row}>
          <View style={styles.containerOptions} >
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => pickImage('camera')}
            >
              <Image
                source={require("../../../assets/img/camera.png")}
                style={styles.imageOptions}
              /> 
            </TouchableOpacity>
          </View>
            
          <View style={styles.containerOptions} >
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => pickImage('galery')}
            >
              <Image
                source={require("../../../assets/img/gallery.png")}
                style={styles.imageOptions}
              /> 
            </TouchableOpacity>
          </View>
          <View style={styles.containerOptions} >
            <Image
              source={require("../../../assets/img/instagram.png")}
              style={styles.imageOptions}
            /> 
          </View>
        </View>
        <View style={styles.row2}>
          <View style={styles.containerOptions2} >
            <Text style={styles.textOptions}> {t('camera')} </Text>
          </View>
          <View style={styles.containerOptions2} >
            <Text style={styles.textOptions}> {t('gallery')} </Text>
          </View>
          <View style={styles.containerOptions2} >
            <Text style={styles.textOptions}> {t('instagram')} </Text>
          </View>
        </View>

        <View style={styles.containerButtom}>
          <Text style={styles.textButton}>
            {t('ready')} {'       '}
            <Image
              source={require('../../../assets/img/arrowRight.png')}
            />
          </Text>
          <TouchableHighlight
            onPress={() => handleUpload()}
            style={styles.buttom}
          >
            <Image
              source={require("../../../assets/img/button-bg.png")}
            />
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
}
