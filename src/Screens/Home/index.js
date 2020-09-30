import React from 'react'

import styled from 'styled-components/native'

import Header from '../../Components/Header'
import Hero from '../../Components/Hero'

const Container = styled.View`
	flex: 1;
	background: transparent;
`

import videos from '../../Services/videos'

export default function() {
	return (
		<Container>
			<Header />
			<Hero videos={videos} />
		</Container>
	)
}
