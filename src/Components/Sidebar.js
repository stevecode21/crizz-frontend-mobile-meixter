import React from 'react'
import styled from 'styled-components/native'
import fonts from '../Themes/Fonts';
import colors from '../Themes/Colors';
import {BoxShadow} from 'react-native-shadow'
import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback} from 'react-native'

const Container = styled.View`
	width: 60px;
	height: 100%;
	padding-bottom: 110px;
	justify-content: flex-end;
`
const Menu = styled.View`
	margin: 15px 0;
	align-items: center;
`
const Icon = styled.Image`
	height: 40px;
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
const SoundBg = styled.View`
	background: ${colors.fucsia};
	width: 50px;
	height: 50px;
	border-radius: 50px;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	margin-right: 37px;
`
const NumCoin = styled.Text`
	color: #fff;
	font-size: 20px;
	letter-spacing: -0.1px;
	text-align: center;
	margin-top: 10px;
	text-shadow: 0px 1px 2px #FFFFFF;
	font-family: ${fonts.SemiBold};
`
const shadowOpt = {
    width:50,
    height:50,
    color: colors.fucsia,
    border:10,
    radius:25,
    opacity:0.7,
    x:0,
    y:0
}

const Coins = styled.Text`
	color: #fff;
	font-size: 12px;
	margin-right: 37px;
	width: 40px;
	text-align: center;
	text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.6);
	font-family: ${fonts.medium};
	margin-top: 10px;
`

const Sidebar = ({ avatar, count }) => {
	return (
		<Container>
			<TouchableOpacity onPress={() => {
				console.log('press menu')
			}}>
				<Menu>
					<Icon resizeMode='contain' source={require('../../assets/img/save_home.png')} />
					<Count>{count.like}</Count>
				</Menu>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => {
				console.log('press menu')
			}}>
				<Menu>
					<Icon resizeMode='contain' source={require('../../assets/img/comment_home.png')} />
					<Count>{count.comment}</Count>
				</Menu>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => {
				console.log('press menu')
			}}>
				<Menu>
					<Icon resizeMode='contain' source={require('../../assets/img/share_home.png')} />
					<Count>{count.share}</Count>
				</Menu>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => {
				console.log('press menu')
			}}>
				<Menu>
					<SoundBg>
						<BoxShadow style={{borderRadius: 50}} setting={shadowOpt}>
	          				<NumCoin>{count.share}</NumCoin>
	          			</BoxShadow>
	        		</SoundBg>
	        		<Coins>COINS</Coins>
				</Menu>
			</TouchableOpacity>
		</Container>
	)
}

export default Sidebar
