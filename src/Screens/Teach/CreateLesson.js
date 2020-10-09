import React, {useEffect} from 'react'
import { BackHandler } from 'react-native'
import styled from 'styled-components/native'

import useTranslation from '../../i18n';
import useAuth from '../../Services/Auth';

import fonts from '../../Themes/Fonts';
import colors from '../../Themes/Colors';

import { StackActions } from '@react-navigation/native';
import Routes from '../../Navigation/Routes';

const Container = styled.View`
	flex: 1;
	background: ${colors.blueDark};
	align-items: flex-start;
`

export default function CreateLesson({navigation}) {
	const {t, localeProvider} = useTranslation()
  	const {setLoading, showErrorToast, stateApp, checkAccount} = useAuth()

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

	return (
		<Container>
		
		</Container>
	)
}
