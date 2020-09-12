import {StyleSheet} from 'react-native';
import colors from '../../Themes/Colors';
import fonts from '../../Themes/Fonts';

const style = StyleSheet.create({
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
    height: 70
  },
  containerInputError: {
    borderColor: colors.fucsia, 
    borderBottomWidth: 1,
    marginLeft: 36,
    marginRight: 36,
    alignSelf: "stretch",
    height: 70,
  },
  textError : {
    color: colors.fucsia,
    fontSize: 12,
    fontFamily: fonts.medium,
    marginTop: 15,
    justifyContent: "center",
    textAlign: "center",
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
    marginLeft: 75,
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
    justifyContent: "center",
    marginTop: 60,
    marginBottom: 20
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
    elevation: 2
  },
  titleModal: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 18,
    textAlign: "center",
    marginTop: 60,
  },
  textModal2: {
    color: colors.lila,
    fontFamily: fonts.SemiBold,
    fontSize: 14,
    marginTop: 18,
    textAlign: "center"
  },
  textModal3: {
    color: colors.lila,
    fontFamily: fonts.SemiBold,
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
    textAlign: "center"
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
    fontFamily: fonts.SemiBold,
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