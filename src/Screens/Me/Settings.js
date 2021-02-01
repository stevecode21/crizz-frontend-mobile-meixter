import React, {useRef, useState} from 'react'
import {TouchableOpacity, TouchableHighlight} from 'react-native'
import styled from 'styled-components/native'
import ModalBottom from 'react-native-raw-bottom-sheet';
import useTranslation from '../../i18n';
import useAuth from '../../Services/Auth';
import fonts from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
import Ripple from 'react-native-material-ripple';
import Constants from 'expo-constants';
import { StackActions } from '@react-navigation/native';
import Routes from '../../Navigation/Routes';


export default function Settings({navigation}) {
	const {t, localeProvider} = useTranslation()
  	const {setLoading, showErrorToast, account, logoutDirect } = useAuth()
  	const refModalBottom = useRef()

  	const customStyles = {
		wrapper: {
		  backgroundColor: colors.transparentLight,
		},
		draggableIcon: {
		  backgroundColor: colors.transparent
		},
		container: {
		  height: 320,
		  borderTopLeftRadius: 35,
		  borderTopRightRadius: 35,
		  backgroundColor: colors.blueDark
		}
	}

	const closeModal = () => {
	    refModalBottom.current.close()
	}

    const openModal = (type) => {
	    refModalBottom.current.open()
	}

	const handlelogout = () => {
		closeModal()
		logoutDirect()
	}

	return (
		<Container>
			<Header>
				<Menu>
					<TouchableOpacity style={{left: -20, width: 60, padding: 10}}  onPress={() => {navigation.navigate(Routes.ME)}}>
						<IconBack resizeMode='contain' source={require('../../../assets/img/arrowLeft.png')} />
					</TouchableOpacity>
				</Menu>
				<MenuCenter>
					<Title>{t('settings')}</Title>
				</MenuCenter>
				<Menu>
				</Menu>				
			</Header>
			<Separator />
			<ScrollView>
			 	<TitleMenu>{t('account')}</TitleMenu>
			 	
			 	<Ripple
		 			// onPress={() => console.log('Pressed')}
		 			rippleColor={colors.whiteTrasparent}
		 			rippleDuration={1000}
		 			rippleSize={1000}
		 		>
			 		<ItemMenu>
				 		<IconFreeCoins resizeMode='contain' source={require('../../../assets/img/freeCoins.png')} />
				 		<NameMenu>{t('freeCoins')}</NameMenu>
				 		<IconAngle resizeMode='contain' source={require('../../../assets/img/angleRight.png')} />
			 		</ItemMenu>
			 	</Ripple>

			 	<Ripple
		 			onPress={() => console.log('Pressed')}
		 			rippleColor={colors.whiteTrasparent}
		 			rippleDuration={1000}
		 			rippleSize={1000}
		 		>
			 		<ItemMenu>
				 		<IconMenu resizeMode='contain' source={require('../../../assets/img/manageAccount.png')} />
				 		<NameMenu>{t('manageAccount')}</NameMenu>
				 		<IconAngle resizeMode='contain' source={require('../../../assets/img/angleRight.png')} />
				 	</ItemMenu>
			 	</Ripple>

				<Ripple
		 			onPress={() => console.log('Pressed')}
		 			rippleColor={colors.whiteTrasparent}
		 			rippleDuration={1000}
		 			rippleSize={1000}
		 		>
			 		<ItemMenu>
				 		<IconMenu resizeMode='contain' source={require('../../../assets/img/preferences.png')} />
				 		<NameMenu>{t('preferences')}</NameMenu>
				 		<IconAngle resizeMode='contain' source={require('../../../assets/img/angleRight.png')} />
				 	</ItemMenu>
			 	</Ripple>

			 	<Ripple
		 			onPress={() => console.log('Pressed')}
		 			rippleColor={colors.whiteTrasparent}
		 			rippleDuration={1000}
		 			rippleSize={1000}
		 		>
			 		<ItemMenu>
				 		<IconMenu resizeMode='contain' source={require('../../../assets/img/wallet.png')} />
				 		<NameMenu>{t('myWallet')}</NameMenu>
				 		<IconAngle resizeMode='contain' source={require('../../../assets/img/angleRight.png')} />
				 	</ItemMenu>
			 	</Ripple>

			 	<Ripple
		 			onPress={() => console.log('Pressed')}
		 			rippleColor={colors.whiteTrasparent}
		 			rippleDuration={1000}
		 			rippleSize={1000}
		 		>
			 		<ItemMenu>
				 		<IconMenu resizeMode='contain' source={require('../../../assets/img/paymentMethods.png')} />
				 		<NameMenu>{t('paymentMethods')}</NameMenu>
				 		<IconAngle resizeMode='contain' source={require('../../../assets/img/angleRight.png')} />
				 	</ItemMenu>
			 	</Ripple>

			 	<Ripple
		 			onPress={() => console.log('Pressed')}
		 			rippleColor={colors.whiteTrasparent}
		 			rippleDuration={1000}
		 			rippleSize={1000}
		 		>
			 		<ItemMenu>
				 		<IconMenu resizeMode='contain' source={require('../../../assets/img/eraning.png')} />
				 		<NameMenu>{t('myEarnings')}</NameMenu>
				 		<IconAngle resizeMode='contain' source={require('../../../assets/img/angleRight.png')} />
				 	</ItemMenu>
			 	</Ripple>

			 	<Ripple
		 			onPress={() => console.log('Pressed')}
		 			rippleColor={colors.whiteTrasparent}
		 			rippleDuration={1000}
		 			rippleSize={1000}
		 		>
			 		<ItemMenu>
				 		<IconMenu resizeMode='contain' source={require('../../../assets/img/myTrees.png')} />
				 		<NameMenu>{t('myTrees')}</NameMenu>
				 		<IconAngle resizeMode='contain' source={require('../../../assets/img/angleRight.png')} />
				 	</ItemMenu>
			 	</Ripple>

			 	<Ripple
		 			onPress={() => console.log('Pressed')}
		 			rippleColor={colors.whiteTrasparent}
		 			rippleDuration={1000}
		 			rippleSize={1000}
		 		>
			 		<ItemMenu>
				 		<IconMenu resizeMode='contain' source={require('../../../assets/img/offlineVideos.png')} />
				 		<NameMenu>{t('offlineVideos')}</NameMenu>
				 		<IconAngle resizeMode='contain' source={require('../../../assets/img/angleRight.png')} />
				 	</ItemMenu>
			 	</Ripple>

			 	<SeparatorMenu />
			 	<TitleMenu>{t('help')}</TitleMenu>

			 	<Ripple
		 			onPress={() => console.log('Pressed')}
		 			rippleColor={colors.whiteTrasparent}
		 			rippleDuration={1000}
		 			rippleSize={1000}
		 		>
			 		<ItemMenu>
				 		<IconMenu resizeMode='contain' source={require('../../../assets/img/reportProblem.png')} />
				 		<NameMenu>{t('reportProblem')}</NameMenu>
				 		<IconAngle resizeMode='contain' source={require('../../../assets/img/angleRight.png')} />
				 	</ItemMenu>
			 	</Ripple>

			 	<Ripple
		 			// onPress={() => console.log('Pressed')}
		 			rippleColor={colors.whiteTrasparent}
		 			rippleDuration={1000}
		 			rippleSize={1000}
		 		>
			 		<ItemMenu>
				 		<IconMenu resizeMode='contain' source={require('../../../assets/img/helpDesk.png')} />
				 		<NameMenu>{t('helpDesk')}</NameMenu>
				 		<IconAngle resizeMode='contain' source={require('../../../assets/img/angleRight.png')} />
				 	</ItemMenu>
			 	</Ripple>

			 	<SeparatorMenu />
			 	<TitleMenu>{t('about')}</TitleMenu>

			 	<Ripple
		 			// onPress={() => console.log('Pressed')}
		 			rippleColor={colors.whiteTrasparent}
		 			rippleDuration={1000}
		 			rippleSize={1000}
		 		>
			 		<ItemMenu>
				 		<IconPolice resizeMode='contain' source={require('../../../assets/img/policies.png')} />
				 		<NameMenu>{t('privacyPolicies')}</NameMenu>
				 		<IconAngle resizeMode='contain' source={require('../../../assets/img/angleRight.png')} />
				 	</ItemMenu>
			 	</Ripple>

			 	<Ripple
		 			onPress={openModal}
		 			rippleColor={colors.whiteTrasparent}
		 			rippleDuration={1000}
		 			rippleSize={1000}
		 		>
			 		<ItemMenu>
				 		<IconMenu resizeMode='contain' source={require('../../../assets/img/logout.png')} />
				 		<Logout>{t('logOut')}</Logout>
				 		<IconAngle resizeMode='contain' source={require('../../../assets/img/angleRight.png')} />
				 	</ItemMenu>
			 	</Ripple>

			 	<Version>{t('version')} {Constants.manifest.version}</Version>

			</ScrollView>
			<ModalBottom
				ref={refModalBottom}
				closeOnDragDown
				dragFromTopOnly
				animationType={'slide'}
				customStyles={customStyles}
			>
				<ContainerModal>
					<HeaderModal>
						<Menu></Menu>
						<Menu>
							<Title>
								{t('logOut')}
							</Title>
						</Menu>
						<Menu>
							<TouchableOpacity onPress={closeModal}>
								<IconClose resizeMode='contain' source={require('../../../assets/img/close-circle-outline.png')} />
							</TouchableOpacity>
						</Menu>
					</HeaderModal>
					<SeparatorModal />
					<TitleModal>{t('toLogOut')}</TitleModal>
					<ContainerButtom>
						<TextButton>
							{t('yesLogOut')}
						</TextButton>

						<Ripple
							rippleColor={colors.fucsia}
							style={{
								width: 190,
							    height: 60,
							    borderRadius: 10,
							    marginTop: -40,
							    backgroundColor: colors.transparent,
							    justifyContent: 'center',
							    alignItems: 'center'
							}}
							onPress={handlelogout}
						>
							<BottomLogout resizeMode='stretch' source={require("../../../assets/img/buttonRed-bg.png")} />
						</Ripple>
					</ContainerButtom>

					<ButtomTextModal>{t('notReceiveNotifications')}</ButtomTextModal>
				</ContainerModal>
        	</ModalBottom>
		</Container>
	)
}

const Container = styled.View`
	flex: 1;
	background: ${colors.blueDark};
	align-items: flex-start;
`
const ScrollView = styled.ScrollView`
	width: 100%;
    height: 100%;
`
const Header = styled.View`
	height: 60px;
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	background-color: ${colors.blueDark};
	padding-top: 0px;
	padding-bottom: 10px;
`
const Menu = styled.View`
	justify-content: center;
	align-items: center;
	width: 25%;
`
const MenuCenter = styled.View`
	justify-content: center;
	align-items: center;
	width: 50%;
`
const Title = styled.Text`
	color: ${colors.white};
	font-size: 14px;
	text-align: center;
	justify-content: center;
	font-family: ${fonts.medium};
`
const IconBack = styled.Image`
	width: 34px;
	justify-content: center;
	align-items: center;
	align-self: center;
`
const Separator = styled.View`
	width: 100%;
	height: 1px;
	background-color: ${colors.lila};
	opacity: 0.4;
	position: absolute;
	margin-top: 50px;
	z-index: 3;
`
const SeparatorMenu = styled.View`
	width: 90%;
	height: 1px;
	background-color: ${colors.lila};
	opacity: 0.4;
	margin-top: 10px;
	align.content: center;
	align-self:center;
	margin-bottom: 15px;
`
const TitleMenu = styled.Text`
	color: ${colors.lila};
	font-size: 12px;
	text-align: left;
	margin-left: 24px;
	font-family: ${fonts.regular};
	margin-bottom: 5px;
`
const ItemMenu = styled.View`
	flex-direction: row;
	margin-top: 5px;
	margin-bottom: 5px;
	height: 32px;
`
const IconFreeCoins = styled.Image`
	width: 32px;
	align-self: center;
	align-items: center;
	margin-left: 16px;
	margin-right: 16px;
`
const IconMenu = styled.Image`
	width: 24px;
	align-self: center;
	align-items: center;
	margin-left: 20px;
	margin-right: 20px;
`
const IconPolice = styled.Image`
	height: 24px;
	align-self: center;
	align-items: center;
`
const NameMenu = styled.Text`
	color: ${colors.white};
	font-size: 14px;
	text-align: left;
	font-family: ${fonts.regular};
	align-items: center;
	align-self: center;
	flex: 4;
`
const Logout = styled.Text`
	color: ${colors.fucsia};
	font-size: 14px;
	text-align: left;
	font-family: ${fonts.regular};
	align-items: center;
	align-self: center;
	flex: 4;
`
const IconAngle = styled.Image`
	height: 30px;
	flex: 1;
	align-self: center;
	align-items: center;
`
const Version = styled.Text`
	color: ${colors.lila};
	font-size: 14px;
	text-align: center;
	font-family: ${fonts.regular};
	align-items: center;
	align-self: center;
	margin-bottom: 20px;
	margin-top: 10px;
`
const ContainerModal = styled.View`
	flex: 1;
	align-items: flex-start;
`
const HeaderModal = styled.View`
	height: 30px;
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	margin-bottom: 50px;
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
const IconClose = styled.Image`
	height: 26px;
	justify-content: center;
	align-items: center;
	right: -30px;
`
const TitleModal = styled.Text`
	color: ${colors.white};
	font-size: 14px;
	text-align: center;
	justify-content: center;
	align-items: center;
	align-self: center;
	font-family: ${fonts.regular};
`
const ContainerButtom = styled.View`
	align-self: center;
    justify-content: center;
    margin-top: 60px;
    margin-bottom: 20px;
`
const TextButton = styled.Text`
	color: ${colors.fucsia};
	font-size: 18px;
	font-family: ${fonts.SemiBold};
	text-shadow: 0px 0px 8px ${colors.fucsia};
	text.align: center;
`
const BottomLogout = styled.Image`
    background-color: ${colors.transparent};
    width: 220px;
    height: 80px;
`
const ButtomTextModal = styled.Text`
	color: ${colors.lila};
	font-size: 12px;
	text-align: center;
	align-content: center;
	align-self: center;
	margin-top: 20px;
	font-family: ${fonts.regular};
`