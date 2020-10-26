import React, { useState } from 'react'
import { Dimensions, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, View} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import ViewPager from '@react-native-community/viewpager'

import VideoPlayer from '../Components/VideoPlayer'
import Info from '../Components/Info'
import Sidebar from '../Components/Sidebar'
import useAuth from '../Services/Auth';

const { width, height } = Dimensions.get('screen')

const Container = styled(ViewPager)`
	height: 100%;
`
const Gradient = styled(LinearGradient)`
	height: 100%;
	justify-content: space-between;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1;
`
const Center = styled.View`
	flex: 1;
	flex-direction: row;
`
const Boton = styled.View`
	flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 55%;
`
const Icon = styled.Image`
	height: 130px;
	width: 130px;
`

const Hero = ({ videos, pause, setPause }) => {
	const [selected, setSelected] = useState(0)
	const {inHome, setInHome} = useAuth()
	const [videoRef, setVideoRef] = useState(null)

	return (
		<Container
			orientation='vertical'
			onPageSelected={e => {
				setPause(false)
				setSelected(e.nativeEvent.position)
			}}
			initialPage={0}>
			{videos.map((item, index) => {
				return (
					<TouchableWithoutFeedback onPress={() => {
						setPause(!pause)
						videoRef.setStatusAsync({ shouldPlay: pause, isMute: !pause })
					}}>
						<View key={index}>
							<VideoPlayer
								url={item.url}
								poster={item.poster}
								isPlay={selected === index}
								videoRef={setVideoRef}
							/>
							<Gradient
								locations={[0, 0.2, 0.6, 1]}
								colors={[
									'rgba(26,26,26,0.3)',
									'rgba(26,26,26,0)',
									'rgba(26,26,26,0)',
									'rgba(26,26,26,0.9)'
								]}>
								<Boton>
									{ pause && (
										<Icon resizeMode='stretch' source={require('../../assets/img/PlayButton.png')} />
									)}
								</Boton>
								<Center>
									<Info user={item.user} />
									<Sidebar avatar={item.user.avatar} count={item.count} />
								</Center>
							</Gradient>
						</View>
					</TouchableWithoutFeedback>
				)
			})}
		</Container>
	)
}

export default Hero
