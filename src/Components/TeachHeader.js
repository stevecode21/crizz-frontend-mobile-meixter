import React, {Fragment} from 'react'
import styled from 'styled-components/native'
import fonts from '../Themes/Fonts';
import colors from '../Themes/Colors';
import { TouchableOpacity } from 'react-native'
import { StackActions } from '@react-navigation/native';
import Routes from '../Navigation/Routes';
import useTranslation from '../i18n';

const Header = ({navigation}) => {

	const {t} = useTranslation()

	const redirect = (routeName, screenObject) => {
		navigation.dispatch(
			StackActions.replace(routeName, screenObject)
		);
	}

	return (
		<Fragment>
			<Container>
				<Menu>
					<TouchableOpacity onPress={() => {
					}}>
						<IconCalendar resizeMode='contain' source={require('../../assets/img/calendar2.png')} />
					</TouchableOpacity>
				</Menu>
				
				<Menu>
					<Title>{t('teaching')}</Title>
				</Menu>

				<Menu>
					<TouchableOpacity onPress={() => { 
						navigation.navigate(Routes.CREATE_LESSON)
					}}>
						<IconAdd resizeMode='contain' source={require('../../assets/img/add_lesson.png')} />
					</TouchableOpacity>
				</Menu>
			</Container>
			<Separator />
		</Fragment>
	)
}

export default Header

const Container = styled.View`
	height: 60px;
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	background-color: ${colors.blueDark};
`
const Separator = styled.View`
	width: 100%;
	height: 1px;
	background-color: ${colors.lila};
	opacity: 0.4;
	position: absolute;
	margin-top: 60px;
	z-index: 3;
`
const Menu = styled.View`
	justify-content: center;
	align-items: center;
	width: 33%;
`
const IconCalendar = styled.Image`
	height: 42px;
	justify-content: center;
	align-items: center;
	left: -25px;
`
const Title = styled.Text`
	color: #fff;
	font-size: 14px;
	text-align: center;
	justify-content: center;
	font-family: ${fonts.medium};
`
const IconAdd = styled.Image`
	height: 42px;
	justify-content: center;
	align-items: center;
	right: -25px;
`
