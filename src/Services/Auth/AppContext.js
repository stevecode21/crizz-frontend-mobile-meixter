import React, {useEffect, useCallback, useState} from 'react';
import { Alert } from 'react-native';
import useStorage, {getValue} from "../AsyncStorage";
import { APP_STATE } from "../../Constants";
import * as api from "../login";
import Loading from '../../Components/Loading'
import {showErrorToast} from '../../Components/Toast'
import useTranslation from '../../i18n';

const AppStateContext = React.createContext();

export const AppContextProvider = props => {
	const [accessToken, changeAccessToken] = useStorage("@TOKEN", accessToken);
	const [account, updateAccount] = useStorage("@USER", {});
	const [stateApp, setStateApp] = useStorage("@STATE", APP_STATE.PUBLIC);
	const [loading, setLoading] = useState(false)
	const {localeProvider} = useTranslation()
	
	const _setToken = accessToken => {
		api.setAuthorization(accessToken)
		setStateApp(APP_STATE.PRIVATE)
		changeAccessToken(accessToken);
	}

	const _changeAccount = account => {
		updateAccount(account)
	}

	const _logoutUser = useCallback(async () => {
		changeAccessToken('')
		updateAccount({})
	    setStateApp(APP_STATE.PUBLIC);
	    api.deleteAuthorization()
	}, [changeAccessToken, updateAccount, setStateApp]);

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
			console.log('consultando account')
			api.setAuthorization(accessToken)
			setLoading(true)
			try
			{
				let response = await api.account();
				setLoading(false)
				console.log(response)
				updateAccount(response.result)
				setStateApp(APP_STATE.PRIVATE)
			}
		    catch (error) 
		    {
          		showErrorToast(localeProvider.name == 'en' ? error.message_en : error.message_es)
		    	console.log(error)
		    	setStateApp(APP_STATE.PUBLIC)
				setLoading(false)
				if (error.status == 403)
					setStateApp(APP_STATE.PUBLIC)
		    }
		}
	}

	return (
		<AppStateContext.Provider
			value={{
				tokenProvider: accessToken,
				setToken: _setToken,
				account: account,
				changeAccount: _changeAccount,
				logout: _logout,
				stateApp: stateApp,
				setLoading: setLoading,
				checkAccount: _checkAccount,
				showErrorToast: showErrorToast
			}}
		>
			<Loading visible={loading} />
			{props.children}
		</AppStateContext.Provider>
	);
};

export default AppStateContext;
