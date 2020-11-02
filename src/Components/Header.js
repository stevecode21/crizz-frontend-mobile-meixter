import React from 'react'
import styled from 'styled-components/native'
import fonts from '../Themes/Fonts';
import colors from '../Themes/Colors';

const Container = styled.View`
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	position: absolute;
	z-index: 1;
`
const Menu = styled.View`
	justify-content: center;
	align-items: center;
	width: 20%;
`
const Icon = styled.Image`
	height: 40px;
	justify-content: center;
	align-items: center;
`
const IconSearch = styled.Image`
	height: 24px;
	justify-content: center;
	align-items: center;
`
const TextLeft = styled.Text`
	color: #fff;
	font-size: 10px;
	text-align: center;
	justify-content: center;
	text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.6);
	font-family: ${fonts.medium};
`
const IconAlert = styled.Image`
	height: 60px;
	justify-content: center;
	align-items: center;
`

const Header = () => {
	return (
		<Container>
			<Menu>
				<IconSearch resizeMode='contain' source={require('../../assets/img/search.png')} />
			</Menu>
			<Menu>
				<TextLeft>FOLLOWING</TextLeft>
			</Menu>
			<Menu>
				<Icon resizeMode='contain' source={require('../../assets/img/LogoMeixter.png')} />
			</Menu>
			<Menu>
				<TextLeft>SAVED</TextLeft>
			</Menu>
			<Menu>
				<IconAlert resizeMode='contain' source={require('../../assets/img/alert.png')} />
			</Menu>
		</Container>
	)
}

export default Header
