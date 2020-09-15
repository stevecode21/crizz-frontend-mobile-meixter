import React, {useEffect, useState} from 'react';
import {
  StyleSheet, 
  Image, 
  View,
  Text, 
  TouchableHighlight,
  ScrollView,
  TouchableOpacity
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

//api services
import * as api from "../../Services/register";

export default function() {
  const {logout, setLoading, checkAccount, showErrorToast, setStateApp} = useAuth()
  const {t, localeProvider} = useTranslation()

  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);

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
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.3,
      });
      _handleResultImage(result);
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.3,
      });
      _handleResultImage(result);
    }
  };

  const handleUpload = async (codePhone) => {
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
        setLoading(false);
        console.log(response)
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
      showErrorToast(t('registerUploadPhoto'));
    }
      
  }

  useEffect(() => {
    (async () => {
      checkAccount()
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  return (
    <View style={styles.viewView}>
      <LinearGradient
        colors={[colors.background, colors.background2]}
        style={styles.linearGradient}
      />
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}> {t('registerPreparing')} </Text>
        <Text style={styles.textCreateProfile}> {t('registerCreateProfile')} </Text>
        <Image
          source={require("../../../assets/img/loading1.png")}
          style={styles.imageCenter}
        />  
        {image === null ? (
          <Image
            source={require("../../../assets/img/Imagen1.png")}
            style={styles.imageCenter2}
          />  
        ) : (
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
