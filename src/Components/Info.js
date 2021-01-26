import React, {useState, useEffect} from 'react'
import { TouchableOpacity, Dimensions} from 'react-native'
import fonts from '../Themes/Fonts';
import colors from '../Themes/Colors';
import styled from 'styled-components/native'
import useAuth from '../Services/Auth';
import {BoxShadow} from 'react-native-shadow'
const { width, height } = Dimensions.get('screen')

const Info = ({ info }) => {

	const [selected30, setSelected30] = useState(true)

	useEffect(() => {
		setSelected30(info.thirtymin ? true : false)
	}, []);

	return (
		<Container>
			<ContainerLeft>
				<User>
					<BorderAvatar>
						<Avatar resizeMode='stretch' source={{uri : info.tacherUrlProfile}}/>
					</BorderAvatar>
					<UserName>@{info.tacherNickname}</UserName>
				</User>
				<Description>{info.description}</Description>
				<Time>
					<IconTimer resizeMode='stretch' source={require('../../assets/img/IconTimer.png')}/>
					{info.thirtymin && (
						<TouchableOpacity onPress={() => setSelected30(true) }>
							<TimeText active={selected30}>30 min</TimeText>
						</TouchableOpacity>
					)}
					{info.sixtymin && (
						<TouchableOpacity onPress={() => setSelected30(false) }>
							<TimeText active={!selected30}>60 min</TimeText>
						</TouchableOpacity>
					)}
				</Time>
				<ContainTags>
					<BackTags>
		              <Tags> {info.tags[0].name} </Tags>
		            </BackTags>
				</ContainTags>
			</ContainerLeft>
			<ContainerRight>
				<TouchableOpacity onPress={() => {
					
				}}>
					<Menu>
						<Icon resizeMode='contain' source={require('../../assets/img/save_home.png')} />
						<Count>{info.save}</Count>
					</Menu>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => {
				}}>
					<Menu>
						<Icon resizeMode='contain' source={require('../../assets/img/comment_home.png')} />
						<Count>{info.comments}</Count>
					</Menu>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => {
				}}>
					<Menu>
						<Icon resizeMode='contain' source={require('../../assets/img/share_home.png')} />
						<Count>{info.share}</Count>
					</Menu>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {
					}}>
					<Menu>
						<SoundBg>
							<BoxShadow style={{borderRadius: 50}} setting={shadowOpt}>
		          				<NumCoin>{selected30 ? info.thirtymincoins : info.sixtymincoins}</NumCoin>
		          			</BoxShadow>
		        		</SoundBg>
		        		<Coins>COINS</Coins>
					</Menu>
				</TouchableOpacity>
			</ContainerRight>
		</Container>
	)
}

export default Info

const Container = styled.View`
	flex: 1;
	flex-direction: row;
`
const ContainerLeft = styled.View`
	flex:3;
	justify-content: flex-end;
	margin: 0 0 90px 15px;
`
const ContainerRight = styled.View`
	flex:1;
	justify-content: flex-end;
	margin: 0 0 125px 15px;
`
const User = styled.View`
	flex-direction: row;
	align-items: center;
`
const UserName = styled.Text`
	font-size: 16px;
	color: ${colors.white};
	text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
	font-family: ${fonts.SemiBold};
	margin-left: 50px;
`
const Checked = styled.Image`
	width: 16px;
	height: 16px;
	margin: 0 5px;
`
const Description = styled.Text`
	font-size: 12px;
	color: ${colors.white};
	margin-top: 20px;
	width: 95%;
	font-family: ${fonts.regular};
	line-height: 20px;
	text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
`
const Avatar = styled.Image`
	width: 32px;
    height: 32px;
    border-radius: 1000px;
    position: absolute;
    z-index:2;
    justify-content: center;
    align-items: center;
`
const BorderAvatar = styled.View`
	flex:1;
	width: 40px;
    height: 40px;
    border-radius: 100px;
    background-color: ${colors.violet};
    position: absolute;
    z-index:1;
    justify-content: center;
    align-items: center;
`
const Time = styled.View`
	flex-direction: row;
	align-items: center;
	margin-top: 10px;
`
const TimeText = styled.Text`
	font-size: 14px;
	color: ${props => props.active ? colors.cyan : colors.whiteTrasparent};
	font-family: ${fonts.regular};
	margin-left: 15px;
	${props => props.active && `text-shadow: 0px 0px 8px ${colors.cyan}`};
	${props => props.active && `border-color: ${colors.cyan}`};
	${props => props.active && `border-bottom-width: 3px`};
`
const IconTimer = styled.Image`
	height: 23px;
	width: 20px;
    justify-content: center;
    align-items: center;
`
const ContainTags = styled.View`
	flex-direction: row;
	align-items: center;
	margin-top: 15px;
`
const Tags = styled.Text`
	font-size: 12px;
	color: ${colors.white};
	font-family: ${fonts.regular};
`
const BackTags = styled.Text`
	background-color: ${colors.transparentBlack};
	padding: 3px 6px;
	align-items: center;
	justify-content: center;
	align-self: center;
	border-radius: 100px;
	margin-right: 5px;
`

const SoundBg = styled.View`
	background: ${colors.fucsia};
	width: ${height < 800 ? `50px` : `60px`}; 
	height: ${height < 800 ? `50px` : `60px`}; 
	border-radius: 50px;
	margin-top: ${height < 800 ? `10px` : `20px`}; 
`
const NumCoin = styled.Text`
	color: #fff;
	font-size: 20px;
	letter-spacing: -0.2px;
	text-align: center;
	margin-top: ${height < 800 ? `10px` : `15px`}; 
	text-shadow: 0px 1px 2px #FFFFFF;
	font-family: ${fonts.SemiBold};
`
const shadowOpt = {
    width: height < 800 ? 50 : 60,
    height: height < 800 ? 50 : 60,
    color: colors.fucsia,
    border:7,
    radius:25	,
    opacity:0.7,
    x:0,
    y:0
}
const Menu = styled.View`
	margin: 10px 0;
	align-items: center;
`
const Coins = styled.Text`
	color: #fff;
	font-size: 12px;
	width: 60px;
	text-align: center;
	text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.6);
	font-family: ${fonts.medium};
	margin-top: 10px;
`
const Icon = styled.Image`
	height: ${height < 800 ? `34px` : `42px`};
`
const Count = styled.Text`
	color: #fff;
	font-size: 12px;
	letter-spacing: -0.1px;
	width: 40px;
	text-align: center;
	text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.6);
	font-family: ${fonts.medium};
`