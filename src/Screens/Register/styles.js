import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../Themes/Colors';
import fonts from '../../Themes/Fonts';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
const { width, height } = Dimensions.get('screen')

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
    marginTop: '5%',
    alignSelf: 'center',
    width: 160,
    height: 160,
    resizeMode: 'stretch',
    zIndex: 1
  },
  imageCenter2: {
    position: 'relative',
    backgroundColor: "transparent",
    alignSelf: 'center',
    width: 103,
    height: 103,
    marginTop: -131,
    borderRadius: 100
  },
  imageCenter3: {
    position: 'relative',
    backgroundColor: "transparent",
    alignSelf: 'center',
    width: 175,
    height: 175,
    marginTop: -166,
    borderRadius: 100
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
    width: wp('13%'),
    height: wp('12%'),
    resizeMode: 'stretch'
  },
  row: {
    flex: 1, 
    flexDirection: 'row', 
    marginTop: '7%',
    marginLeft: wp('10%'),
    marginRight: wp('10%')
  },
  row2: {
    flex: 1, 
    flexDirection: 'row',
    marginLeft: wp('10%'),
    marginRight: wp('10%')
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
    fontSize: hp('1.5%'),
    textAlign: "center",
    marginTop: hp('1%'),
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
    marginTop: '2%',
  },
  titleCreate: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 24,
    textAlign: "center",
    marginTop: (height < 800)?hp('1%'):hp('15%'),
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
    marginTop: hp('3%'),
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
    height: 70
  },
  containerInputBioError: {
    borderColor: colors.fucsia, 
    borderBottomWidth: 1,
    marginLeft: 46,
    marginRight: 46,
    height: 70
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
    color: colors.white,
    fontFamily: fonts.regular,
    padding: 10,
    bottom: -15,
    width: '100%'
  },
  inputBio: {
    fontSize: 14,
    color: colors.white,
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
    marginTop: hp('5%'),
    marginBottom: 20
  },
  containerButtom2: {
    alignSelf: 'center',
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20
  },
  containerButtomCalendar: {
    alignSelf: 'center',
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
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
  buttomCalendar: {
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
    marginTop: '8%',
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
    marginTop: 0,
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
    marginTop: 10,
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
    fontSize: 12,
    textAlign: "center",
    marginTop: 3,
  },
  textTagActive : {
    color: colors.cyan,
    fontFamily: fonts.regular,
    fontSize: 14,
    textAlign: "center",
    marginTop: 15,
    textShadowColor: colors.cyan,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
    marginHorizontal: 6
  },
  textTag : {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 14,
    textAlign: "center",
    marginTop: 15,
    marginHorizontal: 6
  },
  rowTag: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    flexDirection: "row",
    flexWrap: 'wrap',
    marginTop: 5,
    marginLeft: 30,
    marginRight: 30
  }
});

export default style