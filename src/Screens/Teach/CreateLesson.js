import React, {useEffect, useRef, useState, Fragment} from 'react'
import { BackHandler, TouchableOpacity, Dimensions, TouchableHighlight} from 'react-native'
import styled from 'styled-components/native'
import useTranslation from '../../i18n';
import useAuth from '../../Services/Auth';
import ModalBottom from 'react-native-raw-bottom-sheet';
import fonts from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
//import { BlurView } from 'expo-blur';
const { width, height } = Dimensions.get('window')

import { StackActions } from '@react-navigation/native';
import Routes from '../../Navigation/Routes';


export default function CreateLesson({navigation}) {
	const {t, localeProvider} = useTranslation()
  	const {setLoading, showErrorToast, stateApp, checkAccount} = useAuth()
  	const refModalBottom = useRef()
  	const [viewMode, setViewMode] = useState('help')
  	const [errorDescription, setErrorDescription] = useState(false)
  	const [textErrorDesc, setTextErrorDesc] = useState('')
  	const [mtm, setMtm] = useState(180)
  	const [coins30, setCoins30] = useState(10)
  	const [coins60, setCoins60] = useState(20)
  	const [totalCoins30, setTotalCoins30] = useState(9.01)
  	const [totalCoins60, setTotalCoins60] = useState(18.02)

  	const customStyles = {
		wrapper: {
		  backgroundColor: colors.transparentLight,
		},
		draggableIcon: {
		  backgroundColor: colors.transparent
		},
		container: {
		  height: height-mtm,
		  borderTopLeftRadius: 35,
		  borderTopRightRadius: 35,
		  backgroundColor: colors.blueDark,
		  opacity: 0.9
		}
	}

	const valueCoin = 0.901
	const listCoins = [10, 20, 30, 40, 60, 70, 80, 90, 100]

  	useEffect(() => {
	    const backHandler = BackHandler.addEventListener(
	      "hardwareBackPress",
	      backAction
	    );

	    return () => backHandler.remove();
	}, []);

	const backAction = () => {
		navigation.dispatch(
			StackActions.replace(Routes.HOME_STACK, {
				screen: Routes.HOME_TABS,
				params: {
					screen: 'Teach',
					params: {}
				}
			})
		);
      	return true;
    };

    const calculate = (type) => {
    	if (type == 'sesenta')
    	{
    		setTotalCoins60(coins60 * valueCoin)
    	}
    	else
    	{
    		setTotalCoins30(coins30 * valueCoin)
    	}
    }

    const closeModal = () => {
	    refModalBottom.current.close()
	}

    const openModal = (type) => {
    	if (type == 'YouGet')
    		setMtm(230)
    	if (type == 'help')
    		setMtm(180)

	    setViewMode(type)
	    refModalBottom.current.open()
	}

	return (
		<Container>
			<Header>
				<Menu>
					<TouchableOpacity onPress={backAction}>
						<IconCalendar resizeMode='contain' source={require('../../../assets/img/arrowLeft.png')} />
					</TouchableOpacity>
				</Menu>
				
				<Menu>
					<Title>{t('createLesson')}</Title>
				</Menu>

				<Menu>
					<TouchableOpacity onPress={() => openModal('help')}>
						<IconAdd resizeMode='contain' source={require('../../../assets/img/help.png')} />
					</TouchableOpacity>
				</Menu>
			</Header>
			<Separator />

			<ScrollView>
				<MaximunVerticalVideo>{t('maximunVerticalVideo')}</MaximunVerticalVideo>
				
				<RowIcons>
					<Col50>
						<IconRecord resizeMode='contain' source={require('../../../assets/img/camera.png')} />
						<TextRecord>{t('record')}</TextRecord>
					</Col50>
					<Col50>
						<IconGalery resizeMode='contain' source={require('../../../assets/img/gallery.png')} />
						<TextGallery>{t('gallery')}</TextGallery>
					</Col50>
				</RowIcons>

				<CopyrightedSuspended>{t('copyrightedSuspended')}</CopyrightedSuspended>
				<Hr />

				<Description>{t('createLessonDescription')}</Description>
				<RowDescription>
					<InputDescription 
						error={errorDescription}
						multiline
						numberOfLines={4}
						maxLength={100}
						placeholder={t('placeholderCreateLessonDescription')}
						placeholderTextColor={colors.lilaLight}
					/>
				</RowDescription>
				{errorDescription && (<ErrorText>{textErrorDesc}</ErrorText>)}

				<RowYouGet>
					<YouGet>{t('youGet')}:</YouGet>
					<TouchableOpacity onPress={() => openModal('YouGet')}>
						<IconYouGet resizeMode='contain' source={require('../../../assets/img/help.png')} />
					</TouchableOpacity>
				</RowYouGet>

				<RowCoins>
					<IconMins resizeMode='contain' source={require('../../../assets/img/check.png')} />
					<TextMins>30 mins</TextMins>
					<TouchableOpacity 
						style={{alignItems: 'center', alignContent: 'center', alignSelf: 'center'}} 
						onPress={() => openModal('YouGet')}
					>
						<TextSelectCoins>{coins30} Coins</TextSelectCoins>
					</TouchableOpacity>
					<TouchableOpacity 
						style={{alignItems: 'center', alignContent: 'center', alignSelf: 'center'}} 
						onPress={() => openModal('YouGet')}
					>
						<IconSelect resizeMode='contain' source={require('../../../assets/img/arrowdown.png')} />
					</TouchableOpacity>
					<TextValueCoins>{totalCoins30} USD</TextValueCoins>
				</RowCoins>

				<RowCoins>
					<IconMins resizeMode='contain' source={require('../../../assets/img/check.png')} />
					<TextMins>60 mins</TextMins>
					<TouchableOpacity 
						style={{alignItems: 'center', alignContent: 'center', alignSelf: 'center'}} 
						onPress={() => openModal('YouGet')}
					>
						<TextSelectCoins>{coins60} Coins</TextSelectCoins>
					</TouchableOpacity>
					<TouchableOpacity 
						style={{alignItems: 'center', alignContent: 'center', alignSelf: 'center'}} 
						onPress={() => openModal('YouGet')}
					>
						<IconSelect resizeMode='contain' source={require('../../../assets/img/arrowdown.png')} />
					</TouchableOpacity>
					<TextValueCoins>{totalCoins60} USD</TextValueCoins>
				</RowCoins>

				<RowCoins>
					<IconMins resizeMode='contain' source={require('../../../assets/img/check.png')} />
					<TextMins>{t('createLessonDiscount')}</TextMins>
				</RowCoins>

				<RowLanguage>
					<TextLanguage>{t('language')}:</TextLanguage>
					<TouchableOpacity 
						style={{alignItems: 'center', alignContent: 'center', alignSelf: 'center'}} 
						onPress={() => openModal('YouGet')}
					>
						<TextSelectLanguage>English</TextSelectLanguage>
					</TouchableOpacity>
					<TouchableOpacity 
						style={{alignItems: 'center', alignContent: 'center', alignSelf: 'center'}} 
						onPress={() => openModal('YouGet')}
					>
						<IconSelect resizeMode='contain' source={require('../../../assets/img/arrowdown.png')} />
					</TouchableOpacity>
				</RowLanguage>

				<ContainerButtom>
					<TextButton>
						{t('createLessonSaveContinue')} {'	  '}
						<IconArrow resizeMode='contain' source={require('../../../assets/img/arrowRight.png')} />
					</TextButton>
					<TouchableHighlight
						style={{
							width: 190,
						    height: 60,
						    borderRadius: 10,
						    marginTop: -40,
						    backgroundColor: colors.transparent,
						    justifyContent: 'center',
						    alignItems: 'center'
						}}
						onPress={openModal}
					>
						<BottomContinue resizeMode='contain' source={require("../../../assets/img/button-bg.png")} />
					</TouchableHighlight>
				</ContainerButtom>

			</ScrollView>

			<ModalBottom
			ref={refModalBottom}
			closeOnDragDown
			dragFromTopOnly
			animationType={'slide'}
			customStyles={customStyles}>
				<ContainerModal>
					<HeaderModal>
						<Menu></Menu>
						<Menu>
							<Title>
								{viewMode == 'help' && t('aboutYourTrailer')}
								{viewMode == 'YouGet' && t('buyMembership')}
							</Title>
						</Menu>
						<Menu>
							<TouchableOpacity onPress={closeModal}>
								<IconClose resizeMode='contain' source={require('../../../assets/img/close-circle-outline.png')} />
							</TouchableOpacity>
						</Menu>
					</HeaderModal>
					<SeparatorModal />
					<ScrollView>
					{viewMode == 'help' && (
						<Fragment>
							<TipsCreateLesson>{t('tipsCreateLesson')}</TipsCreateLesson>
							<Row>
								<IconTips resizeMode='contain' source={require('../../../assets/img/Elipse25.png')} />
								<SubTipsCreateLesson>{t('tip1CreateLesson')}</SubTipsCreateLesson>
							</Row>
							<Row>
								<IconTips resizeMode='contain' source={require('../../../assets/img/Elipse25.png')} />
								<SubTipsCreateLesson>{t('tip1CreateLesson')}</SubTipsCreateLesson>
							</Row>
							<Row>
								<IconTips resizeMode='contain' source={require('../../../assets/img/Elipse25.png')} />
								<SubTipsCreateLesson>{t('tip1CreateLesson')}</SubTipsCreateLesson>
							</Row>
							<ImageShadowPlayer resizeMode='contain' source={require('../../../assets/img/BgShadowVideo.png')} />
						</Fragment>
					)}

					{viewMode == 'YouGet' && (
						<Fragment>
							<BuyYourMembership>{t('buyYourMembership')}</BuyYourMembership>
							<ChooseMonthly>{t('chooseMonthly')}</ChooseMonthly>
							<ImageZero resizeMode='contain' source={require('../../../assets/img/iconZeroComission.png')}/>
							<ZeroCommissions>{t('zeroCommissions')}</ZeroCommissions>

						</Fragment>
					)}
					</ScrollView>
				</ContainerModal>
        	</ModalBottom>
		</Container>
	)
}

const ScrollView = styled.ScrollView`
	width: 100%;
    height: 100%;
`
const RowLanguage = styled.View`
	flex-direction: row;
	justify-content: flex-start;
	margin-top: 25px;
	height: 30px;
	margin-left: 30px;
`
const TextLanguage = styled.Text`
	color: ${colors.lila};
	font-size: 14px;
	margin-top: 7px;
	text-align: left;
	font-family: ${fonts.regular};
`
const TextSelectLanguage = styled.Text`
	color: ${colors.white};
	font-size: 14px;
	line-height: 20px;
	text-align: left;
	margin-left: 20px;
	font-family: ${fonts.regular};
`
const IconArrow = styled.Image`
    width: 20px;
`
const ContainerButtom = styled.View`
	align-self: center;
    justify-content: center;
    margin-top: 60px;
    margin-bottom: 20px;
`
const TextButton = styled.Text`
	color: ${colors.cyan};
	font-size: 18px;
	font-family: ${fonts.SemiBold};
	text-shadow: 0px 0px 8px ${colors.cyan};
	margin-left: 20px;
`
const BottomContinue = styled.Image`
    background-color: ${colors.transparent};
`
const RowCoins = styled.View`
	flex-direction: row;
	margin-top: 15px;
	height: 30px;
`
const TextMins = styled.Text`
	color: ${colors.white};
	font-size: 14px;
	line-height: 20px;
	font-family: ${fonts.regular};
	flex: 1;
	align-items: center;
	align-content: center;
	align-self: center;
`
const IconMins = styled.Image`
	height: 30px;
	margin-right: -40px;
	margin-left: -20px;
	align-items: center;
	align-content: center;
	align-self: center;
`
const TextSelectCoins = styled.Text`
	color: ${colors.cyan};
	text-shadow: 0px 0px 8px ${colors.cyan};
	font-size: 14px;
	line-height: 20px;
	text-align: right;
	font-family: ${fonts.regular};
	flex: 1;
	width: 100px;
	margin-top: 5px;
`
const IconSelect = styled.Image`
	height: 20px;
	align-items: center;
	align-content: center;
	align-self: center;
`
const TextValueCoins = styled.Text`
	color: ${colors.whiteTrasparent};
	font-size: 14px;
	line-height: 20px;
	font-family: ${fonts.regular};
	flex: 1;
	align-items: center;
	align-content: center;
	align-self: center;
`
const MaximunVerticalVideo = styled.Text`
	color: ${colors.lila};
	font-size: 12px;
	text-align: center;
	justify-content: center;
	align-self: center;
	font-family: ${fonts.regular};
	margin-top: 15px;
`
const RowIcons = styled.View`
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: row;
`
const Col50 = styled.View`
	justify-content: center;
	align-items: center;
	width: 50%;
`
const IconRecord = styled.Image`
	height: 60px;
	margin-left: 70px;
	margin-top: 20px;
`
const IconGalery = styled.Image`
	height: 60px;
	margin-right: 70px;
	margin-top: 20px;
`
const TextRecord = styled.Text`
	color: ${colors.lila};
	font-size: 14px;
	font-family: ${fonts.regular};
	margin-top: 10px;
	margin-left: 65px;
`
const TextGallery = styled.Text`
	color: ${colors.lila};
	font-size: 14px;
	font-family: ${fonts.regular};
	margin-top: 10px;
	margin-right: 70px;
`
const CopyrightedSuspended = styled.Text`
	color: ${colors.whiteTrasparent};
	font-size: 10px;
	font-family: ${fonts.regular};
	margin-top: 20px;
	text-align: center;
	justify-content: center;
	align-self: center;
`
const Hr = styled.View`
	width: 100%;
	height: 1px;
	background-color: ${colors.lila};
	opacity: 0.3;
	margin-top: 20px;
	margin-bottom: 20px;
`
const RowDescription = styled.View`
	width: 100%;
	flex-direction: row;
	padding-left: 30px;
	padding-right: 30px;
`
const Description = styled.Text`
	color: ${colors.fucsia};
	font-size: 14px;
	font-family: ${fonts.regular};
	text-align: left;
	padding-left: 30px;
	width: 100%;
`
const InputDescription = styled.TextInput`
	border-color: ${props => props.error ? colors.fucsia : colors.grayLight};
    border-bottom-width: 1px;
    width: 100%;
    height: 70px;
    font-family: ${fonts.regular};
    font-size: 14px;
    color: ${colors.lila};
`
const ErrorText = styled.Text`
	color: ${colors.fucsia};
	font-size: 12px;
	font-family: ${fonts.regular};
	text-align: center;
	justify-content: center;
	align-self: center;
	margin-top: 5px;
`
const RowYouGet = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: flex-end;
`
const YouGet = styled.Text`
	color: ${colors.lila};
	font-size: 12px;
	font-family: ${fonts.regular};
	text-align: right;
	margin-top: 30px;
	margin-right: -20px;
`
const IconYouGet = styled.Image`
	height: 20px;
	margin-top: 27px;
`
const Container = styled.View`
	flex: 1;
	background: ${colors.blueDark};
	align-items: flex-start;
`
const ContainerModal = styled.View`
	flex: 1;
	align-items: flex-start;
`
const Header = styled.View`
	height: 90px;
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	background-color: ${colors.blueDark};
	padding-top: 40px;
	padding-bottom: 10px;
`
const HeaderModal = styled.View`
	height: 30px;
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: row;
`
const Separator = styled.View`
	width: 100%;
	height: 1px;
	background-color: ${colors.lila};
	opacity: 0.4;
	position: absolute;
	margin-top: 90px;
	z-index: 3;
`
const SeparatorModal = styled.View`
	width: 100%;
	height: 1px;
	background-color: ${colors.lila};
	opacity: 0.3;
	position: absolute;
	margin-top: 55px;
	z-index: 3;
`
const Menu = styled.View`
	justify-content: center;
	align-items: center;
	width: 33%;
`
const IconCalendar = styled.Image`
	height: 32px;
	justify-content: center;
	align-items: center;
	left: -25px;
`
const BuyYourMembership = styled.Text`
	color: ${colors.white};
	font-size: 14px;
	text-align: center;
	justify-content: center;
	font-family: ${fonts.medium};
	align-self: center;
	margin-top: 70px;
`
const ChooseMonthly = styled.Text`
	color: ${colors.white};
	font-size: 12px;
	text-align: center;
	justify-content: center;
	font-family: ${fonts.regular};
	align-self: center;
	margin-top: 8px;
`
const ZeroCommissions = styled.Text`
	color: ${colors.white};
	font-size: 18px;
	text-align: center;
	justify-content: center;
	font-family: ${fonts.medium};
	align-self: center;
	margin-top: 10px;
	width: 250px;
	line-height: 21px;
`
const Title = styled.Text`
	color: ${colors.white};
	font-size: 14px;
	text-align: center;
	justify-content: center;
	font-family: ${fonts.medium};
`
const IconAdd = styled.Image`
	height: 32px;
	justify-content: center;
	align-items: center;
	right: -25px;
`
const Icon = styled.Image`
	height: 308px;
	top: 10px;
	align-self: center;
`
const Subtitle = styled.Text`
	color: ${colors.lilaLight};
	font-size: 14px;
	line-height: 20px;
	text-align: center;
	align-self: center;
	font-family: ${fonts.regular};
	margin-top: 20px;
	width: 320px;
`
const TipsCreateLesson = styled.Text`
	color: ${colors.white};
	font-size: 12px;
	line-height: 20px;
	text-align: center;
	align-self: center;
	font-family: ${fonts.regular};
	margin-top: 70px;
	margin-bottom: 30px;
`
const SubTipsCreateLesson = styled.Text`
	color: ${colors.whiteTrasparent};
	font-size: 12px;
	line-height: 20px;
	text-align: left;
	font-family: ${fonts.regular};
	flex: 4;
`
const IconClose = styled.Image`
	height: 26px;
	justify-content: center;
	align-items: center;
	right: -30px;
`
const Row = styled.View`
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	margin-top: 10px;
	margin-bottom: 10px;
	padding-right: 30px;
`
const IconTips = styled.Image`
	height: 20px;
	justify-content: center;
	align-items: center;
	flex: 1;
`
const ImageShadowPlayer = styled.Image`
	height: 237px;
	justify-content: center;
	align-items: center;
	align-self: center;
	margin-top: 20px;
`
const ImageZero = styled.Image`
	height: 100px;
	justify-content: center;
	align-items: center;
	align-self: center;
	margin-top: 30px;
`
