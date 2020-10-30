import React, {useEffect, useRef, useState, Fragment} from 'react'
import { BackHandler, TouchableOpacity, Dimensions, TouchableHighlight, TextInput, Image} from 'react-native'
import styled from 'styled-components/native'
import useTranslation from '../../i18n';
import useAuth from '../../Services/Auth';
import { URI } from "../../Constants";
import ModalBottom from 'react-native-raw-bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { Switch } from 'react-native-switch';
import fonts from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
import Ripple from 'react-native-material-ripple';
import { Audio } from 'expo-av'
const { width, height } = Dimensions.get('window')

import { StackActions } from '@react-navigation/native';
import Routes from '../../Navigation/Routes';

//api services
import * as apiconfig from "../../Services/config";


export default function CreateLesson({navigation, route}) {
	const {video, description, coins30, selected30, coins60, selected60, selectedDescount, idLanguage} = route.params
	const {t, localeProvider} = useTranslation()
  	const {setLoading, showErrorToast, stateApp, checkAccount, account} = useAuth()
  	const refModalBottom = useRef()

  	const [viewMode, setViewMode] = useState('help')
  	const [mtm, setMtm] = useState('80%')
  	const [listTrack, setListTrack] = useState([])

  	//controller playlist
  	const [isPlaying, setIsPlaying] = useState(false)
  	const [currentPlaying, setCurrentPlaying] = useState()
  	const [currentIndex, setCurrentIndex] = useState(null)
  	const [volume, setVolume] = useState(1.0)
  	
  	//sendform
  	const [cover, setCover] = useState('')
  	const [track, setTrack] = useState(false)
  	const [idTrack, setIdTrack] = useState('')

  	const [tag, setTag] = useState('')
  	const [errorTag, setErrorTag] = useState(false)
  	const [textErrorTag, setTextErrorTag] = useState('')
  	const [listTags, setListTags] = useState([])

  	const nextStep = () => {
		if(validate())
		{
			
		}
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
		  backgroundColor: colors.blueDark,
		  opacity: 0.9
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

		try {
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
				interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
				playsInSilentModeIOS: true,
				interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
				shouldDuckAndroid: true,
				staysActiveInBackground: true,
				playThroughEarpieceAndroid: true
			})
		} catch (e) {
			console.log(e)
		}

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
			if (error.message == 'Network Error') 
			{
				showErrorToast(error.message);
			}
			else
			{
				showErrorToast(localeProvider.name == 'en' ? error.message_en : error.message_es)
			}
		}
	}

	const backAction = () => {
		navigation.goBack()
		return true;
    }

    const stopTrack = async () => {
    	setTrack(idTrack == '' ? false:true)
    	let playbackInstance = currentPlaying
		if (playbackInstance){
			await playbackInstance.unloadAsync()
			setCurrentIndex(null)
			setIsPlaying(false)
			setListTrack(
		      listTrack.map(item => ({...item, play : false }))
		    )
		}
    }

    const closeModal = () => {
    	refModalBottom.current.close()
	}

    const openModal = (type) => {
    	if (type == 'addmusic')
    		setMtm('85%')
    	if (type == 'help')
    		setMtm('80%')

	    setViewMode(type)
	    refModalBottom.current.open()
	}

	const handleResultImage = async (result) => {
		if (!result.cancelled) {
			let base64 = await FileSystem.readAsStringAsync(result.uri, {
				encoding: 'base64',
			})
			setCover(base64);
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

	const handleSelectecLanguage = (lang) => {
		setSelectedLanguage(lang.name)
		setIdLanguage(lang._id)
		closeModal()
	}

	const validate = () => {
		if (cover == '')
		{
			showErrorToast(t('sorryUploadImage'))
			return false
		}
		if (listTags.length == 0)
		{
			setErrorDescription(true)
			setTextErrorDesc(t('errorInputEmpty'))
			return false
		}
		else
		{
			setErrorDescription(false)
		}
		if (!selected30 && !selected60)
		{
			showErrorToast(t('validateCoins'))
			return false
		}
		return true
	}

	const addTags = () => {
		let ta = tag
		if (ta == '')
		{
			showErrorToast(t('AddTag'))
		}
		else
		{
			let lt = listTags
			if (!lt.includes(ta))
			{
				ta = ta.toLowerCase().replace(/ /g, '')
				lt.push('#'+ta)
				setListTags(lt)
				setTag('')
			}
			
		}
	}

	const deleteTags = (ta) => {
		let lt = listTags
		lt = lt.filter(item => item !== ta)
		setListTags(lt)
		console.log(listTags)
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

	const handleRepro = async (track, index) => {
		setListTrack(
	      listTrack.map(item => 
	        (item._id === track._id) 
	        ? {...item, play : !item.play } 
	        : {...item, play : false } )
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
			const playbackInstance2 = new Audio.Sound()
			setCurrentPlaying(playbackInstance2)
			const source = {
				uri: listTrack[index].track
			}

			const status = {
				shouldPlay: true,
				volume: volume
			}

			//playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)     
			let res = await playbackInstance2.loadAsync(source, status, false)
			setIsPlaying(res.isPlaying)
			console.log('res', res)
			
		} catch (e) {
			console.log(e)
		}
	}

	const AddMusicList = () => {
		let list = listTrack.map((item, index) => (
			<RowPlaylist>
				<FlexLeftPlaylist>
					<TouchableOpacity onPress={() =>  handleRepro(item, index)}>
						<BottomPlaylist>
							{ item.play ?
								<IconPlay resizeMode='contain' source={require('../../../assets/img/iconPause.png')} />
								:
								<IconPlay resizeMode='contain' source={require('../../../assets/img/iconPlay.png')} />
							}
						</BottomPlaylist>
					</TouchableOpacity>
				</FlexLeftPlaylist>
				<FlexCenterPlaylist>
					<TitlePlaylist play={item.play}>{item.name}</TitlePlaylist>
				</FlexCenterPlaylist>
				<FlexRightPlaylist>
					<Add>{t('Add')} {' '} <IconArrow resizeMode='contain' source={require('../../../assets/img/arrowRight.png')} /></Add>
				</FlexRightPlaylist>
			</RowPlaylist>
		))

		return (
			<ContainerPlaylist>
				{list}
			</ContainerPlaylist>
		)
	}

	return (
		<Container>
			<Header>
				<Menu>
					<TouchableOpacity style={{ left: -30, padding: 5}} onPress={backAction}>
						<IconCalendar resizeMode='contain' source={require('../../../assets/img/arrowLeft.png')} />
					</TouchableOpacity>
				</Menu>
				
				<Menu>
					<Title>{t('createLesson')}</Title>
				</Menu>

				<Menu>
					<TouchableOpacity onPress={() => openModal('help')}>
						<IconAdd resizeMode='contain' source={require('../../../assets/img/help.png')} />
					</TouchableOpacity>
				</Menu>
			</Header>
			<Separator />

			<ScrollView>

				<TouchableOpacity
	              onPress={() => pickImage()}
	            >
				{cover != '' ? (
					<Fragment>
						<RowCover>
							<IconCheckCover resizeMode='contain' source={require('../../../assets/img/check.png')} />
							<TouchUploadCover cover={cover != '' ? true : false}>{t('TouchUploadCover')}</TouchUploadCover>
						</RowCover>
						<ImageRecord resizeMode='contain' source={{ uri: `data:image;base64,${cover}` }} />
					</Fragment>
				): (
					<Fragment>
						<TouchUploadCover cover={cover != '' ? true : false}>{t('TouchUploadCover')}</TouchUploadCover>
						<ImageShadowPlayer resizeMode='contain' source={require('../../../assets/img/BgShadowCover.png')} />
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

				<Tags>{t('Tags')}</Tags>
				<RowTags>
					<SymbolImputTags>#</SymbolImputTags>
					<InputTags 
						error={errorTag}
						placeholder={t('TypeSomething')}
						placeholderTextColor={colors.lilaLight}
						value={tag}
						onChangeText={setTag}
					/>
					<TouchableOpacity onPress={addTags}>
						<AddTag>{t('AddTag')}</AddTag>
					</TouchableOpacity>
				</RowTags>

				<RowTagsList>
					{listTags.map((item, index) => (
						<Fragment key={index}>
							<TouchableOpacity
								style={{alignItems: 'center', alignContent: 'center', alignSelf: 'center'}} 
								onPress={() => deleteTags(item)}
							>
								<TagsList> {item} </TagsList>
							</TouchableOpacity>
							<TouchableOpacity 
								style={{alignItems: 'center', alignContent: 'center', alignSelf: 'center'}} 
								onPress={() => deleteTags(item)}
							>
								<IconDelete  resizeMode='contain' source={require('../../../assets/img/close-circle.png')}/>
							</TouchableOpacity>
						</Fragment>
					))}
		        </RowTagsList>

		        <ContainerButtom>
					<TextButton>
						{t('PostMyLesson')} {'  '}
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
						<BottomContinue resizeMode='contain' source={require("../../../assets/img/button-bg.png")} />
					</TouchableHighlight>
				</ContainerButtom>
				
			</ScrollView>

			<ModalBottom
				ref={refModalBottom}
				closeOnDragDown
				onClose={stopTrack}
				dragFromTopOnly
				keyboardAvoidingViewEnabled={true}
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
						{viewMode == 'addmusic' && <AddMusicList />}
					</ScrollViewModal>
				</ContainerModal>
        	</ModalBottom>
		</Container>
	)
}

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
const ImageRecord = styled.Image`
	height: 237px;
	width: 166px;
	justify-content: center;
	align-items: center;
	align-self: center;
	margin-top: 20px;
`
const IconDelete = styled.Image`
	width: 20px;
	margin-left: -10px;
	margin-right: 10px;
`
const RowTags = styled.View`
	flex-direction: row;
	border-color: ${props => props.error ? colors.fucsia : colors.grayLight};
    border-bottom-width: 1px;
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 5px;
`
const RowTagsList = styled.View`
	flex: 1;
    align-items: flex-start;
    align-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
`
const TagsList = styled.Text`
	color: ${colors.white};
	font-size: 14px;
	font-family: ${fonts.regular};
	text-align: center;
	width: 100%;
	margin-right: 5px;
	padding: 5px;
`
const Tags = styled.Text`
	color: ${colors.lila};
	font-size: 14px;
	font-family: ${fonts.SemiBold};
	text-align: left;
	padding-left: 30px;
	width: 100%;
`
const SymbolImputTags = styled.Text`
    font-family: ${fonts.medium};
    font-size: 18px;
    color: ${colors.whiteTrasparent};
    margin-top: 10px;
    flex: 1;
`
const InputTags = styled.TextInput`
    width: 100%;
    height: 40px;
    font-family: ${fonts.regular};
    font-size: 14px;
    color: ${colors.white};
    flex: 11;
`
const AddTag = styled.Text`
    font-family: ${fonts.regular};
    font-size: 14px;
    color: ${colors.cyan};
    margin-top: 5px;
    text-align: right;
    flex: 3;
`
const ErrorText = styled.Text`
	color: ${colors.fucsia};
	font-size: 12px;
	font-family: ${fonts.regular};
	text-align: center;
	justify-content: center;
	align-self: center;
	margin-top: 5px;
`
const RowSwitch = styled.View`
	flex-direction: row;
	margin-top: 15px;
	height: 40px;
	margin-horizontal:20px;
`
const TouchUploadCover = styled.Text`
	color: ${props => props.cover ? colors.cyan : colors.lila};
	font-size: 12px;
	text-align: center;
	justify-content: center;
	align-self: center;
	font-family: ${fonts.regular};
	margin-top: ${props => props.cover ? '2px' : '20px'};
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
const ScrollView = styled.ScrollView`
	width: 100%;
    height: 100%;
`
const ScrollViewModal = styled.ScrollView`
	width: 100%;
    height: 100%;
    margin-top: 22px;
`
const IconClose = styled.Image`
	height: 26px;
	justify-content: center;
	align-items: center;
`
const IconArrow = styled.Image`
    width: 20px;
`
const ContainerButtom = styled.View`
	align-self: center;
    justify-content: center;
    margin-top: 60px;
    margin-bottom: 20px;
`
const TextButton = styled.Text`
	color: ${colors.cyan};
	font-size: 18px;
	font-family: ${fonts.SemiBold};
	text-shadow: 0px 0px 8px ${colors.cyan};
	margin-left: 20px;
`
const BottomContinue = styled.Image`
    background-color: ${colors.transparent};
`
const Container = styled.View`
	flex: 1;
	background: ${colors.blueDark};
	align-items: flex-start;
`
const ContainerModal = styled.View`
	flex: 1;
	align-items: flex-start;
`
const Header = styled.View`
	height: 90px;
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	background-color: ${colors.blueDark};
	padding-top: 40px;
	padding-bottom: 10px;
`
const HeaderModal = styled.View`
	height: 30px;
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: row;
`
const Separator = styled.View`
	width: 100%;
	height: 1px;
	background-color: ${colors.lila};
	opacity: 0.4;
	position: absolute;
	margin-top: 90px;
	z-index: 3;
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
const Menu = styled.View`
	justify-content: center;
	align-items: center;
	width: 33%;
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
const IconCalendar = styled.Image`
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
const IconAdd = styled.Image`
	height: 32px;
	justify-content: center;
	align-items: center;
	right: -25px;
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
const Hr = styled.View`
	width: 100%;
	height: 1px;
	background-color: ${colors.lila};
	opacity: 0.3;
	margin-top: 5%;
	margin-bottom: 2%;
`