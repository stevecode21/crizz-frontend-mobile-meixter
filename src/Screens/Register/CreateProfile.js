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
  BackHandler,
  Dimensions
} from 'react-native';

import useTranslation from '../../i18n';
import useAuth from '../../Services/Auth';

import styles from './styles';
import codes from '../../i18n/Codes';
import colors from '../../Themes/Colors';
import fonts from '../../Themes/Fonts';
import Routes from '../../Navigation/Routes';

import { LinearGradient } from 'expo-linear-gradient';
import ModalBottom from 'react-native-raw-bottom-sheet';
import {Calendar} from 'react-native-calendars';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from "moment";
//api services
import * as api from "../../Services/register";

const { width, height } = Dimensions.get('window')

export default function({navigation}) {
  const {setLoading, showErrorToast, setStateApp, account, changeAccount} = useAuth()
  const {t, localeProvider} = useTranslation()

  const refModalBottom = useRef()
  const scrollRef = useRef();
  
  const [name, setName] = useState('')
  const [errorName, setErrorName] = useState(false)
  const [textErrorName, setTextErrorName] = useState('')

  const [nickname, setNickname] = useState('')
  const [errorNickname, setErrorNickname] = useState(false)
  const [textErrorNickname, setTextErrorNickname] = useState('')
  const [checkNickname, setCheckNickname] = useState(false)

  const [country, setCountry] = useState('')
  const [countryName, setCountryName] = useState('')
  const [errorCountry, setErrorCountry] = useState(false)
  const [textErrorCountry, setTextErrorCountry] = useState('')

  const [birth, setBirth] = useState('')
  const [errorBirth, setErrorBirth] = useState(false)
  const [textErrorBirth, setTextErrorBirth] = useState('')

  const [today, setToday] = useState(moment().format('YYYY-MM-DD'))
  const [filters, setFilters] = useState('')
  const [selectedDate, setSelectedDate] = useState(today);
  const [year, setYear] = useState(moment().format('YYYY'))
  const [calendarActive, setCalendarActive] = useState(true)

  const [viewMode, setViewMode] = useState('country')

  useEffect(() => { (async () => {
      console.log(account)
      if(account.fullName != undefined)
        setName(account.fullName)
      if(account.nickname != undefined)
        setNickname(account.nickname)
      if(account.birthdate != undefined)
      {
        setYear(moment(account.birthdate, 'YYYY/MM/DD').format('YYYY'))
        setBirth(moment(account.birthdate, 'YYYY/MM/DD').format('DD-MMM-YYYY'))
        setToday(moment(account.birthdate, 'YYYY/MM/DD').format('YYYY-MM-DD'))
      }
        
      codes.map((item) => {
        if(item.code === account.country)
        {
          console.log('encontre', item.code, item.name)
          setCountryName(item.name)
          setCountry(item.code)
        }
      })

    })();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate(Routes.IMAGE_PROFILE_SCREEN)
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  
  const eraseErrorAll = () => {
    setErrorName(false)
    setTextErrorName('')
    setErrorNickname(false)
    setTextErrorNickname('')
    setErrorCountry(false)
    setTextErrorCountry('')
    setErrorBirth(false)
    setTextErrorBirth('')
  }

  const validateAllForm = () => {
    eraseErrorAll()
    let encontre = false
    if (name == '')
    {
      encontre = true
      setErrorName(true)
      setTextErrorName(t('errorInputEmpty'))
    }

    if (nickname == '')
    {
      encontre = true
      setErrorNickname(true)
      setTextErrorNickname(t('errorInputEmpty'))
    }
    else
    {
      if (!checkNickname) 
      {
        encontre = true
        setErrorNickname(true)
        setTextErrorNickname(t('nicknameNot'))
      }
    }

    if (country == '')
    {
      encontre = true
      setErrorCountry(true)
      setTextErrorCountry(t('errorInputEmpty'))
    }

    if (birth == '')
    {
      encontre = true
      setErrorBirth(true)
      setTextErrorBirth(t('errorInputEmpty'))
    }    

    return encontre
  }

  const handleName = () => {
    if (nickname == '')
    {
      let newNick = name
      newNick = newNick.replace(/\s+/g, "")
      let num = Math.floor(Math.random() * 99)
      setNickname(newNick.toLowerCase()+num)
    }
  }

  const openModalCountry = () => {
    setViewMode('country')
    refModalBottom.current.open()
  }

  const openModalCalendar = () => {
    setViewMode('calendar')
    setCalendarActive(false)
    if (selectedDate != today)
    {
      setSelectedDate(moment(birth, 'DD-MMM-YYYY').format('YYYY-MM-DD'))
    }
    setTimeout(() => setCalendarActive(true), 100) 
    refModalBottom.current.open()
  }

  const closeModal = () => {
    refModalBottom.current.close()
  }

  const handleUpdate = async () => {
    let encontre = validateAllForm()
    if(!encontre)
    {
      setLoading(true);
      try 
      {
        let data = {
          fullName: name,
          nickname: nickname,
          country: country,
          birthdate: moment(birth, 'DD-MMM-YYYY').format('YYYY/MM/DD')
        }
        console.log(data)
        let response = await api.profileData(data);
        setLoading(false);
        changeAccount(response.result)
        setLoading(false)
        navigation.navigate(Routes.GENDER_SCREEN)
      } 
      catch (error) 
      {
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

  const handleNickname = async () => {
    if (nickname != '') 
    {
      setLoading(true);
      try 
      {
        let data = {
          nickname: nickname
        }
        let response = await api.verifyNickname(data);
        setLoading(false);
        setCheckNickname(response.result.perm)
        if (!response.result.perm) 
        {
          setErrorNickname(true)
          setTextErrorNickname(t('nicknameNot'))
        }
        else
        {
          setErrorNickname(false)
          setTextErrorNickname('')
        }
      } 
      catch (error) 
      {
        setLoading(false)
        setCheckNickname(false)
        if (error.status == 401) 
        {
          setErrorNickname(true) 
          setTextErrorNickname(localeProvider.name == 'en' ? error.message_en : error.message_es)
          showErrorToast(localeProvider.name == 'en' ? error.message_en : error.message_es)
        }
        else
        {
          showErrorToast(error.message);
        }
      }
    }
    else
    {
      setCheckNickname(false)
      showErrorToast(t('errorInputEmpty'))
      setErrorNickname(true)
      setTextErrorNickname(t('errorInputEmpty'))
    }
  }
  
  const CalendarTheme = {
    backgroundColor: 'transparent',
    calendarBackground: 'transparent',
    textDayFontFamily: fonts.medium,
    textMonthFontFamily: fonts.medium,
    textDayHeaderFontFamily: fonts.medium,
    arrowColor: colors.cyan,
    selectedDayBackgroundColor: colors.cyan,
    todayTextColor: colors.cyan,
    todayBackgroundColor: 'transparent',
    dayTextColor: colors.white,
    textDisabledColor: colors.grayLight,
    monthTextColor: colors.white,
    textDayFontSize: 12,
    textMonthFontSize: 18,
    textDayHeaderFontSize: 12
  }

  const ModalTheme = {
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
      height: 600,
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
      backgroundColor: colors.background
    }
  }

  return (
    <View style={styles.viewView}>
      <LinearGradient
        colors={[colors.background, colors.background2]}
        style={styles.linearGradient}
      />
      <KeyboardAwareScrollView ref={scrollRef} style={styles.scroll}>
        <Text style={styles.title}> {t('registerPreparing')} </Text>
        <Text style={styles.textCreateProfile}> {t('registerCreateProfile')} </Text>
        <Image
          source={require("../../../assets/img/loading2.png")}
          style={styles.imageCenter}
        />  
        <Image
          style={styles.imageCenter2}
          source={{ uri: account.urlProfileImage }}
        />
          
        <Text style={styles.textInputs}> {t('registerYourName')} </Text>
        <View style={( errorName ) ? styles.containerInputError : styles.containerInput}>  
          <View pointerEvents="box-none" style={styles.containerInputNumber}>
            <TextInput
              placeholder={t('registerPlaceName')}
              placeholderTextColor={colors.lila}
              onChangeText={(data) => { 
                setName(data) 
                setErrorName(false)
              }}
              onBlur={() => {
                handleName()
              }}
              style={styles.inputName} 
              value={name}
            />
          </View>
          <View style={styles.containerCenter}>
            <View style={styles.containerInputPrefi}>
              <Image source={require("../../../assets/img/iconName.png")} style={styles.imagenPhone}/>
            </View>
          </View>
        </View>
        {errorName && (
          <Text style={styles.textError}>{textErrorName}</Text>
        )}

        <Text style={styles.textInputs}> {t('registerNickname')} </Text>
        <View style={( errorNickname ) ? styles.containerInputError : styles.containerInput}>  
          <View style={styles.containerCenter}>
            <View style={styles.containerInputPrefi}>
              <Image source={require("../../../assets/img/iconNickname.png")} style={styles.imagenPhone}/>
            </View>
          </View>
          <View pointerEvents="box-none" style={styles.containerInputNumber}>
            <TextInput
              placeholder={t('registerPlaceNickname')}
              placeholderTextColor={colors.lila}
              onChangeText={(data) => { setNickname(data) }}
              onBlur={() => handleNickname()}
              style={styles.inputName}
              value={nickname}
            />
          </View>
          <View pointerEvents="box-none" style={styles.containerInputCheck}>
            <View style={styles.containerInputPrefi}>
              {checkNickname && (
                <Image source={require("../../../assets/img/check.png")} style={styles.imagenCheck}/>
              )}
            </View>
          </View>
        </View>
        {errorNickname && (
          <Text style={styles.textError}>{textErrorNickname}</Text>
        )}

        <Text style={styles.textInputs}> {t('country')} </Text>
        <View style={( errorCountry ) ? styles.containerInputError : styles.containerInput}>  
          <View style={styles.containerCenter}>
            <View style={styles.containerInputPrefi}>
              <Image source={require("../../../assets/img/iconCountry.png")} style={styles.imagenPhone}/>
            </View>
          </View>
          
          <View pointerEvents="box-none" style={styles.containerInputNumber}>
            <TouchableOpacity
              onPress={() => openModalCountry()}
              style={{height: 50}}
            >
              <Text style={styles.inputRegisterCountry} > { (countryName == '') ? t('selectCountry') : countryName } </Text>
            </TouchableOpacity>
          </View>

          <View pointerEvents="box-none" style={styles.containerInputCheck}>
            <View style={styles.containerInputPrefi}>
              <TouchableOpacity
                onPress={() => openModalCountry()}
              >
              <Image source={require("../../../assets/img/arrowdown.png")} style={styles.imagenArrowDown}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {errorCountry && (
          <Text style={styles.textError}>{textErrorCountry}</Text>
        )}

        <Text style={styles.textInputs}> {t('birth')} </Text>
        <View style={( errorBirth ) ? styles.containerInputError : styles.containerInput}>  
          <View style={styles.containerCenter}>
            <View style={styles.containerInputPrefi}>
              <Image source={require("../../../assets/img/iconBirth.png")} style={styles.imagenPhone}/>
            </View>
          </View>
          
          <View pointerEvents="box-none" style={styles.containerInputNumber}>
            <TouchableOpacity
              onPress={() => openModalCalendar()}
              style={{height: 50}}
            >
              <Text style={styles.inputRegisterCountry} > { (birth == '') ? '23-Mar-1988' : birth } </Text>
            </TouchableOpacity>
          </View>
        </View>
        {errorBirth && (
          <Text style={styles.textError}>{textErrorBirth}</Text>
        )}
        
        <View style={styles.containerButtom2}>
          <Text style={styles.textButton}>
            {t('set')} {'           '}
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
      </KeyboardAwareScrollView>

      <ModalBottom
        ref={refModalBottom}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        dragFromTopOnly={true}
        animationType={'slide'}
        customStyles={ModalTheme}
      >
        {viewMode === 'country' && (
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
                <TouchableOpacity key={item.code}  onPress={() => {  
                    setCountry(item.code)
                    setCountryName(item.name) 
                    setErrorCountry(false)
                    setTextErrorCountry('')
                    closeModal()
                }} >
                  <View style={styles.containerListPhone}>
                    <Text style={styles.textModalListPhone}> {item.code} - {item.name} </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {viewMode === 'calendar' && (
          <View>
            <Text style={styles.textModalPhone1}> {t('selectBirth')}</Text>
            
            <View style={styles.containerInputYear}> 
              <View pointerEvents="box-none" style={styles.containerYear}>
                <TextInput
                  keyboardType="numeric"
                  defaultValue={year}
                  placeholder="2020"
                  maxLength={4}
                  placeholderTextColor={colors.lila}
                  onChangeText={(data) => { 
                    setYear(data)
                  }}
                  onBlur={() => {
                    if (year != "")
                    {
                      if (parseInt(year) <= 1900)
                      {
                        showErrorToast(t('minYear'))
                      }
                      else
                      {
                        setCalendarActive(false)
                        let da = selectedDate.split('-')
                        setSelectedDate(year+'-'+da[1]+'-'+da[2])
                        setTimeout(() => setCalendarActive(true), 100) 
                        //console.log(selectedDate)
                      }
                    }
                    else
                    {
                      showErrorToast(t('errorYear'))
                    }
                  }}
                  style={styles.inputYear}
                />
              </View>
            </View>

            { calendarActive && 
              (
                <Calendar
                  style={{
                    marginHorizontal: 30,
                    marginTop: 0
                  }}
                  current={selectedDate}
                  monthFormat={'MMMM'}
                  theme={CalendarTheme}
                  maxDate={new Date()}
                  onDayPress={(day) => {
                    setErrorBirth(false)
                    setBirth(moment(day.dateString, 'YYYY-MM-DD').format('DD-MMM-YYYY'))
                    setSelectedDate(day.dateString);
                  }}
                  onDayLongPress={(day) => {
                    setErrorBirth(false)
                    setBirth(moment(day.dateString, 'YYYY-MM-DD').format('DD-MMM-YYYY'))
                    setSelectedDate(day.dateString);
                  }}
                  renderArrow={(direction) => 
                    direction === 'left' ? 
                    (<Image style={{width: 24, height: 24}} source={require("../../../assets/img/angleLeft.png")}/>) : 
                    (<Image style={{width: 24, height: 24}} source={require("../../../assets/img/angleRight.png")}/>)
                  }
                  markedDates={{
                    [selectedDate]: {
                      selected: true,
                      customStyles: {
                        container: {
                          borderRadius: 5,
                          backgroundColor: colors.cyan
                        },
                        text: {
                          marginTop: 7,
                          fontFamily: fonts.medium,
                          color: colors.background
                        }
                      }
                    },
                  }}
                  markingType={'custom'}
                />
              )
            }

            <View style={styles.containerButtomCalendar}>
              <Text style={styles.textButton}>
                {t('select')} {'       '}
                <Image
                  source={require('../../../assets/img/arrowRight.png')}
                />
              </Text>
              <TouchableHighlight
                onPress={() => closeModal()}
                style={styles.buttomCalendar}
              >
                <Image
                  source={require("../../../assets/img/button-bg.png")}
                />
              </TouchableHighlight>
            </View>
                
          </View>
        )}
      </ModalBottom>
    </View>
  );
}
