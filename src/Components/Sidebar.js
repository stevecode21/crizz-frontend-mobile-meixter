import React from 'react'
import styled from 'styled-components/native'
import fonts from '../Themes/Fonts';
import colors from '../Themes/Colors';
import {BoxShadow} from 'react-native-shadow'
import { TouchableOpacity } from 'react-native'

const Container = styled.View`
	width: 60px;
	height: 100%;
	padding-bottom: 150px;
	justify-content: flex-end;
	background-color: ${colors.lila}
`
const Menu = styled.View`
	margin: 10px 0;
	align-items: center;
`
const Icon = styled.Image`
	height: 32px;
	margin-right: 37px;
`
const Count = styled.Text`
	color: #fff;
	font-size: 12px;
	letter-spacing: -0.1px;
	margin-right: 37px;
	width: 40px;
	text-align: center;
	text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.6);
	font-family: ${fonts.medium};
	margin-top: -2px;
`

const Sidebar = ({ info }) => {

	return (
		<Container>
			<TouchableOpacity onPress={() => {
			}}>
				<Menu>
					<Icon resizeMode='contain' source={require('../../assets/img/save_home.png')} />
					<Count>{info.save}</Count>
				</Menu>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => {
				console.log('press menu')
			}}>
				<Menu>
					<Icon resizeMode='contain' source={require('../../assets/img/comment_home.png')} />
					<Count>{info.comments}</Count>
				</Menu>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => {
				console.log('press menu')
			}}>
				<Menu>
					<Icon resizeMode='contain' source={require('../../assets/img/share_home.png')} />
					<Count>{info.share}</Count>
				</Menu>
			</TouchableOpacity>
		</Container>
	)
}

export default Sidebar



