import React, {useEffect} from 'react'
import { BackHandler } from 'react-native'
import styled from 'styled-components/native'

import useTranslation from '../../i18n';
import useAuth from '../../Services/Auth';

import fonts from '../../Themes/Fonts';
import colors from '../../Themes/Colors';

const Container = styled.View`
	flex: 1;
	background: ${colors.blueDark};
	align-items: flex-start;
`
const Icon = styled.Image`
	height: 308px;
	top: 20px;
	align-self: center;
`
const Title = styled.Text`
	color: ${colors.white};
	font-size: 18px;
	text-align: center;
	align-self: center;
	font-family: ${fonts.medium};
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

export default function Mylessons() {
	const {t, localeProvider} = useTranslation()
  	const {setLoading, showErrorToast, stateApp, checkAccount} = useAuth()

	return (
		<Container>
			<Icon resizeMode='contain' source={require('../../../assets/img/uncoming.png')} />
			<Title>{t('teachUncomingTitle')}</Title>
			<Subtitle>{t('teachUncomingText')}</Subtitle>
		</Container>
	)
}
