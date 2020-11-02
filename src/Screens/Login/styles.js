import {StyleSheet} from 'react-native';
import colors from '../../Themes/Colors';
import fonts from '../../Themes/Fonts';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  viewView: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: colors.background
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
    marginTop: hp('10%'),
    alignSelf: 'center',
    height: hp('15%'),
    resizeMode: 'contain',
  },
  imageCenterWellcome: {
    backgroundColor: "transparent",
    marginTop:  hp('5%'),
    alignSelf: 'center',
    height: hp('5%'),
    resizeMode: 'contain',
  },
  title: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: hp('3%'),
    textAlign: "center",
    marginTop: hp('5%'),
  },
  textPhone: {
    color: colors.fucsia,
    fontFamily: fonts.SemiBold,
    fontSize: hp('2%'),
    marginTop: hp('6%'),
    marginLeft: wp('10%'),
    marginBottom: -20
  },
  containerInput: {
    borderColor: colors.lila, 
    borderBottomWidth: 1,
    marginHorizontal: wp('10%'),
    alignSelf: "stretch",
    height: 70
  },
  containerInputError: {
    borderColor: colors.fucsia, 
    borderBottomWidth: 1,
    marginHorizontal: wp('10%'),
    alignSelf: "stretch",
    height: 70
  },
  textError : {
    color: colors.fucsia,
    fontSize: 12,
    fontFamily: fonts.regular,
    marginTop: hp('1%'),
    justifyContent: "center",
    textAlign: "center",
  },
  inputPhone: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.medium,
    padding: 10,
    bottom: -21,
    width: '100%'
  },
  textPrefi: {
    color: colors.lila,
    fontSize: 18,
    fontFamily: fonts.medium
  },
  containerInputNumber: {
    marginLeft: 75,
    marginRight: 30,
    flexDirection: "row"
  },
  containerCenter: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: -20,
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
    justifyContent: "center",
    marginTop: '10%',
    marginBottom: '10%'
  },
  buttom: {
    width: 190,
    height: 60,
    borderRadius: 10,
    marginTop: -40,
    backgroundColor: colors.transparent,
    justifyContent: "center",
    alignItems: 'center',
  },
  textButton: {
    color: colors.cyan,
    fontFamily: fonts.SemiBold,
    fontSize: 18,
    marginLeft: 35,
    marginTop: 20,
    elevation: 2,
    textShadowColor: colors.cyan,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8
  },
  titleModal: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 18,
    textAlign: "center",
    marginTop: '5%',
  },
  textModal2: {
    color: colors.lila,
    fontFamily: fonts.regular,
    fontSize: 14,
    marginTop: 18,
    textAlign: "center"
  },
  textModal3: {
    color: colors.lila,
    fontFamily: fonts.regular,
    fontSize: 14,
    marginTop: 60,
    textAlign: "center"
  },
  textModalPhone: {
    color: colors.fucsia,
    fontFamily: fonts.SemiBold,
    fontSize: 18,
    marginTop: 5,
    textAlign: "center"
  },
  textModalResend: {
    color: colors.cyan,
    fontFamily: fonts.SemiBold,
    fontSize: 18,
    marginTop: 60,
    textAlign: "center",
    textShadowColor: colors.cyan,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8
  },
  textModalPhone1: {
    color: colors.lila,
    fontFamily: fonts.SemiBold,
    fontSize: 18,
    marginTop: 10,
    textAlign: "center"
  },
  scrollPhone:{
    width: '100%',
    height: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  containerListPhone: {
    padding: 15,
    borderColor: colors.lila, 
    borderBottomWidth: 1,
    marginHorizontal: 30
  },
  textModalListPhone: {
    color: colors.lila,
    fontFamily: fonts.regular,
    fontSize: 18,
    textAlign: "left"
  },
  containerInputCountry: {
    marginLeft: 10,
    marginRight: 30,
    flexDirection: "row"
  },
  inputCountry: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.medium,
    padding: 10,
    bottom: -25,
    width: '100%'
  },
});

export default style