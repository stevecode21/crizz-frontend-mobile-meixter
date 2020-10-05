import React, {useEffect, useState} from 'react'
import { BackHandler } from 'react-native'
import styled from 'styled-components/native'
import videos from '../../Services/videos'
import useTranslation from '../../i18n';
import useAuth from '../../Services/Auth';

import Header from '../../Components/Header'
import Hero from '../../Components/Hero'

const Container = styled.View`
	flex: 1;
	background: transparent;
`

export default function() {
	const {logout, setInHome} = useAuth()
	const [pause, setPause] = useState(false)

	useEffect(() => {
		setInHome(true)
		setPause(false)
	    const backAction = () => {
	      logout()
	      return true;
	    };

	    const backHandler = BackHandler.addEventListener(
	      "hardwareBackPress",
	      backAction
	    );

	    return () => backHandler.remove();
	}, []);

	return (
		<Container>
			<Header />
			<Hero videos={videos} pause={pause} setPause={setPause} />
		</Container>
	)
}
