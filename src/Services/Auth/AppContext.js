import React, {useEffect, useCallback, useState, useRef} from 'react';
import { Alert } from 'react-native';
import useStorage, {getValue} from "../AsyncStorage";
import { APP_STATE, URI } from "../../Constants";
import * as api from "../login";
import Loading from '../../Components/Loading'
import {showErrorToast} from '../../Components/Toast'
import useTranslation from '../../i18n';
import Routes from '../../Navigation/Routes';

const AppStateContext = React.createContext();

export const AppContextProvider = props => {
	const [accessToken, changeAccessToken] = useStorage("@TOKEN", accessToken);
	const [account, updateAccount] = useStorage("@USER", {});
	const [stateApp, setStateApp] = useStorage("@STATE", APP_STATE.UNKNOWN);
	const [loading, setLoading] = useState(false)
	const [inHome, setInHome] = useState(false)
	const {localeProvider} = useTranslation()

	useEffect(() => {(async () => {
			//setStateApp(APP_STATE.PRIVATE);
			_checkAccount()
			//_logoutUser()
	    })();
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
	    setStateApp(APP_STATE.PRIVATE);
	    api.deleteAuthorization()
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
				if (!response.result.fullRecord)
					setStateApp(APP_STATE.REGISTER)
				else
					setStateApp(APP_STATE.PRIVATE)
			}
		    catch (error) 
		    {
          		showErrorToast(localeProvider.name == 'en' ? error.message_en : error.message_es)
				setLoading(false)
		    }
		}
	}

	return (
		<AppStateContext.Provider
			value={{
				setToken: _setToken,
				account: account,
				changeAccount: _changeAccount,
				logout: _logout,
				stateApp: stateApp,
				setStateApp: setStateApp,
				setLoading: setLoading,
				checkAccount: _checkAccount,
				showErrorToast: showErrorToast,
				inHome: inHome,
				setInHome: setInHome,
			}}
		>
			<Loading visible={loading} />
			{props.children}
		</AppStateContext.Provider>
	);
};

export default AppStateContext;
