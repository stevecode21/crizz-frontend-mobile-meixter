import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet, 
  Image, 
  View,
  Text, 
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  TextInput,
  BackHandler
} from 'react-native';

import useTranslation from '../../i18n';
import useAuth from '../../Services/Auth';

import styles from './styles';
import colors from '../../Themes/Colors';
import { APP_STATE } from "../../Constants";
import Routes from '../../Navigation/Routes';

import { LinearGradient } from 'expo-linear-gradient';
import ModalBottom from 'react-native-raw-bottom-sheet';
//api services
import * as api from "../../Services/register";

export default function({navigation}) {
  const {logout, setLoading, checkAccount, showErrorToast, setStateApp, account, changeAccount} = useAuth()
  const {t, localeProvider} = useTranslation()

  const refModalBottom = useRef()
  const [gender, setGender] = useState('male')
  
  const [bio, setBio] = useState('')
  const [errorBio, setErrorBio] = useState(false)
  const [textErrorBio, setTextErrorBio] = useState('')

  const [tagSelected, setTagSelected] = useState([
    {_id: 1, name: '#tag', active: false}
  ])

  useEffect(() => {
    (async () => {
      handleTagsTrend()
    })();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate(Routes.PROFILE_SCREEN)
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const eraseErrorAll = () => {
    setErrorBio(false)
    setTextErrorBio('')
  }

  const validateAllForm = () => {
    eraseErrorAll()
    let encontre = false
    if (bio == '')
    {
      encontre = true
      setErrorBio(true)
      setTextErrorBio(t('errorInputEmpty'))
    }   
    return encontre 
  }

  const handleUpdate = async () => {
    let encontre = validateAllForm()
    if(!encontre)
    {
      let data = {
        gender: gender,
        bio: bio,
        tags: []
      }
      tagSelected.map(item => {
        if (item.active === true)
          data.tags.push(item._id)
      })

      setLoading(true);
      try 
      {
        let response = await api.adjustProfile(data);
        changeAccount(response.result)
        setLoading(false)
        setStateApp(APP_STATE.PRIVATE)
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
  }

  const handleTagsTrend = async () => {
    setLoading(true);
    try 
    {
      let response = await api.tagsTrend();
      setTagSelected(
        response.result.map(item =>
          ({
            _id: item._id, name: item.name, active: false
          })
        )
      )
      setLoading(false)
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
  

  const handlePush = (tag) => {
    setTagSelected(
      tagSelected.map(item => 
        (item._id === tag._id) 
        ? {...item, active : (item.active) ? false : true } 
        : item )
    )
  }

  return (
    <View style={styles.viewView}>
      <LinearGradient
        colors={[colors.background, colors.background2]}
        style={styles.linearGradient}
      />
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}> {t('registerPreparing')} </Text>
        <Text style={styles.textCreateProfile}> {t('adjustAccount')} </Text>
        <Image
          source={require("../../../assets/img/loading3.png")}
          style={styles.imageCenter}
        />  
        <Image
          style={styles.imageCenter2}
          source={{ uri: account.urlProfileImage }}
        />
           
        <View style={[styles.row3, {marginTop: 30}]}>
          <View style={styles.containerOptions2} >
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setGender('male')}
            >
              <Text style={gender == 'male' ? styles.textSexActive : styles.textSex }> {t('man')} </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerOptions2} >
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setGender('female')}
            >
              <Text style={gender == 'female' ? styles.textSexActive : styles.textSex }> {t('woman')} </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerOptions2} >
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setGender('other')}
            >
              <Text style={gender == 'other' ? styles.textSexActive : styles.textSex }> {t('other')} </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.textInputBio}> {t('registerYourBio')} </Text>
        <View style={( errorBio ) ? styles.containerInputBioError : styles.containerInputBio}>  
          <View pointerEvents="box-none" style={styles.containerInputIntroBio}>
            <TextInput
              multiline
              numberOfLines={4}
              maxLength={100}
              placeholder={t('registerPlaceBio')}
              placeholderTextColor={colors.lila}
              onChangeText={(data) => { 
                setBio(data) 
                setErrorBio(false)
              }}
              style={styles.inputBio} 
            />
          </View>
        </View>
        {errorBio && (
          <Text style={styles.textError}>{textErrorBio}</Text>
        )}

        <Text style={styles.adjustText}> {t('registerChooseTags')} </Text>
        <Text style={styles.adjustText2}> {t('registerAddMore')} </Text>

        <View style={styles.rowTag}>
          {tagSelected.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handlePush(item)}>
              <Text style={item.active ? styles.textTagActive : styles.textTag}> {item.name} </Text>
            </TouchableOpacity>
          ))}
          
        </View>

        <View style={styles.containerButtom2}>
          <Text style={styles.textButton}>
            {t('go')}! {'          '}
            <Image
              source={require('../../../assets/img/arrowRight.png')}
            />
          </Text>
          <TouchableHighlight
            onPress={() => handleUpdate()}
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
