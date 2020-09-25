import React, {useState, useEffect, useRef} from 'react';
import {
	Dimensions,
	Image, 
	Text, 
	View,
	ScrollView,
	FlatList,
	Animated,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';
import colors from '../../Themes/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';

import useTranslation from '../../i18n';
import useAuth from '../../Services/Auth';

import styles from './styles';

const json = [
  {
      "_id": "1",
      "url": "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
      "_id": "2",
      "url": "https://d301468hdcm00e.cloudfront.net/459e06d07a0ea39ac87d9a10b7c357e4_video-file.mp4",
  },
  {
      "_id": "3",
      "url": "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  }
]

export default function() {
	const {logout, checkAccount, setLoading} = useAuth()
	const [data, setData] = useState([])
  const [dataRady, setDataReady] = useState(false)
  const { width, height } = Dimensions.get("screen");

  const videoRefs = []

  useEffect(() => {
    setData(json)
    setDataReady(true)
  }, [data]);

  const _onViewableItemsChanged = (props) => {
    const changed = props.changed
    const viewableItems = props.viewableItems   

    changed.map((item) => {
      if (!item.isViewable) {
        videoRefs[item.item._id].setStatusAsync({ shouldPlay: false, isMute: true })
      }
    })

    viewableItems.map((item) => {
      if (item.isViewable) {
        videoRefs[item.item._id].setStatusAsync({ shouldPlay: true, isMute: false })
      }
    })
  }

  const _handleVideoRef = (component, item) => {
    const playbackObject = component
    videoRefs[item._id] = playbackObject
  }

  const renderRow = ({ item, index }) => {
    return (
      <View style={styles.container}>
        <Video 
          ref={(component) => _handleVideoRef(component, item)}
          source={{ uri: item.url }}
          resizeMode="cover"
          rate={1.0}
          volume={1.0}
          isMute={index !== 0}
          shouldPlay={index === 0}
          isLooping={true}
          progressUpdateIntervalMillis={500}
          style={{width: width, height: height}}
        />
        <LinearGradient
          colors={[colors.transparent, colors.transparentLight, colors.transparentLightHard]}
          style={styles.linearGradient}
        />
      </View>
    )
  }

	return (
		<View style={styles.viewView}>

      {dataRady ? (
        <FlatList
          style={styles.container}
          data={data}
          renderItem={renderRow}
          keyExtractor={item => item._id}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 70
          }}
          onViewableItemsChanged={_onViewableItemsChanged}
        />
      ) : (

        <Video
          source={require("../../../assets/bg_video.mp4")}
          rate={1.0}
          volume={1.0}
          isMuted={true}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.backgroundVideo}
        />

      )}
  			
		</View>
	);
}
