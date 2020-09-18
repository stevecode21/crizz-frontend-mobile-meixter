import React, {useRef, useEffect, useState, useCallback} from 'react';
import {
  Text, 
  ScrollView, 
  StyleSheet, 
  Image,
  View,
  TextInput,
  Alert,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import useTranslation from '../../i18n';
import useAuth from '../../Services/Auth';

import styles from './styles';
import codes from '../../i18n/Codes';
import colors from '../../Themes/Colors';
import fonts from '../../Themes/Fonts';
import { Video } from 'expo-av';
import ModalBottom from 'react-native-raw-bottom-sheet';
import PinCode from 'react-native-smooth-pincode-input';
//api services
import * as api from "../../Services/login";

export default function() {

  const {t, localeProvider} = useTranslation()
  const {setToken, setLoading, showErrorToast, stateApp, checkAccount} = useAuth()

  const refModalBottom = useRef()
  const [code, setCode] = useState('')
  const [counter, setCounter] = useState(10)
  const [resend, setResend] = useState(false)
  const [phone, setPhone] = useState('')
  const [errorPhone, setErrorPhone] = useState(false)
  const [textErrorPhone, setTextErrorPhone] = useState('')
  const [tokenVerify, setTokenVerify] = useState('')
  const [viewMode, setViewMode] = useState('code')
  const [filters, setFilters] = useState('')
  const [codePhone, setCodePhone] = useState('+44')

  const closeModal = () => {
    refModalBottom.current.close()
  }

  const openModal = () => {
    setViewMode('code')
    resetCounter()
    refModalBottom.current.open()
  }

  const openModalCodes = () => {
    setViewMode('phone')
    refModalBottom.current.open()
  }

  const resetCounter = () => {
    setCounter(60) 
    setResend(false) 
  }

  const resetErrors = () => {
    setErrorPhone(false)
    setTextErrorPhone('')
  }

  const handleSelectec = (dial_code) => {
    setCodePhone(dial_code)
    closeModal()
  }

  const handleVerify = async () => {
    setCode('')
    if (phone !== '') {
      let newphone = phone 
      newphone = newphone.replace(/\D+/g, '')
      newphone = codePhone+''+newphone
      setLoading(true);
      try 
      {
        let response = await api.verify({phone: newphone});
        resetErrors()
        setLoading(false);
        if (response.result.tokenVerify) 
        {
          setTokenVerify(response.result.tokenVerify)
          openModal()
        }
      } 
      catch (error) 
      {
        setLoading(false)
        if (error.message == 'Network Error') 
        {
          showErrorToast(error.message);
        }
        else
        {
          setErrorPhone(true)
          setTextErrorPhone(localeProvider.name == 'en' ? error.message_en : error.message_es)
          showErrorToast(localeProvider.name == 'en' ? error.message_en : error.message_es)
        }
      }
    } else {
      setErrorPhone(true)
      setTextErrorPhone(t('loginErrorPhoneInvalid'))
    }
  }

  const handleLogin = async (codePhone) => {
    setCode(codePhone)
    setLoading(true);
    try 
    {
      let data = {
        tokenVerify: tokenVerify,
        code: codePhone
      }
      let response = await api.login(data);
      setLoading(false);
      if (response.result.token) 
      {
        closeModal()
        await setToken(response.result.token)
      }
    } 
    catch (error) 
    {
      setCode('')
      setLoading(false)
      if (error.status == 401) 
      {
        setTextErrorPhone(localeProvider.name == 'en' ? error.message_en : error.message_es)
        showErrorToast(localeProvider.name == 'en' ? error.message_en : error.message_es)
      }
      else
      {
        showErrorToast(error.message);
      }
    }
  }

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    setResend((timer == 0) ? true : false)
    return () => clearInterval(timer);
  }, [counter])

  useEffect(() => {
    checkAccount()
  }, [])

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

        <Text style={styles.title}> {t('loginTitle')} </Text>
        <Text style={styles.textPhone}> {t('loginYourPhone')} </Text>

        <View style={( errorPhone ) ? styles.containerInputError : styles.containerInput}>  
          <View pointerEvents="box-none" style={styles.containerInputNumber}>
            <TextInput
              keyboardType={'phone-pad'}
              maxLength={10}
              placeholder="7454 123456"
              onChangeText={(data) => {
                resetErrors()
                setPhone(data)
              }}
              style={styles.inputPhone}
            />
          </View>
          <View style={styles.containerCenter}>
            <View style={styles.containerInputPrefi}>
              <TouchableOpacity
                onPress={() => openModalCodes()}
                style={styles.containerInputPrefi}
              >
                <Image source={require("../../../assets/img/phone.png")} style={styles.imagenPhone}/>
                <Text style={styles.textPrefi}>{ codePhone }</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {errorPhone && (
          <Text style={styles.textError}>{textErrorPhone}</Text>
        )}

        <View style={styles.containerButtom}>
          <Text style={styles.textButton}>
            {t('loginAccessnow')}{'       '}
            <Image
              source={require('../../../assets/img/arrowRight.png')}
            />
          </Text>
          <TouchableHighlight
            onPress={() => handleVerify()}
            style={styles.buttom}
          >
            <Image
              source={require("../../../assets/img/button-bg.png")}
            />
          </TouchableHighlight>
        </View>

        <ModalBottom
          ref={refModalBottom}
          closeOnDragDown={true}
          closeOnPressMask={true}
          closeOnPressBack={true}
          dragFromTopOnly={true}
          animationType={'slide'}
          customStyles={{
            wrapper: {
              backgroundColor: colors.transparentLight,
            },
            draggableIcon: {
              backgroundColor: colors.background,
              width: 80,
              top: 10,
              height: 5,
              borderRadius: 2.5,
            },
            container: {
              height: 520,
              borderTopLeftRadius: 35,
              borderTopRightRadius: 35,
              backgroundColor: colors.background
            }
          }}
        >
          {viewMode === 'code' && (
            <View>
              <Text style={styles.titleModal}> {t('loginSMSVerification')} </Text>
              <Text style={styles.textModal2}> {t('loginTextModal2')} </Text>
              <Text style={styles.textModalPhone}>{codePhone} {phone}</Text>

              <PinCode
                value={code}
                onTextChange={(codeNumber) => {
                  setCode(codeNumber)
                }}
                onFulfill={(codeNumber) => {
                  handleLogin(codeNumber)
                }}
                placeholder="0"
                cellSize={60}
                containerStyle={{
                  alignSelf: 'center',
                  marginTop: 30
                }}
                cellStyle={{
                  borderRadius: 10,
                  backgroundColor: colors.transparent,
                  marginLeft: 10,
                  borderWidth: 3,
                  borderColor: colors.cyan,
                  borderStyle: "solid"
                }}
                cellStyleFocused={{
                  backgroundColor: colors.transparentLight
                }}
                textStyle={{
                  fontSize: 28,
                  color: colors.white
                }}
                textStyleFocused={{
                  color: colors.cyan
                }}
              />

              {!resend && (
                <Text style={styles.textModal3}> {t('loginWait')} {counter} {t('loginSeconds')}</Text>
              )}

              <TouchableOpacity  onPress={() => { handleVerify() }} >
                {resend && (
                  <Text style={styles.textModalResend}> {t('loginResendCode')} </Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {viewMode === 'phone' && (
            <View>
              <Text style={styles.textModalPhone1}> {t('selectCountry')}</Text>
              <View style={styles.containerInput}>  
                <View pointerEvents="box-none" style={styles.containerInputCountry}>
                  <TextInput
                    maxLength={25}
                    placeholder={t('country')}
                    onChangeText={(data) => {
                      setFilters(data)
                    }}
                    value={filters}
                    style={styles.inputCountry}
                  />
                </View>
              </View>
              <ScrollView style={styles.scrollPhone}>
                {codes.filter(code => code.name.includes(filters)).map((item) => (
                  <TouchableOpacity key={item.code}  onPress={() => {  handleSelectec(item.dial_code) }} >
                    <View style={styles.containerListPhone}>
                      <Text style={styles.textModalListPhone}> {item.dial_code} - {item.name} </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
            
        </ModalBottom>
        
      </ScrollView>
    </View>
  );
}

