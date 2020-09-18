import {StyleSheet} from 'react-native';
import colors from '../../Themes/Colors';
import fonts from '../../Themes/Fonts';

const style = StyleSheet.create({
  viewView: {
    flex: 1,
    alignItems: 'flex-start'
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
    position: 'relative',
    backgroundColor: "transparent",
    marginTop: 36,
    alignSelf: 'center',
    width: 143,
    height: 143,
    resizeMode: 'stretch',
    zIndex: 1
  },
  imageCenter2: {
    position: 'absolute',
    backgroundColor: "transparent",
    alignSelf: 'center',
    width: 92,
    height: 92,
    top: 184,
    borderRadius: 50
  },
  imageCenterAvatar: {
    position: 'absolute',
    backgroundColor: "transparent",
    alignSelf: 'center',
    width: 162,
    height: 162,
    top: 150,
    borderRadius: 50
  },
  imageOptions: {
    backgroundColor: "transparent",
    width: 50,
    height: 50,
    resizeMode: 'stretch'
  },
  row: {
    flex: 1, 
    flexDirection: 'row', 
    marginTop: 51,
    marginLeft: 40,
    marginRight: 40
  },
  row2: {
    flex: 1, 
    flexDirection: 'row',
    marginLeft: 40,
    marginRight: 40
  },
  row3: {
    flex: 1, 
    flexDirection: 'row',
    marginLeft: 90,
    marginRight: 90
  },
  row4: {
    flex: 1, 
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 20
  },
  containerOptions: {
    flex: 1, 
    flexDirection: 'row',
    width: '100%',
    height: 45,
    justifyContent: "center"
  },
  containerOptions2: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: "center"
  },
  textOptions: {
    color: colors.lila,
    fontFamily: fonts.regular,
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
  textSex : {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
  textSexActive : {
    color: colors.cyan,
    fontFamily: fonts.regular,
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    borderColor: colors.cyan, 
    borderBottomWidth: 3,
    textShadowColor: colors.cyan,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8
  },
  title: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 24,
    textAlign: "center",
    marginTop: 70,
  },
  textCreateProfile: {
    color: colors.violet,
    fontFamily: fonts.SemiBold,
    fontSize: 18,
    textAlign: "center",
    marginTop: 3,
  },
  textUploadPhoto: {
    color: colors.lila,
    fontFamily: fonts.regular,
    fontSize: 14,
    textAlign: "center",
    marginTop: 50,
  },
  containerInput: {
    borderColor: colors.lila, 
    borderBottomWidth: 1,
    marginLeft: 36,
    marginRight: 36,
    alignSelf: "stretch",
    height: 70
  },
  containerInputBio: {
    borderColor: colors.lila, 
    borderBottomWidth: 1,
    marginLeft: 46,
    marginRight: 46,
    height: 120
  },
  containerInputBioError: {
    borderColor: colors.fucsia, 
    borderBottomWidth: 1,
    marginLeft: 46,
    marginRight: 46,
    height: 120
  },
  containerInputYear: {
    borderColor: colors.lila, 
    borderBottomWidth: 1,
    alignSelf: "center",
    height: 65,
    width: 80
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
    fontFamily: fonts.regular,
    marginTop: 3,
    justifyContent: "center",
    textAlign: "center",
  },
  inputName: {
    fontSize: 18,
    color: colors.lila,
    fontFamily: fonts.regular,
    padding: 10,
    bottom: -15,
    width: '100%'
  },
  inputBio: {
    fontSize: 18,
    color: colors.lila,
    fontFamily: fonts.regular,
    padding: 10,
    bottom: -15,
    width: '100%'
  },
  inputYear: {
    fontSize: 22,
    color: colors.white,
    fontFamily: fonts.medium,
    padding: 10,
    bottom: -25,
    width: '100%'
  },
  inputRegisterCountry: {
    fontSize: 18,
    color: colors.lila,
    fontFamily: fonts.regular,
    top: 30,
    marginLeft: 2,
    width: '100%'
  },
  containerInputNumber: {
    marginLeft: 30,
    marginRight: 30,
    flexDirection: "row"
  },
  containerInputIntroBio: {
    marginLeft: 15,
    marginRight: 15,
    flexDirection: "row"
  },
  containerYear: {
    flexDirection: "row"
  },
  containerInputCheck: {
    position: "absolute",
    right: 10,
    bottom: 15,
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
    width: 24,
    height: 24,
  },
  imagenCheck: {
    resizeMode: "center",
    backgroundColor: "transparent",
    width: 30,
    height: 30,
  },
  imagenArrowDown: {
    resizeMode: "center",
    backgroundColor: "transparent",
    width: 35,
    height: 35,
  },
  containerButtom: {
    alignSelf: 'center',
    justifyContent: "center",
    marginTop: 110,
    marginBottom: 20
  },
  containerButtom2: {
    alignSelf: 'center',
    justifyContent: "center",
    marginTop: 40,
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
    marginTop: 20,
    elevation: 2,
    marginRight: 20,
    textAlign: "right",
    textShadowColor: colors.cyan,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8
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
  textInputs: {
    color: colors.fucsia,
    fontFamily: fonts.SemiBold,
    fontSize: 14,
    marginTop: 10,
    marginLeft: 70,
    marginBottom: -20
  },
  textInputBio: {
    color: colors.fucsia,
    fontFamily: fonts.SemiBold,
    fontSize: 14,
    marginTop: 30,
    marginLeft: 70,
    marginBottom: -20
  },
  adjustText: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 14,
    textAlign: "center",
    marginTop: 30,
  },
  adjustText2: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 14,
    textAlign: "center",
    marginTop: 3,
  },
});

export default style