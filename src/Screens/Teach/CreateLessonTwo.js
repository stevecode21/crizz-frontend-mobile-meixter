import React, {useEffect, useRef, useState, Fragment} from 'react'
import { BackHandler, TouchableOpacity, TouchableHighlight} from 'react-native'
import styled from 'styled-components/native'
import useTranslation from '../../i18n'
import useAuth from '../../Services/Auth'
import ModalBottom from 'react-native-raw-bottom-sheet'
import fonts from '../../Themes/Fonts'
import colors from '../../Themes/Colors'
import Ripple from 'react-native-material-ripple'
import Routes from '../../Navigation/Routes'
import * as FileSystem from 'expo-file-system'
import LottieView from 'lottie-react-native'

//api services
import * as apiconfig from "../../Services/config"
import * as api from "../../Services/lesson"

import {ROUTES, APP_STATE} from '../../Constants'


export default function CreateLesson({navigation, route}) {
	const {video, cover, track, volume} = route.params
	const {t, localeProvider} = useTranslation()
  	const {setLoading, showErrorToast, stateApp, checkAccount, account, accessToken, setStateApp} = useAuth()
  	const refModalBottom = useRef()
  	const refModalBottomSuccess = useRef()
  	const animation = useRef()

  	const [valueCoin, setValueCoin] = useState(0)
  	const [viewMode, setViewMode] = useState('help')
  	const [mtm, setMtm] = useState('80%')

  	const [languages, setLanguages] = useState([])
  	
  	const [params, setParams] = useState({
  		video: video,
  		cover: cover,
  		idTrack: track == null ? undefined : track._id,
  		volume: volume,
  		description: '',
  		coins30: 10,
  		coins60: 20,
  		selectedLanguage: '',
		language: '',
		totalCoins30: 0,
		totalCoins60: 0,
		selected30: true,
		selected60: false,
		selectedDescount: false
  	})

  	const [error, setError] = useState({
  		description: ''
  	})

  	const [tag, setTag] = useState('')
  	const [listTags, setListTags] = useState([])

  	const handleCreateLesson = async () => {
		if(validate())
		{
			setLoading(true);
			try
			{
				let data = {
					description: params.description,
					sixtymin: params.selected60,
					thirtymin: params.selected30,
					sixtymincoins: parseInt(params.coins60),
					thirtymincoins: parseInt(params.coins30),
					language: params.language,
					discount: params.selectedDescount,
					tags: JSON.stringify(listTags),
					cover: `data:image/png;base64,${params.cover}`,
				}
				if (params.idTrack != undefined)
				{
					data.track = params.idTrack
					data.volume = parseInt(params.volume)
				}

				let options = {
					headers : {
						'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                        'Authorization': accessToken
					},
					httpMethod: 'post',
					uploadType: FileSystem.FileSystemUploadType.MULTIPART,
					fieldName: 'file',
					parameters: data,
				}
				let responseLoad = await FileSystem.uploadAsync(ROUTES.LESSON, params.video, options)
				setLoading(false)
				if (responseLoad.status == 200) 
		        {
		          openModalSuccess()
		        }
				else if (responseLoad.status == 401 || responseLoad.status == 500) 
		        {
		          showErrorToast(localeProvider.name == 'en' ? responseLoad.message_en : responseLoad.message_es)
		        }
		        else if (responseLoad.status == 403) 
		        {
		          showErrorToast(localeProvider.name == 'en' ? responseLoad.message_en : responseLoad.message_es)
		          setStateApp(APP_STATE.PUBLIC)
		        }
		        else
		        {
		          showErrorToast(responseLoad.message);
		        }
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
		setLoading(true)
		await getConfigData()
		setLoading(false)
	})()}, [])

	const getConfigData = async () => {
		try 
		{
			let response = await apiconfig.general()
			let resLanguage = await apiconfig.language()
			let general = response.result[0]
			setLanguages(resLanguage.result)
			setParams(prevState => ({...prevState, selectedLanguage: resLanguage.result[0].name }))
			setParams(prevState => ({...prevState, language: resLanguage.result[0]._id }))

			setValueCoin(parseFloat(general.coinValue))
			let val1 = (parseFloat(general.coinValue) * parseInt(params.coins30))
			if (account.premium == undefined || account.premium == false)
				val1 = val1 - (val1 * 0.099)
			
			val1 = val1.toFixed(2)
			let val2 = (parseFloat(general.coinValue) * parseInt(params.coins60))
			if (account.premium == undefined || account.premium == false)
				val2 = val2 - (val2 * 0.099)
			
			val2 = val2.toFixed(2)

			setParams(prevState => ({...prevState, totalCoins30: val1 }))
			setParams(prevState => ({...prevState, totalCoins60: val2 }))
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

	const closeModalSuccess = () => {
    	refModalBottomSuccess.current.close()
    	navigation.navigate(Routes.MY_LESSONS)
	}

	const openModal = (type) => {
    	if (type == 'YouGet' || type == 'coins30' || type == 'coins60' || type == 'language')
    		setMtm('70%')
    	if (type == 'help')
    		setMtm('80%')
    	
	    setViewMode(type)
	    refModalBottom.current.open()
	}

	const openModalSuccess = () => {
		setMtm('95%')
	    refModalBottomSuccess.current.open()
	    //animation.current.play()
	}

	const handleSelectecLanguage = (lang) => {
		setParams(prevState => ({...prevState, selectedLanguage: lang.name }))
		setParams(prevState => ({...prevState, language: lang._id }))
		closeModal()
	}

	const validate = () => {
		if (params.description == '')
		{
			setError(prevState => ({...prevState, description: t('errorInputEmpty') }))
			showErrorToast(t('errorInputEmpty'))
			return false
		}
		else
		{
			setError(prevState => ({...prevState, description: '' }))
		}
		if (listTags.length == 0)
		{
			showErrorToast(t('sorryTags'))
			return false
		}
		if (!params.selected30 && !params.selected60)
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
			showErrorToast(t('sorryTags'))
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

	const YouGetView = () => {
		return (
			<Fragment>
				<BuyYourMembership>{t('buyYourMembership')}</BuyYourMembership>
				<ChooseMonthly>{t('chooseMonthly')}</ChooseMonthly>
				<ImageZero resizeMode='contain' source={require('../../../assets/img/iconZeroComission.png')}/>
				<ZeroCommissions>{t('zeroCommissions')}</ZeroCommissions>
			</Fragment>
		)
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
				<Description>{t('createLessonDescription')}</Description>
				<RowDescription>
					<InputDescription 
						error={error.description}
						multiline
						numberOfLines={4}
						maxLength={100}
						placeholder={t('placeholderCreateLessonDescription')}
						placeholderTextColor={colors.lilaLight}
						value={params.description}
						onChangeText={(data) => setParams(prevState => ({...prevState, description: data }))}
					/>
				</RowDescription>
				{error.description != '' && (<ErrorText>{error.description}</ErrorText>)}

				<Tags>{t('Tags')}</Tags>
				<RowTags>
					<SymbolImputTags>#</SymbolImputTags>
					<InputTags 
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
								<IconDelete  resizeMode='stretch' source={require('../../../assets/img/close-circle.png')}/>
							</TouchableOpacity>
						</Fragment>
					))}
		        </RowTagsList>

		        <RowYouGet>
					<YouGet>{t('youGet')}:</YouGet>
					<TouchableOpacity onPress={() => openModal('YouGet')}>
						<IconYouGet resizeMode='contain' source={require('../../../assets/img/help.png')} />
					</TouchableOpacity>
				</RowYouGet>

				<RowCoins>
					<TouchableOpacity onPress={() => setParams(prevState => ({...prevState, selected30: !prevState.selected30 })) }>
						{params.selected30 ? (
							<IconMins resizeMode='contain' source={require('../../../assets/img/check.png')} />
						) : (
							<IconMinsOut resizeMode='contain' source={require('../../../assets/img/checkOut.png')} />
						)}
					</TouchableOpacity>
					<TextMins selected={params.selected30}>30 mins</TextMins>
					{params.selected30 ? (
						<Fragment>
							<TouchableOpacity 
								style={{alignItems: 'center', alignContent: 'center', alignSelf: 'center'}} 
								onPress={() => openModal('coins30')}
							>
								<TextSelectCoins selected={params.selected30}>{params.coins30} Coins</TextSelectCoins>
							</TouchableOpacity>
							<TouchableOpacity 
								style={{alignItems: 'center', alignContent: 'center', alignSelf: 'center'}} 
								onPress={() => openModal('coins30')}
							>
								<IconSelect resizeMode='contain' source={require('../../../assets/img/arrowdown.png')} />
							</TouchableOpacity>
							<TextValueCoins>{params.totalCoins30} USD</TextValueCoins>
						</Fragment>
					) : (
						<Fragment>
							<TextSelectCoins selected={params.selected30}>-- Coins</TextSelectCoins>
							<TextValueCoins>-- USD</TextValueCoins>
						</Fragment>
					)}
				</RowCoins>

				<RowCoins>
					<TouchableOpacity onPress={() => setParams(prevState => ({...prevState, selected60: !prevState.selected60 })) }>
						{params.selected60 ? (
							<IconMins resizeMode='contain' source={require('../../../assets/img/check.png')} />
						) : (
							<IconMinsOut resizeMode='contain' source={require('../../../assets/img/checkOut.png')} />
						)}
					</TouchableOpacity>
					<TextMins selected={params.selected60}>60 mins</TextMins>

					{params.selected60 ? (
						<Fragment>
							<TouchableOpacity 
								style={{alignItems: 'center', alignContent: 'center', alignSelf: 'center'}} 
								onPress={() => openModal('coins60')}
							>
								<TextSelectCoins selected={params.selected60}>{params.coins60} Coins</TextSelectCoins>
							</TouchableOpacity>
							<TouchableOpacity 
								style={{alignItems: 'center', alignContent: 'center', alignSelf: 'center'}} 
								onPress={() => openModal('coins60')}
							>
								<IconSelect resizeMode='contain' source={require('../../../assets/img/arrowdown.png')} />
							</TouchableOpacity>
							<TextValueCoins>{params.totalCoins60} USD</TextValueCoins>
						</Fragment>
					) : (
						<Fragment>
							<TextSelectCoins selected={params.selected60}>-- Coins</TextSelectCoins>
							<TextValueCoins>-- USD</TextValueCoins>
						</Fragment>
					)}
				</RowCoins>

				<RowCoins>
					<TouchableOpacity onPress={() => setParams(prevState => ({...prevState, selectedDescount: !prevState.selectedDescount })) }>
						{params.selectedDescount ? (
							<IconMins resizeMode='contain' source={require('../../../assets/img/check.png')} />
						) : (
							<IconMinsOut resizeMode='contain' source={require('../../../assets/img/checkOut.png')} />
						)}
					</TouchableOpacity>
					<TextMins selected={params.selectedDescount}>{t('createLessonDiscount')}</TextMins>
				</RowCoins>

				<RowLanguage>
					<TextLanguage>{t('language')}:</TextLanguage>
					<TouchableOpacity 
						style={{alignItems: 'center', alignContent: 'center', alignSelf: 'center'}} 
						onPress={() => openModal('language')}
					>
						<TextSelectLanguage>{params.selectedLanguage}</TextSelectLanguage>
					</TouchableOpacity>
					<TouchableOpacity 
						style={{alignItems: 'center', alignContent: 'center', alignSelf: 'center'}} 
						onPress={() => openModal('language')}
					>
						<IconSelect resizeMode='contain' source={require('../../../assets/img/arrowdown.png')} />
					</TouchableOpacity>
				</RowLanguage>

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
						onPress={handleCreateLesson}
					>
						<BottomContinue resizeMode='contain' source={require("../../../assets/img/button-bg.png")} />
					</TouchableHighlight>
				</ContainerButtom>
			</ScrollView>

			<ModalBottom
				ref={refModalBottom}
				closeOnDragDown
				dragFromTopOnly
				animationType={'slide'}
				customStyles={customStyles}>
				<ContainerModal>
					<HeaderModal>
						<MenuExt></MenuExt>
						<MenuCenter>
							<Title>
								{viewMode == 'help' && t('aboutYourTrailer')}
								{viewMode == 'YouGet' && t('buyMembership')}
								{viewMode == 'language' && t('language')}
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
						{viewMode == 'YouGet' && <YouGetView />}
						{viewMode == 'coins30' && (
							<Fragment>
								<BuyYourMembership>{t('priceCoins')}</BuyYourMembership>
								<ChooseMonthly>min: 10 & max: 999 Coins</ChooseMonthly>
								<InputCoins
									keyboardType="numeric"
									defaultValue={params.coins30.toString()}
									placeholder="999"
									maxLength={3}
									placeholderTextColor={colors.lila}
									onChangeText={(data) => {
										if (data == '')
											data = 0

										let valor = (parseInt(data) * valueCoin)
										if (account.premium == undefined || account.premium == false)
											valor = valor - (valor * 0.099)

										valor = valor.toFixed(2)
										setParams(prevState => ({...prevState, totalCoins30: valor }))
										setParams(prevState => ({...prevState, coins30: parseInt(data) }))
									}}
								/>
								<TotalAmountCoins>Total: {params.totalCoins30} USD</TotalAmountCoins>
							</Fragment>
						)}
						{viewMode == 'coins60' && (
							<Fragment>
								<BuyYourMembership>{t('priceCoins')}</BuyYourMembership>
								<ChooseMonthly>min: 10 & max: 999 Coins</ChooseMonthly>
								<InputCoins
									keyboardType="numeric"
									defaultValue={params.coins60.toString()}
									placeholder="999"
									maxLength={3}
									placeholderTextColor={colors.lila}
									onChangeText={(data) => {
										if (data == '')
											data = 0

										let valor = (parseInt(data) * valueCoin)
										if (account.premium == undefined || account.premium == false)
											valor = valor - (valor * 0.099)

										valor = valor.toFixed(2)
										setParams(prevState => ({...prevState, totalCoins60: valor }))
										setParams(prevState => ({...prevState, coins60: parseInt(data) }))
									}}
								/>
								<TotalAmountCoins>Total: {params.totalCoins60} USD</TotalAmountCoins>
							</Fragment>
						)}
						{viewMode == 'language' && (
							<Fragment>
								<SelectLanguage>{t('selectLanguage')}</SelectLanguage>
								<ScrollViewLanguage>
									{languages.map((item) => (
										<Ripple
											key={item._id}
								 			onPress={() => handleSelectecLanguage(item)}
								 			rippleColor={colors.whiteTrasparent}
								 			rippleDuration={1000}
								 			rippleSize={1000}
								 		>
										    <ItemList>
										      	<TextItem> {item.name} </TextItem>
										    </ItemList>
									  	</Ripple>
									))}
								</ScrollViewLanguage>
							</Fragment>
						)}
					</ScrollViewModal>
				</ContainerModal>
        	</ModalBottom>

        	<ModalBottom
				ref={refModalBottomSuccess}
				closeOnPressMask={false}
				closeOnPressBack={false}
				animationType={'slide'}
				customStyles={customStyles}>
				<ContainerModal>
					<HeaderModal>
						<MenuExt></MenuExt>
						<MenuCenter>
							<Title>
								{t('LessonPosted')}
							</Title>
						</MenuCenter>
						<MenuExt>
							<TouchableOpacity onPress={closeModalSuccess}>
								<IconClose resizeMode='contain' source={require('../../../assets/img/close-circle-outline.png')} />
							</TouchableOpacity>
						</MenuExt>
					</HeaderModal>
					<SeparatorModal />
					<ScrollViewModal>
						{/*
						<LottieView
							ref={animation}
					        source={require('../../../assets/lottie/success.json')}
					        style={{flex: 1, alignSelf:'center', width: 100, height: 100}}
					        loop={true}
					    />
						*/}
						<IconSuccess resizeMode='contain' source={require('../../../assets/img/success.png')}/>
						<BuyYourMembership>{t('SuccessfullyPublished')}</BuyYourMembership>
						<NowBooking>{t('NowBooking')}</NowBooking>
						<NowBooking2>{t('NowBooking2')}</NowBooking2>

						<ImageRecord resizeMode='contain' source={{ uri: `data:image;base64,${params.cover}` }} />

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

//--- body --------
const ScrollView = styled.ScrollView`
	width: 100%;
    height: 100%;
`
const RowDescription = styled.View`
	width: 100%;
	flex-direction: row;
	padding-left: 30px;
	padding-right: 30px;
`
const Description = styled.Text`
	color: ${colors.fucsia};
	font-size: 14px;
	font-family: ${fonts.regular};
	text-align: left;
	padding-left: 30px;
	width: 100%;
	margin-top: 5%;
`
const InputDescription = styled.TextInput`
	border-color: ${props => props.error ? colors.fucsia : colors.grayLight};
    border-bottom-width: 1px;
    width: 100%;
    height: 70px;
    font-family: ${fonts.regular};
    font-size: 14px;
    color: ${colors.white};
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
const IconDelete = styled.Image`
	height: 20px;
	width: 20px;
	margin-left: -5px;
	margin-right: 10px;
`
const RowTags = styled.View`
	flex-direction: row;
	border-color: ${colors.grayLight};
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
	margin-top: 10px;
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
const RowYouGet = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: flex-end;
`
const YouGet = styled.Text`
	color: ${colors.lila};
	font-size: 12px;
	font-family: ${fonts.regular};
	text-align: right;
	margin-top: 30px;
	margin-right: -20px;
`
const IconYouGet = styled.Image`
	height: 20px;
	margin-top: 27px;
`
const RowCoins = styled.View`
	flex-direction: row;
	margin-top: 15px;
	height: 30px;
`
const TextMins = styled.Text`
	color: ${props => props.selected ? colors.white : colors.whiteTrasparent};
	font-size: 14px;
	line-height: 20px;
	font-family: ${fonts.regular};
	flex: 1;
	align-items: center;
	align-content: center;
	align-self: center;
`
const IconMins = styled.Image`
	height: 30px;
	margin-right: -40px;
	margin-left: -20px;
	align-items: center;
	align-content: center;
	align-self: center;
`
const IconMinsOut = styled.Image`
	height: 22px;
	margin-right: -33px;
	margin-left: -13px;
	margin-top: 4px;
	align-items: center;
	align-content: center;
	align-self: center;
`
const TextSelectCoins = styled.Text`
	color:  ${props => props.selected ? colors.cyan : colors.whiteTrasparent};
	text-shadow: 0px 0px 8px ${colors.cyan};
	font-size: 14px;
	line-height: 20px;
	text-align: right;
	font-family: ${fonts.regular};
	flex: 1;
	width: 100px;
	margin-top: 5px;
`
const IconSelect = styled.Image`
	height: 20px;
	align-items: center;
	align-content: center;
	align-self: center;
`
const TextValueCoins = styled.Text`
	color: ${colors.whiteTrasparent};
	font-size: 14px;
	line-height: 20px;
	font-family: ${fonts.regular};
	flex: 1;
	margin-right: 20px;
	text-align: right;
	align-items: center;
	align-content: center;
	align-self: center;
`
const RowLanguage = styled.View`
	flex-direction: row;
	justify-content: flex-start;
	margin-top: 25px;
	height: 30px;
	margin-left: 30px;
`
const TextLanguage = styled.Text`
	color: ${colors.lila};
	font-size: 14px;
	margin-top: 7px;
	text-align: left;
	font-family: ${fonts.regular};
`
const TextSelectLanguage = styled.Text`
	color: ${colors.white};
	font-size: 14px;
	line-height: 20px;
	text-align: left;
	margin-left: 20px;
	font-family: ${fonts.regular};
`
const SelectLanguage = styled.Text`
	color: ${colors.white};
	font-size: 14px;
	text-align: center;
	justify-content: center;
	font-family: ${fonts.medium};
	align-self: center;
	margin-top: 20px;
`
const ScrollViewLanguage = styled.ScrollView`
	width: 100%;
    height: 100%;
    margin-top: 20px;
`
const ItemList = styled.View`
	padding: 15px;
    border-color: ${colors.lila};
    border-bottom-width: 1px;
    margin-horizontal: 30px;
`
const TextItem = styled.Text`
	color: ${colors.lila};
    font-family: ${fonts.regular};
    font-size: 18px;
    text-align: left;
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
//---- end ------

//---- modal -----
const ContainerModal = styled.View`
	flex: 1;
	align-items: flex-start;
`
const HeaderModal = styled.View`
	height: 60px;
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: row;
`
const SeparatorModal = styled.View`
	width: 100%;
	height: 1px;
	background-color: ${colors.lila};
	opacity: 0.3;
	position: absolute;
	margin-top: 60px;
	z-index: 3;
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
const IconClose = styled.Image`
	height: 26px;
	justify-content: center;
	align-items: center;
`
const ScrollViewModal = styled.ScrollView`
	width: 100%;
    height: 100%;
    margin-top: 22px;
    margin-bottom:10px;
`
const BuyYourMembership = styled.Text`
	color: ${colors.white};
	font-size: 14px;
	text-align: center;
	justify-content: center;
	font-family: ${fonts.medium};
	align-self: center;
	margin-top: 20px;
`
const ChooseMonthly = styled.Text`
	color: ${colors.white};
	font-size: 12px;
	text-align: center;
	justify-content: center;
	font-family: ${fonts.regular};
	align-self: center;
	margin-top: 8px;
`
const NowBooking = styled.Text`
	color: ${colors.whiteTrasparent};
	font-size: 14px;
	text-align: center;
	justify-content: center;
	font-family: ${fonts.regular};
	align-self: center;
	margin-top: 10px;
	margin-horizontal: 20px;
`
const NowBooking2 = styled.Text`
	color: ${colors.whiteTrasparent};
	font-size: 14px;
	text-align: center;
	justify-content: center;
	font-family: ${fonts.regular};
	align-self: center;
	margin-top: 3px;
	margin-horizontal: 10px;
`
const ImageZero = styled.Image`
	height: 100px;
	justify-content: center;
	align-items: center;
	align-self: center;
	margin-top: 30px;
`
const ZeroCommissions = styled.Text`
	color: ${colors.white};
	font-size: 18px;
	text-align: center;
	justify-content: center;
	font-family: ${fonts.medium};
	align-self: center;
	margin-top: 10px;
	width: 250px;
	line-height: 21px;
`
const InputCoins = styled.TextInput`
	border-color: ${colors.grayLight};
    border-bottom-width: 1px;
    width: 150px;
    margin-top: 30px;
    font-family: ${fonts.regular};
    font-size: 30px;
    color: ${colors.white};
    align-self: center;
    align-items: center;
    align-content: center;
    text-align:center;
`
const TotalAmountCoins = styled.Text`
	color: ${colors.white};
	font-size: 14px;
	margin-top: 40px;
	bottom: 20px;
	line-height: 20px;
	align-self: center;
    align-items: center;
    align-content: center;
    text-align:center;
	font-family: ${fonts.regular};
`
const ImageRecord = styled.Image`
	height: 237px;
	width: 166px;
	justify-content: center;
	align-items: center;
	align-self: center;
	margin-top: 10%;
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
const IconSuccess = styled.Image`
	height: 50px;
	justify-content: center;
	align-items: center;
	align-self: center;
`
