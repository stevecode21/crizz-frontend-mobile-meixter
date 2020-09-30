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
	ActivityIndicator,
  Platform,
  ImageBackground,
  BackHandler
} from 'react-native';
import colors from '../../Themes/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';
import Constants from 'expo-constants';

import {AdMobRewarded,setTestDeviceIDAsync} from 'expo-ads-admob';

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
  const { width, height } = Dimensions.get("screen")

  //const testID = 'ca-app-pub-3940256099942544/5224354917'
  //const productionID = 'ca-app-pub-7815010412581785/8886014460'
  //const adUnitID = Constants.isDevice && !__DEV__ ? productionID : testID

  const adUnitID = Platform.select({
    ios: 'ca-app-pub-3940256099942544/1712485313',
    android: 'ca-app-pub-3940256099942544/5224354917',
  });
  const videoRefs = []

  useEffect(() => {(async () => {
    //await AdMobRewarded.setAdUnitID(adUnitID)
    //await AdMobRewarded.requestAdAsync()
    //await AdMobRewarded.showAdAsync()
    })();
  }, []);

  useEffect(() => {
    const backAction = () => {
      logout()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    //setData(json)
    setDataReady(true)
  }, [setDataReady]);

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
          showsVerticalScrollIndicator={false}
          pagingEnabled={true}
        />
      ) : (
        <ImageBackground
          style={styles.backgroundVideo}
          source={require('../../../assets/bg.png')}
        >
        </ImageBackground>
      )}
  			
		</View>
	);
}
