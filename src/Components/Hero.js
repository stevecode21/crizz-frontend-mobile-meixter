import React, { useState, useEffect } from 'react'
import { Dimensions, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, View} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import ViewPager from '@react-native-community/viewpager'

import VideoPlayer from '../Components/VideoPlayer'
import Info from '../Components/Info'
import Sidebar from '../Components/Sidebar'
import useAuth from '../Services/Auth';

const { width, height } = Dimensions.get('window')

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
    margin-top: ${parseInt(height/4)}px;
`
const Icon = styled.Image`
	height: ${parseInt(width/3)}px;
	width: ${parseInt(width/3)}px;
`

const Hero = ({ videos }) => {
	const [selected, setSelected] = useState(0)
	const {inHome, setInHome} = useAuth()
	const [videoRef, setVideoRef] = useState(null)
	const [pause, setPause] = useState(true)

	return (
		<Container
			orientation='vertical'
			onPageSelected={e => {
				setSelected(e.nativeEvent.position)
				setPause(false)
			}}
			initialPage={0}>
			{videos.map((item, index) => {
				return (
					<TouchableWithoutFeedback key={index} onPress={() => {
						videoRef.setStatusAsync({ shouldPlay: pause, isMute: !pause })
						setPause(!pause)
					}}>
						<View>
							<VideoPlayer
								lesson={item}
								isPlay={selected === index}
								setVideoRef={setVideoRef}
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
								<Info info={item}/>
							</Gradient>
						</View>
					</TouchableWithoutFeedback>
				)
			})}
		</Container>
	)
}

export default Hero
