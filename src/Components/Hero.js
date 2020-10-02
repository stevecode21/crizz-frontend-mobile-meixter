import React, { useState } from 'react'
import { Dimensions, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import ViewPager from '@react-native-community/viewpager'

import VideoPlayer from '../Components/VideoPlayer'
import Info from '../Components/Info'
import Sidebar from '../Components/Sidebar'

const { height } = Dimensions.get('window')

const Container = styled(ViewPager)`
	height: ${height}px;
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

const Hero = ({ videos }) => {
	const [selected, setSelected] = useState(0)
	return (
		<Container
			orientation='vertical'
			onPageSelected={e => setSelected(e.nativeEvent.position)}
			initialPage={0}>
			{videos.map((item, index) => {
				return (
					<View key={index}>
						<VideoPlayer
							url={item.url}
							poster={item.poster}
							isPlay={selected === index}
						/>
						<Gradient
							locations={[0, 0.2, 0.6, 1]}
							colors={[
								'rgba(26,26,26,0.3)',
								'rgba(26,26,26,0)',
								'rgba(26,26,26,0)',
								'rgba(26,26,26,0.9)'
							]}>
							<Center>
								<Info user={item.user} />
								<Sidebar avatar={item.user.avatar} count={item.count} />
							</Center>
						</Gradient>
					</View>
				)
			})}
		</Container>
	)
}

export default Hero
