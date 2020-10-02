import React from 'react'
import { Video } from 'expo-av'
import styled from 'styled-components/native'
import useAuth from '../Services/Auth';

const Play = styled(Video)`
	height: 100%;
`
const Poster = styled.ImageBackground`
	height: 100%;
`

const handleVideoRef = component => {
  	const playbackObject = component
  	//if (playbackObject != null)
  		//playbackObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate)
}

const _onPlaybackStatusUpdate = playbackStatus => {
  	if (!playbackStatus.isLoaded) {
  		console.log('isLoaded', playbackStatus.isLoaded)
	    // Update your UI for the unloaded state
	    if (playbackStatus.error) {
	      console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
	      // Send Expo team the error on Slack or the forums so we can help you debug!
	    }
	} else {
	    // Update your UI for the loaded state

	    if (playbackStatus.isPlaying) {
	      // Update your UI for the playing state
	      console.log('isPlaying', playbackStatus.isPlaying)
	    } else {
	      // Update your UI for the paused state
	    }

	    if (playbackStatus.isBuffering) {
	      // Update your UI for the buffering state
	      console.log('isBuffering', playbackStatus.isBuffering)
	    }

	    if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
	      // The player has just finished playing and will stop. Maybe you want to play something else?
	      console.log('didJustFinish', playbackStatus.didJustFinish)
	    }
	}
}

const VideoPlayer = ({url, poster, isPlay}) => {
	const {inHome} = useAuth()
	
	return isPlay ? (
		<Play
			rate={1.0}
			volume={1.0}
			isMuted={false}
			shouldPlay={inHome}
			useNativeControls={false}
			usePoster
			posterSource={poster}
			source={{uri: url}}
			resizeMode='cover'
			ref={handleVideoRef}
			posterStyle={{opacity: 0.85, height: '100%', width: '100%'}}
		/>
	) : (
		<Poster source={poster} />
	)
}

export default VideoPlayer