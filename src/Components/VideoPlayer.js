import React from 'react'
import { Video } from 'expo-av'
import styled from 'styled-components/native'
import useAuth from '../Services/Auth';

const Play = styled(Video)`
	height: 100%;
	width: 100%;
`
const Poster = styled.ImageBackground`
	height: 100%;
	width: 100%;
`

const VideoPlayer = ({lesson, isPlay, setVideoRef}) => {
	const {inHome, setInHome, setLoading} = useAuth()
	

	const handleVideoRef = component => {
	  	const playbackObject = component
	  	if (playbackObject != null)
	  	{
	  		setVideoRef(playbackObject)
	  		playbackObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate)
	  	}
	}

	const _onPlaybackStatusUpdate = playbackStatus => {
	  	if (!playbackStatus.isLoaded) {
	  		setLoading(true)
		    if (playbackStatus.error) {
		      setLoading(false)
		    }
		} else {
		    // Update your UI for the loaded state

		    if (playbackStatus.isPlaying) {
		      // Update your UI for the playing state
		      setInHome(true)
		      setLoading(false)
		    } else {
		      // Update your UI for the paused state
		    }

		    if (playbackStatus.isBuffering) {
		    	//setLoading(true)
		      // Update your UI for the buffering state
		    }

		    if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
		      // The player has just finished playing and will stop. Maybe you want to play something else?
		    }
		}
	}
	
	return isPlay ? (
		<Play
			rate={1.0}
			volume={lesson.volumeVideo}
			isMuted={false}
			shouldPlay={inHome}
			useNativeControls={false}
			usePoster
			isLooping={true}
			posterSource={{uri: lesson.cover}}
			source={{uri: lesson.video}}
			resizeMode='cover'
			ref={handleVideoRef}
			posterStyle={{opacity: 0.95, height: '100%', width: '100%', resizeMode: 'stretch'}}
		/>
	) : (
		<Poster source={{uri: lesson.cover}} />
	)
}

export default VideoPlayer
