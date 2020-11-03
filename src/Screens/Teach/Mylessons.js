import React, {useEffect} from 'react'
import { BackHandler } from 'react-native'
import styled from 'styled-components/native'

import useTranslation from '../../i18n';
import useAuth from '../../Services/Auth';

import fonts from '../../Themes/Fonts';
import colors from '../../Themes/Colors';



export default function Mylessons() {
	const {t, localeProvider} = useTranslation()
  	const {setLoading, showErrorToast, stateApp, checkAccount} = useAuth()

	return (
		<Container>
			
		</Container>
	)
}

const Container = styled.View`
	flex: 1;
	background: ${colors.blueDark};
	align-items: flex-start;
`
const Icon = styled.Image`
	height: 50%;
	margin-top: 5%;
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