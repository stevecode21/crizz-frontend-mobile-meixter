import React, {useEffect, useState, useRef, Fragment} from 'react'
import { BackHandler, FlatList, TouchableOpacity, TouchableHighlight} from 'react-native'
import styled from 'styled-components/native'
import moment from 'moment'
import useTranslation from '../../i18n';
import useAuth from '../../Services/Auth';
import ModalBottom from 'react-native-raw-bottom-sheet'
import { APP_STATE, URI } from "../../Constants";
import fonts from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
import * as VideoThumbnails from 'expo-video-thumbnails';
//api services
import * as api from '../../Services/lesson'


export default function Mylessons() {
	const {t, localeProvider} = useTranslation()
  	const {setLoading, showErrorToast, stateApp, checkAccount, setStateApp} = useAuth()
  	const [listLesson, setListLesson] = useState([])
  	const [refreshing, setRefreshing] = useState(false)
  	const refModalBottom = useRef()
  	const [mtm, setMtm] = useState('70%')
  	const [viewMode, setViewMode] = useState('menu')
  	//comments
  	const [listComments, setListComments] = useState([])
  	const [refresComments, setRefresComments] = useState(false)
  	const [selectedLesson, setSelectedLesson] = useState({})

  	const [params, setParams] = useState({
  		message: '',
  	})
  	const [error, setError] = useState({
  		message: ''
  	})

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

  	useEffect(() => {(async () => {
  		setLoading(true)
		await getListLesson()
		setLoading(false)
		//openModal('menu')
	})()}, [])

	const generateThumbnail = async (url) => {
		try {
			const { uri } = await VideoThumbnails.getThumbnailAsync(
				URI+''+url,
				{
				  time: 5000,
				}
			);
			return uri
		} catch (error) {
			return null
		}
	}

  	const getListLesson = async () => {
  		try 
		{
			let response = await api.listLesson()
			let list = response.result
			for (var i = 0; i < list.length; i++) {
				let thumnail = await generateThumbnail(list[i].video)
				list[i].thumnail = thumnail
			}
			setListLesson(list)	
		} 
		catch (error) 
		{
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

  	const getListComments = async (id) => {
  		try 
		{
			setRefresComments(true)
			let response = await api.listLessonComments(id)
			//console.log(response)
			setListComments(response.result)
			setRefresComments(false)	
		} 
		catch (error) 
		{
			setRefresComments(false)
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

  	const sendComments = async () => {
  		if (params.message != '')
  		{
  			try 
			{
				setLoading(true)
				let data = {
					comment: params.message,
					id: selectedLesson._id
				}
				let response = await api.sendComment(data)
				//console.log(response)
				setParams(prevState => ({...prevState, message: '' }))
				setError(prevState => ({...prevState, message: '' }))
				setLoading(false)
				await getListComments(selectedLesson._id)
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
  		else
  		{
  			showErrorToast(t('sorrySendComments'))
  			setError(prevState => ({...prevState, message: t('sorrySendComments') }))
  		}
  	}

  	const freezeLesson = async (lesson) => {
  		try 
		{
			setLoading(true)
			let data = {
				offer: !lesson.offer,
				id: lesson._id
			}
			let response = await api.freeze(data)
			//console.log(response)
			setLoading(false)
			closeModal()
			await getListLesson()
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

  	const handleRefresh = async () => {
  		setRefreshing(true)
		await getListLesson()
		setRefreshing(false)
  	}

  	const handleLoadMore = async () => {
  		
  	}

  	const openModal = (type) => {
  		if (type == 'menu' || type == 'unfreeze')
    		setMtm('50%')
    	else
    		setMtm('80%')

    	setParams(prevState => ({...prevState, message: '' }))
    	
	    setViewMode(type)
	    refModalBottom.current.open()
  	}

  	const closeModal = () => {
    	refModalBottom.current.close()
	}

	const MenuSettings = () => {
		return (
			<ScrollViewModal>
				<TouchableOpacity onPress={closeModal}>
					<TextEdit>{t('Edit')}</TextEdit>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => freezeLesson(selectedLesson)}>
					<TextEdit>{t('Freeze')}</TextEdit>
				</TouchableOpacity>
				<TouchableOpacity onPress={closeModal}>
					<TextIssues>{t('IssuesLesson')}</TextIssues>
				</TouchableOpacity>
			</ScrollViewModal>
		)
	}

	const Sharing = () => {
		return (
			<ScrollViewModal>
				
			</ScrollViewModal>
		)
	}

	const Unfreeze = () => {
		return (
			<ScrollViewModal>
				<AreUnfreezeLesson>{t('AreUnfreezeLesson')}</AreUnfreezeLesson>
				<ContainerButtom>
					<TextButton>
						{t('PublishNow')} {'	  '}
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
						onPress={() => freezeLesson(selectedLesson)}
					>
						<BottomContinue resizeMode='stretch' source={require("../../../assets/img/button-bg.png")} />
					</TouchableHighlight>
				</ContainerButtom>
				<YourPublicAgain>{t('YourPublicAgain')}</YourPublicAgain>
			</ScrollViewModal>
		)
	}

	const handleComments = async (item) => {
		setListComments([])
		setSelectedLesson(item)
		openModal('comments')
		await getListComments(item._id)
	}

	const handleMenu = async (item) => {
		setSelectedLesson(item)
		openModal('menu')
	}

	const handleUnfreeze = async (item) => {
		setSelectedLesson(item)
		openModal('unfreeze')
	}

	return (
		<Container>
			<FlatList
				data={listLesson}
				renderItem={({ item, index }) => (
					<ListItem>
						<RowCover>
							<ImageCover freeze={item.offer} resizeMode='cover' 
								source={{ uri: (item.thumnail == null) ? URI+''+item.cover : item.thumnail }} />
							{!item.offer && (
								<TouchableOpacity style={{
									position: 'absolute',
									zIndex: 3,
									marginLeft: 10,
									backgroundColor: colors.transparent,
									width: 78,
									height: 120,
									alignItems: 'center',
									alignSelf: 'center',
									justifyContent: 'center'
								}} onPress={() => handleUnfreeze(item) }>
									<TextFrezze>Freeze</TextFrezze>
								</TouchableOpacity>
							)}
							<ButtomCover>
								<ButtomCoverLeft>
									<IconViews resizeMode='contain' source={require('../../../assets/img/views.png')} />
									<TextViews>{item.views}</TextViews>
								</ButtomCoverLeft>
								<ButtomCoverRight>
									<IconLikes resizeMode='contain' source={require('../../../assets/img/likes.png')} />
									<TextLikes>{item.save}</TextLikes>
								</ButtomCoverRight>
							</ButtomCover>
						</RowCover>
						<RowInfo>
							<TopInfo>
								<DateTime freeze={item.offer}>{moment(item.createdAt).format('d MMM, hh:mm a')}</DateTime>
								{item.offer && (
								<TouchableOpacity onPress={() => handleMenu(item) }>
									<IconMenu resizeMode='stretch' source={require('../../../assets/img/options.png')} />
								</TouchableOpacity>
								)}
							</TopInfo>
							<Info freeze={item.offer}>{item.description}</Info>
							<ButtomInfo>
								<ButtomInfoSpace></ButtomInfoSpace>
								<ButtomInfoLeft>
									{item.offer && (
									<TouchableOpacity onPress={() => openModal('sharing') }>
										<IconShared resizeMode='contain' source={require('../../../assets/img/share_home.png')} />
										<TextShared>{item.share}</TextShared>
									</TouchableOpacity>
									)}
								</ButtomInfoLeft>
								<ButtomInfoRight>
									<TouchableOpacity onPress={() => handleComments(item) }>
										<IconComment resizeMode='contain' source={require('../../../assets/img/comment_home.png')} />
										<TextComment>{item.comments}</TextComment>
									</TouchableOpacity>
								</ButtomInfoRight>
							</ButtomInfo>
						</RowInfo>
					</ListItem>
				)}
				keyExtractor={item => item._id}
				onRefresh={handleRefresh}
				refreshing={refreshing}
			/>

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
								{viewMode == 'menu' && t('settings')}
								{viewMode == 'sharing' && t('Share')}
								{viewMode == 'comments' && t('Comments')}
								{viewMode == 'unfreeze' && t('UnfreezeLesson')}
							</Title>
						</MenuCenter>
						<MenuExt>
							<TouchableOpacity onPress={closeModal}>
								<IconClose resizeMode='contain' source={require('../../../assets/img/close-circle-outline.png')} />
							</TouchableOpacity>
						</MenuExt>
					</HeaderModal>
					<SeparatorModal />
					{viewMode == 'menu' && <MenuSettings />}
					{viewMode == 'sharing' && <Sharing />}
					{viewMode == 'unfreeze' && <Unfreeze />}
					{viewMode == 'comments' && (
						<Fragment>
							<FlatList
								data={listComments}
								renderItem={({ item, index }) => (
									<ListItemV>
										<RowItems>
											<CommentsTop>
												<RowTopLeft>
													<BorderAvatar>
														<Avatar resizeMode='stretch' source={{uri : URI+''+item.userUrlProfile}}/>
													</BorderAvatar>
												</RowTopLeft>
												<RowTopRight>
													<TextEmail>@{item.userNickname}</TextEmail>
												</RowTopRight>
											</CommentsTop>
										</RowItems>
										<RowItems>
											<TextCommentList>{item.comment}</TextCommentList>
										</RowItems>
									</ListItemV>
								)}
								keyExtractor={item => item._id}
								onRefresh={() => getListComments(selectedLesson._id)}
								refreshing={refresComments}
								style={{marginTop: 10}}
							/>
							{selectedLesson.offer && (
							<ViewSendComment>
								<RowSCLeft>
									<InputComments 
										error={error.message}
										multiline
										numberOfLines={3}
										maxLength={250}
										placeholder={t('AddComment')+'...'}
										placeholderTextColor={colors.white}
										value={params.message}
										onChangeText={(data) => setParams(prevState => ({...prevState, message: data }))}
									/>
								</RowSCLeft>
								<RowSCRight>
									<TouchableOpacity onPress={sendComments}>
										<TextEdit>{t('Send')}</TextEdit>
									</TouchableOpacity>
								</RowSCRight>
							</ViewSendComment>
							)}
						</Fragment>
					)}
				</ContainerModal>
        	</ModalBottom>
		</Container>
	)
}

const Container = styled.View`
	flex: 1;
	background: ${colors.blueDark};
	align-items: flex-start;
	margin-bottom: 80px;
`
//------ list item --------------
const ListItem = styled.View`
	flex-direction: row;
	border-color: ${colors.grayLight};
    border-bottom-width: 1px;
    margin-top: 10px;
`
const RowItems = styled.View`
	flex-direction: row;
	margin-horizontal: 20px;
	margin-bottom: 10px;
`
const ListItemV = styled.View`
	flex-direction: column;
	border-color: ${colors.grayLight};
    border-bottom-width: 1px;
    margin-top: 10px;
`
const RowCover = styled.View`
	width: 30%;
	align-items: center;
	padding: 10px;
`
const RowInfo = styled.View`
	padding: 10px;
	width: 70%;
`
const Info = styled.Text`
	color: ${props => props.freeze ? colors.whiteTrasparent : colors.gray};
	font-size: 12px;
	text-align: left;
	font-family: ${fonts.regular};
	margin-top: 5px;
	line-height: 20px;
	height: 85px;
`
const ImageCover = styled.Image`
	width: 78px;
	height: 110px;
	justify-content: center;
	align-items: center;
	align-self: center;
	opacity: ${props => props.freeze ? 1.0 : 0.3};
`
const TopInfo = styled.View`
	flex-direction: row;
	height: 20px;
`
const IconMenu = styled.Image`
	height: 14px;
	width: 30px;
	align-items: center;
	justify-content: center;
	align-self: center;
`
const DateTime = styled.Text`
	color: ${props => props.freeze ? colors.whiteTrasparent : colors.gray};
	font-size: 12px;
	text-align: left;
	font-family: ${fonts.regular};
	width: 85%;
`
const ButtomCover = styled.View`
	flex-direction: row;
`
const ButtomCoverLeft = styled.View`
	flex:1;
`
const ButtomCoverRight = styled.View`
	flex:1;
`
const IconViews = styled.Image`
	height: 23px;
	margin-top: 9px;
	align-items: center;
	justify-content: center;
	align-self: center;
	margin-left: 10px;
`
const IconLikes = styled.Image`
	height: 26px;
	margin-top: 6px;
	align-items: center;
	justify-content: center;
	align-self: center;
`
const TextFrezze = styled.Text`
	color: ${colors.white};
	font-size: 16px;
	text-align: center;
	font-family: ${fonts.SemiBold};
	text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.6);
`
const TextViews = styled.Text`
	color: ${colors.whiteTrasparent};
	font-size: 10px;
	text-align: center;
	font-family: ${fonts.medium};
	margin-top: 5px;
	margin-left: 10px;
`
const TextLikes = styled.Text`
	color: ${colors.whiteTrasparent};
	font-size: 10px;
	text-align: center;
	font-family: ${fonts.medium};
	margin-top: 5px;
`
const ButtomInfo = styled.View`
	flex-direction: row;
`
const ButtomInfoSpace = styled.View`
	flex:2;
	align-items: center;
`
const ButtomInfoLeft = styled.View`
	flex:1;
	align-items: center;
`
const ButtomInfoRight = styled.View`
	flex:1;
	align-items: center;
`
const IconShared = styled.Image`
	width: 38px;
	height: 38px;
	margin-top: 2px;
	align-items: center;
	justify-content: center;
	align-self: center;
`
const IconComment = styled.Image`
	width: 38px;
	height: 38px;
	margin-top: 2px;
	align-items: center;
	justify-content: center;
	align-self: center;
`
const TextShared = styled.Text`
	color: ${colors.white};
	font-size: 10px;
	text-align: center;
	font-family: ${fonts.medium};
`
const TextComment = styled.Text`
	color: ${colors.white};
	font-size: 10px;
	text-align: center;
	font-family: ${fonts.medium};
`
//---- modal -----
const ContainerModal = styled.View`
	flex: 1;
	align-items: flex-start;
`
const HeaderModal = styled.View`
	height: 40px;
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
	margin-top: 50px;
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
const IconClose = styled.Image`
	height: 26px;
	justify-content: center;
	align-items: center;
`
const ScrollViewModal = styled.ScrollView`
	width: 100%;
    height: 100%;
    margin-top: 10px;
    margin-bottom:10px;
`
const TextEdit = styled.Text`
	color: ${colors.cyan};
	font-size: 18px;
	text-align: center;
	font-family: ${fonts.SemiBold};
	margin-top: 5%;
`
const TextIssues = styled.Text`
	color: ${colors.fucsia};
	font-size: 18px;
	text-align: center;
	font-family: ${fonts.SemiBold};
	margin-top: 5%;
`
const Title = styled.Text`
	color: ${colors.white};
	font-size: 14px;
	text-align: center;
	align-self: center;
	font-family: ${fonts.medium};
`
const ViewSendComment = styled.View`
	flex-direction: row;
	height: 20%;
	width: 100%;
	background-color: ${colors.background};
`
const RowSCRight = styled.View`
	flex: 1;
	justify-content: center;
	align-self: center;
`
const RowSCLeft = styled.View`
	flex: 4;
	padding: 10px;
	justify-content: center;
	align-self: center;
`
const InputComments = styled.TextInput`
	border-color: ${props => props.error ? colors.fucsia : colors.transparent};
    border-bottom-width: 1px;
    width: 100%;
    font-family: ${fonts.regular};
    font-size: 14px;
    color: ${colors.white};
`
const CommentsTop = styled.View`
    flex-direction: row;
    width: 100%;
    height: 40px;
`
const RowTopLeft = styled.View`
	flex:1;
	justify-content: center;
	align-self: center;
`
const RowTopRight = styled.View`
	flex:8;
	padding: 10px;
	justify-content: center;
	align-self: center;
`
const Avatar = styled.Image`
	width: 33px;
    height: 33px;
    border-radius: 100px;
    position: absolute;
    z-index:2;
    justify-content: center;
    align-items: center;
`
const BorderAvatar = styled.View`
	flex:1;
	width: 40px;
    height: 40px;
    border-radius: 100px;
    background-color: ${colors.violet};
    position: absolute;
    z-index:1;
    justify-content: center;
    align-items: center;
`
const TextEmail = styled.Text`
	color: ${colors.white};
	font-size: 17px;
	text-align: left;
	font-family: ${fonts.SemiBold};
	align-items: center;
`
const CommentsBody = styled.View`
    flex-direction: row;
    width: 100%;
    height: 40px;
	margin-top: 60px;
	background-color: ${colors.lila};
`
const TextCommentList = styled.Text`
	color: ${colors.white};
	font-size: 12px;
	text-align: left;
	font-family: ${fonts.regular};
`
const AreUnfreezeLesson = styled.Text`
	color: ${colors.white};
	font-size: 12px;
	text-align: center;
	font-family: ${fonts.regular};
	margin-top: 10%;
	margin-bottom: 25px;
	width: 336px;
	align-self:center;
	align-items:center;
	justify-content:center;
`
const YourPublicAgain = styled.Text`
	color: ${colors.whiteTrasparent};
	font-size: 12px;
	text-align: center;
	font-family: ${fonts.regular};
	width: 336px;
	align-self:center;
	align-items:center;
	justify-content:center;
	margin-top: 10px;
`
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
	text-shadow: 0px 0px 2px ${colors.cyan};
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

