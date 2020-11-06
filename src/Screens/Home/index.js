import React, {useEffect, useState} from 'react'
import { BackHandler } from 'react-native'
import styled from 'styled-components/native'
import useTranslation from '../../i18n';
import useAuth from '../../Services/Auth';
import { APP_STATE, URI } from "../../Constants";
import Header from '../../Components/Header'
import Hero from '../../Components/Hero'
import colors from '../../Themes/Colors'

const Container = styled.View`
	flex: 1;
	background: ${colors.blueDark};
	opacity: 0.95;
`

export default function() {
	const {setInHome, videos, getListLesson} = useAuth()

	return (
		<Container>
			<Header />
			<Hero videos={videos} />
		</Container>
	)
}
