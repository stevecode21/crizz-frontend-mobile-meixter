import React, {useEffect, useState, useRef} from 'react'
import { BackHandler, FlatList, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import moment from 'moment'
import useTranslation from '../../i18n';
import useAuth from '../../Services/Auth';
import { APP_STATE, URI } from "../../Constants";
import fonts from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
import * as VideoThumbnails from 'expo-video-thumbnails';
//api services
import * as api from "../../Services/lesson"


export default function Mylessons() {
	const {t, localeProvider} = useTranslation()
  	const {setLoading, showErrorToast, stateApp, checkAccount} = useAuth()
  	const [listLesson, setListLesson] = useState([])
  	const [refreshing, setRefreshing] = useState(false)

  	useEffect(() => {(async () => {
  		setRefreshing(true)
		await getListLesson()
		setRefreshing(false)
	})()}, [])

	const generateThumbnail = async (url) => {
		try {
			const { uri } = await VideoThumbnails.getThumbnailAsync(
				URI+''+url,
				{
				  time: 15000,
				}
			);
			return uri
		} catch (error) {
			//console.log(error)
			return null
		}
	};

  	const getListLesson = async () => {
  		try 
		{
			let response = await api.listLesson()
			//console.log(response)
			let list = response.result
			for (var i = 0; i < list.length; i++) {
				let thumnail = await generateThumbnail(list[i].video)
				list[i].thumnail = thumnail
			}
			//console.log(list)
			setListLesson(list)	
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
  		
  	}

	return (
		<Container>
			<FlatList
				data={listLesson}
				renderItem={({ item, index }) => (
					<ListItem key={index}>
						<RowCover>
							<ImageCover resizeMode='cover' source={{ uri: (item.thumnail == null) ? URI+''+item.cover : item.thumnail }} />
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
								<DateTime>{moment(item.createdAt).format('d MMM, hh:mm a')}</DateTime>
								<TouchableOpacity onPress={() => openModal('menu') }>
									<IconMenu resizeMode='contain' source={require('../../../assets/img/options.png')} />
								</TouchableOpacity>
							</TopInfo>
							<Info>{item.description}</Info>
							<ButtomInfo>
								<ButtomInfoSpace></ButtomInfoSpace>
								<ButtomInfoLeft>
									<IconShared resizeMode='contain' source={require('../../../assets/img/share_home.png')} />
									<TextShared>{item.share}</TextShared>
								</ButtomInfoLeft>
								<ButtomInfoRight>
									<IconComment resizeMode='contain' source={require('../../../assets/img/comment_home.png')} />
									<TextComment>{item.comments}</TextComment>
								</ButtomInfoRight>
							</ButtomInfo>
						</RowInfo>
					</ListItem>
				)}
				keyExtractor={({ item, index }) => index}
				onRefresh={handleRefresh}
				refreshing={refreshing}
				onEndReached={handleLoadMore}
				onEndReachedThreshold={50}
			/>
		</Container>
	)
}

const Container = styled.View`
	flex: 1;
	background: ${colors.blueDark};
	align-items: flex-start;
	margin-bottom: 70px;
`
const Icon = styled.Image`
	height: 50%;
	margin-top: 5%;
	align-self: center;
`
const Title = styled.Text`
	color: ${colors.white};
	font-size: 18px;
	text-align: center;
	align-self: center;
	font-family: ${fonts.medium};
`
const Subtitle = styled.Text`
	color: ${colors.lilaLight};
	font-size: 14px;
	line-height: 20px;
	text-align: center;
	align-self: center;
	font-family: ${fonts.regular};
	margin-top: 20px;
	width: 320px;
`
//------ list item --------------
const ListItem = styled.View`
	flex-direction: row;
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
	color: ${colors.whiteTrasparent};
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
`
const TopInfo = styled.View`
	flex-direction: row;
	height: 20px;
`
const IconMenu = styled.Image`
	height: 20px;
	align-items: center;
	justify-content: center;
	align-self: center;
`
const DateTime = styled.Text`
	color: ${colors.whiteTrasparent};
	font-size: 12px;
	text-align: left;
	font-family: ${fonts.regular};
	width: 75%;
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
	height: 18px;
	margin-top: 9px;
	align-items: center;
	justify-content: center;
	align-self: center;
`
const IconLikes = styled.Image`
	height: 21px;
	margin-top: 6px;
	align-items: center;
	justify-content: center;
	align-self: center;
`
const TextViews = styled.Text`
	color: ${colors.whiteTrasparent};
	font-size: 10px;
	text-align: center;
	font-family: ${fonts.medium};
	margin-top: 5px;
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
	width: 30px;
	height: 30px;
	margin-top: 2px;
	align-items: center;
	justify-content: center;
	align-self: center;
`
const IconComment = styled.Image`
	width: 30px;
	height: 30px;
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

