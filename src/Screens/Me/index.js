import React from 'react'
import {TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import useTranslation from '../../i18n'
import useAuth from '../../Services/Auth'
import fonts from '../../Themes/Fonts'
import colors from '../../Themes/Colors'
import { StackActions } from '@react-navigation/native'
import Routes from '../../Navigation/Routes'


export default function Me({navigation}) {
	const {t, localeProvider} = useTranslation()
  	const {setLoading, showErrorToast, account } = useAuth()

	return (
		<Container>
			<Header>
				<Menu>
				</Menu>
				
				<MenuCenter>
					<Title>{account.fullName}</Title>
				</MenuCenter>

				<Menu>
					<TouchableOpacity style={{width: 50}} onPress={() => {navigation.navigate(Routes.OPTIONS)}}>
						<IconOptions resizeMode='contain' source={require('../../../assets/img/options.png')} />
					</TouchableOpacity>
				</Menu>
			</Header>
			<Separator />

			<ScrollView>

			</ScrollView>
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
	height: 90px;
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	background-color: ${colors.blueDark};
	padding-top: 40px;
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
const IconOptions = styled.Image`
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
	margin-top: 90px;
	z-index: 3;
`