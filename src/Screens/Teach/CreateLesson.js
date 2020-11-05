import React, {useEffect, useRef, useState, Fragment} from 'react'
import { BackHandler, TouchableOpacity, Dimensions, TouchableHighlight} from 'react-native'
import styled from 'styled-components/native'
import useTranslation from '../../i18n'
import useAuth from '../../Services/Auth'
import ModalBottom from 'react-native-raw-bottom-sheet'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import * as FileSystem from 'expo-file-system'
import { Audio } from 'expo-av'
import { Switch } from 'react-native-switch'
import fonts from '../../Themes/Fonts'
import colors from '../../Themes/Colors'
import Ripple from 'react-native-material-ripple'
import { StackActions } from '@react-navigation/native'
import Routes from '../../Navigation/Routes'
import * as Linking from 'expo-linking'
//api services
import * as apiconfig from "../../Services/config"
import { URI, APP_STATE } from "../../Constants"



//const { width, height } = Dimensions.get('screen')

export default function CreateLesson({navigation}) {
	const {t, localeProvider} = useTranslation()
  	const {setLoading, showErrorToast, stateApp, checkAccount, account, setStateApp} = useAuth()
  	const refModalBottom = useRef()

  	const [viewMode, setViewMode] = useState('help')
  	const [mtm, setMtm] = useState('90%')
  	  	
  	const [params, setParams] = useState({
  		video: '',
  		cover: '',
  		track: null
  	})

  	//controller playlist
  	const [listTrack, setListTrack] = useState([])
  	const [isPlaying, setIsPlaying] = useState(false)
  	const [currentPlaying, setCurrentPlaying] = useState()
  	const [currentIndex, setCurrentIndex] = useState(null)
  	const [volume, setVolume] = useState(50)
  	const [track, setTrack] = useState(false)

  	const nextStep = () => {
		if(validate())
			navigation.navigate(Routes.CREATE_LESSON_TWO, 
				{
		            cover: params.cover,
		            video: params.video,
		            track: params.track,
		            volume: volume
		        }
			)
		
	}

  	const customStyles = {
		wrapper: {
		  backgroundColor: colors.transparentLight,
		},
		draggableIcon: {
		  backgroundColor: colors.transparent
		},
		container: {
		  height: mtm,
		  borderTopLeftRadius: 35,
		  borderTopRightRadius: 35,
		  backgroundColor: colors.violetDark,
		  opacity: 0.95
		}
	}

  	useEffect(() => {
	    const backHandler = BackHandler.addEventListener(
	      "hardwareBackPress",
	      backAction
	    );

	    return () => backHandler.remove();
	}, []);

	useEffect(() => {(async () => {
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.CAMERA,
			Permissions.AUDIO_RECORDING,
			Permissions.CAMERA_ROLL
		)

		let finalStatus = existingStatus

		if (existingStatus !== 'granted') 
		{
			const { status } = await Permissions.askAsync(
				Permissions.CAMERA,
				Permissions.AUDIO_RECORDING,
				Permissions.CAMERA_ROLL
			)
			finalStatus = status
		}

		if (finalStatus !== 'granted') 
		{
			showErrorToast(t('permissions'))
		}

		setLoading(true)
		await getConfigData()
		setLoading(false)

	})()}, [])

	const getConfigData = async () => {
		try 
		{
			let response = await apiconfig.tracks()
			//console.log(response)
			setListTrack(
				response.result.map(item => ({
					_id:item._id, track: URI+item.track, name:item.name, play:false
				}))
			)		
		} 
		catch (error) 
		{
			setLoading(false)
			console.log(error)
	        if (error.status == 401) 
	        {
	          showErrorToast(localeProvider.name == 'en' ? error.message_en : error.message_es)
	        }
	        else if (error.status == 403) 
	        {
	          showErrorToast(localeProvider.name == 'en' ? error.message_en : error.message_es)
	          setStateApp(APP_STATE.PUBLIC)
	        }
	        else
	        {
	          showErrorToast(error.message);
	        }
		}
	}

	const backAction = () => {
		navigation.goBack()
		return true;
    }

    const closeModal = () => {
	    refModalBottom.current.close()
	}

    const openModal = (type) => {
	    setViewMode(type)
	    refModalBottom.current.open()
	}

	const handleResultVideo = async (result) => {
		if (!result.cancelled) {
			console.log(result.duration)
			if (result.duration <= 62000)
			{
				setParams(prevState => ({...prevState, video: result.uri }))
			}
			else
			{
				setParams(prevState => ({...prevState, video: '' }))
				showErrorToast(t('errorMaximunVerticalVideo'))
			}
		}
	}

	const handleResultImage = async (result) => {
		if (!result.cancelled) {
			let base64 = await FileSystem.readAsStringAsync(result.uri, {
				encoding: 'base64',
			})
			setParams(prevState => ({...prevState, cover: base64 }))
		}
		else
		{
			setParams(prevState => ({...prevState, cover: '' }))
		}
	}

	const pickVideo = async (value) => {
		if (value === 'camera') 
		{
			let result = await ImagePicker.launchCameraAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Videos,
				videoExportPreset: ImagePicker.VideoExportPreset.MediumQuality,
				videoMaxDuration: 60,
				allowsEditing: true
			});
			handleResultVideo(result);
		} 
		else 
		{
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Videos,
				videoExportPreset: ImagePicker.VideoExportPreset.MediumQuality,
				allowsEditing: true
			});
			handleResultVideo(result);
		}
	}

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [9, 16],
			quality: 0.3,
		});
		handleResultImage(result)
	}

	const validate = () => {
		if (params.video == '')
		{
			showErrorToast(t('errorMaximunVerticalVideo'))
			return false
		}
		if (params.cover == '')
		{
			showErrorToast(t('sorryUploadImage'))
			return false
		}
		return true
	}

	const Help = () => {
		return (
			<Fragment>
				<TipsCreateLesson>{t('tipsCreateLesson')}</TipsCreateLesson>
				<Row>
					<IconTips resizeMode='contain' source={require('../../../assets/img/Elipse25.png')} />
					<SubTipsCreateLesson>{t('tip1CreateLesson')}</SubTipsCreateLesson>
				</Row>
				<Row>
					<IconTips resizeMode='contain' source={require('../../../assets/img/Elipse25.png')} />
					<SubTipsCreateLesson>{t('tip2CreateLesson')}</SubTipsCreateLesson>
				</Row>
				<Row>
					<IconTips resizeMode='contain' source={require('../../../assets/img/Elipse25.png')} />
					<SubTipsCreateLesson>{t('tip3CreateLesson')}</SubTipsCreateLesson>
				</Row>
				<Row>
					<IconTips resizeMode='contain' source={require('../../../assets/img/Elipse25.png')} />
					<SubTipsCreateLesson>{t('tip4CreateLesson')}</SubTipsCreateLesson>
				</Row>
				<Row>
					<IconTips resizeMode='contain' source={require('../../../assets/img/Elipse25.png')} />
					<SubTipsCreateLesson>{t('tip5CreateLesson')}</SubTipsCreateLesson>
				</Row>
				<Row>
					<IconTips resizeMode='contain' source={require('../../../assets/img/Elipse25.png')} />
					<SubTipsCreateLesson>{t('tip6CreateLesson')}</SubTipsCreateLesson>
				</Row>
				<Row>
					<IconTips resizeMode='contain' source={require('../../../assets/img/Elipse25.png')} />
					<SubTipsCreateLesson>{t('tip7CreateLesson')}</SubTipsCreateLesson>
				</Row>
				<Row>
					<IconTips resizeMode='contain' source={require('../../../assets/img/Elipse25.png')} />
					<SubTipsCreateLesson>{t('tip8CreateLesson')}</SubTipsCreateLesson>
				</Row>
				<ImageShadowPlayer resizeMode='contain' source={require('../../../assets/img/BgShadowVideo.png')} />
			</Fragment>
		)
	}

	const stopTrack = async () => {
    	setTrack(params.track == null ? false:true)
    	let playbackInstance = currentPlaying
		if (playbackInstance){
			await playbackInstance.unloadAsync()
			setCurrentIndex(null)
			setIsPlaying(false)
			setCurrentPlaying(null)
			setListTrack(
		      listTrack.map(item => ({...item, play : false }))
		    )
		}
    }

    const deleteTrack = async () => {
    	setParams(prevState => ({...prevState, track: null}))
		setTrack(false)
		setCurrentIndex(null)
    	let playbackInstance = currentPlaying
		if (playbackInstance){
			await playbackInstance.unloadAsync()
			setIsPlaying(false)
			setCurrentPlaying(null)
		}
    }

	const handleRepro = async (track, index) => {
		setListTrack(
	    	listTrack.map(item => 
		        (item._id === track._id) 
		        ? {...item, play : !item.play } 
		        : {...item, play : false } 
	        )
	    )
		if (currentIndex != index)
		{
			let playbackInstance = currentPlaying
			if (playbackInstance)
				await playbackInstance.unloadAsync()
			
			await loadAudio(index) //play now
		}
		else
		{
			//pause o play
			await handlePlayPause()
		}

		setCurrentIndex(index)
	}

	const handlePlayPause = async () => {
		let playbackInstance = currentPlaying
		isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()
		setIsPlaying(!isPlaying)
	}

	const loadAudio = async (index) => {
		try {
			let playbackInstance = new Audio.Sound()
			setCurrentPlaying(playbackInstance)
			let source = {
				uri: listTrack[index].track
			}
			let newVolume = parseInt(volume) / 100 
			newVolume = newVolume.toFixed(1)
			console.log(newVolume)
			let status = {
				shouldPlay: true,
				volume: parseFloat(newVolume)
			}   
			playbackInstance.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate)
			let res = await playbackInstance.loadAsync(source, status, false)
			setIsPlaying(res.isPlaying)
			//console.log('res', res)
		} catch (e) {
			//showErrorToast()
			console.log(e)
		}
	}

	const loadAudioPreview = async (uri) => {
		try {
			if (!isPlaying)
			{
				let playbackInstance = currentPlaying
				if (playbackInstance != null)
				{
					await handlePlayPause()
				}
				else
				{
					playbackInstance = new Audio.Sound()
					setCurrentPlaying(playbackInstance)
					let source = {
						uri: uri
					}
					let newVolume = parseInt(volume) / 100 
					newVolume = newVolume.toFixed(1)
					console.log(newVolume)
					let status = {
						shouldPlay: true,
						volume: parseFloat(newVolume)
					}   
					playbackInstance.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate)
					let res = await playbackInstance.loadAsync(source, status, false)
					setIsPlaying(true)
				}
					
			}
			else 
			{
				await handlePlayPause()
			}
		} 
		catch (e) 
		{
			console.log(e)
		}
	}

	const _onPlaybackStatusUpdate = (playbackStatus) => {
		if (!playbackStatus.isLoaded) {
			if (playbackStatus.error) {
			  	console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
			  	setListTrack(
			    	listTrack.map(item => ({...item, play : false }))
			    )
			    let playbackInstance = currentPlaying
				if (playbackInstance)
					playbackInstance.unloadAsync()
			    
			    setCurrentIndex(null)
			}
		} else {
			if (playbackStatus.isPlaying) {
			  console.log('play', playbackStatus.positionMillis, playbackStatus.durationMillis)
			  //console.log(playbackStatus.shouldCorrectPitch)
			} else {
			  //console.log('pause')
			}

			if (playbackStatus.isBuffering) {
			  console.log('loading...')
			}

			if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
				console.log('finish!!!')

				setListTrack(
			    	listTrack.map(item => ({...item, play : false }))
			    )
			    let playbackInstance = currentPlaying
				if (playbackInstance){
					playbackInstance.unloadAsync()
				}
			    
			    setCurrentIndex(null)
			}
		}
	}

	const addRepro = async (track, index) => {
		let playbackInstance = currentPlaying
		if (playbackInstance)
			await playbackInstance.unloadAsync()

		
		setTrack(true)
		setParams(prevState => ({...prevState, track: track }))
		setListTrack(listTrack.map(item => ({...item, play : false })))
		setCurrentPlaying(null)
		setCurrentIndex(index)
		setIsPlaying(false)
	}

	const changeVolume = async (type) => {
		if (type == 'up' && parseInt(volume) < 100){
			let playbackInstance = currentPlaying
			if (playbackInstance){
				let newVolume = parseInt(volume + 5) / 100
				newVolume = newVolume.toFixed(2) 
				await playbackInstance.setVolumeAsync(parseFloat(newVolume))
			}
			setVolume(volume + 5)
		}
		if (type == 'down' && parseInt(volume) > 5){
			let playbackInstance = currentPlaying
			if (playbackInstance){
				let newVolume = parseInt(volume - 5) / 100
				newVolume = newVolume.toFixed(2) 
				await playbackInstance.setVolumeAsync(parseFloat(newVolume))
			}
			setVolume(volume - 5)
		}
	}

	const  linkExt = () => {
		Linking.openURL('')
	}

	return (
		<Container>
			<Header>
				<Menu>
					<TouchableOpacity style={{ left: -30, padding: 5}} onPress={backAction}>
						<IconBack resizeMode='contain' source={require('../../../assets/img/arrowLeft.png')} />
					</TouchableOpacity>
				</Menu>
				
				<Menu>
					<Title>{t('createLesson')}</Title>
				</Menu>

				<Menu>
					<TouchableOpacity onPress={() => openModal('help')}>
						<IconHelp resizeMode='contain' source={require('../../../assets/img/help.png')} />
					</TouchableOpacity>
				</Menu>
			</Header>
			<Separator />

			<ScrollView>
				{params.video != '' ? (
					<RowVideo>
						<IconCheckVideo resizeMode='contain' source={require('../../../assets/img/check.png')} />
						<MaximunVerticalVideo video={params.video != '' ? true : false}>{t('maximunVerticalVideo')}</MaximunVerticalVideo>
					</RowVideo>
				): (
					<MaximunVerticalVideo video={params.video != '' ? true : false}>{t('maximunVerticalVideo')}</MaximunVerticalVideo>
				)}
					
				<RowIcons>
					<Col50>
						<TouchableOpacity onPress={() => pickVideo('camera')} >
							<IconRecord resizeMode='contain' source={require('../../../assets/img/camera.png')} />
						</TouchableOpacity>
						<TextRecord>{t('record')}</TextRecord>
					</Col50>
					<Col50>
						<TouchableOpacity onPress={() => pickVideo('gallery')} >
							<IconGalery resizeMode='contain' source={require('../../../assets/img/gallery.png')} />
						</TouchableOpacity>
						<TextGallery>{t('gallery')}</TextGallery>
					</Col50>
				</RowIcons>

				<CopyrightedSuspended>{t('copyrightedSuspended')}</CopyrightedSuspended>
				<Hr />

				<TouchableOpacity onPress={() => pickImage()} >
					{params.cover != '' ? (
						<Fragment>
							<RowCover>
								<IconCheckCover resizeMode='contain' source={require('../../../assets/img/check.png')} />
								<TouchUploadCover cover={params.cover != '' ? true : false}>{t('TouchUploadCover')}</TouchUploadCover>
							</RowCover>
							<ImageRecord resizeMode='contain' source={{ uri: `data:image;base64,${params.cover}` }} />
						</Fragment>
					): (
						<Fragment>
							<TouchUploadCover cover={params.cover != '' ? true : false}>{t('TouchUploadCover')}</TouchUploadCover>
							<ImageRecord resizeMode='contain' source={require('../../../assets/img/BgShadowCover.png')} />
						</Fragment>
					)}
				</TouchableOpacity>
				<Hr />

				<RowSwitch>
					<AddMusic>{t('AddMusic')}:</AddMusic>
					<Switch
					    value={track}
					    onValueChange={(val) => {
							setTrack(val)
							if (val)
								openModal('addmusic')
						}}
					    disabled={false}
					    activeText={''}
					    inActiveText={''}
					    circleSize={24}
					    barHeight={32}
					    circleBorderWidth={0}
					    backgroundActive={colors.violet}
					    backgroundInactive={colors.grays}
					    circleActiveColor={colors.white}
					    circleInActiveColor={colors.white}
					    switchLeftPx={2} 
					    switchRightPx={2} 
					    switchWidthMultiplier={2.5}
					    switchBorderRadius={30} 
					/>
				</RowSwitch>

				{(params.track != null) && track==true && (
					<RowSwitch>
						<TouchableOpacity onPress={() => openModal('addmusic') }>
							<IconMusic resizeMode='contain' source={require('../../../assets/img/track.png')}/>	
						</TouchableOpacity>
						<TouchableOpacity onPress={() => openModal('addmusic') }>
							<TrackSelected>{params.track.name}</TrackSelected>
						</TouchableOpacity>
						<TouchableOpacity onPress={() =>  {
							setParams(prevState => ({...prevState, track: null}))
							setTrack(false)
							setCurrentIndex(null)
						}}>
							<IconDelete  resizeMode='contain' source={require('../../../assets/img/close-circle.png')}/>
						</TouchableOpacity>
					</RowSwitch>
				)}
					

				<ContainerButtom>
					<TextButton>
						{t('createLessonSaveContinue')} {'	  '}
						<IconArrow resizeMode='contain' source={require('../../../assets/img/arrowRight.png')} />
					</TextButton>
					<TouchableHighlight
						style={{
							width: 190,
						    height: 60,
						    borderRadius: 10,
						    marginTop: -40,
						    backgroundColor: colors.transparent,
						    justifyContent: 'center',
						    alignItems: 'center'
						}}
						onPress={nextStep}
					>
						<BottomContinue resizeMode='stretch' source={require("../../../assets/img/button-bg.png")} />
					</TouchableHighlight>
				</ContainerButtom>
			</ScrollView>

			<ModalBottom
				ref={refModalBottom}
				closeOnDragDown
				onClose={stopTrack}
				dragFromTopOnly
				animationType={'slide'}
				customStyles={customStyles}>
				<ContainerModal>
					<HeaderModal>
						<MenuExt></MenuExt>
						<MenuCenter>
							<Title>
								{viewMode == 'help' && t('aboutYourTrailer')}
								{viewMode == 'addmusic' && t('AddMusic')}
							</Title>
						</MenuCenter>
						<MenuExt>
							<TouchableOpacity onPress={closeModal}>
								<IconClose resizeMode='contain' source={require('../../../assets/img/close-circle-outline.png')} />
							</TouchableOpacity>
						</MenuExt>
					</HeaderModal>
					<SeparatorModal />
					<ScrollViewModal>
						{viewMode == 'help' && <Help />}
						{(viewMode == 'addmusic') && (params.track == null) && (
							<ContainerPlaylist>
								{listTrack.map((item, index) => (
									<RowPlaylist key={index}>
										<FlexLeftPlaylist>
											<TouchableOpacity onPress={() =>  handleRepro(item, index)}>
												<BottomPlaylist>
													{ (item.play) ?
														<IconPlay resizeMode='contain' source={require('../../../assets/img/iconPause.png')} />
														:
														<IconPlay resizeMode='contain' source={require('../../../assets/img/iconPlay.png')} />
													}
												</BottomPlaylist>
											</TouchableOpacity>
										</FlexLeftPlaylist>
										<FlexCenterPlaylist>
											<TitlePlaylist play={(item.play)}>{item.name}</TitlePlaylist>
										</FlexCenterPlaylist>
										<TouchableOpacity onPress={() =>  addRepro(item, index)}>
											<FlexRightPlaylist>
												<Add>{t('Add')} {' '} <IconArrow resizeMode='contain' source={require('../../../assets/img/arrowRight.png')} /></Add>
											</FlexRightPlaylist>
										</TouchableOpacity>
									</RowPlaylist>
								))}
							</ContainerPlaylist>
						)}
						{(viewMode == 'addmusic') && (params.track != null) && (
							<Fragment>
								<ContainerCoverPlay>
									<FlexLeftCoverPlay></FlexLeftCoverPlay>
									<FlexCenterCoverPlay>
										<TouchableOpacity onPress={() =>  loadAudioPreview(params.track.track)}>
											<Fragment>
												{ params.cover != '' ? 
													<ImageCoverPlay resizeMode='contain' source={{ uri: `data:image;base64,${params.cover}` }} />
												: 
													<ImageCoverPlay resizeMode='contain' source={require('../../../assets/img/BgShadowCover.png')} />
												}
												{!isPlaying && <IconCoverPlay resizeMode='contain' source={require('../../../assets/img/PlayButton.png')} /> }
											</Fragment>
										</TouchableOpacity>
									</FlexCenterCoverPlay>
									<FlexRightCoverPlay>
										<ContainerCoverPlay>
											<VolumeNum>{volume}</VolumeNum>
											<TouchableOpacity onPress={() => changeVolume('up')}>
												<IconUp resizeMode='contain' source={require('../../../assets/img/arrowup.png')}/>	
											</TouchableOpacity>
										</ContainerCoverPlay>
										<ContainerCoverPlay>
											<VolumeText>{t('volume')}</VolumeText>
											<TouchableOpacity onPress={() => changeVolume('down')}>
												<IconDown resizeMode='contain' source={require('../../../assets/img/arrowdown.png')}/>	
											</TouchableOpacity>
										</ContainerCoverPlay>
									</FlexRightCoverPlay>
								</ContainerCoverPlay>

								<ContainerCoverPlay>
									<FlexLeftCoverPlay></FlexLeftCoverPlay>
									<FlexCenterCoverPlay>
										<RowCenter>
											<IconMusic resizeMode='contain' source={require('../../../assets/img/track.png')}/>	
											<TrackSelected>{params.track.name}</TrackSelected>
											<TouchableOpacity onPress={() =>  deleteTrack()}>
												<IconDelete  resizeMode='stretch' source={require('../../../assets/img/close-circle.png')}/>
											</TouchableOpacity>
										</RowCenter>
									</FlexCenterCoverPlay>
									<FlexRightCoverPlay></FlexRightCoverPlay>
								</ContainerCoverPlay>

								<ContainerButtom>
									<TextButton>
										{t('AddThisSong')} {'     '}
										<IconArrow resizeMode='contain' source={require('../../../assets/img/arrowRight.png')} />
									</TextButton>
									<TouchableHighlight
										style={{
											width: 190,
										    height: 60,
										    borderRadius: 10,
										    marginTop: -40,
										    backgroundColor: colors.transparent,
										    justifyContent: 'center',
										    alignItems: 'center'
										}}
										onPress={closeModal}
									>
										<BottomContinue resizeMode='stretch' source={require("../../../assets/img/button-bg.png")} />
									</TouchableHighlight>
								</ContainerButtom>
							</Fragment>
						)}
					</ScrollViewModal>
				</ContainerModal>
        	</ModalBottom>
		</Container>
	)
}

const Container = styled.View`
	flex: 1;
	background: ${colors.blueDark};
	align-items: flex-start;
`

//--- styleheader ------
const Header = styled.View`
	height: 60px;
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	background-color: ${colors.blueDark};
`
const Menu = styled.View`
	justify-content: center;
	align-items: center;
	width: 33%;
`
const IconBack = styled.Image`
	height: 32px;
	justify-content: center;
  	align-items: center;
`
const Title = styled.Text`
	color: ${colors.white};
	font-size: 14px;
	text-align: center;
	justify-content: center;
	font-family: ${fonts.medium};
`
const IconHelp = styled.Image`
	height: 32px;
	justify-content: center;
	align-items: center;
	right: -25px;
`
const Separator = styled.View`
	width: 100%;
	height: 1px;
	background-color: ${colors.lila};
	opacity: 0.4;
	position: absolute;
	margin-top: 60px;
	z-index: 3;
`
//--- end ----------

//--- stylebody ----
const ScrollView = styled.ScrollView`
	width: 100%;
    height: 100%;
`
const RowVideo = styled.View`
	flex-direction: row;
	margin-top: 15px;
	height: 20px;
`
const IconCheckVideo = styled.Image`
	height: 30px;
	margin-right: -40px;
	margin-left: 9%;
	align-items: center;
	align-content: center;
	align-self: center;
`
const MaximunVerticalVideo = styled.Text`
	color: ${props => props.video ? colors.cyan : colors.lila};
	font-size: 12px;
	text-align: center;
	justify-content: center;
	align-self: center;
	font-family: ${fonts.regular};
	margin-top: ${props => props.video ? '2px' : '20px'};
`
const RowIcons = styled.View`
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: row;
`
const Col50 = styled.View`
	justify-content: center;
	align-items: center;
	width: 50%;
`
const IconRecord = styled.Image`
	height: 60px;
	margin-left: 70px;
`
const IconGalery = styled.Image`
	height: 60px;
	margin-right: 70px;
`
const TextRecord = styled.Text`
	color: ${colors.lila};
	font-size: 14px;
	font-family: ${fonts.regular};
	margin-left: 65px;
`
const TextGallery = styled.Text`
	color: ${colors.lila};
	font-size: 14px;
	font-family: ${fonts.regular};
	margin-right: 70px;
`
const CopyrightedSuspended = styled.Text`
	color: ${colors.whiteTrasparent};
	font-size: 10px;
	font-family: ${fonts.regular};
	margin-top: 20px;
	text-align: center;
	justify-content: center;
	align-self: center;
`
const Hr = styled.View`
	height: 1px;
	background-color: ${colors.lila};
	opacity: 0.3;
	margin-top: 10px;
	margin-horizontal: 20px;
`
const RowCover = styled.View`
	flex-direction: row;
	margin-top: 15px;
	height: 20px;
`
const IconCheckCover = styled.Image`
	height: 30px;
	margin-right: -40px;
	margin-left: 9%;
	align-items: center;
	align-content: center;
	align-self: center;
`
const TouchUploadCover = styled.Text`
	color: ${props => props.cover ? colors.cyan : colors.lila};
	font-size: 12px;
	text-align: center;
	justify-content: center;
	align-self: center;
	font-family: ${fonts.regular};
	margin-top: ${props => props.cover ? '5px' : '10px'};
`
const ImageRecord = styled.Image`
	height: 237px;
	width: 166px;
	justify-content: center;
	align-items: center;
	align-self: center;
	margin-top: 20px;
`
const RowSwitch = styled.View`
	flex-direction: row;
	align-content: flex-start;
	margin-top: 10px;
	margin-bottom: 10px;
	height: 35px;
	margin-horizontal:20px;
`
const AddMusic = styled.Text`
	color: ${colors.lila};
	font-size: 13px;
	text-align: center;
	justify-content: center;
	align-self: center;
	font-family: ${fonts.regular};
	margin-bottom: 5px;
	margin-right: 20px;
`
const IconDelete = styled.Image`
	height: 20px;
	width: 20px;
`
const IconMusic = styled.Image`
	width: 20px;
	margin-right: 10px;
`
const TrackSelected = styled.Text`
	color: ${colors.white};
	font-size: 14px;
	font-family: ${fonts.regular};
	text-align: center;
	margin-right: 10px;
`
//--- end ----------

//--- stylepie -----
const ContainerButtom = styled.View`
	align-self: center;
    justify-content: center;
    margin-top: 15px;
    margin-bottom: 20px;
`
const TextButton = styled.Text`
	color: ${colors.cyan};
	font-size: 18px;
	font-family: ${fonts.SemiBold};
	text-shadow: 0px 0px 8px ${colors.cyan};
	justify-content: center;
	align-items:center;
	text-align: center;
`
const IconArrow = styled.Image`
    height: 20px;
`
const BottomContinue = styled.Image`
    background-color: ${colors.transparent};
    width: 240px;
    height: 90px;
`
//--- end ----------

//--- stylemodal ------
const ContainerModal = styled.View`
	flex: 1;
	align-items: flex-start;
`
const HeaderModal = styled.View`
	height: 30px;
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: row;
`
const MenuExt = styled.View`
	justify-content: center;
	align-items: center;
	flex:1;
`
const MenuCenter = styled.View`
	justify-content: center;
	align-items: center;
	flex: 5;
`
const IconClose = styled.Image`
	height: 26px;
	justify-content: center;
	align-items: center;
`
const SeparatorModal = styled.View`
	width: 100%;
	height: 1px;
	background-color: ${colors.lila};
	opacity: 0.3;
	position: absolute;
	margin-top: 55px;
	z-index: 3;
`
const ScrollViewModal = styled.ScrollView`
	width: 100%;
    height: 100%;
    margin-top: 22px;
`
const TipsCreateLesson = styled.Text`
	color: ${colors.white};
	font-size: 12px;
	line-height: 20px;
	text-align: center;
	align-self: center;
	font-family: ${fonts.regular};
	margin-top: 20px;
	margin-bottom: 30px;
`
const SubTipsCreateLesson = styled.Text`
	color: ${colors.whiteTrasparent};
	font-size: 12px;
	line-height: 20px;
	text-align: left;
	font-family: ${fonts.regular};
	flex: 4;
`
const IconTips = styled.Image`
	height: 20px;
	justify-content: center;
	align-items: center;
	flex: 1;
`
const ImageShadowPlayer = styled.Image`
	height: 237px;
	justify-content: center;
	align-items: center;
	align-self: center;
	margin-top: 20px;
`
const Row = styled.View`
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	margin-top: 10px;
	margin-bottom: 10px;
	padding-right: 30px;
`
const TitlePlaylist = styled.Text`
	color: ${props => props.play ? colors.cyan : colors.white};
	font-size: 14px;
	text-align: left;
	font-family: ${fonts.medium};
`
const Add = styled.Text`
	color: ${colors.cyan};
	font-size: 18px;
	text-align: right;
	font-family: ${fonts.SemiBold};
`
const IconPlay = styled.Image`
	height: 50px;
	align-self: center;
	justify-content: center;
	align-items: center;
`
const IconPause = styled.Image`
	height: 50px;
	align-self: center;
	justify-content: center;
	align-items: center;
`
const BottomPlaylist = styled.View`
	background-color: ${colors.violet};
	border-radius: 100px;
	width: 50px;
	height: 50px;
`
const ContainerPlaylist = styled.View`
    margin-top: 0px;
`
const RowPlaylist = styled.View`
	flex-direction: row;
	border-color: ${colors.grayLight};
    border-bottom-width: 1px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 5px;
`
const FlexLeftPlaylist = styled.View`
	flex:1;
	justify-content: center;
	align-items: center;
	padding: 10px;
`
const FlexRightPlaylist = styled.View`
	flex:2;
	justify-content: center;
	padding: 10px;
`
const FlexCenterPlaylist = styled.View`
	flex:6;
	justify-content: center;
	padding: 10px;
	margin-left: 10px;
`
const ImageCoverPlay = styled.Image`
	height: 237px;
	width: 166px;
	justify-content: center;
	align-items: center;
	align-self: center;
`
const IconCoverPlay = styled.Image`
	width: 80px;
	position: absolute;
	justify-content: center;
	align-items: center;
	align-self: center;
	top: 45px;
`
const ContainerCoverPlay = styled.View`
	flex-direction: row;
	margin-top: 10%;
`
const FlexLeftCoverPlay = styled.View`
	flex:1;
`
const FlexRightCoverPlay = styled.View`
	flex:1;
	justify-content: center;
	align-items: center;
	align-self: center;
	padding-right: 15px;
`
const FlexCenterCoverPlay = styled.View`
	flex:6;
	justify-content: center;
	padding: 10px;
`
const RowCenter = styled.View`
	flex-direction: row;
	align-content: center;
	justify-content:center;
	margin-top: -35px;
	margin-bottom: 20px;
`
const IconUp = styled.Image`
	width: 34px;
	height: 20px;
	margin-right: 20px;
`
const IconDown = styled.Image`
	width: 34px;
	height: 20px;
	margin-right: 20px;
`
const VolumeText = styled.Text`
	color: ${colors.cyan};
	font-size: 12px;
	text-align: center;
	justify-content:center;
	align-items:center;
	align-self: center;
	font-family: ${fonts.regular};
	width: 50px;
`
const VolumeNum = styled.Text`
	color: ${colors.white};
	font-size: 16px;
	text-align: center;
	justify-content:center;
	align-items:center;
	align-self: center;
	font-family: ${fonts.regular};
	width: 50px;
`
//--- end ----------

