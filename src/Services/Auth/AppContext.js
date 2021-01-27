import React, {useEffect, useCallback, useState, useRef} from 'react';
import { Alert } from 'react-native';
import useStorage, {getValue} from "../AsyncStorage";
import { APP_STATE, URI } from "../../Constants";

import Loading from '../../Components/Loading'
import {showErrorToast} from '../../Components/Toast'
import useTranslation from '../../i18n';
import Routes from '../../Navigation/Routes';

import * as api from "../login"
import * as apilesson from '../lesson'

const AppStateContext = React.createContext();

export const AppContextProvider = props => {
	const [accessToken, changeAccessToken] = useStorage("@TOKEN", accessToken);
	const [account, updateAccount] = useStorage("@USER", {});
	const [stateApp, setStateApp] = useStorage("@STATE", APP_STATE.UNKNOWN);
	const [loading, setLoading] = useState(false)
	const [inHome, setInHome] = useState(false)
	const [videos, setVideos] = useState([])
	const {localeProvider} = useTranslation()

	useEffect(() => {
	  	async function fetchData() {
	    	let response = await _checkAccount()
		}
		fetchData();
	}, []);
	
	const _setToken = async (accessToken) => {
		api.setAuthorization(accessToken)
		changeAccessToken(accessToken)
		console.log('accessToken', accessToken)
		setLoading(true)
		try
		{
			let response = await api.account();
			setLoading(false)
			if (response.result.urlProfileImage != undefined) 
			{
				response.result.urlProfileImage = URI+''+response.result.urlProfileImage
			}
			console.log('account_info', response.result)
			updateAccount(response.result)
			if (response.result.fullRecord == false)
				setStateApp(APP_STATE.REGISTER)
			else
				setStateApp(APP_STATE.PRIVATE)
		}
	    catch (error) 
	    {
      		showErrorToast(localeProvider.name == 'en' ? error.message_en : error.message_es)
	    	setStateApp(APP_STATE.PUBLIC)
			setLoading(false)
	    }
	}

	const _changeAccount = account => {
		if (account.urlProfileImage != undefined) 
		{
			account.urlProfileImage = URI+''+account.urlProfileImage
		}
		updateAccount(account)
	}

	const _logoutUser = useCallback(async () => {
		changeAccessToken('')
		updateAccount({})
		api.deleteAuthorization()
	    setStateApp(APP_STATE.PUBLIC)
	}, []);

	const _logout = useCallback(() => {
	    Alert.alert(
			'Please comfirm Logout',
			'Are you sure you want to logout from the app',
			[
				{
				  text: 'Yes, Logout',
				  onPress: _logoutUser,
				},
				{
				  type: 'cancel',
				  text: 'No, Stay here',
				},
			],
	    );
	}, [_logoutUser]);

	const _checkAccount = async () => {
		if (accessToken == undefined || accessToken == '') {
			setStateApp(APP_STATE.PUBLIC)
		}
		else
		{
			console.log('accessToken', accessToken)
			api.setAuthorization(accessToken)
			setLoading(true)
			try
			{
				let response = await api.account();
				setLoading(false)
				if (response.result.urlProfileImage != undefined)
					response.result.urlProfileImage = URI+''+response.result.urlProfileImage
				
				
				updateAccount(response.result)
				console.log('account_info', response.result)
				if (!response.result.fullRecord){
					setStateApp(APP_STATE.REGISTER)
				}else{
					await getListLesson()
					setStateApp(APP_STATE.PRIVATE)
				}
					
			}
		    catch (error) 
		    {
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
				setLoading(false)
		    }
		}
	}

	const getListLesson = async () => {
  		setLoading(true)
  		try 
		{
			let response = await apilesson.listLessonByTags()
			let list = response.result
			for (var i = 0; i < list.length; i++) {
				list[i].video = URI+''+list[i].video
				list[i].cover = URI+''+list[i].cover
				list[i].tacherUrlProfile = URI+''+list[i].tacherUrlProfile
				
				let vol = (100 - parseInt(list[i].volume)) / 100
				list[i].volumeVideo = parseFloat(vol.toFixed(1))
				vol = parseInt(list[i].volume) / 100
				list[i].volume = parseFloat(vol.toFixed(1))
			}
			setVideos(list)	
			setLoading(false)
		} 
		catch (error) 
		{
			setLoading(false)
	        if (error.status == 401) 
	        {
	          showErrorToast(localeProvider.name == 'en' ? error.message_en : error.message_es)
	        }
	        else
	        {
	          //showErrorToast(error.message);
	        }
		}
  	}

	return (
		<AppStateContext.Provider
			value={{
				setToken: _setToken,
				accessToken: accessToken,
				account: account,
				changeAccount: _changeAccount,
				logout: _logout,
				logoutDirect: _logoutUser,
				stateApp: stateApp,
				setStateApp: setStateApp,
				setLoading: setLoading,
				checkAccount: _checkAccount,
				showErrorToast: showErrorToast,
				inHome: inHome,
				setInHome: setInHome,
				videos: videos,
				getListLesson: getListLesson
			}}
		>
			<Loading visible={loading} />
			{props.children}
		</AppStateContext.Provider>
	);
};

export default AppStateContext;
